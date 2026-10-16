import { Component, inject, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PostService } from './service/post.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from './interface/IPost';
import { PostEditDialogComponent } from './components/post-edit-dialog/post-edit-dialog.component';
import { MenuItem } from 'primeng/api';
import { AsyncPipe } from '@angular/common';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../core/ui/loader/service/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../core/ui/message/service/message.service';

@Component({
  selector: 'app-posts',
  imports: [ TableModule, SkeletonModule, DialogModule, ButtonModule, ContextMenuModule, DynamicDialogModule, ToastModule, DialogModule, InputTextModule, AsyncPipe, RouterLink, TranslatePipe],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private dialogService: DialogService = inject(DialogService);
  private translate: TranslateService = inject(TranslateService);
  postService: PostService = inject(PostService);

  private ref!: DynamicDialogRef | null;

  limit: number = 10;
  skip: number = 0;

  isLoading: boolean = true;

  posts$: Observable<IPost[]> = this.postService.posts$;
  totalRecords$: Observable<number> = this.postService.totalRecords$;

  menuItems!: MenuItem[];
  skeletonRows: IPost[] = Array(10).fill(0);

  ngOnInit(): void {
    this.postService.initPosts(this.limit, this.skip)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.messageService.showInfo(this.translate.instant('postsPage.messages.loaded'));
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(this.translate.instant('postsPage.messages.loadError', { error }));
          return throwError(() => error);
        })
      ).subscribe();

    this.menuItems = [
      {
        label: this.translate.instant('postsPage.menu.view'),
        icon: 'pi pi-fw pi-search',
        command: () => this.onViewPost(this.postService.selectedPost!)
      },
      {
        label: this.translate.instant('postsPage.menu.delete'),
        icon: 'pi pi-fw pi-times',
        command: () => this.onDeletePost(this.postService.selectedPost!)
      },
      {
        label: this.translate.instant('postsPage.menu.edit'),
        icon: 'pi pi-fw pi-pencil',
        command: () => this.showPostEditingModal(this.postService.selectedPost!)
      }
    ];
  }

  onPageChange(event: TablePageEvent): void {
    this.isLoading = true;

    this.postService
      .initPosts(event.rows, event.first)
      .pipe(
        tap(() => {
          this.messageService.showInfo(this.translate.instant('postsPage.messages.pageChanged'));
          this.isLoading = false;
          this.limit = event.rows;
          this.skip = event.first;
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(this.translate.instant('postsPage.messages.pageError', { error }));
          return throwError(() => error);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  showPostEditingModal(currentPost: IPost): void {
    this.ref = this.dialogService.open(PostEditDialogComponent, {
      data: currentPost,
      header: this.translate.instant('postsPage.editDialog.header'),
      width: '20vw',
      modal: true,
      closable: true
    });
  }

  onViewPost(currentPost: IPost): void {
    this.messageService.showInfo(this.translate.instant('postsPage.messages.selected'));
    this.postService.redirectToPostPage(currentPost);
  }

  onDeletePost(currentPost: IPost): void {
    this.loaderService.showLoader();

    this.postService.deletePost(currentPost)
      .pipe(
        tap(() => {
          this.loaderService.hideLoader();
          this.messageService.showInfo(this.translate.instant('postsPage.messages.deleted'));
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(this.translate.instant('postsPage.messages.deleteError', { error }));
          return throwError(() => error);
        })
      ).subscribe();
  }

}