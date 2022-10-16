import { ConfigType } from '@nestjs/config'
import wxConfig from './wx.config'

const WX_CONFIG: ConfigType<typeof wxConfig> = wxConfig()
const TOKEN_URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WX_CONFIG.appId}&secret=${WX_CONFIG.appSecret}`

export { WX_CONFIG, TOKEN_URL }
export default [wxConfig]

export const whiteList = ['/user/login', '/user/register']
