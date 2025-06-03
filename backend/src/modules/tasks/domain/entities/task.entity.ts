import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { messages } from 'src/shared/domain/constants/messages';

interface ITask {
  id?: string;
  title: string;
  description: string;
  board: { id: string };
  finished?: boolean;
  limitDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _board: { id: string };
  private _finished?: boolean;
  private _limitDate?: Date;
  private readonly _title: string;
  private readonly _description: string;

  constructor(private readonly props: ITask) {
    if (!props.title || !props.description)
      throw new BadRequestException(messages.ALL_FIELDS_REQUIRED);

    const now = new Date();
    this._id = props.id ?? randomUUID();
    this._title = props.title;
    this._description = props.description;
    this._board = props.board;
    this._finished = props.finished ?? false;
    this._limitDate = props.limitDate;
    this._createdAt = props.createdAt ?? now;
    this._updatedAt = props.updatedAt ?? now;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  set updatedAt(date: Date) {
    this._updatedAt = date;
  }

  set id(id: string) {
    this._id = id;
  }

  changeStatus() {
    this._finished = !this._finished;
  }

  get description() {
    return this._description;
  }

  get board() {
    return this._board;
  }

  get limitDate() {
    return this._limitDate;
  }

  set board(board: { id: string }) {
    this._board = board;
  }

  set limitDate(date: Date | undefined) {
    this._limitDate = date;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get finished() {
    return this._finished;
  }

  set createdAt(date: Date) {
    this._createdAt = date;
  }
}
