import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { PostApiService } from '../api/post-api.service';
import { IPost } from '../interface/IPost';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot) => {
  const postId: string | null = route.paramMap.get('id');
  const postApiService: PostApiService = inject(PostApiService);
  
  return postApiService.getPostById(postId);
};