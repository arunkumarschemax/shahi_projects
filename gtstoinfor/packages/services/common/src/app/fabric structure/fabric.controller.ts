import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AllBrandsResponseModel, AllFabricStructuresResponseModel, MasterBrandsResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FabricStructuresService } from './fabric.service';
import { FabricStructureIdRequest } from './dto/fabric.id-request';
import { FabricStructureRequest } from './dto/fabric.request';

@ApiTags('fabric-structures')
@Controller('fabric-structures')
export class FabricStructuresController {


    constructor(
        private fabricStructureService: FabricStructuresService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/createFabricStructure')
      @ApiBody({type:FabricStructureRequest})
      async createFabricStructure(@Body() fabricStructureDto:any): Promise<AllFabricStructuresResponseModel> {
          try {
           return await this.fabricStructureService.createFabricStructure(fabricStructureDto,false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(AllFabricStructuresResponseModel, error);
         }
       }

       @Post('/updateFabricStructure')
       @ApiBody({type:FabricStructureRequest})
       async updateFabricStructure(@Body() fabricStructureDto: any,@Req() request:Request): Promise<AllFabricStructuresResponseModel> {
         try {
           return await this.fabricStructureService.createFabricStructure(fabricStructureDto, true);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(AllFabricStructuresResponseModel, error);
         }
       }
       @Post('/getAllFabricStructures')
       // @UseGuards(AuthGuard('jwt'))
       async getAllFabricStructures(@Body() req:any): Promise<AllFabricStructuresResponseModel> {
         try {
           return await this.fabricStructureService.getAllFabricStructures();
         } catch (error) {
           return this.applicationExceptionHandler.returnException(AllFabricStructuresResponseModel, error);
         }
       }
       @Post('/getAllActiveFabricStructures')
       async getAllActiveFabricStructures(@Req() request: Request): Promise<AllFabricStructuresResponseModel> {
           try {
               return await this.fabricStructureService.getAllActiveFabricStructures();
           } catch (error) {
               return this.applicationExceptionHandler.returnException(AllFabricStructuresResponseModel, error)
           }
       }
       @Post('/activateOrDeactivateFabricStructure')
       @ApiBody({type:FabricStructureIdRequest})
       async activateOrDeactivateFabricStructure(@Body() IDReq: any): Promise<AllFabricStructuresResponseModel> {
           try {
               return await this.fabricStructureService.activateOrDeactivateFabricStructures(IDReq);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(AllFabricStructuresResponseModel, err);
           }
       }
       @Post('/getActiveFabricStructureById')
       @ApiBody({type:FabricStructureIdRequest})
       async getActiveFabricStructureById(@Body() IDReq: FabricStructureIdRequest): Promise<AllFabricStructuresResponseModel> {
           try {
               return await this.fabricStructureService.getActiveFabricStructureById(IDReq);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(AllFabricStructuresResponseModel, err);
           }
       }
      }
// function diskStorage(arg0: { destination: string; filename: (req: any, file: any, callback: any) => void; }): any {
//     throw new Error('Function not implemented.');
// }

