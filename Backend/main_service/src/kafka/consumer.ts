const Kafka = require('kakfa')

export const consumer = Kafka.consumer({
  groupId: "notification-service-group",
});

export const connectConsumer = async (
  topic: string,
  onMessage: (data: any) => Promise<void>
) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });

  console.log(`✅ Subscribed to ${topic}`);

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const data = JSON.parse(message.value.toString());
      await onMessage(data);
    },
  });
};
