import { ForbiddenException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from './../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password),
      },
    })

    return user
  }

  async login({ username, password }: LoginUserDto) {
    const user = await this.findUser(username)

    if (!user) throw new ForbiddenException('用户名不存在')

    const passwordMatch = await verify(user.password, password)

    if (!passwordMatch) throw new ForbiddenException('密码输入错误')

    return user
  }

  async findUser(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    return user
  }

  async findAllUser(): Promise<User[]> {
    const user = await this.prisma.user.findMany()

    return user
  }
}
