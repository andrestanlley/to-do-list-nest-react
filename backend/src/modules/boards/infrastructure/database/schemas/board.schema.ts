import { Injectable } from '@nestjs/common';
import { UserSchema } from '../../../../users/infrastructure/database/schemas/user.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { TaskSchema } from '../../../../tasks/infrastructure/database/schemas/task.schema';

@Injectable()
@Entity('boards')
export class BoardSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => UserSchema, (user) => user.boards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserSchema;

  @RelationId((board: BoardSchema) => board.user)
  user_id: string;

  @OneToMany(() => TaskSchema, (task) => task.board)
  tasks: TaskSchema[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
