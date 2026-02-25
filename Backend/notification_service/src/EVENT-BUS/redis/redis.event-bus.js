const Redis = require("ioredis");
const EventBus = require("./eventBus.interface");

const redis = new Redis(process.env.REDIS_URL);

const GROUP = "notification-group";
const CONSUMER = `consumer-${process.pid}`;

class RedisEventBus extends EventBus {
  async publish(topic, payload) {
    await redis.xadd(
      `stream:${topic}`,
      "*",
      "payload",
      JSON.stringify(payload),
    );
  }

  async subscribe(topic, handler) {
    const stream = `stream:${topic}`;

    // create consumer group once
    try {
      await redis.xgroup("CREATE", stream, GROUP, "$", "MKSTREAM");
    } catch (_) {}

    while (true) {
      const data = await redis.xreadgroup(
        "GROUP",
        GROUP,
        CONSUMER,
        "BLOCK",
        5000,
        "COUNT",
        10,
        "STREAMS",
        stream,
        ">",
      );

      if (!data) continue;

      for (const [, messages] of data) {
        for (const [id, fields] of messages) {
          const payload = JSON.parse(fields[1]);

          await handler(payload);

          // ACK = offset commit
          await redis.xack(stream, GROUP, id);
        }
      }
    }
  }
}

module.exports = RedisEventBus;
