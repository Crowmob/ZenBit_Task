import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { UsersRepository } from './users.repository';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: AuthUserDto) {
    try {
      const userId = await this.usersRepository.createUser(
        createUserDto.email,
        createUserDto.password,
      );
      this.logger.log(`Created user with email: ${createUserDto.email}`);
      return userId;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as { code?: string };

        if (driverError.code === '23505') {
          this.logger.error(`Email already exists: ${createUserDto.email}`);
          throw new HttpException('Email already exists', 409);
        }

        this.logger.error(
          `Error occurred while creating user with email: ${createUserDto.email}`,
        );

        throw new HttpException(
          'Database error',
          Number(driverError.code) || 500,
        );
      }
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.usersRepository.getUserById(id);
      if (!user) {
        this.logger.error(`User not found with id: ${id}`);
        throw new NotFoundException(`User with id ${id} not found`);
      }
      this.logger.log(`Found user with id: ${id}`);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error occurred while finding user with id: ${id}`);
      throw new HttpException('Database error', 500);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.getUserByEmail(email);
      if (!user) {
        this.logger.error(`User not found with email: ${email}`);
        throw new NotFoundException(`User with email ${email} not found`);
      }
      this.logger.log(`Found user with email: ${email}`);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Error occurred while finding user with email: ${email}`,
      );
      throw new HttpException('Database error', 500);
    }
  }
}
