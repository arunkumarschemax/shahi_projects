import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Raw, Repository } from 'typeorm';
import { MasterLocationRequest } from './dto/master-locations.request';
import {  AllLocationsResponseModel, MasterLocationsResponseModel } from '@project-management-system/shared-models';
import axios from 'axios';
import { truncate } from 'fs';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { LocationsDTO } from './dto/master-locations.dto';
import { LocationsEntity } from './master-locations.entity';
import { MasterLocationsAdapter } from './dto/master-locations.adapter';




@Injectable()
export class MasterLocationsService {
    constructor(
      
        @InjectRepository(LocationsEntity)
        private masterLocationsRepository: Repository<LocationsEntity>,
        private masterLocationsAdapter: MasterLocationsAdapter,
    ){}

    async getMasterLocationWithoutRelations(LocationName: string): Promise<LocationsEntity> {
        //  console.log(employeeId);
        const response = await this.masterLocationsRepository.findOne({
            where: { locationName: Raw(alias => `Location_name = "${LocationName}"`) },
        });
        // console.log(response);
        if (response) {
            return response;
        } else {
            return null;
        }
    }

    async createMasterLocation(masterLocationsDto:LocationsDTO, isUpdate: boolean): Promise<MasterLocationsResponseModel> {
        console.log(masterLocationsDto,'nnnnnh');
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const masterLocationsEntity = await this.getMasterLocationWithoutRelations(masterLocationsDto.locationName);
            if (masterLocationsEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new MasterLocationsResponseModel(false,11104, 'Location already exists');
            }
          }
          else{
            const certificatePrevious = await this.masterLocationsRepository.findOne({where:{locationId:masterLocationsDto.locationId}})
            previousValue = certificatePrevious.locationName
            const masterLocationsEntity = await this.getMasterLocationWithoutRelations(masterLocationsDto.locationName);
            if (masterLocationsEntity) {
              if(masterLocationsEntity.locationId!=masterLocationsDto.locationId) {
                throw new MasterLocationsResponseModel(false,11104, 'Location already exists');      
              }
            }
          }
          const convertedLocationEntity: LocationsEntity = this.masterLocationsAdapter.convertDtoToEntity(masterLocationsDto,isUpdate);
          const savedCurrencyEntity: LocationsEntity = await this.masterLocationsRepository.save(
            convertedLocationEntity
          );
          const savedLocationsDto: LocationsDTO = this.masterLocationsAdapter.convertEntityToDto(convertedLocationEntity);
            // console.log(savedStateDto);
          if (savedLocationsDto) {
            const presentValue = savedLocationsDto.locationName;
           // generating resposnse
           const response = new MasterLocationsResponseModel(true,1,isUpdate? 'Location Updated Successfully': 'Location Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Location Updated Successfully': 'Location Created Successfully'
           const userName = isUpdate? savedLocationsDto.updatedUser :savedLocationsDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedLocationsDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new MasterLocationsResponseModel(false,11106,'Location saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return  new MasterLocationsResponseModel(false,11108,'Location is not created due to invalid file');
        }
      }  
  
      async getAllLocations(req?:UserRequestDto): Promise<AllLocationsResponseModel> {
        // const page: number = 1;
        try {
          const LocationsDtos: LocationsDTO[] = [];
          //retrieves all companies
          const MasterLocationsEntities: LocationsEntity[] = await this.masterLocationsRepository.find({order :{locationName:'ASC'}});
          //console.log(statesEntities);
          if (MasterLocationsEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            MasterLocationsEntities.forEach(CurrencyEntity => {
              const convertedCurrenciesDto: LocationsDTO = this.masterLocationsAdapter.convertEntityToDto(
                CurrencyEntity
              );
              LocationsDtos.push(convertedCurrenciesDto);
            });
            const response = new AllLocationsResponseModel(true,1,'Locations retrieved successfully',LocationsDtos);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new MasterLocationsResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }

  
      async getAllActiveLocations(): Promise<AllLocationsResponseModel> {
        // const page: number = 1;
        try {
            const masterLocationsDto: LocationsDTO[] = [];
            //retrieves all companies
            const MasterLocationEntities: LocationsEntity[] = await this.masterLocationsRepository.find({ order: { locationName: 'ASC' },where:{isActive:true}
           });
         console.log(MasterLocationEntities)
            if (MasterLocationEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                MasterLocationEntities.forEach(countriesEntity => {
                    const convertedLocationsDtos: LocationsDTO = this.masterLocationsAdapter.convertEntityToDto(
                      countriesEntity
                    );
                    masterLocationsDto.push(convertedLocationsDtos);
                });
                const response = new AllLocationsResponseModel(true, 11108, "Locations retrieved successfully", masterLocationsDto);
                return response;
            } else {
                throw new MasterLocationsResponseModel(false,99998, 'Data not found'); 
            }
        } catch (err) {
            return err;
        }
    }

  async activateOrDeactivateLocation(LocationReq: MasterLocationRequest): Promise<MasterLocationsResponseModel> {
    try {
      console.log(LocationReq.isActive,'service-----------')
        const LocationExists = await this.getLocationById(LocationReq.locationId);
        if (LocationExists) {
            if (!LocationExists) {
                throw new ErrorResponse(10113, 'Someone updated the current Location information.Refresh and try again');
            } else {

                const LocationStatus = await this.masterLocationsRepository.update(
                    { locationId: LocationReq.locationId },
                    { isActive: LocationReq.isActive, updatedUser: LocationReq.updatedUser });
                if (LocationExists.isActive) {
                    if (LocationStatus.affected) {
                        const LocationResponse: MasterLocationsResponseModel = new MasterLocationsResponseModel(true, 10115, 'Location is de-activated successfully');
                        return LocationResponse;
                    } else {
                        throw new MasterLocationsResponseModel(false,10111, 'Location is already deactivated');
                    }
                } else {
                    if (LocationStatus.affected) {
                        const LocationResponse: MasterLocationsResponseModel = new MasterLocationsResponseModel(true, 10114, 'Location is activated successfully');
                        return LocationResponse;
                    } else {
                        throw new MasterLocationsResponseModel(false,10112, 'Location is already  activated');
                    }
                }
                // }
            }
        } else {
            throw new MasterLocationsResponseModel(false,99998, 'No Records Found');
        }
    } catch (err) {
        return err;
    }
}
      async getActiveLocationsById(LocationReq: MasterLocationRequest): Promise<MasterLocationsResponseModel> {
        try {
            //retrieves all companies
            const masterLocationsEntities: LocationsEntity = await this.masterLocationsRepository.findOne({
              where:{locationId:LocationReq.locationId}
              });
              
              const LocationsData: LocationsDTO = this.masterLocationsAdapter.convertEntityToDto(masterLocationsEntities);
              if (LocationsData) {
                  const response = new MasterLocationsResponseModel(true, 11101 , 'Locations retrived Successfully',LocationsData);
                  return response;
              }
              else{
                  throw new MasterLocationsResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getLocationById(LocationId: number): Promise<LocationsEntity> {
        //  console.log(employeeId);
            const Response = await this.masterLocationsRepository.findOne({
            where: {locationId: LocationId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
