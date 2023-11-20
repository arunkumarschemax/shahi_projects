import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from './dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { LocationDTO } from './dto/location.dto';
import { AllLocationResponseModel, LocationDropDownResponseModel, LocationResponseModel } from '@project-management-system/shared-models';
import { LocationService } from './location.service';
import { LocationRequest } from './dto/location.request';


@ApiTags('location')
@Controller('location')
export class LocationController {
    constructor(
        private locationService: LocationService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}
   /**
     * creates or updates a value of location
     * @param locationDto location DTO
     * @returns locationResponse
     */
    @Post('/createLocation')
    async createLocation(@Body() LocationDTO:LocationDTO,isUpdate:boolean=false,@Req() request:Request): Promise<LocationResponseModel> {
        try {
            // console.log(locationDTO);
            return await this.locationService.createLocation(LocationDTO, false,request);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(LocationResponseModel, error)
        }
    }

    /**
     * creates or updates a value of location
     * @param locationDto location DTO
     * @returns locationResponse
     */
    @Post('/updatelocation')
    async updatelocation(@Body() locationDTO: LocationDTO,@Req() request:Request): Promise<LocationResponseModel> {
        try {
        return await this.locationService.createLocation(locationDTO, true,request);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(LocationResponseModel, error)
        }
    }

      /**
     * gets all the Value of location
     * @returns AllValue LocationResponseModel which returns all the Value Addition Types  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
     */
    @Post('/getAlllocations')
    async getAlllocation(): Promise<AllLocationResponseModel> {
        try {
        return await this.locationService.getAllLocations();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(AllLocationResponseModel, error)
        }
    }

     /**
     * Activate Or De-Activate Value location
     * @param getSinglelocation LocationResponseModel 
     * @returns Value location
     */
    @Post('/activateOrDeactivatelocations')
    @ApiBody({type:LocationRequest})
    async activateOrDeactivatelocation(@Body() locationReq: any): Promise<LocationResponseModel> {
        try {
            return await this.locationService.activateOrDeactivateLocations(locationReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(LocationResponseModel, err);
        }
    }
    @Post('/getAllActivelocations')
  async getAllActivelocation(@Req() request: Request): Promise<AllLocationResponseModel> {
      try {
          return await this.locationService.getAllActiveLocations();
      } catch (error) {
          return this.applicationExceptionhandler.returnException(AllLocationResponseModel, error)
      }
  }
    @Post('/getlocationById')
    @ApiBody({type:LocationRequest})
    async getlocationById(@Body() req: any): Promise<LocationResponseModel> {
        try {
            console.log(req,'reqqqqqqqqqqqqq');
            
            return await this.locationService.getActiveLocationById(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(LocationResponseModel, err);
        }
    }

    @Post('/getAlllocationsDropDown')
    async getAlllocationsDropDown(): Promise<LocationDropDownResponseModel> {
        try {
        return await this.locationService.getAllLocationsDropDown();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(LocationDropDownResponseModel, error)
        }
    }

    


}
