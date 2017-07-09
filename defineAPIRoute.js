import createJobServiceFactory from './createJobService';

export default function defineAPIRoute(app, mqChannel, mqExchangeName) {
  const createJobService = createJobServiceFactory(mqChannel, mqExchangeName);
  app.post('/createJob', createJobService);
}
