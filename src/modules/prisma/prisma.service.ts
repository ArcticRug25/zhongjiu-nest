import { PrismaClient } from '@prisma/client'
import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common'

@Injectable()
export class PrismaService extends PrismaClient implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor() {
    super({ log: ['query'] })
  }

  async onApplicationBootstrap() {
    await this.$connect()
  }

  async onApplicationShutdown() {
    await this.$disconnect()
  }
}
