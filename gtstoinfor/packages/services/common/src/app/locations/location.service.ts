import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from './dto/user-logs-dto';
import { LocationAdapter } from './dto/location.adapter';
import { LocationDTO } from './dto/location.dto';
import { AllLocationResponseModel,  LocationDropDownDto, LocationDropDownResponseModel, LocationDto, LocationResponseModel } from '@project-management-system/shared-models';
import { LocationEntity } from './location.entity';
import { LocationRequest } from './dto/location.request';
// import { UserRequestDto } from '../currencies/dto/user-logs-dto';
@Injectable()
export class LocationService {
    constructor(
    //   private logService:LogsService,
        @InjectRepository(LocationEntity)
        private locationRepository: Repository<LocationEntity>,
        private locationAdapter: LocationAdapter,
    ) { }
    /**
     * create/update Location
     * @param locationDTO 
     * @param isUpdate 
     * @param request 
     */
    async createLocation(locationDTO:LocationDTO, isUpdate: boolean, request: Request): Promise<LocationResponseModel> {
        // console.log(locationDTO);
        try {
          let previousValue
            // to check whether Location exists with the passed  Location  or not. if isUpdate is false, a check will be done whether a record with the passed Location is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed Location  then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
            if (!isUpdate) {
                const LocationEntity = await this.getLocationWithoutRelations(locationDTO.locationName);
                if (LocationEntity) {
                    throw new LocationResponseModel(false,11104, 'Location already exists');
                }
                // var notificationStatus='Created';
            }
            else{
                const certificatePrevious = await this.locationRepository.findOne({where:{locationId:locationDTO.locationId}})
                previousValue = certificatePrevious.locationName
                const LocationEntity = await this.getLocationWithoutRelations(locationDTO.locationName);
                if (LocationEntity) {
                    if(LocationEntity.locationId!=locationDTO.locationId) {
                        throw new LocationResponseModel(false,11104, 'Location already exists');      
                    }
                }
            }
            // else{
            // var notificationStatus='Updated';
            // }
            const convertedLocationEntity: LocationEntity = this.locationAdapter.convertDtoToEntity(locationDTO, isUpdate);
            const savedLocationEntity: LocationEntity = await this.locationRepository.save(
                convertedLocationEntity
            );
            const savedlocationDTO: LocationDTO = this.locationAdapter.convertEntityToDto(savedLocationEntity);
            if (savedlocationDTO) {
            const presentValue = locationDTO.locationName;
                // generating resposnse
                const response = new LocationResponseModel(true, isUpdate ? 11101 : 11100, isUpdate ? 'Location Updated Successfully' : 'Location Created Successfully', [savedlocationDTO]);
                const name=isUpdate?'updated':'created'
                const displayValue = isUpdate? 'Location Updated Successfully': 'Location Created Successfully'
            const userName = isUpdate? savedlocationDTO.updatedUser :savedlocationDTO.createdUser;
                // const newLogDto = new LogsDto(1,name, 'Location', savedlocationDTO.locationId, true, displayValue,userName,previousValue,presentValue)
                // let res = await this.logService.createLog(newLogDto);
                // console.log(res);
                return response;
            } else {
                throw new LocationResponseModel(false,11106, 'Location saved but issue while transforming into DTO');
            }
        } catch (error) {
            // when error occures while saving the data , the execution will come to catch block.
            // tslint:disable-next-line: typedef
            return error;
        }
    }
    /**
     * get Location details
     * @param LocationName 
     */
    // @LogActions({isAsync: true})
    async getLocationWithoutRelations(locationName: string): Promise<LocationEntity> {
        // tslint:disable-next-line: typedef
        const LocationResponse = await this.locationRepository.findOne({
            where: { locationName: Raw(alias => `location_name = '${locationName}'`) },
        });
        if (LocationResponse) {
            return LocationResponse;
        } else {
            return null;
        }
    }

    /**
    * gets all Location details  
    * @returns all Location details .
    */
    async getAllLocations(): Promise<AllLocationResponseModel> {
        // const page: number = 1;
        try {
            const locationDTO: LocationDTO[] = [];
            //retrieves all companies
            const locationsEntities: LocationEntity[] = await this.locationRepository.find({ order: { 'locationName': 'ASC' } });
            //console.log(locationsEntities);
            if (locationsEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                locationsEntities.forEach(locationsEntity => {
                    const convertedstatesDto: LocationDTO = this.locationAdapter.convertEntityToDto(
                        locationsEntity
                    );
                    locationDTO.push(convertedstatesDto);
                });
                const response = new AllLocationResponseModel(true, 11108, "Locations retrieved successfully", locationDTO);
                // if(req?.createdUser){
                //     const newLogDto = new LogsDto(1,'view', 'Locations', 0, true, 'Locations retrieved successfully',req.createdUser,"",'')
                //     let res = await this.logService.createLog(newLogDto);
                //     console.log(res);
                // }
               
                return response;
            } else {
                throw new LocationResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }
   

    /**
     * It deactivates Location 
     * @returns true or false
     */
    // @LogActions({isAsync: true})
    async activateOrDeactivateLocations(Req: LocationRequest): Promise<LocationResponseModel> {
        try {
            const locationExists = await this.getLocationById(Req.locationId);
            if (locationExists) {
                if (Req.versionFlag !== locationExists.versionFlag) {
                    throw new LocationResponseModel(false,10113, 'Someone updated the current Location information.Refresh and try again');
                } else {

                    const locationStatus = await this.locationRepository.update(
                        { locationId: Req.locationId },
                        { isActive: Req.isActive, updatedUser: Req.updatedUser });

                    if (locationExists.isActive) {
                        if (locationStatus.affected) {
                            const LocationResponse: LocationResponseModel = new LocationResponseModel(true, 10115, 'Location is de-activated successfully');
                            return LocationResponse;
                        } else {
                            throw new LocationResponseModel(false,10111, 'Location is already deactivated');
                        }
                    } else {
                        if (locationStatus.affected) {
                            const LocationResponse: LocationResponseModel = new LocationResponseModel(true, 10114, 'Location is activated successfully');
                            return LocationResponse;
                        } else {
                            throw new LocationResponseModel(false,10112, 'Location is already activated');
                        }
                    }
                    // }
                }
            } else {
                throw new LocationResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
    async getActiveLocationById(Req: LocationRequest): Promise<LocationResponseModel> {
        try {
            //retrieves all companies
            const LocationEntities: LocationEntity = await this.locationRepository.findOne({
                where:{locationId:Req.locationId}
                });
                
                const locationData: LocationDTO = this.locationAdapter.convertEntityToDto(LocationEntities);
                if (locationData) {
                    const response = new LocationResponseModel(true, 11101 , 'Location retrived Successfully',[locationData]);
                    return response;
                }
                else{
                    throw new LocationResponseModel(false,11106,'Something went wrong');
                }
                // generating resposnse
        } catch (err) {
            return err;
        }
    }
    async getAllActiveLocations(): Promise<AllLocationResponseModel> {
        // const page: number = 1;
        try {
            const locationDTO: LocationDto[] = [];
            //retrieves all companies
            const LocationEntities: LocationEntity[] = await this.locationRepository.find({ order: { 'locationName': 'ASC' },where:{isActive:true},
           });
         console.log(LocationEntities)
            if (LocationEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                LocationEntities.forEach(LocationEntity => {
                    const convertedlocationDTO: LocationDTO = this.locationAdapter.convertEntityToDto(
                      LocationEntity
                    );
                    locationDTO.push(convertedlocationDTO);
                });
                const response = new AllLocationResponseModel(true, 11108, "Locations retrieved successfully", locationDTO);
                return response;
            } else {
                throw new LocationResponseModel(false,99998, 'Data not found'); locationDTO
            }
        } catch (err) {
            throw err;
        }
    }





    /**
     * get Location while passing id
     * @param LocationId 
     */
    async getLocationById(locationId: number): Promise<LocationEntity> {
        const Response = await this.locationRepository.findOne({
            where: { locationId: locationId },
        });
        if (Response) {
            return Response;
        } else {
            return null;
        }
    }

    /**
     * gets all Location details  
     * @returns all Location details .
     */
    async getAllLocationsDropDown(): Promise<LocationDropDownResponseModel> {
        try {
            const locationDTO: LocationDropDownDto[] = [];
            const LocationEntities: LocationEntity[] = await this.locationRepository.find({ select: ['locationId', 'locationName'], where: { isActive: true }, order: { 'locationName': 'ASC' } });
            if (LocationEntities && LocationEntities.length > 0) {
                LocationEntities.forEach(LocationEntity => {
                    locationDTO.push(new LocationDropDownDto(LocationEntity.locationId, LocationEntity.locationName));
                });
                const response = new LocationDropDownResponseModel(true, 11108, "Location retrieved successfully", locationDTO);
                return response;
            } else {
                throw new LocationResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            throw err;
        }
    }

}

