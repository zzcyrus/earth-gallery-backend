import { Injectable } from '@nestjs/common'
import { generate } from './lib'
import { BusLine } from './citynet.entity'

@Injectable()
export class CitynetService {
  async getBusLine(): Promise<BusLine[]> {
    const netData = await generate()
    return netData
  }
}
