import { UserModel } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: UserModel;
  authError: string;
  loading: boolean;
}

const initialSate: State = {
  user: null,
  authError: null,
  loading: null
};

export function authReducer(
  state: State = initialSate,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATION_SUCCESS:
      const user = new UserModel(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: null
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTICATION_FAIL:
      return {
        ...state,
        authError: action.payload,
        loading: null
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
