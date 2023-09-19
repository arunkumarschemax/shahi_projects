import { Body, Controller, Post,UseInterceptors } from "@nestjs/common";
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import { ApiTags } from "@nestjs/swagger";
import * as fs from 'fs';
import {extname} from 'path';
import { ApplicationExceptionHandler } from "../../../../../../libs/backend-utils/src/exception-handling/application-exception-handler";
import { PriceService } from "./price-service";
import {PriceResponseModel} from '../../../../../../libs/shared-models/src/price-model'


@ApiTags("price")
@Controller("price")
export class PriceController {
  constructor(
    private readonly Service: PriceService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler

  ) { }

  @Post("postdata")
  async postdata(@Body() PriceDto: any): Promise<PriceResponseModel> {
    try {
      return await this.Service.postdata(PriceDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(
        PriceResponseModel,
        error
      );
    }
  }

  
  @Post("getdata")
  async getdata(): Promise<any> {
    return await this.Service.getdata();
  }



}



