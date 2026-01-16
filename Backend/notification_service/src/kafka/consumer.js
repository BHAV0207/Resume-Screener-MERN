const { kafka } = require("./kafka");

const consumer = kafka.consumer({
  groupId: "notification-service-group",
});

const connectConsumer = async (topic, onMessage) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: false });

    console.log(`✅ Subscribed to ${topic}`);

    await consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        try {
          const data = JSON.parse(message.value.toString());
          await onMessage(data);
        } catch (error) {
          console.error("❌ Error parsing Kafka message:", error);
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
