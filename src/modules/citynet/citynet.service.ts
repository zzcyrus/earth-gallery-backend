import { Injectable } from '@nestjs/common'

@Injectable()
export class CitynetService {
  getHello(): string {
    return 'Hello World!'
  }
}
