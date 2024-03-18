import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from 'libs/backend-utils';
import { HMStyleService } from './hm-style-service';
import { HMStyleDto } from './dto/hm-style-dto';
import { AllHMStyleResponseModel, HMStylesModelDto } from '@project-management-system/shared-models';


@ApiTags('hm-style')
@Controller('hm-style-controller')

export class HMStyleController {
  constructor(private hmStyleService: HMStyleService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler) { }

  @Post('/createHMStyle')
  @ApiBody({type:HMStylesModelDto})
  async createHMStyle(@Body() hMStylesModelDto: any): Promise<AllHMStyleResponseModel> {
    try {
      return await this.hmStyleService.createHMStyle(hMStylesModelDto);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllHMStyleResponseModel, error);
    }
  }

  @Post('/getHMStyle')
    async getHMStyle(): Promise<AllHMStyleResponseModel> {
      const data=await this.hmStyleService.getHMStyle()
      return  data
  }

}