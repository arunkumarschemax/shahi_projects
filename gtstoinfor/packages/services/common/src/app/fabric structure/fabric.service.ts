import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Raw, Repository } from 'typeorm';
import axios from 'axios';
import { truncate } from 'fs';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricStructures } from './fabric.entity';
import { FabricStructuresAdapter } from './dto/fabric.adapter';
import { AllFabricStructuresResponseModel, FabricStructuresDTO } from '@project-management-system/shared-models';
import { FabricStructureDTO } from './dto/fabric.dto';
import { FabricStructureIdRequest } from './dto/fabric.id-request';
import { FabricStructureRequest } from './dto/fabric.request';



@Injectable()
export class FabricStructuresService {
    constructor(
      
        @InjectRepository(FabricStructures)
        private fabricStructuresRepository: Repository<FabricStructures>,
        private fabricStructuresAdapter: FabricStructuresAdapter,
    ){}

    async getFabricStructuresWithoutRelations(fabricStructure: string): Promise<FabricStructures> {
        const response = await this.fabricStructuresRepository.findOne({
            where: { fabricStructureId: Raw(alias => `fabric_structure = "${fabricStructure}"`) },
        });
        if (response) {
            return response;
        } else {
            return null;
        }
    }

    async createFabricStructure(fabricStructureDto: FabricStructureDTO, isUpdate: boolean): Promise<AllFabricStructuresResponseModel> {
        console.log(fabricStructureDto,'nnnnnh');
        
        try {
          let previousValue
          if (!isUpdate) {
            const fabricStructuresEntity = await this.getFabricStructuresWithoutRelations(fabricStructureDto.fabricStructure);
            if (fabricStructuresEntity) {
              throw new AllFabricStructuresResponseModel(false,11104, 'Fabric Structures already exists');
            }
          }
          else{
            const certificatePrevious = await this.fabricStructuresRepository.findOne({where:{fabricStructureId:fabricStructureDto.fabricStructureId}})
            previousValue = certificatePrevious.fabricStructure
            const fabricStructuresEntity = await this.getFabricStructuresWithoutRelations(fabricStructureDto.fabricStructure);
            if (fabricStructuresEntity) {
              if(fabricStructuresEntity.fabricStructureId!=fabricStructureDto.fabricStructureId) {
                throw new AllFabricStructuresResponseModel(false,11104, 'Fabric Structure already exists');      
              }
            }
          }
          const convertedFabricStructureEntity: FabricStructures = this.fabricStructuresAdapter.convertDtoToEntity(fabricStructureDto,isUpdate);
          const savedCurrencyEntity: FabricStructures = await this.fabricStructuresRepository.save(
            convertedFabricStructureEntity
          );
          const savedFabricStructuresDto: FabricStructureDTO = this.fabricStructuresAdapter.convertEntityToDto(convertedFabricStructureEntity);
          if (savedFabricStructuresDto) {
            const presentValue = savedFabricStructuresDto.fabricStructure;
           const response = new AllFabricStructuresResponseModel(true,1,isUpdate? 'Fabric Structure Updated Successfully': 'FabricStructure Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Fabric Structure Updated Successfully': 'Fabric Structure Created Successfully'
           const userName = isUpdate? savedFabricStructuresDto.updatedUser :savedFabricStructuresDto.createdUser;
           return response
          } else {
            throw new AllFabricStructuresResponseModel(false,11106,'FabricStructure saved but issue while transforming into DTO');
          }
        } catch (error) {
          return  new AllFabricStructuresResponseModel(false,11108,'FabricStructure is not created due to invalid file');
        }
      }  
  
      async getAllFabricStructures(): Promise<AllFabricStructuresResponseModel> {
        try {
            const fabricStructueDTO: FabricStructureDTO[] = [];
            //retrieves all companies
            const Entities: FabricStructures[] = await this.fabricStructuresRepository.find({ order: { 'fabricStructure': 'ASC' } });
            //console.log(locationsEntities);
            if (Entities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                Entities.forEach(locationsEntity => {
                    const convertedstatesDto: FabricStructureDTO = this.fabricStructuresAdapter.convertEntityToDto(
                        locationsEntity
                    );
                    fabricStructueDTO.push(convertedstatesDto);
                });
                const response = new AllFabricStructuresResponseModel(true, 11108, "Fabric Structures retrieved successfully", fabricStructueDTO);
                // if(req?.createdUser){
                //     const newLogDto = new LogsDto(1,'view', 'Locations', 0, true, 'Locations retrieved successfully',req.createdUser,"",'')
                //     let res = await this.logService.createLog(newLogDto);
                //     console.log(res);
                // }
               
                return response;
            } else {
                throw new AllFabricStructuresResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

  
      async getAllActiveFabricStructures(): Promise<AllFabricStructuresResponseModel> {
        // const page: number = 1;
        try {
            const fabricStructureDto: FabricStructureDTO[] = [];
            //retrieves all companies
            const MasterFabricStructureEntities: FabricStructures[] = await this.fabricStructuresRepository.find({ order: { 'fabricStructure': 'ASC' },where:{isActive:true}
           });
         console.log(MasterFabricStructureEntities)
            if (MasterFabricStructureEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                MasterFabricStructureEntities.forEach(countriesEntity => {
                    const convertedFabricStructuresDtos: FabricStructureDTO = this.fabricStructuresAdapter.convertEntityToDto(
                      countriesEntity
                    );
                    fabricStructureDto.push(convertedFabricStructuresDtos);
                });
                const response = new AllFabricStructuresResponseModel(true, 11108, "FabricStructures retrieved successfully", fabricStructureDto);
                return response;
            } else {
                throw new AllFabricStructuresResponseModel(false,99998, 'Data not found'); fabricStructureDto
            }
        } catch (err) {
            return err;
        }
    }
    async activateOrDeactivateFabricStructures(Req: FabricStructureRequest): Promise<AllFabricStructuresResponseModel> {
        try {
            const Exists = await this.getFabricStructureById(Req.fabricStructureId);
            if (Exists) {
                if (Req.versionFlag !== Exists.versionFlag) {
                    throw new AllFabricStructuresResponseModel(false,10113, 'Someone updated the current FabricStructure information.Refresh and try again');
                } else {

                    const Status = await this.fabricStructuresRepository.update(
                        { fabricStructureId: Req.fabricStructureId },
                        { isActive: Req.isActive, updatedUser: Req.updatedUser });

                    if (Exists.isActive) {
                        if (Status.affected) {
                            const Response: AllFabricStructuresResponseModel = new AllFabricStructuresResponseModel(true, 10115, 'FabricStructure is de-activated successfully');
                            return Response;
                        } else {
                            throw new AllFabricStructuresResponseModel(false,10111, 'FabricStructure is already deactivated');
                        }
                    } else {
                        if (Status.affected) {
                            const Response: AllFabricStructuresResponseModel = new AllFabricStructuresResponseModel(true, 10114, 'FabricStructure is activated successfully');
                            return Response;
                        } else {
                            throw new AllFabricStructuresResponseModel(false,10112, 'FabricStructure is already activated');
                        }
                    }
                    // }
                }
            } else {
                throw new AllFabricStructuresResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
    async getActiveFabricStructureById(Req: FabricStructureIdRequest): Promise<AllFabricStructuresResponseModel> {
        try {
            //retrieves all companies
            const FabricStructureEntities: FabricStructures = await this.fabricStructuresRepository.findOne({
                where:{fabricStructureId:Req.fabricStructureId}
                });
                
                const FabricStructureData: FabricStructuresDTO = this.fabricStructuresAdapter.convertEntityToDto(FabricStructureEntities);
                if (FabricStructureData) {
                    const response = new AllFabricStructuresResponseModel(true, 11101 , 'FabricStructure retrived Successfully',[FabricStructureData]);
                    return response;
                }
                else{
                    throw new AllFabricStructuresResponseModel(false,11106,'Something went wrong');
                }
                // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getFabricStructureById(fabricStructureId: number): Promise<FabricStructures> {
        //  console.log(employeeId);
            const Response = await this.fabricStructuresRepository.findOne({
            where: {fabricStructureId: fabricStructureId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
