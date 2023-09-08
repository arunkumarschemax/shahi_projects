import { Body, Controller, Post,UseInterceptors } from "@nestjs/common";
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import { ApiTags } from "@nestjs/swagger";
import { ScanService } from "./typeo-service";
import * as fs from 'fs';
import {extname} from 'path';
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