import mongoose from 'mongoose';
import uuid from 'uuid/v1';
import Job from './job';


mongoose.connect('mongodb://localhost/db');

function createJobService(channel) {
  return (req, res) => {
    console.log(req.body);
    const jobObj = req.body;
    const jobId = uuid();
    const jobName = jobObj.jobName;
    const jobInput = jobObj.jobInput;
    // const jobInputFile = jobObj.jobInputFile;

    const job = new Job({
      jobId,
      jobName,
      jobInput,
      // jobInputFile,
    });
    job.save((err, data) => {
      if (err) return console.log(err);
      return console.log('saved: ', data);
    });

    channel.sendToQueue('jobs_queue',
      new Buffer(JSON.stringify(Object.assign(jobObj, { jobId }))));
    res.end('job created succesfully');
  };
}
export default createJobService;
