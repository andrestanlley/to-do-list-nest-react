export class CreateBoardDto {
  name: string;
  user_id: string;
}

export class CreateBoardDtoOutput {
  id: string;
  name: string;
  user_id: string;
  createdAt: Date;
}
