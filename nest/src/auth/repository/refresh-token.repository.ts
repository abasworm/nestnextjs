import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entity/refresh-token.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {
    super(
      refreshTokenRepository.target,
      refreshTokenRepository.manager,
      refreshTokenRepository.queryRunner,
    );
  }
  async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const refreshToken = this.create();
    refreshToken.user = user;
    refreshToken.isRevoked = false;
    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + ttl);
    refreshToken.expiredAt = expiredAt;
    return await refreshToken.save();
  }
}
