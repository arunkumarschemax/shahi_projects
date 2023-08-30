import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AllFabricFinishTypesResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import {FabricFinishTypesService} from './fabric-finish-types.service'
import { FabricFinishTypeIdRequest } from './dto/fabric-finish-type-id.request';
import { FabricFinishTypesDTO } from './dto/fabric-finish-types.dto';

@ApiTags('fabric-finish-types')
@Controller('fabric-finish-types')
export class FabricFinishTypesController {


    constructor(
        private fabricfinishtypeService: FabricFinishTypesService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/createFabricFinishTypes')
      @ApiBody({type:FabricFinishTypesDTO})
      async createFabricFinishTypes(@Body() fabricfinishtypeDto:any): Promise<AllFabricFinishTypesResponseModel> {
          try {
           return await this.fabricfinishtypeService.createFabricFinishType(fabricfinishtypeDto,false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(AllFabricFinishTypesResponseModel, error);
         }
       }

       @Post('/updateFabricFinishType')
       @ApiBody({type:FabricFinishTypesDTO})
       async updateFabricFinishType(@Body() fabricfinishDto: any,@Req() request:Request): Promise<AllFabricFinishTypesResponseModel> {
         try {
           return await this.fabricfinishtypeService.createFabricFinishType(fabricfinishDto, true);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(AllFabricFinishTypesResponseModel, error);
         }
       }
       @Post('/getAllFabricFinishType')
       // @UseGuards(AuthGuard('jwt'))
       async getAllFabricFinishType(@Body() req:any): Promise<AllFabricFinishTypesResponseModel> {
         try {
           return await this.fabricfinishtypeService.getAllFabricFinishTypes();
         } catch (error) {
           return this.applicationExceptionHandler.returnException(AllFabricFinishTypesResponseModel, error);
         }
       }
       @Post('/getAllActiveFabricFinishType')
       async getAllActiveFabricFinishType(@Req() request: Request): Promise<AllFabricFinishTypesResponseModel> {
           try {
               return await this.fabricfinishtypeService.getAllActiveFabricFinishTypes();
           } catch (error) {
               return this.applicationExceptionHandler.returnException(AllFabricFinishTypesResponseModel, error)
           }
       }
       @Post('/activateOrDeactivateFabricFinishTypes')
       @ApiBody({type:FabricFinishTypeIdRequest})
       async activateOrDeactivateFabricFinishTypes(@Body() IDReq: any): Promise<AllFabricFinishTypesResponseModel> {
           try {
               return await this.fabricfinishtypeService.activateOrDeactivateFabricFinishTypes(IDReq);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(AllFabricFinishTypesResponseModel, err);
           }
       }
       @Post('/getActiveFabricFinishTypesById')
       @ApiBody({type:FabricFinishTypeIdRequest})
       async getActiveFabricFinishTypesById(@Body() IDReq: FabricFinishTypeIdRequest): Promise<AllFabricFinishTypesResponseModel> {
           try {
               return await this.fabricfinishtypeService.getActiveFabricFinishTypeById(IDReq);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(AllFabricFinishTypesResponseModel, err);
           }
       }
      }
// function diskStorage(arg0: { destination: string; filename: (req: any, file: any, callback: any) => void; }): any {
//     throw new Error('Function not implemented.');
// }

