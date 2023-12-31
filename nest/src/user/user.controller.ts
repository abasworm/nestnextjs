import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from 'src/common/page-options.dto';
import { PageDto } from 'src/common/page.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      createUserDto.createdBy = 'aris.baskoro@dieboldnixdorf.com';
      return this.userService.create(createUserDto);
    } catch (error) {
      console.log('error controller with 001');
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @GetUser() user: User,
  ): Promise<PageDto<User>> {
    console.log(user);
    return this.userService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    // console.log(uuid);
    return this.userService.update(uuid, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
