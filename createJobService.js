import uuid from 'uuid/v1';
import Job from './job';

const MQExchangeName = 'jobExchaneg';

export default function createJobService(MQChannel) {
  return (req, res) => {
    console.log(req.body);
    const jobObj = req.body;
    const jobId = uuid();

    const { userId, jobName, jobDistRouteKey } = jobObj;
    const status = 'queued';
    const jobInputStr = jobObj.jobInput;
    const jobInput = JSON.parse(jobInputStr);
    jobObj.jonInput = jobInput;

    const job = new Job({
      jobId,
      userId,
      jobName,
      status,
      jobInput,
      // jobInputFile,
    });

    MQChannel.publish(MQExchangeName, jobDistRouteKey,
        new Buffer(JSON.stringify(Object.assign(jobObj, { jobId })))
    );
    job.save()
      .then(data => console.log('saved: ', data))
      .then(() => res.end(jobId));
  };
}
