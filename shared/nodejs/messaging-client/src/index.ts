import { IMessage } from "@wamage/messaging-contracts/messages";
import { IMessagingService } from "@wamage/messaging-contracts/service";

export class MessagingService implements IMessagingService {

  public async publishMessage(message: IMessage): Promise<void> {
    console.log('[MessagingService] Send message', message);
  };
}