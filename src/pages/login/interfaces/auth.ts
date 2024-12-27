export interface ILogin {
  email: string; 
  password: string;
}

export interface IUserLogin {
  token: string;
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
  }
}

export interface IPasswordChange {
  code: string; 
  password: string;
  passwordRepeat: string;
}

export type IPasswordRecovery = Omit<ILogin, 'password'>