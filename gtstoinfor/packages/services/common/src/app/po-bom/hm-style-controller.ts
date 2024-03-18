import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from 'libs/backend-utils';
import { HMStyleService } from './hm-style-service';
import { HMStyleDto } from './dto/hm-style-dto';
import { AllHMStyleResponseModel } from '@project-management-system/shared-models';


@ApiTags('hm-style')
@Controller('hm-style-controller')

export class HMStyleController {
  constructor(private hmStyleService: HMStyleService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler) { }

  @Post('/createHMStyle')
  async createHMStyle(@Body() HMStylesModelDto: any): Promise<AllHMStyleResponseModel> {
    try {
      return await this.hmStyleService.createHMStyle(HMStylesModelDto);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllHMStyleResponseModel, error);
    }
  }
}