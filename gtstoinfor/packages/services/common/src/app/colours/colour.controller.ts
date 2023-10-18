import { ColourDropDownDto, ColourDropDownResponse, ColourResponseModel } from '@project-management-system/shared-models';
import { AllColourResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ColourRequestDto } from '@project-management-system/shared-models';
import { ColourDTO } from './dto/colour-dto';
import { ColourService } from './colour.service';
import { ColourRequest } from './dto/colour-request';


@ApiTags('colour')
@Controller('colurs')
export class ColourController{
    constructor(private colourService: ColourService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/createColour')
        async createColour(@Body() colourDto:ColourDTO,isUpdate:boolean=false): Promise<ColourResponseModel> {
        try {
            return await this.colourService.createColour(colourDto, false);
        } catch (error) {
            // return errorHandler(ProfitControlHeadResponseModel,error);
            return this.applicationExceptionHandler.returnException(ColourResponseModel, error);
        }
        }

        @Post('/updateColour')
        @ApiBody({type:ColourDTO})
        async updateColour(@Body() colourDto: any): Promise<ColourResponseModel> {
          try {
            return await this.colourService.createColour(colourDto, true);
          } catch (error) {
            // return errorHandler(ProfitControlHeadResponseModel, error);
            return this.applicationExceptionHandler.returnException(ColourResponseModel, error);
          }
        }

        @Post('/getAllColour')
        async getAllColour(): Promise<AllColourResponseModel> {
          try {
            return await this.colourService.getAllColours();
          } catch (error) {
            // return errorHandler(AllProfitControlHeadResponseModel, error);
            return this.applicationExceptionHandler.returnException(AllColourResponseModel, error);
          }
        }

        @Post('/getAllActiveColour')
  @ApiBody({type:ColourDTO})
  async getAllActiveColour(): Promise<AllColourResponseModel> {
    try {
      return await this.colourService.getAllActiveColour();
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllColourResponseModel, error);
    }
  }

  @Post('/activeteOrDeactivateColour')
  @ApiBody({type:ColourDTO})
  async activeteOrDeactivateColour( @Body()request:any ): Promise<AllColourResponseModel> {
    try {
      return await this.colourService.activateOrDeactivateColour(request);
    } catch (error) {
      // return errorHandler(AllProfitControlResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllColourResponseModel, error);
    }
  }

  @Post('/getActiveColourById')
  async getActiveColourById(profitreq:ColourRequest): Promise<AllColourResponseModel> {
    try {
      return await this.colourService.getActiveColourById(profitreq);
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllColourResponseModel, error);
    }
    
}
@Post('/getColourforDivisionDropDown')
async getColourforDivisionDropDown(@Body() req:any): Promise<ColourDropDownResponse> {
    try {
     return await this.colourService.getColourForDivisionDropDown(req);
   } catch (error) {
        return this.applicationExceptionHandler.returnException(ColourDropDownResponse, error);
   }
 }
}

