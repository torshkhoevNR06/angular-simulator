import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PostApiService } from './post-api.service';
import { IPost } from './IPost';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const postId: string | null = route.paramMap.get('id');
  const postApiService: PostApiService = inject(PostApiService);
  
  return postApiService.getPostById(postId);
};