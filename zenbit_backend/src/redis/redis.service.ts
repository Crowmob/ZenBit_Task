import { HttpException, Injectable } from '@nestjs/common';
import Redis, { Redis as RedisType } from 'ioredis';
import { SessionDto } from './dto/session.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class RedisService {
  private client: RedisType;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      retryStrategy(times) {
        if (times > 5) return null;
        return Math.min(times * 50, 2000);
      },
      reconnectOnError: () => {
        return true;
      },
    });
    this.client.on('error', (err) => {
      this.logger.error(`Redis error: ${err.message}`);
    });
  }

  async get<T = SessionDto>(key: string): Promise<T | null> {
    if (this.client.status === 'end') {
      this.logger.error(`Redis client dissconnected.`);
      throw new HttpException('Redis dissconnected', 500);
    }

    if (this.client.status !== 'ready') {
      this.logger.warn('Redis not ready, returning fallback');
      return null;
    }

    const data = await this.client.get(key);
    this.logger.log(`Getting key: ${key} from Redis`);
    return data ? (JSON.parse(data) as T) : null;
  }

  async set(key: string, value: any) {
    if (this.client.status === 'end') {
      this.logger.error(`Redis client dissconnected.`);
      throw new HttpException('Redis dissconnected', 500);
    }

    if (this.client.status !== 'ready') {
      this.logger.warn('Redis not ready, returning fallback');
      return null;
    }

    const data = JSON.stringify(value);
    await this.client.set(key, data);
    this.logger.log(`Setting key: ${key} in Redis`);
  }

  async del(key: string) {
    if (this.client.status === 'end') {
      this.logger.error(`Redis client dissconnected.`);
      throw new HttpException('Redis dissconnected', 500);
    }

    if (this.client.status !== 'ready') {
      this.logger.warn('Redis not ready, returning fallback');
      return null;
    }

    await this.client.del(key);
    this.logger.log(`Deleting key: ${key} from Redis`);
  }
}
