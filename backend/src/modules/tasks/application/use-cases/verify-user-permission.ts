import { ForbiddenException, Injectable } from '@nestjs/common';
import { FindByUserUseCase } from 'src/modules/boards/application/use-cases/find-by-user.usecase';
import { messages } from 'src/shared/domain/constants/messages';

@Injectable()
export class VerifyUserPermissionUseCase {
  constructor(private findBoardByUser: FindByUserUseCase) {}

  async execute(userId: string, boardId: string) {
    const boards = await this.findBoardByUser.execute(userId);
    const hasPermission = boards.map((board) => board.id).includes(boardId);
    if (!hasPermission) throw new ForbiddenException(messages.NO_PERMISSION);
  }
}
