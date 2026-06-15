import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { IPost } from './IPost';
import { IPostResponse } from './IPostResponse';
import { TablePageEvent } from 'primeng/table';
import { BehaviorSubject, map, tap, Observable, takeUntil } from 'rxjs';
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
  
  responsePost!: IPostResponse;
  selectedPost: IPost | null = null;
  
  limit: number = 10;
  skip: number = 0;
  
  isLoading: boolean = true;

  displayPostData(): void {
    this.isLoading = true;

    this.postApiService.getPosts(this.limit, this.skip)
      .pipe(
        tap((postResponse: IPostResponse) => {
          this.isLoading = false;
          this.responsePost = postResponse;
          this.postsSubject.next(this.responsePost.posts);
          this.totalRecordsSubject.next(this.responsePost.total);
          takeUntil(this.postsSubject);
        })
      ).subscribe();
  }

  pageChange(event: TablePageEvent): void {
    this.limit = event.rows;
    this.skip = event.first;
    this.displayPostData();
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
      );
  }

  editPost(postId: number, postForm: IPost): Observable<IPost[]> {
    return this.postApiService.updatePosts({ ...postForm, id: postId }).pipe(
      map(() => this.postsSubject.value.map((post: IPost) => {
        return postForm.id === post.id 
          ? { ...post, 
              title: postForm.title, 
              tags: postForm.tags, 
              views: postForm.views 
            }
          : post;
      })),
      tap((posts: IPost[]) => this.postsSubject.next(posts))
    );
  }

  createPost(currentPost: IPost) {
    return this.postApiService.setPost(currentPost).pipe(
      map(() => this.postsSubject.pipe(
        tap((posts: IPost[]) => {
          this.postsSubject.next([currentPost, ...posts]);
        })
      )),
    );
  }

  postPageRedirect(post: IPost): void {
    this.router.navigate([`/posts/${ post.id.toString() }`]);
  }

}