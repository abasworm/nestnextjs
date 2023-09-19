import {
  Injectable,
  InternalServerErrorException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from 'src/common/page-options.dto';
import { User } from './entities/user.entity';
import { PageDto } from 'src/common/page.dto';
import { UserRepository } from './respository/user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { JwtPayload } from 'src/auth/interfaces/payload.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (userExists)
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

      return await this.userRepository.createUser(createUserDto);
    } catch (error) {
      console.error('error: with code 003');
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    return await this.userRepository.getAllUser(pageOptionsDto);
  }

  async findOne(uuid: string) {
    return await this.userRepository.getOneUser(uuid);
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateUser(uuid, updateUserDto);
  }

  async findByLogin(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user)
      throw new HttpException(
        'Email of Password Not Found',
        HttpStatus.UNAUTHORIZED,
      );

    const match = await compare(loginUserDto.password, user.password);
    if (!match)
      throw new HttpException(
        'Email of Password Not Found',
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }

  async findByPayload({ email, fullname }: JwtPayload): Promise<UserDto> {
    return await this.userRepository.findOne({ where: { email } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
