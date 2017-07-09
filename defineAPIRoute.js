import createJobServiceFactory from './createJobService';

export default function defineAPIRoute(app, MQChannel) {
  const createJobService = createJobServiceFactory(MQChannel);
  app.post('/createJob', createJobService);
}
