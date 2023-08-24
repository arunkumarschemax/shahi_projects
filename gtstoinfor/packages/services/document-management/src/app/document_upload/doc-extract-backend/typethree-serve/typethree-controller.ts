import { Body, Controller, Get, Post } from '@nestjs/common';
import { TypethreeService } from './typethree-service';
import { TypethreeDto } from '../dtos/typethree.dto';

@Controller('/typethree')
export class TypethreeController {
  constructor(private readonly typethreeService: TypethreeService) {}

  @Post('/postdata')
  userdata(@Body() typethreeDto: TypethreeDto) {
    const data = this.typethreeService.userdata(typethreeDto);
    console.log(data, '######');
    return data;
  }

 
  @Get('/getdata')
  async findAll(): Promise<any> {
    return await this.typethreeService.getdata();
  }
}
