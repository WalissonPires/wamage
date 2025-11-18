import { IMessageProducer } from '@wamage/messaging-contracts/broker';
import { SendMessageDTO, MessageResponseDTO } from './dtos';
import { MessageMapper } from './mappers';
import { MessageBrokerQueues } from '../infrastructure';

export class SendMessageUseCase {

  constructor(private messageProducer: IMessageProducer) {}

  public async execute(dto: SendMessageDTO): Promise<MessageResponseDTO> {

    const message = MessageMapper.fromSendDTO(dto);

    const payload = MessageMapper.toPayload(message);

    await this.messageProducer.publish({
      queue: MessageBrokerQueues.sendMessage,
      message: payload,
    });

    return MessageMapper.toResponseDTO(message);
  }
}

export class ProcessReceivedMessageUseCase {
  public async execute(command: any): Promise<void> {
    // Log for now - in production, would validate, store, and handle
    console.log(`[ProcessReceivedMessage] Processing message:`, {
      channel: command.channel,
      to: command.to,
      trackingId: command.trackingId,
    });
  }
}
