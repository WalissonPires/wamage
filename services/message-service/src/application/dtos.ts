
export class SendMessageDTO {
  constructor(
    public readonly userId: string,
    public readonly accountId: string,
    public readonly channel: string,
    public readonly recipient: string,
    public readonly text: string
  ) {}
}

export class MessageResponseDTO {
  constructor(
    public readonly messageId: string,
    public readonly status: string,
    public readonly createdAt: Date
  ) {}
}

export class ReceivedMessageDTO {
  constructor(
    public readonly messageId: string,
    public readonly userId: string,
    public readonly accountId: string,
    public readonly channel: string,
    public readonly recipient: string,
    public readonly text: string
  ) {}
}
