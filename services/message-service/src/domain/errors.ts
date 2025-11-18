
export class DomainError extends Error {
  constructor(
    message: string,
    public code: string = 'DOMAIN_ERROR'
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export class InvalidChannelError extends DomainError {
  constructor(channel: string) {
    super(`Invalid message channel: ${channel}`, 'INVALID_CHANNEL');
  }
}

export class InvalidRecipientError extends DomainError {
  constructor(recipient: string) {
    super(`Invalid recipient: ${recipient}`, 'INVALID_RECIPIENT');
  }
}

export class InvalidMessageError extends DomainError {
  constructor(reason: string) {
    super(`Invalid message: ${reason}`, 'INVALID_MESSAGE');
  }
}
