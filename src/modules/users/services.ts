import { ResourceNotFoundException } from '@errors/index';
import { UnauthenticatedRequestException } from '@modules/auth/errors';
import { AuthService } from '@modules/auth/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Repository } from 'typeorm';

import { User } from './entities';
import { UserAlreadyExistsException } from './errors';
import { CreateUserByIdTokenDto } from './schemas';

@Injectable()
export class UsersService {
  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async userExists(id: string): Promise<boolean> {
    const foundUser = await this.usersRepository.findOneBy({ id });

    return Boolean(foundUser);
  }

  async create(createUserDto: CreateUserByIdTokenDto) {
    let decodedIdToken: DecodedIdToken | undefined;
    try {
      decodedIdToken = await this.authService.decodeAuthToken(
        createUserDto.idToken,
      );
    } catch (error) {
      throw new UnauthenticatedRequestException();
    }

    const { uid, email } = decodedIdToken;

    const userExists = await this.userExists(uid);
    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    await this.usersRepository.save(
      this.usersRepository.create({ id: uid, email }),
    );
  }

  async findByIdOrFail(id: User['id']) {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new ResourceNotFoundException(User.name, { value: id });
    }
  }
}
