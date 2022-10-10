import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common'
import { IndentService } from './indent.service'
import { CreateIndentDto } from './dto/create-indent.dto'
import { UpdateIndentDto } from './dto/update-indent.dto'
import { ConfigService, ConfigType } from '@nestjs/config'
import databaseConfig from 'src/config/database.config'

@Controller('indent')
export class IndentController {
  constructor(
    private readonly indentService: IndentService,
    private readonly configService: ConfigService,
    @Inject(databaseConfig.KEY) private database: ConfigType<typeof databaseConfig>,
  ) {}

  @Post()
  create(@Body() createIndentDto: CreateIndentDto) {
    return this.indentService.create(createIndentDto)
  }

  @Get('t')
  test() {
    // const d = this.configService.get('name')
    // let a: ConfigType<typeof d>
    // console.log(this.configService.get('name'))
    return '1'
  }

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
