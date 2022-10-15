import { UserModule } from './../user/user.module'
import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import JwtStrategy from './strategies/jwt.strategy'
import LocalStrategy from './strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'

@Global()
@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
