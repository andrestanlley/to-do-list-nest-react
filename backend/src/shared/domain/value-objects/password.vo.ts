import { messages } from '../constants/messages';
import * as bcrypt from 'bcryptjs';

export class Password {
  private readonly value: string;

  constructor(password: string) {
    if (!this.isValid(password)) throw new Error(messages.INVALID_PASS);
    this.value = password;
  }

  private isValid(password: string) {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    return regex.test(password);
  }

  getValue() {
    const SALT = Number(process.env.SALT_PWD) || 6;
    return bcrypt.hashSync(this.value, SALT);
  }
}
