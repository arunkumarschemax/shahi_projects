import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UomService } from './uom.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { UomRequest } from './dto/uom.request';
import { UomCategoryRequest, UomIdRequest, UomResponse } from '@project-management-system/shared-models';

@ApiTags('Uoms')
@Controller('Uoms')
export class UomController {
    constructor(
        private readonly uomService: UomService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ) { }


@Post('/createUom')
async createUom(@Body() uomReq: UomRequest): Promise<UomResponse> {
  try {
    return await this.uomService.createUom(uomReq);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(UomResponse, error);
  }
}

@Post('/getAllUoms')
async getAllUoms(): Promise<UomResponse>{
  try {
    return await this.uomService.getAllUoms();
  } catch (error) {
    return this.applicationExceptionHandler.returnException(UomResponse, error);
  }
}

@Post('/getAllActiveUoms')
async getAllActiveUoms(): Promise<UomResponse>{
  try {
    return await this.uomService.getAllActiveUoms();
  } catch (error) {
    return this.applicationExceptionHandler.returnException(UomResponse, error);
}
}

@Post('/getUomById')
async getUomById(@Body() req: UomIdRequest): Promise<UomResponse>{
  try {
    return await this.uomService.getUomById(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(UomResponse, error);
}
}

@Post('/getUomByCategory')
async getUomByCategory(@Body() req: UomCategoryRequest): Promise<UomResponse>{
  try {
    return await this.uomService.getUomByCategory(req);
  } catch (error) {
    return this.applicationExceptionHandler.returnException(UomResponse, error);
}
}
  
}


