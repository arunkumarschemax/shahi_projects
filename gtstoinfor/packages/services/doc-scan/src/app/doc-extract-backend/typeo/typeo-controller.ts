// import { Body, Controller, Get, Post } from '@nestjs/common'
// import { ScanService } from './typeo-service';
// import { ScanDto } from '../dtos/typeo.dto';
// import { ApiTags } from '@nestjs/swagger';



// @ApiTags("docs")
// @Controller("docs")
// export class ScanController {
//   constructor(private readonly scanService: ScanService) {}

//   @Post("postdata")
//   async postdata(@Body() scanDto: ScanDto):Promise<any> {
//   return await this.scanService.postdata(scanDto)
//   }

//   @Get("getdata")
//   async get(): Promise<any> {
//     return await this.scanService.getdata();
//   }
// }


import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ScanService } from "./typeo-service";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApplicationExceptionHandler } from "../../../../../../libs/backend-utils/src/exception-handling/application-exception-handler";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {ScanResponseModel} from "../../../../../../libs/shared-models/src/shared-model/scan-response-object";
// import { ScanDto } from "../dtos/typeo.dto";

@ApiTags("docs")
@Controller("docs")
export class ScanController {
  constructor(
    private readonly Service: ScanService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler

  ) { }

  // @Post("postdata")
  // async postdata(@Body() scanDto: ScanDto): Promise<any> {
  //     return await this.Service.postdata(scanDto);
  //   }

  @Post("postdata")
  async postdata(@Body() ScanDto: any): Promise<ScanResponseModel> {
    try {
      return await this.Service.postdata(ScanDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(
        ScanResponseModel,
        error
      );
    }
  }

  
  @Post("getdata")
  async getdata(): Promise<any> {
    return await this.Service.getdata();
  }

}