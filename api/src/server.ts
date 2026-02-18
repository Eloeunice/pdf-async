import express from "express";
import { emailQueue, sendEmail} from "./queue";
import prisma from "../../config/prisma.client";

const app = express()
app.use(express.json())

app.get("/send", (req, res) => {
    res.send("Hello world")
})

app.post("/send=email", async (req, res) => {
    const { to, subject, body } = req.body

    const email = await prisma.email.create({
        data: {
            to,
            subject,
            body,
            status: "PENDING"
        }
    })
    const jobId = await sendEmail({ to, subject, body })
    res.send({ message: "Email sent", jobId })
})


app.listen(3000, () => {
    console.log("Server running on port 3000")
})