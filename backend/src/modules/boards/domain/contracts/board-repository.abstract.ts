import {
  IBoardInput,
  IBoardOutput,
} from '../../application/contracts/board.contract';

export abstract class ABoardRepository {
  abstract create(user: IBoardInput): Promise<IBoardOutput>;
  abstract findByUser(userId: string): Promise<IBoardOutput[]>;
}
