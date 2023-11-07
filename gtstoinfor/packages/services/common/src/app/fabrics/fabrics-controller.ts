import { CommonResponseModel, FabricsResponseModel } from '@project-management-system/shared-models';
import { AllFabricsResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { FabricsDTO } from './dto/fabrics.dto';
import { FabricsService } from './fabrics-service';
import { FabricsRequest } from './dto/fabrics-request';

@ApiTags('fabrics_Name')
@Controller('fabrics_Name')
export class FabricsController {
  constructor(private fabricsService: FabricsService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler
  ) { }

  @Post('/createFabrics')
  @ApiBody({ type: FabricsDTO })
  async createFabrics(@Body() FabricsDTOO: any, isUpdate: boolean = false): Promise<FabricsResponseModel> {
    console.log(FabricsDTOO, "999999999999")
    try {
      return await this.fabricsService.createFabrics(FabricsDTOO, false);
    } catch (error) {
      // return errorHandler(ProfitControlHeadResponseModel,error);
      return this.applicationExceptionHandler.returnException(FabricsResponseModel, error);
    }
  }

  @Post('/updateFabrics')
  @ApiBody({ type: FabricsDTO })
  async updateFabrics(@Body() FabricsDTO: any): Promise<FabricsResponseModel> {
    try {
      return await this.fabricsService.createFabrics(FabricsDTO, true);
    } catch (error) {
      // return errorHandler(ProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(FabricsResponseModel, error);
    }
  }

  @Post('/getAllFabrics')
  async getAllFabrics(): Promise<AllFabricsResponseModel> {
    try {
      return await this.fabricsService.getAllFabrics();
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllFabricsResponseModel, error);
    }
  }

  @Post('/getAllActiveFabrics')
  @ApiBody({ type: FabricsDTO })
  async getAllActiveFabrics(): Promise<AllFabricsResponseModel> {
    try {
      return await this.fabricsService.getAllActiveFabrics();
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllFabricsResponseModel, error);
    }
  }

  @Post('/activeteOrDeactivateFabrics')
  @ApiBody({ type: FabricsDTO })
  async activeteOrDeactivateFabrics(@Body() request: any): Promise<AllFabricsResponseModel> {
    try {
      return await this.fabricsService.activateOrDeactivateFabrics(request);
    } catch (error) {
      // return errorHandler(AllProfitControlResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllFabricsResponseModel, error);
    }
  }

  @Post('/getActiveFabricsById')
  async getActiveFabricsById(req: FabricsRequest): Promise<AllFabricsResponseModel> {
    try {
      return await this.fabricsService.getActiveFabricsById(req);
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllFabricsResponseModel, error);
    }

  }
  
}

