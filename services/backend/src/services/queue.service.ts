import amqp from 'amqplib';

export class QueueService {
  private connection: any = null;
  private channel: any = null;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    const rabbitmqUrl = process.env.RABBITMQ_URL;
    if (!rabbitmqUrl) {
      console.log('[QUEUE SERVICE]: RABBITMQ_URL is not set. Running in local fallback logging mode.');
      return;
    }

    try {
      this.connection = await amqp.connect(rabbitmqUrl);
      this.channel = await this.connection.createChannel();
      console.log('[QUEUE SERVICE]: Connected to RabbitMQ successfully.');
      
      // Ensure key queues exist
      await this.channel.assertQueue('document.ingest', { durable: true });
      await this.channel.assertQueue('quiz.generation', { durable: true });
    } catch (err: any) {
      console.error('[QUEUE SERVICE]: Failed to connect to RabbitMQ broker:', err.message);
      console.log('[QUEUE SERVICE]: Falling back to local logging mode.');
      this.connection = null;
      this.channel = null;
    }
  }

  /**
   * Publishes message payloads to the specified broker queue.
   */
  async publishToQueue(queueName: string, message: any): Promise<boolean> {
    if (this.channel) {
      try {
        await this.channel.assertQueue(queueName, { durable: true });
        const serialized = Buffer.from(JSON.stringify(message));
        this.channel.sendToQueue(queueName, serialized, { persistent: true });
        console.log(`[QUEUE DISPATCH]: Published message to queue '${queueName}'`);
        return true;
      } catch (err: any) {
        console.error(`[QUEUE ERROR]: Failed to publish to queue '${queueName}':`, err.message);
      }
    }

    // Local Fallback Logger
    console.log(`[QUEUE LOGGER (FALLBACK)]: Queue '${queueName}' payload:`, JSON.stringify(message, null, 2));
    return false;
  }

  async close() {
    try {
      if (this.channel) await this.channel.close();
      if (this.connection) await this.connection.close();
    } catch (err) {
      // Ignored during shutdown
    }
  }
}
