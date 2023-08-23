import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { IsActive } from 'src/config/constansts';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  fullname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  loginInfo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(IsActive)
  isActive: string;

  @ApiProperty()
  createdBy: string;
}
