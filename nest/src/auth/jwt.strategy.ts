import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Strategy } from 'passport';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreEpiration: false,
      secretOrKey: process.env.SECRET_ACCESS_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const user = await this.authService.validateUser(payload);
    if (!user)
      throw new HttpException(
        `You don't have access to this page (103)`,
        HttpStatus.UNAUTHORIZED,
      );
    return user;
  }
}
