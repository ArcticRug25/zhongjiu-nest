import { Injectable } from '@nestjs/common'
import { CreateIndentDto } from './dto/create-indent.dto'
import { UpdateIndentDto } from './dto/update-indent.dto'
import { callCloudDB } from 'src/common/utils/callCloudDB'

@Injectable()
export class IndentService {
  create(createIndentDto: CreateIndentDto) {
    return 'This action adds a new indent'
  }

  async findAll(): Promise<any> {
    const query = `db.collection('indent').orderBy('createTime', 'desc').get()`
    const res = await callCloudDB('databasequery', query)
    res.data = res.data.map((item) => JSON.parse(item))
    return res
  }

  findOne(id: number) {
    return `This action returns a #${id} indent`
  }

  update(id: number, updateIndentDto: UpdateIndentDto) {
    return `This action updates a #${id} indent`
  }

  remove(id: number) {
    return `This action removes a #${id} indent`
  }
}
