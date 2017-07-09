import amqp from 'amqplib';

let MQChannel;

export default function createMQConnection() {
  return amqp
    .connect('amqp://localhost')
    .then(conn => conn.createChannel())
    .then((ch) => {
      MQChannel = ch;
      return ch.assertExchange('jobExchange', 'direct', { durable: true });
    })
    .then(() => MQChannel);
}
