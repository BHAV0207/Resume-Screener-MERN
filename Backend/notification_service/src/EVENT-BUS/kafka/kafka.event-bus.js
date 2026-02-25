const EventBus = require("../event-bus.interface");
const { kafka } = require("./kafka");

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "notification-service-group" });

let isConnected = false;

class KafkaEventBus extends EventBus {
  async publish(topic, payload) {
    if (!isConnected) {
      await producer.connect();
      isConnected = true;
    }
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }

  async subscribe(topic, handler) {
    await consumer.connect();
    await consumer.subscribe({ topic });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const data = JSON.parse(message.value.toString());
        await handler(data);
      },
    });
  }
}

module.exports = KafkaEventBus;
