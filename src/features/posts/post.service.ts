import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { IPost } from './IPost';
import { IPostResponse } from './IPostResponse';
import { TablePageEvent } from 'primeng/table';
import { BehaviorSubject, map, tap, Observable, takeUntil, catchError, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  
  private totalRecordsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalRecords$: Observable<number> = this.totalRecordsSubject.asObservable();
  
  selectedPost: IPost | null = null;
  
  limit: number = 10;
  skip: number = 0;
  
  isLoading: boolean = true;

  initPostsData(): void {
    this.isLoading = true;

    this.postApiService.getPosts(this.limit, this.skip)
      .pipe(
        tap((postResponse: IPostResponse) => {
          this.isLoading = false;
          this.postsSubject.next(postResponse.posts);
          this.totalRecordsSubject.next(postResponse.total);
        }),
        catchError((error: string) => {
          this.messageService.showError(`Ошибка при получений данных: ${ error }`);
          throwError(() => new Error(`Ошибка: ${ error }`))
          return of([]);
        })
      ).subscribe();
  }

  changePagination(event: TablePageEvent): void {
    this.limit = event.rows;
    this.skip = event.first;
    this.initPostsData();
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
          this.messageService.showError(`Ошибка при удалений: ${ error }`);
          throwError(() => new Error(`Ошибка: ${ error }`))
          return of([]);
        })
      );
  }

  editPost(postId: number, postForm: IPost): Observable<IPost[]> {
    return this.postApiService.updatePost({ ...postForm, id: postId }).pipe(
      map(() => this.postsSubject.value.map((post: IPost) => {
        if (postId === post.id) {
          return { ...post, title: postForm.title, tags: postForm.tags, views: postForm.views }
        } else {
          return post;
        } 
      })),
      catchError((error: string) => {
        this.messageService.showError(`Ошибка при редактирований: ${ error }`);
        throwError(() => new Error(`Ошибка: ${ error }`))
        return of([]);
      }),
      tap((posts: IPost[]) => this.postsSubject.next(posts))
    );
  }

  createPost(currentPost: IPost): Observable<IPost | never[]> {
    return this.postApiService.createPost(currentPost).pipe(
      tap((post: IPost) => {
        const posts: IPost[] = this.postsSubject.value;
        return this.postsSubject.next([post, ...posts]);
      }),
      catchError((error: string) => {
        this.messageService.showError(`Ошибка при добавлений: ${ error }`);
        throwError(() => new Error(`Ошибка: ${ error }`))
        return of([]);
      })
    );
  }

  redirectToPostPage(post: IPost): void {
    this.router.navigate([`/posts/${ post.id.toString() }`]);
  }

}