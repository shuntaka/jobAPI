import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const jobSchema = new Schema({
  jobId: String,
  userId: String,
  jobName: String,
  status: String,
  jobInput: Schema.Types.Mixed,
  jobOutput: Schema.Types.Mixed,
});

// the schema is useless so far
// we need to create a model using it
const Job = mongoose.model('Job', jobSchema);

// make this available to our users in our Node applications
export default Job;
