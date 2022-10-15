import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cors from 'cors'
import session from 'express-session'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter'
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import CustomValidate from './common/validate/custom.validate'
import { APP_CONFIG } from './types'
import { getConfig } from './common/utils/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  })

  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  })

  // 中间件
  app.use(cors())

  // 全局管道
  app.useGlobalPipes(new CustomValidate())

  // session
  app.use(
    session({
      name: 'zhongjiu.sid',
      secret: getConfig(APP_CONFIG.WX_CONFIG).appId,
      rolling: true,
      cookie: {
        maxAge: 72000,
      },
    }),
  )

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor())

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter())

  await app.listen(3000)
}

bootstrap()
