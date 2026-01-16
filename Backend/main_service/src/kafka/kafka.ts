const Kafka = require('kafka')

const isProd = process.env.NODE_ENV === "production";

export const kafka = new Kafka({
  clientId : "notification-service",
  brokers  : [process.env.KAFKA_BROKER!],
  ...(isProd && {
    ssl:true,
    sasl:{
      mechanism: "plain",
      username: process.env.KAFKA_USERNAME!,
      password: process.env.KAFKA_PASSWORD!,
    }
  })
})