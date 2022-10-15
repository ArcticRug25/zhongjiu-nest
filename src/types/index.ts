import { JwtSignOptions } from '@nestjs/jwt'

export const enum APP_CONFIG {
  WX_CONFIG = 'WX_CONFIG',
  TOKEN_CONFIG = 'TOKEN_CONFIG',
}

export interface ITokenConfig {
  secret: string
  option: JwtSignOptions
}

export type { User } from '@prisma/client'
