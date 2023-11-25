import { CommonResponseModel, LevelResponseModel } from '@project-management-system/shared-models';
import { AllLevelResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { All, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { LevelsDTO } from './dto/level.dto';
import { LevelService } from './level.service';
import { LevelsRequest } from './dto/level.req';

@ApiTags('level_name')
@Controller('level_name')
export class LevelController {
  constructor(private levelService: LevelService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler
  ) { }

  @Post('/createLevel')
  @ApiBody({ type: LevelsDTO })
  async c(@Body() LevelsDTO: any, isUpdate: boolean = false): Promise<LevelResponseModel> {
    console.log(LevelsDTO, "999999999999")
    try {
      return await this.levelService.createLevel(LevelsDTO, false);
    } catch (error) {
      // return errorHandler(ProfitControlHeadResponseModel,error);
      return this.applicationExceptionHandler.returnException(LevelResponseModel, error);
    }
  }

  @Post('/updateLevel')
  @ApiBody({ type: LevelsDTO })
  async updateLevel(@Body() LevelsDTO: any): Promise<LevelResponseModel> {
    try {
      return await this.levelService.createLevel(LevelsDTO, true);
    } catch (error) {
      // return errorHandler(ProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(LevelResponseModel, error);
    }
  }

  @Post('/getAllLevel')
  async getAllLevel(): Promise<AllLevelResponseModel> {
    try {
      return await this.levelService.getAllLevel();
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllLevelResponseModel, error);
    }
  }

  @Post('/getAllActiveLevel')
  @ApiBody({ type: LevelsDTO })
  async getAllActiveLevel(): Promise<AllLevelResponseModel> {
    try {
      return await this.levelService.getAllActiveLevel();
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllLevelResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateLevel')
  @ApiBody({ type: LevelsDTO })
  async activateOrDeactivateLevel(@Body() request: any): Promise<AllLevelResponseModel> {
    try {
      return await this.levelService.activateOrDeactivateLevel(request);
    } catch (error) {
      // return errorHandler(AllProfitControlResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllLevelResponseModel, error);
    }
  }

  @Post('/getActiveLevelById')
  async getActiveLevelById(req: LevelsRequest): Promise<AllLevelResponseModel> {
    try {
      return await this.levelService.getActiveLevelById(req);
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllLevelResponseModel, error);
    }

  }
  
}

