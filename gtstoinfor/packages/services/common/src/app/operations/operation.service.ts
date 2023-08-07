import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Raw, Repository } from 'typeorm';
import axios from 'axios';
import { truncate } from 'fs';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { Operations } from './operation.entity';
import { OperationsAdapter } from './dto/operation.adapter';
import { OperationDTO } from './dto/operations.dto';
import { AllOperationsResponseModel, OperationsRequest, OperationsResponseModel } from '@project-management-system/shared-models';
import { OperationRequest } from './dto/operation.request';



@Injectable()
export class OperationsService {
    constructor(
      
        @InjectRepository(Operations)
        private OperationsRepository: Repository<Operations>,
        private operationsAdapter: OperationsAdapter,
    ){}

    async getOperationsWithoutRelations(operationName: string): Promise<Operations> {
        //  console.log(employeeId);
        const response = await this.OperationsRepository.findOne({
            where: { operationId: Raw(alias => `operation_name = "${operationName}"`) },
        });
        // console.log(response);
        if (response) {
            return response;
        } else {
            return null;
        }
    }

    async createOperations(operationsDto: OperationDTO, isUpdate: boolean): Promise<OperationsResponseModel> {
        console.log(operationsDto,'nnnnnh');
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const operationsEntity = await this.getOperationsWithoutRelations(operationsDto.operationName);
            console.log(operationsDto,"hiiiiiiiiiiiiiiii")
            if (operationsEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new OperationsResponseModel(false,11104, 'operation already exists');
            }
          }
          else{
            const certificatePrevious = await this.OperationsRepository.findOne({where:{operationId:operationsDto.operationId}})
            previousValue = certificatePrevious.operationName
            const operationsEntity = await this.getOperationsWithoutRelations(operationsDto.operationName);
            if (operationsEntity) {
              if(operationsEntity.operationId!=operationsDto.operationId) {
                throw new OperationsResponseModel(false,11104, 'operation already exists');      
              }
            }
          }
          const convertedOperationEntity: Operations = this.operationsAdapter.convertDtoToEntity(operationsDto,isUpdate);
          const savedOperationEntity: Operations = await this.OperationsRepository.save(
            convertedOperationEntity
          );
          const savedOperationsDto: OperationDTO = this.operationsAdapter.convertEntityToDto(convertedOperationEntity);
            // console.log(savedStateDto);
          if (savedOperationsDto) {
            const presentValue = savedOperationsDto.operationName;
           // generating resposnse
           const response = new OperationsResponseModel(true,1,isUpdate? 'Operation Updated Successfully': 'Operation Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Operation Updated Successfully': 'Operation Created Successfully'
           const userName = isUpdate? savedOperationsDto.updatedUser :savedOperationsDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedBrandsDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new OperationsResponseModel(false,11106,'Operation saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }  
  
      async getAllOperations(req?:UserRequestDto): Promise<AllOperationsResponseModel> {
        // const page: number = 1;
        try {
          const OperationsDtos: OperationDTO[] = [];
          //retrieves all companies
          const operationsEntities: Operations[] = await this.OperationsRepository.find({order :{'operationName':'ASC'}, relations:["operationGroupInfo"]});
          //console.log(statesEntities);
          if (operationsEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            operationsEntities.forEach(OperationsEntity => {
              const convertedOperationsDto: OperationDTO = this.operationsAdapter.convertEntityToDto(
               OperationsEntity
              );
              OperationsDtos.push(convertedOperationsDto);
            });
            const response = new AllOperationsResponseModel(true,1,'Operations retrieved successfully',OperationsDtos);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new OperationsResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }

  
      async getAllActiveOperations(): Promise<AllOperationsResponseModel> {
        // const page: number = 1;
        try {
            const OperationDto: OperationDTO[] = [];
            //retrieves all companies
            const OperationEntities: Operations[] = await this.OperationsRepository.find({ order: { 'operationName': 'ASC' },where:{isActive:true}
           });
         console.log(OperationEntities)
            if (OperationEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                OperationEntities.forEach(Entity => {
                    const convertedBrandsDtos: OperationDTO = this.operationsAdapter.convertEntityToDto(
                      Entity
                    );
                    OperationDto.push(convertedBrandsDtos);
                });
                const response = new AllOperationsResponseModel(true, 11108, "Brands retrieved successfully",OperationDto);
                return response;
            } else {
                throw new OperationsResponseModel(false,99998, 'Data not found'); 
            }
        } catch (err) {
            return err;
        }
    }
   

  async activateOrDeactivateOperations(operationReq: OperationRequest): Promise<OperationsResponseModel> {
    try {
      console.log(operationReq.isActive,'service-----------')
        const operationExists = await this.getOperationById(operationReq.operationId);
        if (operationExists) {
            if (!operationExists) {
                throw new ErrorResponse(10113, 'Someone updated the current operation information.Refresh and try again');
            } else {

                const operationStatus = await this.OperationsRepository.update(
                    { operationId: operationReq.operationId },
                    { isActive: operationReq.isActive, updatedUser: operationReq.updatedUser });
                if (operationExists.isActive) {
                    if (operationStatus.affected) {
                        const operationResponse: OperationsResponseModel = new OperationsResponseModel(true, 10115, 'operation is de-activated successfully');
                        return operationResponse;
                    } else {
                        throw new OperationsResponseModel(false,10111, 'operation is already deactivated');
                    }
                } else {
                    if (operationStatus.affected) {
                        const brandResponse: OperationsResponseModel = new OperationsResponseModel(true, 10114, 'Operation is activated successfully');
                        return brandResponse;
                    } else {
                        throw new OperationsResponseModel(false,10112, 'Brand is already  activated');
                    }
                }
                // }
            }
        } else {
            throw new OperationsResponseModel(false,99998, 'No Records Found');
        }
    } catch (err) {
        return err;
    }
}
      async getActiveOperationsById(operationReq: OperationsRequest): Promise<OperationsResponseModel> {
        try {
            //retrieves all companies
            const OperationsEntities: Operations = await this.OperationsRepository.findOne({
              where:{operationId:operationReq.operationId}
              });
              
              const OperationData: OperationDTO = this.operationsAdapter.convertEntityToDto(OperationsEntities);
              if (OperationData) {
                  const response = new OperationsResponseModel(true, 11101 , 'Brands retrived Successfully',);
                  return response;
              }
              else{
                  throw new OperationsResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getOperationById(operationId: number): Promise<Operations> {
        //  console.log(employeeId);
            const Response = await this.OperationsRepository.findOne({
            where: {operationId: operationId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
