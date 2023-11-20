import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { type } from 'os';
import { SampleSubTypesService } from './sample-sub-types.service';
import { SampleSubTypeDTO } from './dto/sample-sub-types.dto';
import { AllSampleSubTypesResponseModel, SampleSubTypesResponseModel } from '@project-management-system/shared-models';
import { SampleSubTypeRequest } from './dto/sample-sub-types.request';

@ApiTags('sampleSubTypes')
@Controller('sampleSubTypes')
export class SampleSubTypesController {


    constructor(
        private sampleSubTypeService: SampleSubTypesService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/createSampleSubType')
      @ApiBody({type:SampleSubTypeDTO})
      async createSampleSubType(@Body() sampleSubTypeDto :any): Promise<SampleSubTypesResponseModel> {
        console.log('hi--------')
          try {
           return await this.sampleSubTypeService.createSampleSubType(sampleSubTypeDto,false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(SampleSubTypesResponseModel, error);
         }
       }

       @Post('/updateSampleSubTypes')
       async updateSampleSubTypes(@Body() sampleSubTypeDto: SampleSubTypeDTO,@Req() request:Request): Promise<SampleSubTypesResponseModel> {
         try {
           return await this.sampleSubTypeService.createSampleSubType(sampleSubTypeDto, true);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(SampleSubTypesResponseModel, error);
         }
       }
       @Post('/getAllSampleSubTypes')
       // @UseGuards(AuthGuard('jwt'))
       async getAllSampleSubTypes(@Body() req?:UserRequestDto): Promise<AllSampleSubTypesResponseModel> {
         try {
           return await this.sampleSubTypeService.getAllSampleSubTypes(req);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(AllSampleSubTypesResponseModel, error);
         }
       }
       @Post('/getAllActiveSampleSubTypes')
       async getAllActiveSampleSubTypes(@Req() request: Request): Promise<AllSampleSubTypesResponseModel> {
           try {
               return await this.sampleSubTypeService.getAllActiveSampleSubTypes();
           } catch (error) {
               return this.applicationExceptionHandler.returnException(AllSampleSubTypesResponseModel, error)
           }
       }
       @Post('/activateOrDeactivateSampleSubType')
       @ApiBody({type:SampleSubTypeRequest})
       async activateOrDeactivateSampleSubType(@Body() sampleSubType: any): Promise<SampleSubTypesResponseModel> {
           try {
            console.log(sampleSubType,'controller----------')
               return await this.sampleSubTypeService.activateOrDeactivateSampleSubType(sampleSubType);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(SampleSubTypesResponseModel, err);
           }
       }
       @Post('/getActivesampleSubTypeById')
       @ApiBody({type:SampleSubTypeRequest})

       async getActivesampleSubTypeById(@Body() sampleSubType: any): Promise<SampleSubTypesResponseModel> {
           try {
               return await this.sampleSubTypeService.getActivesampleSubTypeById(sampleSubType);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(SampleSubTypesResponseModel, err);
           }
       }
      }
// function diskStorage(arg0: { destination: string; filename: (req: any, file: any, callback: any) => void; }): any {
//     throw new Error('Function not implemented.');
// }

