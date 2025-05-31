import { messages } from '../constants/messages';

export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new Error(messages.INVALID_EMAIL);
    }
    this.value = email.toLowerCase().trim();
  }

  private isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  getEmail(): string {
    return this.value;
  }

  isEqualTo(other: Email): boolean {
    return this.value === other.getEmail();
  }
}
