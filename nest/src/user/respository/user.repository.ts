import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/page-options.dto';
import { PageDto } from 'src/common/page.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async getAllUser(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      const { email, password, fullname, isActive, createdBy } = createUserDto;
      const userEntity = this.create();
      userEntity.email = email;
      userEntity.password = password;
      userEntity.fullname = fullname;
      userEntity.isActive = isActive;
      userEntity.createdBy = createdBy;
      this.save(userEntity);
    } catch (error) {
      console.error('error: with code 002');
      throw new InternalServerErrorException(error);
    }
  }
}
