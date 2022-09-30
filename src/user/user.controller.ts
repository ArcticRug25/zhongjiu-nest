import { BusinessException } from './../common/exceptions/business.exception'
import { UserService } from './user.service'
import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return this.userService.findAll()
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
