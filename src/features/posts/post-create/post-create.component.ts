import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { PostService } from '../post.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-post-create',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  messageService: MessageService = inject(MessageService);
  postService: PostService = inject(PostService);

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
  })

  onCreatePost(): void {
    if (this.createPostForm.valid) {
      this.postService.createPost(this.createPostForm.value).pipe(
        tap(() => {
          this.router.navigate([`/posts`]);
          this.messageService.showInfo('Новый пост создан');
          this.createPostForm.reset();
        })
      ).subscribe();
    } else {
      this.messageService.showError('Форма не валидна - пост не создался');
    }
  }

}