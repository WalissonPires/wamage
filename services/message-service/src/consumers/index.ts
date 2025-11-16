import { MessageHandlerContext } from "@wamage/messaging-contracts/broker";
import { MessageBrokerQueues, MessageBrokerService } from "../message-broker";
import { SendMessageCommand } from "../../../message-service-contracts-ts/dist/commands";

export function initConsumers() {

  MessageBrokerService.instance.consumer.consume({
    queue: MessageBrokerQueues.sendMessageQueue,
    handler: handleSendMessageCommand
  });
}

async function handleSendMessageCommand({ message }: MessageHandlerContext) {
  const command = message as SendMessageCommand;
  console.log(`[HandleSendMessage] Send message to channel ${command.channel}:`, command);
}