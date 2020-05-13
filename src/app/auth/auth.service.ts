import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_KEI = 'AIzaSyC8naaYnu93sNkp8mjyU8Vpcsf9Zjm1mW8';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        API_KEI,
      {
        email,
        password,
        refreshToken: true
      }
    );
  }
}
