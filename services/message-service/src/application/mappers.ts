import { Message, MessageProps } from '../domain/entities';
import { SendMessageDTO, MessageResponseDTO, ReceivedMessageDTO } from './dtos';

export class MessageMapper {
  public static toResponseDTO(message: Message): MessageResponseDTO {
    const props = message.getProps();
    return new MessageResponseDTO(
      props.messageId,
      props.status,
      props.createdAt
    );
  }

  public static toPayload(message: Message): any {
    const props = message.getProps();
    return {
      meta: {
        messageId: props.messageId,
        createdAt: props.createdAt.toISOString(),
      },
      user: {
        userId: props.userId,
        accountId: props.accountId,
      },
      requestId: props.messageId,
      channel: props.channel,
      to: props.recipient,
      message: props.text,
    };
  }

  public static toDomain(data: any): Message {
    return Message.restore(data as MessageProps);
  }

  public static fromSendDTO(dto: SendMessageDTO): Message {
    return Message.create({
      userId: dto.userId,
      accountId: dto.accountId,
      channel: dto.channel,
      recipient: dto.recipient,
      text: dto.text
    });
  }
}
