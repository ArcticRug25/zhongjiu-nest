import { BusinessException } from './business.exception'
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common'
import { Request, Response } from 'express'

interface ValidateErrMessage {
  field: string
  message: string[]
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  response: Response
  request: Request
  exception: HttpException
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    this.response = ctx.getResponse<Response>()
    this.request = ctx.getRequest<Request>()
    this.exception = exception
    console.log(this.exception.getResponse())

    // 处理业务异常
    if (exception instanceof BusinessException) {
      return this._handleBusinessException()
    }

    // 处理验证异常
    if (exception instanceof BadRequestException) {
      return this._handleValidateException()
    }

    // 处理基础业务异常
    this._handleBaseHttpException()
  }

  private _handleBaseHttpException() {
    const status = this.exception.getStatus()
    this._send(status, {
      timestamp: new Date().toISOString(),
      path: this.request.url,
      message: this.exception.getResponse(),
    })
  }

  private _handleValidateException() {
    const errResponse = this.exception.getResponse()
    this._send(HttpStatus.UNPROCESSABLE_ENTITY, {
      message: errResponse['message'],
    })
  }

  private _handleBusinessException() {
    const error = this.exception.getResponse()
    this._send(HttpStatus.METHOD_NOT_ALLOWED, {
      code: error['code'],
      message: error['message'],
    })
  }

  private _send(statusCode: number, errResponse: Record<keyof any, any>) {
    this.response.status(statusCode).send(
      Object.assign(
        {
          statusCode,
          success: false,
        },
        errResponse,
      ),
    )
  }
}
