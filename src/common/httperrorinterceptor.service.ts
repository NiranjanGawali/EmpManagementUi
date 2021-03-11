import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          console.log('NIRA');
          var errMsg = null;
          console.log(error.error.message);
          if(error.error.message) {
            errMsg = error.error.message;
          } else if(error.error.err) {
            errMsg = error.error.err;
          } else {
            errMsg = errorMsg;
          }

          if(errMsg == undefined) {
            errMsg = 'Something went wrong!!';
          }
          
          alert(errMsg);
          return throwError(errorMsg);
        })
      )
  }
}