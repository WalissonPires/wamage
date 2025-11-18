import { randomBytes } from 'crypto';
import { Channel, Recipient, MessageText } from './value-objects';

function generateId(): string {
  return `${Date.now()}_${randomBytes(8).toString('hex')}`;
}

export interface MessageProps {
  messageId: string;
  userId: string;
  accountId: string;
  channel: string;
  recipient: string;
  text: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
  createdAt: Date;
  sentAt?: Date;
  failureReason?: string;
}

export class Message {
  private props: MessageProps;

  constructor(props: MessageProps) {
    this.props = props;
  }

  public static create(props: Omit<MessageProps, 'messageId' | 'status' | 'createdAt'>): Message {
    // Validate value objects (will throw if invalid)
    new Channel(props.channel);
    new Recipient(props.recipient, new Channel(props.channel));
    new MessageText(props.text);

    return new Message({
      ...props,
      messageId: generateId(),
      status: 'pending',
      createdAt: new Date(),
    });
  }

  public static restore(props: MessageProps): Message {
    return new Message(props);
  }

  public markAsSent(): void {
    if (this.props.status !== 'pending') {
      throw new Error(`Cannot mark message as sent. Current status: ${this.props.status}`);
    }
    this.props.status = 'sent';
    this.props.sentAt = new Date();
  }

  public markAsFailed(reason: string): void {
    if (this.props.status !== 'pending') {
      throw new Error(`Cannot mark message as failed. Current status: ${this.props.status}`);
    }
    this.props.status = 'failed';
    this.props.failureReason = reason;
  }

  public getProps(): MessageProps {
    return { ...this.props };
  }

  get messageId(): string {
    return this.props.messageId;
  }

  get channel(): Channel {
    return new Channel(this.props.channel);
  }

  get recipient(): Recipient {
    return new Recipient(this.props.recipient, this.channel);
  }

  get text(): MessageText {
    return new MessageText(this.props.text);
  }

  get status(): string {
    return this.props.status;
  }

  get isPending(): boolean {
    return this.props.status === 'pending';
  }

  get isSent(): boolean {
    return this.props.status === 'sent';
  }

  get isFailed(): boolean {
    return this.props.status === 'failed';
  }
}
