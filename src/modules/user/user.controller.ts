import { LoginUserDto } from './dto/login-user.dto'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto)
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUser(@Req() req: Request) {
    // console.log('req12 ', req)
  }
}
