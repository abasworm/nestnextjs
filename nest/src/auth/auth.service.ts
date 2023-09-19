import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { User } from 'src/user/entities/user.entity';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
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
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    return {
      email: user.email,
      refreshToken,
      ...accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user)
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    return user;
  }

  private async createAccessToken({ email, fullname }: UserDto): Promise<any> {
    const expiresIn = process.env.EXPIRES_ACCESS_IN;
    const user: JwtPayload = { email, fullname };
    const accessToken = await this.jwtService.signAsync(user);
    return {
      expiresIn,
      accessToken,
    };
  }

  async createRefreshToken(user: User): Promise<string> {
    const saveRefreshToken =
      await this.refreshTokenRepository.createRefreshToken(
        user,
        parseInt(process.env.EXPIRES_REFRESH_IN_MS),
      );
    const payload = {
      uuid: saveRefreshToken.uuid,
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_REFRESH_KEY,
      expiresIn: process.env.EXPIRES_REFRESH_IN,
    });
    return refreshToken;
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    const { refreshToken } = refreshTokenDto;
    const payload = await this.decodeToken(refreshToken);
    const refreshTokenExists = await this.refreshTokenRepository.findOne({
      where: { uuid: payload.uuid },
      relations: ['user'],
    });
    if (!refreshTokenExists)
      throw new HttpException(
        `You don't have to access this page (101)`,
        HttpStatus.UNAUTHORIZED,
      );

    if (refreshTokenExists.isRevoked)
      throw new HttpException(
        `You don't have to access this page (102)`,
        HttpStatus.UNAUTHORIZED,
      );

    const newAccessToken = await this.createAccessToken(
      refreshTokenExists.user,
    );
    return newAccessToken;
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_REFRESH_KEY,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException(
          `You don't have to access this page (104)`,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        console.log(error);
        throw new InternalServerErrorException('Failed to decode');
      }
    }
  }

  async revokeRefreshToken(id: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { uuid: id },
    });
    if (!refreshToken)
      throw new HttpException(
        `There's is an error in AuthToken.`,
        HttpStatus.NOT_FOUND,
      );
    refreshToken.isRevoked = true;
    await refreshToken.save();
  }
}
