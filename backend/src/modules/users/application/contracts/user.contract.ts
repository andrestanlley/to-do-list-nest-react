export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export interface IUserAuth {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserOutput {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
