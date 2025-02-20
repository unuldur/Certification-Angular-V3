import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { CacheService } from "app/services/cache.service";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

export function cacheInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (req.method != "GET") {
    return next(req);
  }

  const cacheService = inject(CacheService);
  const data = cacheService.get(req.urlWithParams);
  if (data) {
    return of(new HttpResponse(data));
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.set(req.urlWithParams, event);
      }
    })
  );
}
