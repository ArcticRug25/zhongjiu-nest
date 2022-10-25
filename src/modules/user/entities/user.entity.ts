import { User } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'
import dayjs from 'dayjs'
export class UserEntity {
  @Exclude()
  password: string
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  createAt: string
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  updateAt: string
  constructor(options: Partial<User>) {
    Object.assign(this, options)
  }
}
