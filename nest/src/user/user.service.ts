import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from 'src/common/page-options.dto';
import { User } from './entities/user.entity';
import { PageDto } from 'src/common/page.dto';
import { UserRepository } from './respository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.createUser(createUserDto);
    } catch (error) {
      console.error('error: with code 003');
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    return await this.userRepository.getAllUser(pageOptionsDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
