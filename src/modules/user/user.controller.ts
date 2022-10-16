import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { Public } from 'src/common/decorator/public.decorator'
import { AuthService } from './../auth/auth.service'
import { LocalAuthGuard } from './../auth/guards/local-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto)
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto)
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login2')
  login2(@Req() req) {
    return this.authService.getToken(req.user)
  }

  @Get()
  getAllUser(@Req() req: Request) {
    // console.log('req12 ', req)
  }
}
