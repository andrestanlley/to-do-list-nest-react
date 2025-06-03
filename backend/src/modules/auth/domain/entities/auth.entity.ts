export class AuthenticatedUser {
  constructor(
    private readonly accessToken: string,
    private readonly userId: string,
    private readonly email: string,
    private readonly name: string,
  ) {}

  getAccessToken(): string {
    return this.accessToken;
  }

  getUserId(): string {
    return this.userId;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }
}
