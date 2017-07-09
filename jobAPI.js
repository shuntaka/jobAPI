import express from 'express';
import bodyParser from 'body-parser';

import createDBConnection from './createDBConnection';
import createMQConnection from './createMQConnection';
import defineAPIRoute from './defineAPIRoute';

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const dbUrl = 'mongodb://localhost/db';
const mqUrl = 'amqp://locaohost';
const mqExchangeName = 'jobExchange';

createDBConnection(dbUrl)
  .then(() => createMQConnection(mqUrl, mqExchangeName))
  .then((mqChannel) => {
    defineAPIRoute(app, mqChannel, mqExchangeName);
    const server = app.listen(8081, '127.0.0.1', () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log('running at http://' + host + ':' + port)
    });
  });
