import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FabricTypeDto } from './dto/fabric-type.dto';
import { FabricTypeService } from './fabric-type.service';
import { AllFabricTypesResponse,FabricTypeResponse } from '@project-management-system/shared-models';
import { FabricTypeRequest } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Controller('fabricType')
@ApiTags('fabricType')
export  class FabricTypeController {
    constructor (
        private fabricService: FabricTypeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,

    ){}

     /**
     * creates  a FabricTypetem 
     * @param FabricType FabricType DTO
     * @returns FabricTypeResponse
     */
     @Post('/createFabricType')
       @ApiBody({type:FabricTypeDto})
       async createFabricType(@Body() fabricDto:any,isUpdate:boolean=false,@Req() request:Request): Promise<FabricTypeResponse> {
        console.log(fabricDto,'aaaaaaaaaaaaaaaaaaaaa')
           try {
            return await this.fabricService.createFabricType(fabricDto,false);
          } catch (error) {
               return this.applicationExceptionHandler.returnException(FabricTypeResponse, error);
          }
        }

     /**
     *  updates a  value FabricType
     * @param FabricType FabricType DTO
     * @returns FabricTypeResponse
     */
     @Post('/updateFabricType')
     @ApiBody({type:FabricTypeDto})
     async updateFabricType(@Body() fabricDto:any,isUpdate:boolean=true,@Req() request:Request): Promise<FabricTypeResponse> {
         try {
          return await this.fabricService.createFabricType(fabricDto,true);
        } catch (error) {
             return this.applicationExceptionHandler.returnException(FabricTypeResponse, error);
        }
      }
      /**
     * gets all the Value FabricType
     * @returns AllIte, which returns all the Value FabricType  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
     */
      @Post('/getAllFabricType')
      async getAllFabricType(): Promise<AllFabricTypesResponse> {
          try {
              return await this.fabricService.getAllFabricType();
          } catch (error) {
              return this.applicationExceptionHandler.returnException(AllFabricTypesResponse, error);
          }
      }
      @Post('/getAllActiveFabricType')
      async getAllActiveFabricType(): Promise<AllFabricTypesResponse> {
          try {
           return await this.fabricService.getAllActiveFabricType();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(AllFabricTypesResponse, error);
         }
       }
       @Post('/activateOrDeactivateFabricType')
       @ApiBody({type:FabricTypeRequest})
       async activateOrDeactivateFabricType(@Body()req: any): Promise<FabricTypeResponse> {
           try {
            return await this.fabricService.activateOrDeactivateFabricType(req);
          } catch (error) {
               return error;
          }
        }
 
  
}