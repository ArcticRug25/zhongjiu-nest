import axios from 'axios'
import { getAccessToken } from 'src/utils/getAccessToken'
import { CLOUD_ENV } from './config'

const callCloudDB = async (fnName, query = {}) => {
  const ACCESS_TOKEN = await getAccessToken()
  const body = { query, env: CLOUD_ENV }
  const res = await axios.post(
    `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
    JSON.stringify(body),
  )
  return res.data
}

export { callCloudDB }
