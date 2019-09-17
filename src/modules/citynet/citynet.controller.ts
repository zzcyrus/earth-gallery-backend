import { Controller, Get } from '@nestjs/common'
import { CitynetService } from './citynet.service'
import { BusLine } from './citynet.entity'

@Controller()
export class CitynetController {
  constructor(private readonly appService: CitynetService) {}

  @Get('citynet')
  async getBusLine(): Promise<BusLine[]> {
    const result = await this.appService.getBusLine()
    return result
  }
}
