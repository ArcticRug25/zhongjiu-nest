import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })

  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  })

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor())

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter())

  await app.listen(3000)
}
bootstrap()
