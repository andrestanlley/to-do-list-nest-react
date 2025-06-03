import { randomUUID } from 'crypto';
import { Email } from '../../../../shared/domain/value-objects/email.vo';
import { messages } from 'src/shared/domain/constants/messages';
import { Password } from 'src/shared/domain/value-objects/password.vo';
import { Board } from 'src/modules/boards/domain/entities/board.entity';
import { BadRequestException } from '@nestjs/common';

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  boards?: Board[];
}

export class User {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private readonly _name: string;
  private readonly _email: Email;
  private readonly _password: string;
  private readonly _boards?: Board[];

  constructor(private readonly props: IUser) {
    const now = new Date();

    if (!props.name) {
      throw new BadRequestException(messages.INVALID_NAME);
    }

    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._email = new Email(props.email);
    this._password = new Password(props.password).getValue();
    this._createdAt = props.createdAt ?? now;
    this._updatedAt = props.updatedAt ?? now;
    this._boards = props.boards ?? [];
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  set createdAt(date: Date) {
    this._createdAt = date;
  }

  set updatedAt(date: Date) {
    this._updatedAt = date;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email.getEmail();
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get boards(): Board[] | undefined {
    return this._boards;
  }
}
