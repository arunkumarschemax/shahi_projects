import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FabricSubTypeDto } from './dto/fabric-sub-type.dto';
import { FabricSubTypeService } from './fabric-sub-type.service';
import { FabricSubTypeRequest } from './dto/fabric-sub-type.request';
import { FabricSubTypeDetailsResponse,AllFabricSubTypeResponse,FabricSubTypeDropDownResponseModel ,FabricSubTypeDropDownDto, FabricSubTypeResponse} from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';


@Controller ('fabric-sub-type')
@ApiTags('fabric-sub-type')
export  class FabricsubTypeController {
    constructor (
        private fabricsubtypeservice: FabricSubTypeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,

    ){}

    
      /**
     * creates  a FabricSubType
     * @param FabricSubType FabricSubType DTO
     * @returns FabricSubTypeResponse
     */

      @Post('/createFabricSubType')
       @ApiBody({type:FabricSubTypeDto})
       async createFabricSubType(@Body() fabricSubDto:any,isUpdate:boolean=false,@Req() request:Request): Promise<FabricSubTypeResponse> {
           try {
            return await this.fabricsubtypeservice.createFabricSubType(fabricSubDto,false);
          } catch (error) {
               return this.applicationExceptionHandler.returnException(FabricSubTypeResponse, error);
          }
        }

        @Post('/getAllFabricSubType')
        async getAllFabricSubType(): Promise<AllFabricSubTypeResponse> {
            try {
                return await this.fabricsubtypeservice.getAllFabricSubType();
            } catch (error) {
                return this.applicationExceptionHandler.returnException(AllFabricSubTypeResponse, error);
            }
        }

        @Post('/updateFabricSubType')
        @ApiBody({type:FabricSubTypeDto})
        async updateFabricSubType(@Body() fabricSubtypeDto:any,isUpdate:boolean=true,@Req() request:Request): Promise<FabricSubTypeResponse> {
            try {
             return await this.fabricsubtypeservice.createFabricSubType(fabricSubtypeDto,true);
           } catch (error) {
                return this.applicationExceptionHandler.returnException(FabricSubTypeResponse, error);
           }
         }

         @Post('/getAllFabricSubTypeDropDown')
         async getAllFabricSubTypeDropDown(): Promise<FabricSubTypeDropDownResponseModel> {
             try {
              return await this.fabricsubtypeservice.getAllFabricSubTypeDropDown();
            } catch (error) {
                 return this.applicationExceptionHandler.returnException(FabricSubTypeDropDownResponseModel, error);
            }
          }

          @Post('/getFabricSubTypeForFabricTypeDropDown')
    async getFabricSubTypeForFabricTypeDropDown(@Body() req:any): Promise<FabricSubTypeDropDownResponseModel> {
        try {
         return await this.fabricsubtypeservice.getFabricSubTypeForFabricTypeDropDown(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(FabricSubTypeDropDownResponseModel, error);
       }
     }
     
     @Post('/getFabricSubTypeForId')
     async getFabricSubTypeForId(@Body() req:FabricSubTypeRequest): Promise<FabricSubTypeDropDownDto> {
         try {
          return await this.fabricsubtypeservice.getFabricSubTypeForId(req.fabricSubTypeId);
        } catch (error) {
             return error;
        }
      }

      @Post('/activateOrDeactivateFabricSubType')
      @ApiBody({type:FabricSubTypeRequest})
      async activateOrDeactivateFabricSubType(@Body()itemReq: any): Promise<FabricSubTypeResponse> {
          try {
           return await this.fabricsubtypeservice.activateOrDeactivateFabricSubType(itemReq);
         } catch (error) {
              return error;
         }
       }
       @Post('/getFabricSubTypeAginstType')
       async getFabricSubTypeAginstType(@Body()fabricTyepId: any): Promise<FabricSubTypeResponse> {
           try {
            return await this.fabricsubtypeservice.getFabricSubTypeAginstType(fabricTyepId);
          } catch (error) {
               return error;
          }
        }
}