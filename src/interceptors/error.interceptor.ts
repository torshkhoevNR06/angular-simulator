import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpResponseBase) => {
      messageService.showError(`Error ${ error.status }: Попытка запроса данных`);
      return [];
    })
  );
}