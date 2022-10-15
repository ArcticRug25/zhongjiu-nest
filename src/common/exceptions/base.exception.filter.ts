import { formatDate } from '../utils/date'
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, ServiceUnavailableException, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    this.logger(request, exception)

    // 非 HTTP 标准异常的处理。
    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: new ServiceUnavailableException().getResponse(),
    })
  }

  protected logger(req: Request, exception) {
    Logger.error(
      `【${formatDate(Date.now())}】${req.method} ${req.url}`,
      JSON.stringify(exception),
      'HttpExceptionFilter',
    )
  }
}
