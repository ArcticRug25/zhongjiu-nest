import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { TokenService } from './token/token.service'
import { IndentService } from './indent/indent.service';
import { IndentController } from './indent/indent.controller';

@Module({
  controllers: [AppController, UserController, IndentController],
  providers: [AppService, UserService, TokenService, IndentService],
})
export class AppModule {}
