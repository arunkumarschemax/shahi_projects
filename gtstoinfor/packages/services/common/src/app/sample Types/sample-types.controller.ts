import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { AllSampleTypesResponseModel, SampleTypesResponseModel } from "@project-management-system/shared-models";
import { SampleTypesService } from "./sample-types.service";
import { SampleTypesDto } from "./dto/sample-types.dto";
import { SampleTypesRequest } from "./dto/sample-types.request";

@ApiTags('SampleTypes')
@Controller('sampleType')
export class SampleTypesController{
    constructor(
        private sampleTypesService: SampleTypesService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}

    @Post('/createSampleType')
    @ApiBody({type:SampleTypesDto})
    async createSampleType(@Body() SampleTypesDto:any): Promise<SampleTypesResponseModel> {
    try {
        return await this.sampleTypesService.createSampleType(SampleTypesDto
            , false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(SampleTypesResponseModel, error);
      }
    }

    @Post('/updateSampleTypes')
    @ApiBody({type:SampleTypesDto})
    async updateOperationGroup(@Body() SampleTypesDto:any): Promise<SampleTypesResponseModel> {
    try {
        return await this.sampleTypesService.createSampleType(SampleTypesDto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(SampleTypesResponseModel, error);
      }
    }

    @Post('/getAllSampleTypes')
    async getAllOperationGroups(@Body() req:any): Promise<AllSampleTypesResponseModel> {
    try {
        return await this.sampleTypesService.getAllSampleTypes(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllSampleTypesResponseModel, error);
      }
    }

    @Post('/getAllActiveSampleTypes')
    async getAllActiveSampleTypes(): Promise<AllSampleTypesResponseModel> {
    try {
        return await this.sampleTypesService.getAllActiveSampleTypes();
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllSampleTypesResponseModel, error);
      }
    }

    @Post('/activateOrDeactivateSampleTypes')
    @ApiBody({type:SampleTypesRequest})
    async activateOrDeactivateSampleType(@Body() Req: any): Promise<SampleTypesResponseModel> {
    try {
        return await this.sampleTypesService.activateOrDeactivateSampleType(Req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(SampleTypesResponseModel, error);
      }
    }

    @Post('/getActiveSampleTypeById')
    async getActiveSampleTypeById(@Body() Req: any): Promise<SampleTypesResponseModel> {
    try {
        return await this.sampleTypesService.getActiveSampleTypeById(Req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(SampleTypesResponseModel, error);
      }
    }



}