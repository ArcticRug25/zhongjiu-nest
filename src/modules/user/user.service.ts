import { PrismaService } from './../prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private jwt: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    })
    return this.token(user)
  }

  private async token({ id, username }: User) {
    return {
      token: await this.jwt.signAsync({
        username,
        sub: id,
      }),
    }
  }
}
