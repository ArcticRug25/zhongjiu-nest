import { TokenService } from './../token/token.service'
import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common'
import { IndentService } from './indent.service'

@Controller('indent')
export class IndentController {
  constructor(private indentService: IndentService) {}

  @Get('list')
  @Version([VERSION_NEUTRAL, '1'])
  async getAllIndents() {
    const res = await this.indentService.getAllIndents()
    return res.data
  }
}
