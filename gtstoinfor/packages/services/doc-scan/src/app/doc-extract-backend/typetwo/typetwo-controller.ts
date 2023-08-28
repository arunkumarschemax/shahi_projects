import { Body, Controller, Get, Post } from '@nestjs/common';
import { TypetwoService } from './typetwo-service';
import { TypetwoDto } from '../dtos/typetwo.dto';

@Controller('/typetwo')
export class TypetwoController {
  constructor(private readonly typetwoService: TypetwoService) {}

  @Post('/postdata')
  userdata(@Body() typetwoDto: TypetwoDto) {
    const data = this.typetwoService.userdata(typetwoDto);
    console.log(data, '######');
    return data;
  }


  @Get('/getdata')
  async findAll(): Promise<any> {
    return await this.typetwoService.getdata();
  }
}