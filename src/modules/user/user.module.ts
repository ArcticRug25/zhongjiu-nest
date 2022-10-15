import { AuthModule } from './../auth/auth.module'
import { AuthService } from './../auth/auth.service'
import { forwardRef, Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
