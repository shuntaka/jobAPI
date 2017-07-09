import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
export default function createDBConnection(dbUrl) {
  return mongoose.connect(dbUrl, {
    useMongoClient: true,
  });
}
