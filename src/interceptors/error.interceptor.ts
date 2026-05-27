import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpStatusCode, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const serviceUnavailable: HttpStatusCode = HttpStatusCode.ServiceUnavailable;
      const internalServerError: HttpStatusCode = HttpStatusCode.InternalServerError;
      
      if (error.status === internalServerError) {
        messageService.showError(`Internal Server Error: ${ internalServerError }`);
      } else if (error.status === serviceUnavailable) {
        messageService.showError(`Service Unavailable: ${ serviceUnavailable }`);
      } else {
        messageService.showError(`Error: ${ error.status }`);
      }
      
      return [];
    })
  );
}