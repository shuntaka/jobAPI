import express from 'express';
import amqp from 'amqplib';
import createJobServiceFactory from './createJobService';
import updateJobService from './updateJobService';
import fetchJobService from './fetchJobService';

const app = express();
let connection;
let channel;

let createJobService;
let updateJobService;
let fetchJobService;

app.post('/createJob', createJobService);
app.get('/updateJob', updateJobService);
app.get('/fetchJob', fetchJobService);

amqp
  .connect('amqp://localhost')
  .then((conn) => {
    connection = conn;
    return connection.createChannel();
  })
  .then((ch) => {
    channel = ch;
    createJobService = createJobServiceFactory(channel);
    const server = app.listen(8081, '127.0.0.1', () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log('running at http://' + host + ':' + port)
    });
  });
