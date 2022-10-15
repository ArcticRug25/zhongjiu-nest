import { LocalAuthGuard } from './../auth/guards/local-auth.guard'
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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    return req.user
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUser(@Req() req: Request) {
    // console.log('req12 ', req)
  }
}
