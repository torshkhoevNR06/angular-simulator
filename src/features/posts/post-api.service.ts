import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPost } from './IPost';
import { IPostResponse } from './IPostResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  
  http: HttpClient = inject(HttpClient);

  setPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>('https://dummyjson.com/posts/add', post);
  }

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`https://dummyjson.com/posts?limit=${ limit }&skip=${ skip }`);
  }

  getPostById(postId: string | null): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${ postId }`);
  }

  updatePosts(post: IPost) {
    return this.http.patch<IPost>(`https://dummyjson.com/posts/${ post.id }`, post);
  }
   
  deletePost(post: IPost): Observable<IPost> {
    return this.http.delete<IPost>(`https://dummyjson.com/posts/${ post.id }`);
  }

}