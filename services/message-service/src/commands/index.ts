export class CommandsFactory {

  public static createSendMessageCommand(args: { channel: string, to: string, message: string }) {
    return {
      meta: {
        messageId: '1', // TODO: Generate unique ID
        trackingId: '2', // TODO: Generate unique ID
        createadAt: new Date()
      },
      user: {
        accountId: '3', // TODO: Get from context
        userId: '4' // TODO: Get from context
      },
      requestId: '10', // TODO: Generate unique ID
      channel: args.channel,
      to: args.to,
      message: args.message
    };
  }

}