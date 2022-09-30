import { Injectable } from '@nestjs/common'
import { callCloudDB } from 'src/utils/callCloudDB'

@Injectable()
export class IndentService {
  async getAllIndents(): Promise<any> {
    const query = `db.collection('indent').orderBy('createTime', 'desc').get()`
    const res = await callCloudDB('databasequery', query)
    return res.data
  }
}
