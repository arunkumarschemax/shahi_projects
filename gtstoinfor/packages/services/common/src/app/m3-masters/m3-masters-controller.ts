import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, M3MastersResponseModel, OperationSequenceResponse } from "@project-management-system/shared-models";
import { M3MastersService } from "./m3-masters-service";

@ApiTags('m3-masters-controller')
@Controller('m3-masters')
export class M3MastersController{
    constructor(
        private m3MastersService: M3MastersService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}

    @Post('/create')
    async create(@Body() req:any): Promise<M3MastersResponseModel> {
    try {
        return await this.m3MastersService.create(req,false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(M3MastersResponseModel, error);
      }
    }

    @Post('/update')
    async update(@Body() req:any): Promise<M3MastersResponseModel> {
    try {
        return await this.m3MastersService.create(req,true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(M3MastersResponseModel, error);
      }
    }

    @Post('/getAll')
    async getAll(): Promise<M3MastersResponseModel> {
    try {
        return await this.m3MastersService.getAll();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(M3MastersResponseModel, error);
      }
    }

    @Post('/getByCategory')
    async getByCategory(@Body() req:any): Promise<M3MastersResponseModel> {
    try {
        return await this.m3MastersService.getByCategory(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(M3MastersResponseModel, error);
      }
    }
}