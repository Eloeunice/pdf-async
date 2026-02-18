import { Queue } from "bullmq";
import redis from "../../config/redisConfig";

const emailQueue = new Queue("email", {
    connection: redis,
});

// Define the job data structure
interface EmailJobData {
  to: string;
  subject: string;
  body: string;
}

// Add a job to the queue
 async function sendEmail(data: EmailJobData): Promise<string> {
  const job = await emailQueue.add('send-email', data);
  return job.id!;
}

export { emailQueue, sendEmail };