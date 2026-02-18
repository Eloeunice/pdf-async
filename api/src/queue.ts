import { Queue, Worker, Job } from "bullmq";
import redis from "../../config/redisConfig";

const emailQueue = new Queue("pdf", {
    connection: redis,
});

// Define the job data structure
interface PdfJobData {
  to: string;
  subject: string;
  body: string;
}

// Add a job to the queue
 async function sendEmail(data: PdfJobData): Promise<string> {
  const job = await emailQueue.add('send', data);
  return job.id!;
}

export { emailQueue, sendEmail };