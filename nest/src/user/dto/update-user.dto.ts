import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { IsActive } from 'src/config/constansts';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(100)
  fullname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  loginTry?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  loginInfo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(IsActive)
  isActive?: string;

  @ApiProperty()
  modifiedBy: string;
}
