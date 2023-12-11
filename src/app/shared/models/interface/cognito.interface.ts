export interface ICognitoLoginResponse {
  AuthenticationResult: {
    AccessToken: string,
    ExpiresIn: number,
    IdToken: string,
    RefreshToken: string,
    TokenType: string
  },
  ChallengeParameters: any
}

export interface ICognitoLoginPayload {
  AuthParameters: {
    USERNAME: string;
    PASSWORD: string;
  };
  AuthFlow: string;
  ClientId: string;
}
