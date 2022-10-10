import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'
import { IndentModule } from './modules/indent/indent.module'
import { getConfig } from './utils/config'
console.log('getConfig()', getConfig())
@Module({
  imports: [ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig, ...config] }), IndentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
