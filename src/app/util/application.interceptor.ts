import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, finalize } from 'rxjs';
import { ApplicationsActions } from '../store/applications/applications.actions';

@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {
  constructor(private store: Store<{ isLoading: boolean }>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(ApplicationsActions.enableLoading());

    return next.handle(req).pipe(
      finalize(() => {
        this.store.dispatch(ApplicationsActions.disableLoading());
      })
    );
  }
}
