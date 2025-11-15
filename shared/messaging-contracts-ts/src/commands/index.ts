export interface ICommandMessage {
  meta: {
    commandId: string;
    trackingId: string;
    createadAt: Date;
  }
}