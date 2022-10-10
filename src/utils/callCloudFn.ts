import { WX_CONFIG } from 'src/config'
import axios from 'axios'
import { getAccessToken } from 'src/utils/getAccessToken'

const callCloudFn = async (fnName, params) => {
  const ACCESS_TOKEN = await getAccessToken()
  return await axios.post(
    `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${WX_CONFIG.cloudENV}&name=${fnName}`,
    {
      data: {
        ...params,
      },
    },
  )
}

export { callCloudFn }
