import { InvalidChannelError, InvalidRecipientError, InvalidMessageError } from './errors';

export class Channel {
  public static readonly EMAIL = 'email';
  public static readonly WHATSAPP = 'whatsapp';
  public static readonly TELEGRAM = 'telegram';

  private static readonly VALID_CHANNELS = [
    Channel.EMAIL,
    Channel.WHATSAPP,
    Channel.TELEGRAM,
  ];

  constructor(public readonly value: string) {
    if (!Channel.VALID_CHANNELS.includes(value.toLowerCase())) {
      throw new InvalidChannelError(value);
    }
  }

  public equals(other: Channel): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  public toString(): string {
    return this.value;
  }
}

export class Recipient {
  constructor(
    public readonly value: string,
    private channel: Channel
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || !this.value.trim()) {
      throw new InvalidRecipientError('Recipient cannot be empty');
    }

    switch (this.channel.value.toLowerCase()) {
      case Channel.EMAIL:
        this.validateEmail();
        break;
      case Channel.WHATSAPP:
      case Channel.TELEGRAM:
        this.validatePhone();
        break;
    }
  }

  private validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new InvalidRecipientError(`Invalid email: ${this.value}`);
    }
  }

  private validatePhone(): void {
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10,}$/;
    if (!phoneRegex.test(this.value.replace(/\s/g, ''))) {
      throw new InvalidRecipientError(`Invalid phone: ${this.value}`);
    }
  }

  public equals(other: Recipient): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}

export class MessageText {
  readonly maxLength = 4096;

  constructor(public readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || !this.value.trim()) {
      throw new InvalidMessageError('Message content cannot be empty');
    }

    if (this.value.length > this.maxLength) {
      throw new InvalidMessageError(
        `Message exceeds maximum length of ${this.maxLength} characters`
      );
    }
  }

  public equals(other: MessageText): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
