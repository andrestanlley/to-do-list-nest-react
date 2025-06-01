import { Injectable } from '@nestjs/common';
import { BoardSchema } from 'src/modules/boards/infrastructure/database/schemas/board.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Injectable()
@Entity()
export class TaskSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'date', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => BoardSchema, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: BoardSchema;

  @RelationId((task: TaskSchema) => task.board)
  board_id: string;
}
