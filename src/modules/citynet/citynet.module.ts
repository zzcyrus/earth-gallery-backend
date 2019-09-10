import { Module } from '@nestjs/common'
import { CitynetController } from './citynet.controller'
import { CitynetService } from './citynet.service'

@Module({
  imports: [],
  controllers: [CitynetController],
  providers: [CitynetService],
})
export class CitynetModule {}
