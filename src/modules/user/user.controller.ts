import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from './../auth/guards/local-auth.guard'
import { AuthService } from './../auth/auth.service'
import { AuthGuard } from '@nestjs/passport'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { UserService } from './user.service'
import { Request } from 'express'

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

  @UseGuards(LocalAuthGuard)
  @Post('login2')
  login2(@Req() req) {
    return this.authService.getToken(req.user)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUser(@Req() req: Request) {
    // console.log('req12 ', req)
  }
}
