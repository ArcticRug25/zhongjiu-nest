import { UserService } from './../user/user.service'
import { Injectable } from '@nestjs/common'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(username)
    if (user && (await verify(user.password, pass))) {
      const { password, ...result } = user
      return result
    }

    // 验证失败返回 null (失败定义为用户没有找到，或者在使用 Passport-local 的情况下，密码不匹配)。
    return null
  }
}
