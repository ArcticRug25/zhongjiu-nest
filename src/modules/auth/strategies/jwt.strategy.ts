import { User } from '@prisma/client'
import { ITokenConfig } from '../../../types/index'
import { PrismaService } from '../../prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { APP_CONFIG } from 'src/types'

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    const tokenConfig: ITokenConfig = configService.get(APP_CONFIG.TOKEN_CONFIG)
    super({
      // 解析用户提交的 Bearer Token header 数据w
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 加密码的 secret
      secretOrKey: tokenConfig.secret,
    })
  }
  async validate({ sub: id }): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
}
