import { Component, inject } from '@angular/core';
import { PostService } from '../post.service';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../IPost';
import { MessageService } from '../../../services/message.service';
import { LoaderService } from '../../../services/loader.service';
import { catchError, tap, throwError } from 'rxjs';
import type { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule, ButtonModule, ToastModule, DialogModule, DynamicDialogModule, InputTextModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private postService: PostService = inject(PostService);
  private loaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
    
  private dynamicDialogConfig: DynamicDialogConfig<IPost> = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef | null = inject(DynamicDialogRef);

  private fb: FormBuilder = inject(FormBuilder);
  postId: number = this.dynamicDialogConfig.data!.id;

  editPostForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    tags: [[], Validators.required],
    views: ['', Validators.required]
  });

  onEditPost(): void {
    const tags: string[] = this.editPostForm.get('tags')!.value
      .split(',').map((str: string) => str.trim())
      .filter((str: string) => str  !== '');

    if (this.editPostForm.valid) {
      this.loaderService.showLoader();
      this.postService.editPost(this.postId, { ...this.editPostForm.value, tags: tags }).pipe(
        tap(() => {
          this.loaderService.hideLoader();
          this.closeModal();
          this.messageService.showInfo('Пост изменён');
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(`Ошибка при изменений: ${ error }`);
          return throwError(() => error);
        })
      ).subscribe();
    } else {
      this.messageService.showError('Форма не валидна');
    }
  }

  closeModal(): void {
    this.ref?.close();
  }

}