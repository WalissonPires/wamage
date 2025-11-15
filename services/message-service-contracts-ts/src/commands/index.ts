import type { ICommandMessage } from "@wamage/messaging-contracts-ts/commands";
import type { IUserMessage } from "@wamage/messaging-contracts-ts/user";

export interface SendMessageCommand extends ICommandMessage, IUserMessage {
  requestId: string;
  channel: string;
  to: string;
  message: string;
}
