import { User } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'

export class UserEntity {
  @Exclude()
  password: string

  constructor(options: Partial<User>) {
    Object.assign(this, options)
  }
}
