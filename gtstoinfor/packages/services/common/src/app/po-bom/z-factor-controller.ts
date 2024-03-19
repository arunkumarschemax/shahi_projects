import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from 'libs/backend-utils';

import { AllHMStyleResponseModel, CommonResponseModel, HMStylesModelDto } from '@project-management-system/shared-models';
import { ZFactorServices } from './z-factors-service';
import { zFactorsDto } from './dto/z-factors-dto';



@ApiTags('z-factors')
@Controller('z-factors-controller')

export class ZfactorsController {
  constructor(private zFactorService: ZFactorServices,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler) { }
   
   
    @Post('/createZfactors')
    async createZfactors(@Body() req: zFactorsDto): Promise<CommonResponseModel> {
        try {
            return this.zFactorService.createZfactors(req)
        }
        catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }
 
}