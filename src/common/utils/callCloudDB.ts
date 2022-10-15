import axios from 'axios'
import { WX_CONFIG } from 'src/common/config'
import { getAccessToken } from 'src/common/utils/getAccessToken'

const callCloudDB = async (fnName, query = {}) => {
  const ACCESS_TOKEN = await getAccessToken()
  const body = { query, env: WX_CONFIG.cloudENV }
  const res = await axios.post(
    `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
    JSON.stringify(body),
  )
  return res.data
}

export { callCloudDB }
