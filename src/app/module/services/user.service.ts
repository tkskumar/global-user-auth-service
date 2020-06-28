import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User  from '../entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
    private logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) {
    }

    async createUser(user: any): Promise<User> {
        user.passwordHash = await this.getHash(user.password);
        delete user.password;
        return this.userRepository.save(user);
    }

    async getUserByUsername(username: string): Promise<User> {
        return (await this.userRepository.find({username}))[0];
    }

    async getUserByEmail(email: string): Promise<User> {
      return (await this.userRepository.find({email}))[0];
  }

    private async getHash(password: string | undefined): Promise<string> {
        return argon2.hash(password);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        try {
            if (await argon2.verify(hash, password)) {
                this.logger.log('verification of user sucessful');
                return true;
            } else {
                this.logger.log('verification failed');
                return false;
            }
        } catch (err) {
            this.logger.log('argon2 error');
            return false;
        }
    }
}
