import { MessageHandlerContext } from "@wamage/messaging-contracts/broker";
import { SendMessageCommand } from "@wamage/message-service-contracts-ts/commands";
import { ProcessReceivedMessageUseCase } from "../../../application/use-cases";

export async function handleSendMessageCommand({ message }: MessageHandlerContext): Promise<void> {

  const command = message as SendMessageCommand;
  try {
    const processMessageUseCase = new ProcessReceivedMessageUseCase();
    console.log(`[handleSendMessageCommand] Processing message ${command.requestId}`);
    await processMessageUseCase.execute(command);
  } catch (error) {
    console.error(
      `[handleSendMessageCommand] Error processing message ${command.requestId}:`,
      error
    );
  }
}