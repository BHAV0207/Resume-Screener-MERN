const { Kafka } = require("kafkajs");

const isProd = process.env.NODE_ENV === "production";

const kafka = new Kafka({
  clientId: "main-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
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
