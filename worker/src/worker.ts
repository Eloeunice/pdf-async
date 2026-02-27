import { Worker } from "bullmq";
import redis from "../../config/redisConfig";
import nodemailer from "nodemailer";
import { EmailJobData } from "../../api/src/queue.ts"

const worker = new Worker('email', async (job) => {
    console.log(job.data)
    return 'done'
}, {
    connection: redis})

worker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "D1t2V@example.com", // generated ethereal user
      pass: "hCQqz2t8ZJ2tZ2tZ2t", // generated ethereal password
    },
  });

  async function sendEmail(data: EmailJobData) {
    const info = await transporter.sendMail({
      from: "D1t2V@example.com",
      to: data.to,
      subject: data.subject,
      text: data.body,
    });
    console.log("Message sent:", info.messageId);
  }

worker.on('completed', async (job) => {
    const data = job.data as EmailJobData
    await sendEmail(data)
})



