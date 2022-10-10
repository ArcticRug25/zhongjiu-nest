import { WX_CONFIG } from 'src/config'
import { ConfigType } from '@nestjs/config'
import { getAccessToken } from './getAccessToken.js'
import fs from 'fs'

const cloudStorage = {
  async download(ctx, fileList) {
    const ACCESS_TOKEN = await getAccessToken()
    const options = {
      method: 'POST',
      uri: `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`,
      body: {
        env: WX_CONFIG.cloudENV,
        file_list: fileList,
      },
      json: true,
    }

    // return await rp(options)
    //   .then((res) => {
    //     return res
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //   })
  },

  async upload(ctx) {
    // 1、请求地址
    const ACCESS_TOKEN = await getAccessToken()
    const file = ctx.request.files.file
    const path = `swiper/${Date.now()}-${Math.random()}-${file.name}`
    const options = {
      method: 'POST',
      uri: `https://api.weixin.qq.com/tcb/uploadfile?access_token=${ACCESS_TOKEN}`,
      body: {
        path,
        env: WX_CONFIG.cloudENV,
      },
      json: true, // Automatically stringifies the body to JSON
    }
    //  请求参数的
    const info: any = {}
    // const info = await rp(options)
    //   .then(function (res) {
    //     return res
    //   })
    //   .catch(function (err) {})
    // console.log(info)
    // 2、上传图片
    const params = {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      uri: info.url,
      formData: {
        key: path,
        Signature: info.authorization,
        'x-cos-security-token': info.token,
        'x-cos-meta-fileid': info.cos_file_id,
        file: fs.createReadStream(file.path),
      },
      json: true,
    }
    // await rp(params)
    return info.file_id
  },

  async delete(ctx, fileid_list) {
    const ACCESS_TOKEN = await getAccessToken()
    const options = {
      method: 'POST',
      uri: `https://api.weixin.qq.com/tcb/batchdeletefile?access_token=${ACCESS_TOKEN}`,
      body: {
        env: WX_CONFIG.cloudENV,
        fileid_list: fileid_list,
      },
      json: true,
    }

    // return await rp(options)
    //   .then((res) => {
    //     return res
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //   })
  },
}

module.exports = cloudStorage
