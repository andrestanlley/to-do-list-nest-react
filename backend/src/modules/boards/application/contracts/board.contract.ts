import { User } from "src/modules/users/domain/entities/user.entity";

export interface IBoardInput {
  name: string;
  user: { id: string };
}

export interface IBoardOutput {
  id: string;
  name: string;
  user: { id: string };
  createdAt: Date;
}
