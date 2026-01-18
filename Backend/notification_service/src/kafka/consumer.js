const { kafka } = require("./kafka");

const consumer = kafka.consumer({
  groupId: "notification-service-group",
});

const handlers = {};

const connectConsumer = async (topicsWithHandlers) => {
  try {
    await consumer.connect();

    for (const topic of Object.keys(topicsWithHandlers)) {
      handlers[topic] = topicsWithHandlers[topic];
      await consumer.subscribe({ topic, fromBeginning: false });
      console.log(`✅ Subscribed to ${topic}`);
    }

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (!message.value) return;

        try {
          const data = JSON.parse(message.value.toString());

          if (handlers[topic]) {
            await handlers[topic](data);
          } else {
            console.warn(`⚠️ No handler for topic: ${topic}`);
          }
        } catch (error) {
          console.error("❌ Error processing Kafka message:", error);
        }
      },
    });
  } catch (error) {
    console.error("❌ Kafka Consumer error:", error);
  }
};

module.exports = {
  consumer,
  connectConsumer,
};
