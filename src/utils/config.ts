import fs from 'fs'
import path from 'path'
import { parse as yamlParse } from 'yaml'

const APPID = 'wxe7777389bcce75bf'
const APPSECRET = '8046c172909f0bb3ea552a03dc998d13'
const CLOUD_ENV = 'cloud1-0gwz94tad15b04ad'
const TOKEN_URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
export { TOKEN_URL, CLOUD_ENV, APPID }

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV
}

// 读取项目配置
export const getConfig = (type?: string) => {
  const environment = getEnv()
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`)
  const file = fs.readFileSync(yamlPath, 'utf8')
  const config = yamlParse(file)

  if (type) {
    return config[type]
  }

  return config
}
