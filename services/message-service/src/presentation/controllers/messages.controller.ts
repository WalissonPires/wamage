import { FastifyRequest, FastifyReply } from 'fastify';
import { SendMessageDTO, MessageResponseDTO } from '../../application/dtos';
import { DomainError } from '../../domain/errors';
import { MessageBrokerService } from '../../infrastructure';
import { SendMessageUseCase } from '../../application/use-cases';

export class MessagesController {

  public async sendMessage(request: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      const { channel, recipient, text } = request.body as any;
      const userId = (request as any).userId || 'anonymous';
      const accountId = (request as any).accountId || 'default';

      if (!channel || !recipient || !text) {
        return reply.code(422).send({
          message: 'Missing required fields: channel, recipient, text',
          code: 'INVALID_REQUEST',
        });
      }

      const dto = new SendMessageDTO(userId, accountId, channel, recipient, text);

      const messageProducer = MessageBrokerService.getInstance().getProducer();
      const sendMessageUseCase = new SendMessageUseCase(messageProducer);
      const response: MessageResponseDTO = await sendMessageUseCase.execute(dto);

      return reply.code(201).send(response);
    } catch (error) {
      return this.handleError(error, reply);
    }
  }

  private handleError(error: any, reply: FastifyReply): any {
    if (error instanceof DomainError) {
      return reply.code(422).send({
        message: error.message,
        code: error.code,
      });
    }

    console.error('Unexpected error:', error);

    return reply.code(500).send({
      message: 'An unexpected error occurred',
      code: 'INTERNAL_ERROR',
    });
  }
}
