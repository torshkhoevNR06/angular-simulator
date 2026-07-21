import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
  HttpEventType,
  HttpEvent,
  HttpResponseBase,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { APP_CONFIG } from '../app-config.token';
import { IAppConfig } from '../interface/IAppConfig';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const startTime: number = performance.now();
  const appConfig: IAppConfig = inject(APP_CONFIG);

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event.type === HttpEventType.Response && appConfig.enableLogs) {
          const requestDuration: number = performance.now() - startTime;
          console.group('HTTP:');
          console.log(`method: ${req.method}`);
          console.log(`url: ${req.url}`);
          console.log(`ok: ${event.ok}`);
          console.log(`time: ${requestDuration}ms`);
          console.groupEnd();
        }
      },
      error: (error: HttpResponseBase) => {
        console.error(`Error ${error.status}: Попытка запросить данные`);
      },
    }),
  );
};
