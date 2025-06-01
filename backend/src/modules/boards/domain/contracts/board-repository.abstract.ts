import {
  CreateBoardDto,
  CreateBoardDtoOutput,
} from '../../dto/create-board.dto';

export abstract class ABoardRepository {
  abstract create(user: CreateBoardDto): Promise<CreateBoardDtoOutput>;
  abstract findByUser(userId: string): Promise<CreateBoardDtoOutput[]>;
}
