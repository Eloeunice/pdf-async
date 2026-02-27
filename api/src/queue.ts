import { Queue } from "bullmq";
import redis from "../../config/redisConfig";

const emailQueue = new Queue("email", {
    connection: redis,
});

// Define the job data structure
export interface EmailJobData {
  to: string;
  subject: string;
  body: string;
}

emailQueue.on('waiting', (jobId) => {
  console.log(`Job ${jobId} is waiting in the queue`);
})

// Add a job to the queue
// Producter
 async function addJobs(data: EmailJobData): Promise<string> {
  const job = await emailQueue.add('send-email', data);
  return job.id!;
}

await addJobs({ to: 'eloizaeunice25@gmail.com,', subject: 'Test email', body: 'This is a test email' });
export { emailQueue, addJobs };