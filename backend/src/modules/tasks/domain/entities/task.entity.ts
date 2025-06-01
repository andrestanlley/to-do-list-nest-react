import { randomUUID } from 'crypto';
import { title } from 'process';
import { messages } from 'src/shared/domain/constants/messages';

export class Task {
  private constructor(
    private id: string,
    private title: string,
    private description: string,
    private board_id: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(input: {
    title: string;
    description: string;
    board_id: string;
  }) {
    if (!input.title || !input.description)
      throw new Error(messages.ALL_FIELDS_REQUIRED);
    const id = randomUUID();
    const now = new Date();
    return new Task(
      id,
      input.title,
      input.description,
      input.board_id,
      now,
      now,
    );
  }

  toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      board_id: this.board_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
