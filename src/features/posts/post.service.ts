import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { IPost } from './IPost';
import { IPostResponse } from './IPostResponse';
import { TablePageEvent } from 'primeng/table';
import { BehaviorSubject, map, tap, Observable, takeUntil, catchError, throwError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private postApiService: PostApiService = inject(PostApiService);
  private router: Router = inject(Router);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  
  private totalRecordsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalRecords$: Observable<number> = this.totalRecordsSubject.asObservable();
  
  selectedPost: IPost | null = null;
  
  limit: number = 10;
  skip: number = 0;
  
  isLoading: boolean = true;

  getPostTableData(): void {
    this.isLoading = true;

    this.postApiService.getPosts(this.limit, this.skip)
      .pipe(
        tap((postResponse: IPostResponse) => {
          this.isLoading = false;
          this.postsSubject.next(postResponse.posts);
          this.totalRecordsSubject.next(postResponse.total);
        }),
        catchError((error: string) => {
          throwError(() => new Error(`Ошибка при получений данных: ${ error }`))
          return of([]);
        })
      ).subscribe();
  }

  changePostsPage(event: TablePageEvent): void {
    this.limit = event.rows;
    this.skip = event.first;
    this.getPostTableData();
  }
  
  deletePost(currentPost: IPost): Observable<IPost[]> {
    let totalRecords: number = this.totalRecordsSubject.value;

    return this.postApiService.deletePost(currentPost)
      .pipe(
        map(() => {
          return this.postsSubject.value.filter((post: IPost) => post.id !== currentPost.id);
        }),
        tap((posts: IPost[]) => {
          this.postsSubject.next(posts);
          this.totalRecordsSubject.next(--totalRecords);
          this.selectedPost = null;
        }),
        catchError((error: string) => {
          throwError(() => new Error(`Ошибка при удалений: ${ error }`))
          return of([]);
        })
      );
  }

  editPost(postId: number, postForm: IPost): Observable<IPost[]> {
    return this.postApiService.updatePosts({ ...postForm, id: postId }).pipe(
      map(() => this.postsSubject.value.map((post: IPost) => {
        if (postId === post.id) {
          return { ...post, title: postForm.title, tags: postForm.tags, views: postForm.views }
        } else {
          return post;
        } 
      })),
      catchError((error: string) => {
        throwError(() => new Error(`Ошибка при редактирований: ${ error }`))
        return of([]);
      }),
      tap((posts: IPost[]) => this.postsSubject.next(posts))
    );
  }

  createPost(currentPost: IPost): Observable<Observable<IPost[]> | never[]> {
    return this.postApiService.createPost(currentPost).pipe(
      map(() => this.postsSubject.pipe(
        tap((posts: IPost[]) => {
          this.postsSubject.next([currentPost, ...posts]);
        })
      )),
      catchError((error: string) => {
        throwError(() => new Error(`Ошибка при добавлений: ${ error }`))
        return of([]);
      })
    );
  }

  redirectToPostsPage(post: IPost): void {
    this.router.navigate([`/posts/${ post.id.toString() }`]);
  }

}