const { Partitioners } = require("kafkajs");
const { kafka } = require("./kafka");

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});


const connectProducer = async (retries = 5) => {
  while (retries > 0) {
    try {
      await producer.connect();
      console.log("✅ Kafka Producer connected");
      return;
    } catch (err) {
      console.error("❌ Kafka connection failed, retrying...", err.message);
      retries--;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  throw new Error("❌ Could not connect to Kafka after retries");
};

const sendMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
};

module.exports = {
  producer,
  connectProducer,
  sendMessage,
};
