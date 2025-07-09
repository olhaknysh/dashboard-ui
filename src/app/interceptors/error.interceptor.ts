import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ERROR_HTTP_STATUS_MESSAGES } from '../core/constants';
import { NotificationService } from '../services';

export const ErrorInterceptor: HttpInterceptorFn = (
  request,
  next,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Observable<any> => {
  const notificationService = inject(NotificationService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = getErrorMessage(error);

      notificationService.error(errorMessage);

      return throwError(() => error);
    }),
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (error.error instanceof ErrorEvent) {
    return `Client Error: ${error.error.message}`;
  }

  return (
    ERROR_HTTP_STATUS_MESSAGES[error.status] ||
    `Server Error: ${error.status} - ${error.message}`
  );
}
