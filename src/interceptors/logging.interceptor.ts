import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEventType, HttpEvent, HttpResponseBase } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = performance.now();

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event.type === HttpEventType.Response) {
          const requestDuration: number = performance.now() - startTime;
          console.group('HTTP:');
          console.log(`method: ${ req.method }`);
          console.log(`url: ${ req.url }`);
          console.log(`ok: ${ event.ok }`);
          console.log(`time: ${ requestDuration }ms`);
          console.groupEnd();
        }
      },
      error: (error: HttpResponseBase) => {
        console.error(`Error ${ error.status }: Попытка запросить данные`);
      }
    })
  );
}