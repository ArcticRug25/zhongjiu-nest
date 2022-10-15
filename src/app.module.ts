import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from './common/config'
import { getConfig } from './common/utils/config'
import { IndentModule } from './modules/indent/indent.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig, ...config] }),
    IndentModule,
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}
