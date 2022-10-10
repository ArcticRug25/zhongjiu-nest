import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { TOKEN_URL } from 'src/config'

const fileName = path.resolve(__dirname, './access_token.json')

interface IToken {
  access_token: string
  expires_in: number
}

interface ITokenFile {
  access_token: string
  createTime: string
}

const updateAccessToken = async () => {
  const res = await axios.get<IToken>(TOKEN_URL)
  // 写文件
  if (res.data.access_token) {
    fs.writeFileSync(
      fileName,
      JSON.stringify({
        access_token: res.data.access_token,
        createTime: new Date(),
      }),
    )
  } else {
    await updateAccessToken()
  }
}

const getAccessToken = async () => {
  // 读取文件
  try {
    const readRes = fs.readFileSync(fileName, 'utf8')
    const readObj: ITokenFile = JSON.parse(readRes)
    const createTime = new Date(readObj.createTime).getTime()
    const nowTime = new Date().getTime()
    if ((nowTime - createTime) / 1000 / 60 / 60 >= 2) {
      await updateAccessToken()
      return await getAccessToken()
    }
    return readObj.access_token
  } catch (error) {
    await updateAccessToken()
    return await getAccessToken()
  }
}

setInterval(async () => {
  await updateAccessToken()
}, (7200 - 300) * 1000)

export { getAccessToken }
