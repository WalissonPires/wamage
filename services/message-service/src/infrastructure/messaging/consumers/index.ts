import { MessageBrokerService, MessageBrokerQueues } from '../service';
import { handleSendMessageCommand } from './send-message-command.handler';

export class MessageBrokerConsumerHandler {

  constructor(private messageBrokerService: MessageBrokerService) { }

  public init(): void {
    const consumer = this.messageBrokerService.getConsumer();

    consumer.consume({
      queue: MessageBrokerQueues.sendMessage,
      handler: handleSendMessageCommand,
    });

    console.log('[MessageBrokerConsumerHandler] Initialized');
  }
}
