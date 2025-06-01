export class BoardDtoInput {
  name: string;
  user_id: string;
}

export class BoardDtoOutput {
  id: string;
  name: string;
  user_id: string;
  createdAt: Date;
}
