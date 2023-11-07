import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ComponentsDTO } from './dto/components.dto';
import { ComponentsService } from './components.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllComponentsResponseModel, ComponentResponseModel } from '@project-management-system/shared-models';
import { ComponentRequest } from './dto/components.request';


@ApiTags('components')
@Controller('components')
export class ComponentsController {
    constructor(private componentService: ComponentsService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createComponent')
    @ApiBody({type:ComponentsDTO})
    async createComponent(@Body() componentDto:any): Promise<ComponentResponseModel> {
    //  console.log('--------------------------------------')
    //  console.log(componentDto)
     // console.log('--------------------------------------')

    try {
        return await this.componentService.createComponent(componentDto, false);
    } catch (error) {
        // return errorHandler(ComponentResponseModel,error);
        return this.applicationExceptionHandler.returnException(ComponentResponseModel, error);
    }
    }
  
    @Post('/updateComponents')
    @ApiBody({type: ComponentsDTO})
    async updateComponents(@Body() componentDto: any): Promise<ComponentResponseModel> {
      try {
        return await this.componentService.createComponent(componentDto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(ComponentResponseModel, error);
      }
    }
  @Post('/getAllComponents')
  async getAllComponents(): Promise<AllComponentsResponseModel> {
    try {
      return await this.componentService.getAllComponents();
    } catch (error) {
      // return errorHandler(AllComponentsResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllComponentsResponseModel, error);
    }
  }
  @Post('/getAllActiveComponents')
  async getAllActiveComponents(): Promise<AllComponentsResponseModel> {
    try {
      return await this.componentService.getAllActiveComponents();
    } catch (error) {
      // return errorHandler(AllComponentsResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllComponentsResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateComponent')
  @ApiBody({type: ComponentRequest})
  async activateOrDeactivateComponent(@Body() req: any): Promise<ComponentResponseModel> {
    try {
      return await this.componentService.activateOrDeactivateComponent(req);
    } catch (error) {
      // return errorHandler(AllComponentsResponseModel, error);
      return this.applicationExceptionHandler.returnException(ComponentResponseModel, error);
    }
  }

  @Post('/getActiveComponentById')
  async getActiveComponentById(@Body()req:ComponentRequest ): Promise<ComponentResponseModel> {
      try {
          return await this.componentService.getActiveComponentById(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(ComponentResponseModel, err);
      }
  }
}
