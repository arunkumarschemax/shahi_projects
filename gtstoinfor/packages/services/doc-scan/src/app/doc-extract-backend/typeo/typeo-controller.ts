import { Body, Controller, Get, Post } from '@nestjs/common'
import { TypeoService } from './typeo-service';
import { ScanDto } from '../dtos/typeo.dto';


@Controller("/scan")
export class TypeoController {
  constructor(private readonly typeoService: TypeoService) {}

  @Post('/postdata')
  userdata(@Body() typeoDto: ScanDto) {
    const data = this.typeoService.userdata(typeoDto);
    console.log(data, '######');
    return data;
  }

  @Get('/getdata')
  async findAll(): Promise<any> {
    return await this.typeoService.getdata();
  }
}
