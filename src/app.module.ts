import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CitynetModule } from './modules/citynet/citynet.module'

@Module({
  imports: [CitynetModule],
  controllers: [AppController],
})
export class AppModule {}
