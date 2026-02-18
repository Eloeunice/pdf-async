import Redis from "ioredis";

export const redis = new Redis({
    host: "localhost",
    port: 6379,
});

process.on('SIGTERM', async () => {
  await redis.quit();
});

export default redis;