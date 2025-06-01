import { randomUUID } from 'crypto';
import { messages } from 'src/shared/domain/constants/messages';

export class Board {
  private constructor(
    private id: string,
    private name: string,
    private user_id: string,
    private createdAt: Date,
  ) {}

  static create(input: { name: string; user_id: string }) {
    if (!input.name) throw new Error(messages.INVALID_BOARD_NAME);
    const id = randomUUID();
    const now = new Date();

    return new Board(id, input.name, input.user_id, now);
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      user_id: this.user_id,
      createdAt: this.createdAt,
    };
  }

  static clone(
    id: string,
    input: { name: string; user_id: string; createdAt: Date },
  ) {
    return new Board(id, input.name, input.user_id, input.createdAt);
  }
}
