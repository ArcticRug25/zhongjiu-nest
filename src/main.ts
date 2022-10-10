import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import session from 'express-session'
import cors from 'cors'
import { APPID } from './utils/config'
import { NextFunction, Request, Response } from 'express'

function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl)
  next()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })

  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  })

  // 中间件
  app.use(cors())
  app.use(MiddleWareAll)

  // session
  app.use(
    session({
      name: 'zhongjiu.sid',
      secret: APPID,
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
