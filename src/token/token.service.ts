import { Injectable } from '@nestjs/common'
import { getAccessToken } from 'src/utils/getAccessToken'

@Injectable()
export class TokenService {
  async getToken(): Promise<string> {
    const tokenRes = await getAccessToken()
    return tokenRes
  }
}
