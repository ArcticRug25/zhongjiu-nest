import { registerAs } from '@nestjs/config'

const wxConfig = registerAs('wxConfig', () => ({
  appId: 'wxe7777389bcce75bf',
  appSecret: '8046c172909f0bb3ea552a03dc998d13',
  cloudENV: 'cloud1-0gwz94tad15b04ad',
}))

export default wxConfig
