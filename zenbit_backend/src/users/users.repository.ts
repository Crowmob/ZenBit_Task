import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<number> {
    const user = this.repo.create({ email, password });
    await this.repo.save(user);
    return user.id;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }
}
