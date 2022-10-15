import { PrismaService } from './../prisma/prisma.service'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private jwt: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password),
      },
    })

    return this.token(user)
  }

  async login({ username, password }: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    const passwordMatch = await verify(user.password, password)

    if (!passwordMatch) throw new ForbiddenException('密码输入除外')

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
