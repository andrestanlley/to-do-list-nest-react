import {
  BoardDtoInput,
  BoardDtoOutput,
} from '../../presentation/dto/board.dto';

export abstract class ABoardRepository {
  abstract create(user: BoardDtoInput): Promise<BoardDtoOutput>;
  abstract findByUser(userId: string): Promise<BoardDtoOutput[]>;
}
