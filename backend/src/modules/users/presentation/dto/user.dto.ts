export class UserDtoInput {
  name: string;
  email: string;
  password: string;
}

export class UserDtoOutput {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
