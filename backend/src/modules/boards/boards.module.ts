import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import CreateBoardUseCase from './application/use-cases/create-board.usecase';
import { ABoardRepository } from './domain/contracts/board-repository.abstract';
import { BoardRepositoryImpl } from './infrastructure/database/repositories/board.repository.impl';
import { BoardSchema } from './infrastructure/database/schemas/board.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindByUserUseCase } from './application/use-cases/find-by-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([BoardSchema])],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    CreateBoardUseCase,
    FindByUserUseCase,
    { provide: ABoardRepository, useClass: BoardRepositoryImpl },
  ],
})
export class BoardsModule {}
