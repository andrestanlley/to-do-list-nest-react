import { IBoardOutput } from '../contracts/board.contract';

export function boardDomainToApplication(board: IBoardOutput): IBoardOutput {
  return {
    id: board.id,
    name: board.name,
    createdAt: board.createdAt,
    user: board.user,
  };
}
