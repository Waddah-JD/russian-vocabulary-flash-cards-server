import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from 'src/errors';
import { Repository } from 'typeorm';

import { User } from './entities';
import { CreateUserDto } from './schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.usersRepository.save(this.usersRepository.create(createUserDto));
  }

  async findByIdOrFail(id: User['id']) {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new ResourceNotFoundException(User.name, { value: id });
    }
  }
}
