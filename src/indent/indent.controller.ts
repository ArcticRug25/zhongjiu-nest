import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { IndentService } from './indent.service'
import { CreateIndentDto } from './dto/create-indent.dto'
import { UpdateIndentDto } from './dto/update-indent.dto'

@Controller('indent')
export class IndentController {
  constructor(private readonly indentService: IndentService) {}

  @Post()
  create(@Body() createIndentDto: CreateIndentDto) {
    return this.indentService.create(createIndentDto)
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
