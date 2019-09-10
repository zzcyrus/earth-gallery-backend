import { Controller, Get } from '@nestjs/common'
import { CitynetService } from './citynet.service'

@Controller()
export class CitynetController {
  constructor(private readonly appService: CitynetService) {}

  @Get('citynet')
  getHello(): string {
    return this.appService.getHello()
  }
}
