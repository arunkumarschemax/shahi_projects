
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BomService } from "./bom.service";
import {  BomTrimResponseModel } from "@project-management-system/shared-models";
import { BomTrimDto } from "./dto/bom-trim.dto";
 

@ApiTags('bomTrim')
@Controller('bomTrim')
export class BomController {
    constructor(
      private readonly bomServie: BomService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

      @ApiBody({type:BomTrimDto})   
    @Post('/createBomTrim')
    async createBomTrim(@Body() req:any): Promise<BomTrimResponseModel> {
        // console.log(req)
        try {
            return await this.bomServie.createBomTrim(req, false)
        } catch (error) {
            return (this.applicationExceptionHandler.returnException(BomTrimResponseModel, error));
        }
    }




    }