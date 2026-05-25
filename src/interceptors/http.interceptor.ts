import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const firstTime: number = Date.now();

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.Response) {
        const secondTime: number = Date.now();
        console.group('HTTP:');
        console.log(`method: ${ req.method }`);
        console.log(`url: ${ req.url }`);
        console.log(`ok: ${ event.ok }`);
        console.log(`time: ${ secondTime - firstTime }sec`);
        console.groupEnd();
      }
    })
  );
}