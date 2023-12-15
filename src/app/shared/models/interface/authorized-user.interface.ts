export interface IAuthorizedUser {
  AuthenticationResult: {
    AccessToken: string,
    ExpiresIn: number,
    IdToken: string,
    RefreshToken: string,
    TokenType: string
  },
  ChallengeParameters: any
}
