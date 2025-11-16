import { initConsumers } from "./consumers";
import { MessageBrokerService } from "./message-broker";
import { startServer } from "./server";

async function main() {
  await MessageBrokerService.instance.init();
  initConsumers();
  startServer();
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exit(1)
  });

async function handleShutdown() {
  await MessageBrokerService.instance.dispose();
}

process.on('exit', handleShutdown);