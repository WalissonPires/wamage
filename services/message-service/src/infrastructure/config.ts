
export interface ServerConfig {
  port: number;
  host: string;
  environment: string;
  debug: boolean;
}

export function createServerConfig(): ServerConfig {
  return {
    port: Number(process.env.PORT ?? 5001),
    host: process.env.HOST ?? '0.0.0.0',
    environment: process.env.NODE_ENV ?? 'development',
    debug: process.env.DEBUG === 'true',
  };
}

export interface MessageBrokerConfig {
  kafkaAddress: string;
  kafkaClientId: string;
  kafkaGroupId: string;
}

export function createMessageBrokerConfig(): MessageBrokerConfig {
  return {
    kafkaAddress: process.env.KAFKA_ADDRESS ?? 'localhost:9092',
    kafkaClientId: process.env.KAFKA_CLIENT_ID ?? 'message-service',
    kafkaGroupId: process.env.KAFKA_GROUP_ID ?? 'message-service-group',
  };
}