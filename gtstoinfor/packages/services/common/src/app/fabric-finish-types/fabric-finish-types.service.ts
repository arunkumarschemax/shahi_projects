import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Raw, Repository } from 'typeorm';
import axios from 'axios';
import { truncate } from 'fs';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricFinishTypes } from './fabric-finish-types.entity';
import { AllFabricFinishTypesResponseModel, FabricFinishTypeIdRequest} from '@project-management-system/shared-models';
import { FabricFinishTypesDTO } from './dto/fabric-finish-types.dto';
import { FabricFinishTypesAdapter } from './dto/fabric-finish-types.adapter';
import { FabricFinishTypeRequest } from './dto/fabric-finish-types.request';



@Injectable()
export class FabricFinishTypesService {
    constructor(
      
        @InjectRepository(FabricFinishTypes)
        private fabricFinishTypesRepository: Repository<FabricFinishTypes>,
        private fabricFinishTypeAdapter: FabricFinishTypesAdapter,
    ){}

    async getFabricFinishTypesWithoutRelations(fabricFinishType: string): Promise<FabricFinishTypes> {
        const response = await this.fabricFinishTypesRepository.findOne({
            where: { fabricFinishTypeId: Raw(alias => `fabric_finish_type = "${fabricFinishType}"`) },
        });
        if (response) {
            return response;
        } else {
            return null;
        }
    }

    // async createFabricFinishType(fabricFinishTypeDto: FabricFinishTypesDTO, isUpdate: boolean): Promise<AllFabricFinishTypesResponseModel> {
    //     console.log(fabricFinishTypeDto,'nnnnnh');
        
    //     try {
    //       let previousValue
    //       if (!isUpdate) {
    //         const fabricFinishTypesEntity = await this.getFabricFinishTypesWithoutRelations(fabricFinishTypeDto.fabricFinishType);
    //         if (fabricFinishTypesEntity) {
    //           throw new AllFabricFinishTypesResponseModel(false,11104, 'Fabric FinishTypes already exists');
    //         }
    //       }
    //       else{
    //         const certificatePrevious = await this.fabricFinishTypesRepository.findOne({where:{fabricFinishTypeId:fabricFinishTypeDto.fabricFinishTypeId}})
    //         previousValue = certificatePrevious.fabricFinishType
    //         const fabricFinishTypesEntity = await this.getFabricFinishTypesWithoutRelations(fabricFinishTypeDto.fabricFinishType);
    //         if (fabricFinishTypesEntity) {
    //           if(fabricFinishTypesEntity.fabricFinishTypeId!=fabricFinishTypeDto.fabricFinishTypeId) {
    //             throw new AllFabricFinishTypesResponseModel(false,11104, 'Fabric FinishType already exists');      
    //           }
    //         }
    //       }
    //       const convertedFabricFinishTypeEntity: FabricFinishTypes = this.fabricFinishTypeAdapter.convertDtoToEntity(fabricFinishTypeDto,isUpdate);
    //       const savedCurrencyEntity: FabricFinishTypes = await this.fabricFinishTypesRepository.save(
    //         convertedFabricFinishTypeEntity
    //       );
    //       const savedFabricFinishTypesDto: FabricFinishTypesDTO = this.fabricFinishTypeAdapter.convertEntityToDto(convertedFabricFinishTypeEntity);
    //       if (savedFabricFinishTypesDto) {
    //         const presentValue = savedFabricFinishTypesDto.fabricFinishType;
    //        const response = new AllFabricFinishTypesResponseModel(true,1,isUpdate? 'Fabric FinishType Updated Successfully': 'FabricFinishType Created Successfully');
    //        const name=isUpdate?'updated':'created'
    //        const displayValue = isUpdate? 'Fabric FinishType Updated Successfully': 'Fabric FinishType Created Successfully'
    //        const userName = isUpdate? savedFabricFinishTypesDto.updatedUser :savedFabricFinishTypesDto.createdUser;
    //        return response
    //       } else {
    //         throw new AllFabricFinishTypesResponseModel(false,11106,'FabricFinishType saved but issue while transforming into DTO');
    //       }
    //     } catch (error) {
    //       return  new AllFabricFinishTypesResponseModel(false,11108,'FabricFinishType is not created due to invalid file');
    //     }
    //   }  
  
    async createFabricFinishType(operationsDto: FabricFinishTypesDTO, isUpdate: boolean): Promise<AllFabricFinishTypesResponseModel> {
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const operationsEntity = await this.getFabricFinishTypesWithoutRelations(operationsDto.fabricFinishType);
            if (operationsEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new AllFabricFinishTypesResponseModel(false,11104, 'operation already exists');
            }
          }
          else{
            const certificatePrevious = await this.fabricFinishTypesRepository.findOne({where:{fabricFinishTypeId:operationsDto.fabricFinishTypeId}})
            previousValue = certificatePrevious.fabricFinishType
            const operationsEntity = await this.getFabricFinishTypesWithoutRelations(operationsDto.fabricFinishType);
            if (operationsEntity) {
              if(operationsEntity.fabricFinishTypeId!=operationsDto.fabricFinishTypeId) {
                throw new AllFabricFinishTypesResponseModel(false,11104, 'operation already exists');      
              }
            }
          }
          const convertedOperationEntity: FabricFinishTypes = this.fabricFinishTypeAdapter.convertDtoToEntity(operationsDto,isUpdate);
          const savedOperationEntity: FabricFinishTypes = await this.fabricFinishTypesRepository.save(
            convertedOperationEntity
          );
          const savedOperationsDto: FabricFinishTypesDTO = this.fabricFinishTypeAdapter.convertEntityToDto(convertedOperationEntity);
            // console.log(savedStateDto);
          if (savedOperationsDto) {
            const presentValue = savedOperationsDto.fabricFinishType;
           // generating resposnse
           const response = new AllFabricFinishTypesResponseModel(true,1,isUpdate? 'Operation Updated Successfully': 'Operation Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Operation Updated Successfully': 'Operation Created Successfully'
           const userName = isUpdate? savedOperationsDto.updatedUser :savedOperationsDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedBrandsDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new AllFabricFinishTypesResponseModel(false,11106,'Operation saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }
      async getAllFabricFinishTypes(): Promise<AllFabricFinishTypesResponseModel> {
        try {
            const fabricFinishTypeDto: FabricFinishTypesDTO[] = [];
            //retrieves all companies
            const Entities: FabricFinishTypes[] = await this.fabricFinishTypesRepository.find({ order: { 'fabricFinishType': 'ASC' } });
            //console.log(locationsEntities);
            if (Entities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                Entities.forEach(locationsEntity => {
                    const convertedstatesDto: FabricFinishTypesDTO = this.fabricFinishTypeAdapter.convertEntityToDto(
                        locationsEntity
                    );
                    fabricFinishTypeDto.push(convertedstatesDto);
                });
                const response = new AllFabricFinishTypesResponseModel(true, 11108, "Fabric FinishTypes retrieved successfully", fabricFinishTypeDto);
                // if(req?.createdUser){
                //     const newLogDto = new LogsDto(1,'view', 'Locations', 0, true, 'Locations retrieved successfully',req.createdUser,"",'')
                //     let res = await this.logService.createLog(newLogDto);
                //     console.log(res);
                // }
               
                return response;
            } else {
                throw new AllFabricFinishTypesResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

  
      async getAllActiveFabricFinishTypes(): Promise<AllFabricFinishTypesResponseModel> {
        // const page: number = 1;
        try {
            const fabricFinishTypeDto: FabricFinishTypesDTO[] = [];
            //retrieves all companies
            const MasterFabricFinishTypeEntities: FabricFinishTypes[] = await this.fabricFinishTypesRepository.find({ order: { 'fabricFinishType': 'ASC' },where:{isActive:true}
           });
            if (MasterFabricFinishTypeEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                MasterFabricFinishTypeEntities.forEach(countriesEntity => {
                    const convertedFabricFinishTypesDtos: FabricFinishTypesDTO = this.fabricFinishTypeAdapter.convertEntityToDto(
                      countriesEntity
                    );
                    fabricFinishTypeDto.push(convertedFabricFinishTypesDtos);
                });
                const response = new AllFabricFinishTypesResponseModel(true, 11108, "FabricFinishTypes retrieved successfully", fabricFinishTypeDto);
                return response;
            } else {
                throw new AllFabricFinishTypesResponseModel(false,99998, 'Data not found'); fabricFinishTypeDto
            }
        } catch (err) {
            return err;
        }
    }
    async activateOrDeactivateFabricFinishTypes(Req: FabricFinishTypeRequest): Promise<AllFabricFinishTypesResponseModel> {
        try {
            const Exists = await this.getFabricFinishTypeById(Req.fabricFinishTypeId);
            if (Exists) {
                if (Req.versionFlag !== Exists.versionFlag) {
                    throw new AllFabricFinishTypesResponseModel(false,10113, 'Someone updated the current FabricFinishType information.Refresh and try again');
                } else {

                    const Status = await this.fabricFinishTypesRepository.update(
                        { fabricFinishTypeId: Req.fabricFinishTypeId },
                        { isActive: Req.isActive, updatedUser: Req.updatedUser });

                    if (Exists.isActive) {
                        if (Status.affected) {
                            const Response: AllFabricFinishTypesResponseModel = new AllFabricFinishTypesResponseModel(true, 10115, 'FabricFinishType is de-activated successfully');
                            return Response;
                        } else {
                            throw new AllFabricFinishTypesResponseModel(false,10111, 'FabricFinishType is already deactivated');
                        }
                    } else {
                        if (Status.affected) {
                            const Response: AllFabricFinishTypesResponseModel = new AllFabricFinishTypesResponseModel(true, 10114, 'FabricFinishType is activated successfully');
                            return Response;
                        } else {
                            throw new AllFabricFinishTypesResponseModel(false,10112, 'FabricFinishType is already activated');
                        }
                    }
                    // }
                }
            } else {
                throw new AllFabricFinishTypesResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
    async getActiveFabricFinishTypeById(Req: FabricFinishTypeIdRequest): Promise<AllFabricFinishTypesResponseModel> {
        try {
            //retrieves all companies
            const FabricFinishTypeEntities: FabricFinishTypes = await this.fabricFinishTypesRepository.findOne({
                where:{fabricFinishTypeId:Req.fabricFinishTypeId}
                });
                
                const FabricFinishTypeData: FabricFinishTypesDTO = this.fabricFinishTypeAdapter.convertEntityToDto(FabricFinishTypeEntities);
                if (FabricFinishTypeData) {
                    const response = new AllFabricFinishTypesResponseModel(true, 11101 , 'FabricFinishType retrived Successfully',[FabricFinishTypeData]);
                    return response;
                }
                else{
                    throw new AllFabricFinishTypesResponseModel(false,11106,'Something went wrong');
                }
                // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getFabricFinishTypeById(fabricFinishTypeId: number): Promise<FabricFinishTypes> {
        //  console.log(employeeId);
            const Response = await this.fabricFinishTypesRepository.findOne({
            where: {fabricFinishTypeId: fabricFinishTypeId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
