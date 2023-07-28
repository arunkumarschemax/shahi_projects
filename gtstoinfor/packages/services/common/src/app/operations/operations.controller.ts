import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AllBrandsResponseModel, AllOperationsResponseModel, MasterBrandsResponseModel, OperationsRequest, OperationsResponseModel } from '@project-management-system/shared-models';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { type } from 'os';
import { OperationsService } from './operation.service';
import { OperationRequest } from './dto/operation.request';

@ApiTags('operations')
@Controller('operations')
export class OperationsController {


    constructor(
        private operationService: OperationsService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/createOperation')
      async createOperation(@Body() operattionDto :any): Promise<OperationsResponseModel> {
        console.log('hi--------')
          try {
           return await this.operationService.createOperations(operattionDto,false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(OperationsResponseModel, error);
         }
       }

       @Post('/updateOperations')
       async updateBrands(@Body() operationsDto: any,@Req() request:Request): Promise<OperationsResponseModel> {
         try {
           console.log(request);
           return await this.operationService.createOperations(operationsDto, true);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(OperationsResponseModel, error);
         }
       }
       @Post('/getAllOperations')
       // @UseGuards(AuthGuard('jwt'))
       async getAllOperations(@Body() req?:UserRequestDto): Promise<AllOperationsResponseModel> {
         try {
           return await this.operationService.getAllOperations(req);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(AllOperationsResponseModel, error);
         }
       }
       @Post('/getAllActiveOpreations')
       async getAll(@Req() request: Request): Promise<AllOperationsResponseModel> {
           try {
               return await this.operationService.getAllOperations();
           } catch (error) {
               return this.applicationExceptionHandler.returnException(AllOperationsResponseModel, error)
           }
       }
       @Post('/activateOrDeactivateOperations')
       @ApiBody({type:OperationsRequest})
       async activateOrDeactivateOperations(@Body() operationsDto: any): Promise<OperationsResponseModel> {
           try {
            console.log(operationsDto,'controller----------')
               return await this.operationService.activateOrDeactivateOperations(operationsDto);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(OperationsResponseModel, err);
           }
       }
       @Post('/getActiveOperationsById')
       async getActiveOperations(@Body() Operation: any): Promise<OperationsResponseModel> {
           try {
               return await this.operationService.getAllActiveOperations();
           } catch (err) {
               return this.applicationExceptionHandler.returnException(OperationsResponseModel, err);
           }
       }
      }
// function diskStorage(arg0: { destination: string; filename: (req: any, file: any, callback: any) => void; }): any {
//     throw new Error('Function not implemented.');
// }

