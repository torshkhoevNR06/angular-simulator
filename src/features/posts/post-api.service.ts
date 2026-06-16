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
  apiUrl: string = 'https://dummyjson.com/posts';

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.apiUrl }/add`, post);
  }

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`${ this.apiUrl }?limit=${ limit }&skip=${ skip }`);
  }

  getPostById(postId: string | null): Observable<IPost> {
    return this.http.get<IPost>(`${ this.apiUrl }/${ postId }`);
  }

  updatePosts(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${ this.apiUrl }/${ post.id }`, post);
  }
   
  deletePost(post: IPost): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.apiUrl }/${ post.id }`);
  }

}