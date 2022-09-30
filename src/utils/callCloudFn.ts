import axios from 'axios'
import { getAccessToken } from 'src/utils/getAccessToken'
import { CLOUD_ENV } from './config'

const callCloudFn = async (fnName, params) => {
  const ACCESS_TOKEN = await getAccessToken()
  return await axios.post(
    `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${CLOUD_ENV}&name=${fnName}`,
    {
      data: {
        ...params,
      },
    },
  )
}

export { callCloudFn }
