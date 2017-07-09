import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
export default function createDBConnection() {
  return mongoose.connect('mongodb://localhost/db', {
    useMongoClient: true,
  });
}
