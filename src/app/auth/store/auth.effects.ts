import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';

import { environment } from '../../../environments/environment';
import { UserModel } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

  const user = new UserModel(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticationSuccess({
    email,
    userId,
    token,
    expirationDate,
    redirect: true
  });
};
const handleError = errorResp => {
  let errorMessage = 'Неизвестная ошибка';

  if (!errorResp.error || !errorResp.error.error) {
    return of(new AuthActions.AuthenticationFail(errorMessage));
  }
  switch (errorResp.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'E-mail уже существует.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'E-mail не найден.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Неверный пароль.';
      break;
  }
  return of(new AuthActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SigupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(respData => {
            this.authService.setLogoutTimer(+respData.expiresIn * 1000);
          }),
          map(respData => {
            return handleAuthentication(
              respData.email,
              respData.localId,
              respData.idToken,
              +respData.expiresIn
            );
          }),
          catchError(errorResp => {
            return handleError(errorResp);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(respData => {
            this.authService.setLogoutTimer(+respData.expiresIn * 1000);
            console.log(+respData.expiresIn * 1000);
          }),
          map(respData => {
            return handleAuthentication(
              respData.email,
              respData.localId,
              respData.idToken,
              +respData.expiresIn
            );
          }),
          catchError(errorResp => {
            return handleError(errorResp);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS),
    tap((authAction: AuthActions.AuthenticationSuccess) => {
      if (authAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        userEmail: string;
        userId: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new UserModel(
        userData.userEmail,
        userData.userId,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticationSuccess({
          email: loadedUser.userEmail,
          userId: loadedUser.userId,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
      }
      return { type: 'DUMMY' };
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
