import { Component, inject, OnInit } from '@angular/core';
import { TableModule, type TablePageEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PostService } from './post.service';
import { MessageService } from '../../services/message.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from './IPost';
import { PostEditDialogComponent } from './post-edit-dialog/post-edit-dialog.component';
import { MenuItem } from 'primeng/api';
import { AsyncPipe } from '@angular/common';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import type { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, DialogModule, ButtonModule, ContextMenuModule, DynamicDialogModule, ToastModule, DialogModule, InputTextModule, AsyncPipe, RouterLink],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private dialogService: DialogService = inject(DialogService);
  postService: PostService = inject(PostService);

  private ref!: DynamicDialogRef | null;

  isLoading: boolean = true;
  
  posts$: Observable<IPost[]> = this.postService.posts$;
  totalRecords$: Observable<number> = this.postService.totalRecords$;

  menuItems!: MenuItem[];
  skeletonRows: IPost[] = Array(10).fill(0);

  ngOnInit(): void {
    this.postService.initPosts(this.postService.limit, this.postService.skip).pipe(
      tap(() => {
        this.isLoading = false;
        this.messageService.showInfo('Посты загружены');
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(`Ошибка при загрузке: ${ error }`);
        return throwError(() => error);
      })
    ).subscribe();
    
    this.menuItems = [
      { 
        label: 'View', 
        icon: 'pi pi-fw pi-search', 
        command: () => this.onViewPost(this.postService.selectedPost!) 
      },
      { 
        label: 'Delete', 
        icon: 'pi pi-fw pi-times', 
        command: () => this.onDeletePost(this.postService.selectedPost!) 
      },
      { 
        label: 'Editing', 
        icon: 'pi pi-fw pi-pencil', 
        command: () => this.showPostEditingModal(this.postService.selectedPost!) 
      }
    ];
  }

  onPageChange(event: TablePageEvent): void {
    this.isLoading = true;

    this.postService.initPosts(event.rows, event.first).pipe(
      tap(() => {
        this.messageService.showInfo('Страница сменена');
        this.isLoading = false;
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(`Ошибка при смене страницы: ${ error }`);
        return throwError(() => error);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  showPostEditingModal(currentPost: IPost): void {
    this.ref = this.dialogService.open(PostEditDialogComponent, {
      data: currentPost,
      header: 'Post List',
      width: '20vw',
      modal: true,
      closable: true
    })
  }

  onViewPost(currentPost: IPost): void {
    this.messageService.showInfo('Пост выбран');
    this.postService.redirectToPostPage(currentPost);
  }
  
  onDeletePost(currentPost: IPost): void {
    this.loaderService.showLoader();
    
    this.postService.deletePost(currentPost).pipe(
      tap(() => {
        this.loaderService.hideLoader();
        this.messageService.showInfo("Пост удалён");
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(`Ошибка при удалений: ${ error }`);
        return throwError(() => error);
      })
    ).subscribe();
  }
  
}