import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PostApiService } from '../api/post-api.service';
import { IPostResponse } from '../interface/IPostResponse';
import { IPost } from '../interface/IPost';

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

  initPosts(limit?: number, skip?: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit!, skip!)
      .pipe(
        tap((postResponse: IPostResponse) => {
          this.postsSubject.next(postResponse.posts);
          this.totalRecordsSubject.next(postResponse.total);
        })
      );
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
        })
      );
  }

  editPost(postId: number, postForm: IPost): Observable<IPost[]> {
    return this.postApiService.updatePost({ ...postForm, id: postId }).pipe(
      map(() => this.postsSubject.value.map((post: IPost) => {
        return postId === post.id
          ? { ...post, title: postForm.title, tags: postForm.tags, views: postForm.views }
          : post; 
      })),
      tap((posts: IPost[]) => this.postsSubject.next(posts))
    );
  }

  createPost(currentPost: IPost): Observable<IPost | never[]> {
    return this.postApiService.createPost(currentPost).pipe(
      tap((post: IPost) => {
        const posts: IPost[] = this.postsSubject.value;
        return this.postsSubject.next([post, ...posts]);
      })
    );
  }

  redirectToPostPage(post: IPost): void {
    this.router.navigate([`/posts/${ post.id.toString() }`]);
  }

}