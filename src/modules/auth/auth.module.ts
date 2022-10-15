import { APP_CONFIG } from 'src/types'
import { getConfig } from '../../common/utils/config'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from './../user/user.module'
import { forwardRef, Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import JwtStrategy from './strategies/jwt.strategy'
import LocalStrategy from './strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'

@Global()
@Module({
  imports: [forwardRef(() => UserModule), PassportModule, JwtModule.register(getConfig(APP_CONFIG.TOKEN_CONFIG))],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
