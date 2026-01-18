const { Kafka } = require("kafkajs");

const isProd = process.env.NODE_ENV === "production";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
   retry: {
    retries: 10,
    initialRetryTime: 300,
  },
  ...(isProd && {
    ssl: true,
    sasl: {
      mechanism: "plain",
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
  }),
});

module.exports = { kafka };
