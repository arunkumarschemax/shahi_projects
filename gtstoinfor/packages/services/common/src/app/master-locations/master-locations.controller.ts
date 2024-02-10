import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MasterLocationRequest } from './dto/master-locations.request';
import { MasterLocationsService } from './master-locations.service';
import { AllLocationsResponseModel, MasterLocationsResponseModel } from '@project-management-system/shared-models';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { LocationsDTO } from './dto/master-locations.dto';
import { type } from 'os';

@ApiTags('master-locations')
@Controller('master-locations')
export class MasterLocationsController {


    constructor(
        private LocationService: MasterLocationsService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/createMasterLocation')
      @ApiBody({type:LocationsDTO})
      async createMasterLocation(@Body() LocationDto:any): Promise<MasterLocationsResponseModel> {
          try {
           return await this.LocationService.createMasterLocation(LocationDto,false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(MasterLocationsResponseModel, error);
         }
       }

       @Post('/updateLocations')
       @ApiBody({type:LocationsDTO})
       async updateLocations(@Body() masterLocationsDto:any,@Req() request:Request): Promise<MasterLocationsResponseModel> {
         try {
           return await this.LocationService.createMasterLocation(masterLocationsDto, true);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(MasterLocationsResponseModel, error);
         }
       }
       @Post('/getAllLocations')
       // @UseGuards(AuthGuard('jwt'))
       async getAllLocations(@Body() req?:UserRequestDto): Promise<AllLocationsResponseModel> {
         try {
           return await this.LocationService.getAllLocations(req);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(AllLocationsResponseModel, error);
         }
       }
       @Post('/getAllActiveLocations')
       async getAll(@Req() request: Request): Promise<AllLocationsResponseModel> {
           try {
               return await this.LocationService.getAllActiveLocations();
           } catch (error) {
               return this.applicationExceptionHandler.returnException(AllLocationsResponseModel, error)
           }
       }
       @Post('/activateOrDeactivateLocation')
       @ApiBody({type:MasterLocationRequest})
       async activateOrDeactivateLocation(@Body() LocationIDReq: any): Promise<MasterLocationsResponseModel> {
           try {
            console.log(LocationIDReq,'controller----------')
               return await this.LocationService.activateOrDeactivateLocation(LocationIDReq);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(MasterLocationsResponseModel, err);
           }
       }
       @Post('/getActiveLocationsById')
       @ApiBody({type:MasterLocationRequest})
       async getActiveLocationsById(@Body() LocationIDReq: any): Promise<MasterLocationsResponseModel> {
           try {
               return await this.LocationService.getActiveLocationsById(LocationIDReq);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(MasterLocationsResponseModel, err);
           }
       }
      }
// function diskStorage(arg0: { destination: string; filename: (req: any, file: any, callback: any) => void; }): any {
//     throw new Error('Function not implemented.');
// }

