import { AuthService } from './../auth/auth.service'
import { AuthGuard } from '@nestjs/passport'
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
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

  @UseGuards(AuthGuard('local'))
  @Post('login2')
  login2(@Req() req) {
    return this.authService.getToken(req.user)
  }

  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // getAllUser(@Req() req: Request) {
  //   // console.log('req12 ', req)
  // }
}
