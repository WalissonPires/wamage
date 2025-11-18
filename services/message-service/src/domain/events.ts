

export class MessageSentEvent {
  constructor(
    public messageId: string,
    public channel: string,
    public recipient: string,
    public occurredAt: Date = new Date()
  ) {}

  toJSON() {
    return {
      eventType: 'MessageSentEvent',
      messageId: this.messageId,
      channel: this.channel,
      recipient: this.recipient,
      occurredAt: this.occurredAt.toISOString(),
    };
  }
}

export class MessageFailedEvent {
  constructor(
    public messageId: string,
    public channel: string,
    public recipient: string,
    public reason: string,
    public occurredAt: Date = new Date()
  ) {}

  toJSON() {
    return {
      eventType: 'MessageFailedEvent',
      messageId: this.messageId,
      channel: this.channel,
      recipient: this.recipient,
      reason: this.reason,
      occurredAt: this.occurredAt.toISOString(),
    };
  }
}
