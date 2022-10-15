import { AuthService } from './modules/auth/auth.service'
import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from './common/config'
import { getConfig } from './common/utils/config'
import { IndentModule } from './modules/indent/indent.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UserModule } from './modules/user/user.module'
import LocalStrategy from './modules/auth/strategies/local.strategy'

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig, ...config] }),
    PassportModule,
    IndentModule,
    UserModule,
    PrismaModule,
  ],
  providers: [AuthService, LocalStrategy],
})
export class AppModule {}
