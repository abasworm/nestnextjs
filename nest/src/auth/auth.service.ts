import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.usersService.create(createUserDto);
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(loginUserDto);
    const token = await this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user)
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    return user;
  }

  private async _createToken({ email, fullname }: UserDto): Promise<any> {
    const expiresIn = process.env.EXPIRES_IN;
    const user: JwtPayload = { email, fullname };
    const accessToken = await this.jwtService.signAsync(user, {
      secret: process.env.SECRET_KEY,
      expiresIn: process.env.EXPIRES_IN,
    });
    return {
      expiresIn,
      accessToken,
    };
  }
}
