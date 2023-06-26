import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData() {
    try{
      return await this.appService.testInsert();
    }catch(err){
      return err
    }
  }
}
