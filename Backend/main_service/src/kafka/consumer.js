const { kafka } = require("./kafka");

const consumer = kafka.consumer({
  groupId: "main-service-group",
});


const connectConsumer = async (topic, onMessage, retries = 5) => {
  while (retries > 0) {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: false });
      console.log(`✅ Subscribed to ${topic}`);

      await consumer.run({
        eachMessage: async ({ message }) => {
          if (!message?.value) return;
          try {
            const data = JSON.parse(message.value.toString());
            await onMessage(data);
          } catch (err) {
            console.error("❌ Message parse error:", err);
          }
        },
      });

      return;
    } catch (err) {
      console.error("❌ Kafka consumer connect failed, retrying...", err.message);
      retries--;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  throw new Error("❌ Consumer failed to connect after retries");
};

module.exports = {
  consumer,
  connectConsumer,
};
