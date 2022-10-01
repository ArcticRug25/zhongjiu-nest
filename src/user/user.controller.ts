import { TokenService } from './../token/token.service'
import { BusinessException } from './../common/exceptions/business.exception'
import { UserService } from './user.service'
import { Controller, Get, Inject, Version, VERSION_NEUTRAL } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    @Inject('TYPE') private readonly type: string[],
    @Inject('TOKEN') private readonly token: string,
    @Inject('Config') private readonly base: any,
    @Inject('Config2') private readonly base2: any,
  ) {}

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return this.userService.findAll()
  }

  @Get('type')
  @Version([VERSION_NEUTRAL, '1'])
  findType() {
    return this.type
  }

  @Get('base')
  @Version([VERSION_NEUTRAL, '1'])
  findBase() {
    return this.base
  }

  @Get('base2')
  @Version([VERSION_NEUTRAL, '1'])
  findBase2() {
    return this.base2
  }

  @Get('getToken')
  @Version([VERSION_NEUTRAL, '1'])
  getToken() {
    return this.token
  }

  @Get()
  @Version('2')
  findAll2() {
    return 'new one'
  }

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {}
    console.log(a.b.c)
    return this.userService.findAll()
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {}
    try {
      console.log(a.b.c)
    } catch (error) {
      throw new BusinessException('你这个参数错了')
    }
    return this.userService.findAll()
  }
}
