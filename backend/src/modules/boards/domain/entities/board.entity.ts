import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { messages } from 'src/shared/domain/constants/messages';

interface IBoard {
  id?: string;
  name: string;
  user: { id: string };
  createdAt?: Date;
}

export class Board {
  private _id: string;
  private _createdAt: Date;
  private _user: { id: string };
  private readonly _name: string;

  constructor(private readonly props: IBoard) {
    if (!props.name) throw new BadRequestException(messages.INVALID_BOARD_NAME);
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._user = props.user;
    this._createdAt = props.createdAt ?? new Date();
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  set createdAt(date: Date) {
    this._createdAt = date;
  }

  set user(user: { id: string }) {
    this._user = user;
  }

  get name() {
    return this._name;
  }

  get user() {
    return this._user;
  }

  get createdAt() {
    return this._createdAt;
  }
}
