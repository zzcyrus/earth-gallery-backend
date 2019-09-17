import axios from 'axios'
import * as cheerio from 'cheerio'
import config from '../../config'
import * as lodash from 'lodash'
import gcoord from 'gcoord'
import { Logger } from '@nestjs/common'

const loopUnit = 1800
const cityEn = 'hangzhou'
const cityCh = '杭州'
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
}

const getBusLine = async () => {
  const lines = await getAllLines()
  Logger.log(`[CITYNET - get ${lines.length}] bus line`)
  const results = []
  for (const line of lines) {
    if (!line) {
      continue
    }
    const data = await getLineInfo(line)
    Logger.log(`[CITYNET - get bus ${line}`)
    const busLines = lodash.get(data, 'buslines[0].polyline', '').split(';')
    if (busLines.length <= 1) {
      continue
    }
    const price = lodash.get(data, 'buslines[0].total_price', 0)
    let total = loopUnit
    const timestamps = busLines.map((_: any) => {
      return (total -= Math.random() * (1800 / busLines.length))
    })
    const result = {
      vendor: Number(price),
      path: busLines
        .map((item: string) => item.split(',').map(Number))
        .map((item: number[]) => {
          // 高德地图坐标需要转换成标准wg84
          return gcoord.transform(item, gcoord.GCJ02, gcoord.WGS84)
        }),
      timestamps: timestamps.reverse(),
    }
    results.push(result)
  }
  return results
}

const getAllLines = async () => {
  const { data: html } = await axios.get(`http://${cityEn}.8684.cn`, {
    headers,
  })
  const page = cheerio.load(html)
  const lineDom = page('.list', '.pl10')[0].children
  const lineReqs = lineDom.map(item => {
    return axios.get(`http://${cityEn}.8684.cn${item.attribs.href}`)
  })
  const res = await Promise.all([lineReqs[0]])
  const result = []
  res.map(({ data }) => {
    if (data) {
      const numberPage = cheerio.load(data)
      numberPage('a[href*="/x_"]').each(function() {
        const text = numberPage(this).text()
        result.push(text)
      })
    }
  })
  return result
}

const getLineInfo = async lineName => {
  const url = 'https://restapi.amap.com/v3/bus/linename?'
  const params = {
    s: 'rsv3',
    extensions: 'all',
    key: config.amapKey,
    output: 'json',
    city: cityCh,
    keywords: lineName,
  }
  const { data } = await axios.get(url, { params })
  return data || null
}

export const generate = async () => {
  const net = await getBusLine()
  return net
}
