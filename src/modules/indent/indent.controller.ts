import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import wxConfig from 'src/common/config/wx.config'
import { Public } from 'src/common/decorator/public.decorator'
import { CreateIndentDto } from './dto/create-indent.dto'
import { UpdateIndentDto } from './dto/update-indent.dto'
import { IndentService } from './indent.service'

@Controller('indent')
export class IndentController {
  constructor(
    private readonly indentService: IndentService,
    @Inject(wxConfig.KEY) private wx: ConfigType<typeof wxConfig>,
  ) {}

  @Post()
  create(@Body() createIndentDto: CreateIndentDto) {
    return this.indentService.create(createIndentDto)
  }

  @Public()
  @Get('t')
  test() {
    return 2
  }

  @Public()
  @Get()
  findAll() {
    return this.indentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indentService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndentDto: UpdateIndentDto) {
    return this.indentService.update(+id, updateIndentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indentService.remove(+id)
  }
}
