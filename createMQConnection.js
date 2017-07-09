import amqp from 'amqplib';

let MQChannel;

export default function createMQConnection(mqUrl, mqExchangeName) {
  return amqp
    .connect(mqUrl)
    .then(conn => conn.createChannel())
    .then((ch) => {
      MQChannel = ch;
      return ch.assertExchange(mqExchangeName, 'direct', { durable: true });
    })
    .then(() => MQChannel);
}
