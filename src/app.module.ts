import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { IndentModule } from './indent/indent.module'
import { TokenService } from './token/token.service'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'

@Module({
  controllers: [AppController, UserController],
  providers: [AppService, UserService, TokenService],
  imports: [IndentModule],
})
export class AppModule {}
