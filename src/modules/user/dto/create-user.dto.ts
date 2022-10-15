import { IsNotEmpty, Length } from 'class-validator'
import { IsExists } from 'src/common/validate/rules/is-exists'

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 10, { message: '用户名长度在2到10之间' })
  @IsExists('user', { message: '用户名重复' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
