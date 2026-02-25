const EventBus = require("../event-bus.interface");
const { kafka } = require("./kafka");

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "notification-service-group" });

const handlers = {};
let isConnected = false;
let started = false;

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
    handlers[topic] = handler;
    await consumer.subscribe({ topic });

    if (!started) {
      started = true;
      await this.start();
    }
  }

  async start() {
    await consumer.connect();

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const handler = handlers[topic];

        if (!handler) {
          console.warn(`No handler for topic: ${topic}`);
          return;
        }

        const event = JSON.parse(message.value.toString());
        await handler(event);
      },
    });
  }
}

module.exports = KafkaEventBus;
