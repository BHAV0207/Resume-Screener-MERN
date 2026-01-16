const Kafka = require("kafka");

export const producer = Kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
  console.log("kafka producer connected");
};

export const sendMessage = async (topic: String, message: Object) => {
  await producer.send({
    topic,
    message:[{
      value:JSON.stringify(message)
    }]
  })
};
