import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FabricTypeAdapter } from './dto/fabric-type.adapter';
import { FabricTypeDto } from './dto/fabric-type.dto';
import { FabricType } from './fabric-type.entity';
import { FabricTypeRequest } from './dto/fabric-type.request';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllFabricTypesResponse,FabricTypeDropDownDto,FabricTypeResponse} from '@project-management-system/shared-models';
import { FabricTypeItemNameRequest } from './dto/fabric-type-name.request';
@Injectable()
export  class FabricTypeService {
    constructor (
        @InjectRepository(FabricType) private fabricRepository: Repository<FabricType>,
        private fabricTypeAdapter: FabricTypeAdapter,
    ){}

    async createFabricType(fabricTypeDto: FabricTypeDto, isUpdate: boolean): Promise<FabricTypeResponse> {
        console.log('fabrictypeDto',fabricTypeDto)
        try {
          let previousValue
          if (!isUpdate) {
            const fabricTypeEntity = await this.fabricRepository.findOne({where:{fabricTypeName:fabricTypeDto.fabricTypeName}})
                if (fabricTypeEntity) {
                    throw new FabricTypeResponse(false,11104, 'Fabric Type already exists');
                }
            }
            else {
                const fabricTypeEntity = await this.fabricRepository.findOne({where:{fabricTypeId:fabricTypeDto.fabricTypeId}})
                if (fabricTypeEntity) {
                    if (!fabricTypeDto) {
                        throw new ErrorResponse(11104, 'Fabric Type already exists');
                    }
                }
            }
          const convertedFabricType: FabricType = this.fabricTypeAdapter.convertDtoToEntity(fabricTypeDto,isUpdate);
          console.log(convertedFabricType,'----------------------------------------');
          const savedFabricTyepEntity: FabricType = await this.fabricRepository.save(convertedFabricType);
          const savedFabricTypeDto:   FabricTypeDto = this.fabricTypeAdapter.convertEntityToDto(convertedFabricType);
            // console.log(savedStateDto);
          if (savedFabricTypeDto) {
            const presentValue = savedFabricTypeDto.fabricTypeId;
           // generating resposnse
           const response = new FabricTypeResponse(true,1,isUpdate? 'Fabric Type Updated Successfully': 'Fabric Type Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Fabric Type Updated Successfully': 'Fabric Type Created Successfully'
           const userName = isUpdate? savedFabricTypeDto.updatedUser :savedFabricTypeDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new FabricTypeResponse(false,11106,'Fabric Type saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      } 


      /**
    * gets all  Fabric Type details  
    * @returns all the  Fabric Type details .
    */
    // @LogActions({ isAsync: true })

    
    async getAllFabricType(): Promise<AllFabricTypesResponse> {
        try {
            const fabricTypeDto: FabricTypeDto[] = [];
            const fabricTypeEntities: FabricType[] = await this.fabricRepository.find({
                order: { 'fabricTypeName': "ASC" },
                // relations: ['fabricType']
            });
            if (fabricTypeEntities.length > 0) {
                fabricTypeEntities.forEach(fabricTypeEntity => {
                    const convertedFabricTypeDto: FabricTypeDto = this.fabricTypeAdapter.convertEntityToDto(fabricTypeEntity);
                    fabricTypeDto.push(convertedFabricTypeDto);
                });
                console.log(fabricTypeDto);
                const response = new AllFabricTypesResponse(true, 11208, "Fabric type retrieved successfully", fabricTypeDto);
                return response;
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async activateOrDeactivateFabricType(fabrictypeReq: FabricTypeRequest): Promise<FabricTypeResponse> {
        try {
            const fabrictypeExists = await this.getFabricTypeId(fabrictypeReq.fabricTypeId);
            if (fabrictypeExists) {
                if (!fabrictypeExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current garment information.Refresh and try again');
                } else {
                    
                        const fabrictypeStatus =  await this.fabricRepository.update(
                            { fabricTypeId: fabrictypeReq.fabricTypeId },
                            { isActive: fabrictypeReq.isActive,updatedUser: fabrictypeReq.updatedUser });
                       
                        if (fabrictypeExists.isActive) {
                            if (fabrictypeStatus.affected) {
                                const fabricResponse: FabricTypeResponse = new FabricTypeResponse(true, 10115, 'Fabric Type is de-activated successfully');
                                return fabricResponse;
                            } else {
                                throw new ErrorResponse(10111, 'Fabric Type is already deactivated');
                            }
                        } else {
                            if (fabrictypeStatus.affected) {
                                const fabrictypeResponse: FabricTypeResponse = new FabricTypeResponse(true, 10114, 'Fabric Type is activated successfully');
                                return fabrictypeResponse;
                            } else {
                                throw new ErrorResponse(10112, 'Fabric Type is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getFabricTypeId(fabricTypeId: number): Promise<FabricType> {
        //  console.log(employeeId);
            const response = await this.fabricRepository.findOne({
            where: {fabricTypeId: fabricTypeId},
            });
            if (response) {
            return response;
            } else {
            return null;
            }
        }
        async getAllActiveFabricType(): Promise<AllFabricTypesResponse> {
            try {
              const fabricTypeDto: FabricTypeDto[] = [];
              //retrieves all companies
              const fabrictypeEntity: FabricType[] = await this.fabricRepository.find({where:{"isActive":true},order :{fabricTypeName:'ASC'}});
              //console.log(statesEntities);
              
              if (fabrictypeEntity) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                fabrictypeEntity.forEach(fabrictypeEntity => {
                  const convertedFabricTypeDto: FabricTypeDto = this.fabricTypeAdapter.convertEntityToDto(
                    fabrictypeEntity
                  );
                  fabricTypeDto.push(convertedFabricTypeDto);
                });
        
                //generated response
      
                const response = new AllFabricTypesResponse(true,1,'Fabric Type retrieved successfully',fabricTypeDto);
                return response;
              } else {
                throw new ErrorResponse(99998, 'Data not found');
              }
              // return response;
            } catch (err) {
              return err;
            }
          }  
          async getFabricTypeByName(fabricreq: FabricTypeItemNameRequest): Promise<FabricTypeDropDownDto> {
            console.log(fabricreq);
           const fabricEntities = await this.fabricRepository.findOne({select:['fabricTypeId', 'fabricTypeName'],
                 where:{fabricTypeName:fabricreq.fabricTypeName}
                 });
                 if(fabricEntities){
                 const response = new FabricTypeDropDownDto(fabricEntities.fabricTypeId,fabricEntities.fabricTypeName);
                     return response;
                 }else{
                     throw new ErrorResponse(11106,'Something went wrong');
                 }
       }
   
}