import { Logger } from '../../common/middleware/index'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { IndentService } from './indent.service'
import { IndentController } from './indent.controller'

@Module({
  controllers: [IndentController],
  providers: [IndentService],
})
export class IndentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes('indent')
  }
}
