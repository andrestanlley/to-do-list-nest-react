export interface IBoardInput {
  name: string;
  user_id: string;
}

export interface IBoardOutput {
  id: string;
  name: string;
  user_id: string;
  createdAt: Date;
}
