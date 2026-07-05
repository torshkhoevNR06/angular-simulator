import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from '../../../../service/message.service';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-post-create',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  private messageService: MessageService = inject(MessageService);
  private postService: PostService = inject(PostService);

  createPostForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: [[], Validators.required],
    reactions: this.fb.group({
      likes: [null, Validators.required],
      dislikes: [null, Validators.required]
    }),
    views: [null, Validators.required],
    userId: [null, Validators.required]
  });

  onCreatePost(): void {
    const tags: string[] = this.createPostForm.get('tags')!.value
      .split(',').map((str: string) => str.trim())
      .filter((str: string) => str !== '');

    if (this.createPostForm.valid) {
      this.postService.createPost({ ...this.createPostForm.value, tags: tags }).pipe(
        tap(() => {
          this.router.navigate([`/posts`]);
          this.messageService.showInfo('Новый пост создан');
          this.createPostForm.reset();
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(`Ошибка при созданий: ${ error }`);
          return throwError(() => error);
        })
      ).subscribe();
    } else {
      this.messageService.showError('Форма не валидна - пост не создался');
    }
  }

}