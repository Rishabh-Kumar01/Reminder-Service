const { amqplib } = require("../utils/imports.util");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

// This function creates a channel and returns it
const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

// This function publishes a message to the exchange
const publishMessage = async (channel, bindingKey, message) => {
  try {
    await channel.assertQueue("REMINDER_QUEUE");
    await channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

// This function subscribes to a message from the queue
const subscribeMessage = async (channel, service, bindingKey) => {
  const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");

  await channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, bindingKey);

  await channel.consume(applicationQueue.queue, (msg) => {
    console.log("🧾 Message received: ", msg.content.toString(), " 🧾");
    const data = JSON.parse(msg.content.toString());
    service(data);
    channel.ack(msg);
  });
};

module.exports = {
  createChannel,
  publishMessage,
  subscribeMessage,
};
