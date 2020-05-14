export class UserModel {
  constructor(
    public userEmail: string,
    public userId: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return;
    }
    return this._token;
  }
}
