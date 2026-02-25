let eventBusInstance = null;

function createEventBus() {
  if (eventBusInstance) return eventBusInstance;

  if (process.env.EVENT_BUS === "REDIS") {
    const RedisEventBus = require("./redis/redis.event-bus");
    eventBusInstance = new RedisEventBus();
  } else {
    const KafkaEventBus = require("./kafka/kafka.event-bus");
    eventBusInstance = new KafkaEventBus();
  }

  return eventBusInstance;
}

module.exports = createEventBus;
