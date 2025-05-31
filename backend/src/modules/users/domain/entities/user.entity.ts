import { randomUUID } from 'crypto';
import { Email } from '../../../../shared/domain/value-objects/email.vo';
import { messages } from 'src/shared/domain/constants/messages';
import { Password } from 'src/shared/domain/value-objects/password.vo';

export class User {
  private constructor(
    private id: string,
    private name: string,
    private email: Email,
    private password: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(input: {
    name: string;
    email: string;
    password: string;
  }): User {
    const now = new Date();
    const id = randomUUID();

    if (!input.name) {
      throw new Error(messages.INVALID_NAME);
    }

    const hashPass = new Password(input.password);

    return new User(
      id,
      input.name,
      new Email(input.email),
      hashPass.getValue(),
      now,
      now,
    );
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email.getEmail(),
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static clone(
    id: string,
    data: {
      name: string;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ) {
    const { name, email, password, createdAt, updatedAt } = data;
    return new User(id, name, new Email(email), password, createdAt, updatedAt);
  }
}
