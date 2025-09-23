interface IEnvironment {
  production: boolean;
  captchaSiteKey: string;
  apiUrl: string;
}

export const environment: IEnvironment;
