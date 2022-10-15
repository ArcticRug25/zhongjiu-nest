import { ITokenConfig } from './../../types/index'
import { APP_CONFIG } from 'src/types'
import { getConfig } from './../../utils/config'
import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory() {
        const TOKEN_CONFIG: ITokenConfig = getConfig(APP_CONFIG.TOKEN_CONFIG)
        return {
          secret: getConfig(APP_CONFIG.TOKEN_CONFIG),
          signOptions: TOKEN_CONFIG.signOptions,
        }
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
