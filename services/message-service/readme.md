# Message Service

Gateway para envio de mensagens

# Fluxo

- `ServiceA` envia um evento `SendMessageEvent` para o MessageBroker
- O MessageBroker adiciona o evento na fila
- O `MessageService` processa o evento da fila e envia para o canal correspondente

# Canais suportados

As mensagens podem ser enviadas para os seguintes canais:

- [x] Whatsapp
- [ ] Telegram
- [x] Email