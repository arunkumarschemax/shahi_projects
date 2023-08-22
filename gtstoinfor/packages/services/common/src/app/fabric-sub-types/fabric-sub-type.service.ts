import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FabricSubTypeRequest } from './dto/fabric-sub-type.request';
import { FabricSubTypeAdapter } from './dto/fabric-sub-type.adapter';
import { FabricSubTypeDto } from './dto/fabric-sub-type.dto';
import { FabricTypeRequest } from '@project-management-system/shared-models';
import {FabricSubTypeResponse,AllFabricSubTypeResponse,FabricSubTypeDropDownDto,FabricSubTypeDropDownResponseModel} from '@project-management-system/shared-models'
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricSubType } from './fabric-sub-type.entity';


@Injectable()
export class FabricSubTypeService {
    constructor(
        @InjectRepository(FabricSubType) private fabricSubTypeRepository: Repository<FabricSubType>,
        private fabricSubTypeAdapter: FabricSubTypeAdapter,
    ) { }

    
    async createFabricSubType(fabricSubTypeDto: FabricSubTypeDto, isUpdate: boolean): Promise<FabricSubTypeResponse> {
      
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const fabricSubTypeEntity = await this.getFabricSubType(fabricSubTypeDto.fabricSubTypeName);
                if (fabricSubTypeEntity) {
                    throw new ErrorResponse(11104, 'Item category already exists');
                }
            }
            else {
                const FabricSubTypeEntity = await this.getFabricSubType(fabricSubTypeDto.fabricSubTypeName);
                if (FabricSubTypeEntity) {
                    if (!fabricSubTypeDto) {
                        throw new ErrorResponse(11104, 'Fabric Sub Type already exists');
                    }
                }
            }
          const convertedFabricSubType: FabricSubType = this.fabricSubTypeAdapter.convertDtoToEntity(fabricSubTypeDto,isUpdate);
          console.log(convertedFabricSubType);
          const savedFabricsubTypeEntity: FabricSubType = await this.fabricSubTypeRepository.save(convertedFabricSubType);
          const savedFabricsubTypeDto: FabricSubTypeDto = this.fabricSubTypeAdapter.convertEntityToDto(convertedFabricSubType);
            // console.log(savedStateDto);
          if (savedFabricsubTypeDto) {
            const presentValue = savedFabricsubTypeDto.fabricSubTypeName;
           // generating resposnse
           const response = new FabricSubTypeResponse(true,1,isUpdate? 'Item Sub Category Updated Successfully': 'Item Sub Category Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Fabric Sub Type Updated Successfully': 'Item Sub Category Created Successfully'
           const userName = isUpdate? savedFabricsubTypeDto.updatedUser :savedFabricsubTypeDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new FabricSubTypeDropDownResponseModel(false,11106,'Fabric Sub Type saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }

      async getAllFabricSubType(): Promise<AllFabricSubTypeResponse> {
        try {
            const fabricDto: FabricSubTypeDto[] = [];
            const fabricEntities: FabricSubType[] = await this.fabricSubTypeRepository.find({
                order: { fabricSubTypeName: "ASC" },
                relations: ['fabricType']
            });
            //   console.log(itemCatEntities);
            if (fabricEntities.length > 0) {
                fabricEntities.forEach(FabricSubTypeEntity => {
                    const convertedFabricSubTypeDto: FabricSubTypeDto = this.fabricSubTypeAdapter.convertEntityToDto(FabricSubTypeEntity);
                    fabricDto.push(convertedFabricSubTypeDto);
                });
                console.log(fabricDto);
                const response = new AllFabricSubTypeResponse(true, 11208, "Fabric Sub Type retrieved successfully", fabricDto);
                return response;
            } else {
                //   console.log('yest')
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
    async getFabricSubType(fabricSubType: string): Promise<FabricSubType> {
        //  console.log(employeeId);
        const response = await this.fabricSubTypeRepository.findOne({
            where: { fabricSubTypeName: fabricSubType },
        });
        // console.log(response);
        if (response) {
            return response;
        } else {
            return null;
        }
    }
  
    async getAllFabricSubTypeDropDown(): Promise<FabricSubTypeDropDownResponseModel> {
        try {
            const fabricsubTypeDTO: FabricSubTypeDropDownDto[] = [];
            const fabricSubTypeEntities: FabricSubType[] = await this.fabricSubTypeRepository.find({ select: ['fabricSubTypeId', 'fabricSubTypeName'], where: { isActive: true }, order: { fabricSubTypeName: 'ASC' } });
            if (fabricSubTypeEntities && fabricSubTypeEntities.length > 0) {
                fabricSubTypeEntities.forEach(fabricEntity => {
                    fabricsubTypeDTO.push(new FabricSubTypeDropDownDto(fabricEntity.fabricSubTypeId, fabricEntity.fabricSubTypeName));
                });
                const response = new FabricSubTypeDropDownResponseModel(true, 11108, "Fabric SubType retrieved successfully",fabricsubTypeDTO );
                return response;
            } else {
                throw new ErrorResponse(99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

    async getFabricSubTypeForId(fabricSubTypeId: number): Promise<FabricSubTypeDropDownDto> {
        const response = await this.fabricSubTypeRepository.findOne({
            select: ['fabricSubTypeId', 'fabricSubTypeName'],
            where: { fabricSubTypeId: fabricSubTypeId },
        });
        if (response) {
            return new FabricSubTypeDropDownDto(response.fabricSubTypeId, response.fabricSubTypeName);
        } else {
            return null;
        }
    }

    async getFabricSubTypeForFabricTypeDropDown(req: FabricSubTypeRequest): Promise<FabricSubTypeDropDownResponseModel> {
        try {
            const FabricSubTypeEntities: FabricSubTypeDropDownDto[] = await this.fabricSubTypeRepository
                .createQueryBuilder('fabric_sub_type')
                .select('fabric_sub_type_id as fabricSubTypeId, fabric_sub_type as fabricSubTypeName')
                .where(`is_active=1 and fabric_type_id='${req.fabricSubTypeId}'`)
                .orderBy('fabric_sub_type')
                .getRawMany();

            if (FabricSubTypeEntities && FabricSubTypeEntities.length > 0) {
                const response = new FabricSubTypeDropDownResponseModel(true, 11108, "Item sub categories retrieved successfully", FabricSubTypeEntities);
                return response;
            } else {
                throw new ErrorResponse(99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

    async activateOrDeactivateFabricSubType(SubTypeReq: FabricSubTypeRequest): Promise<FabricSubTypeResponse> {
        try {
            const SubTypeExists = await this.getFabricSubTypeById(SubTypeReq.fabricSubTypeId);
            if (SubTypeExists) {
                if (!SubTypeExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Fabric subType information.Refresh and try again');
                } else {
                    
                        const SubTypeSatatus =  await this.fabricSubTypeRepository.update(
                            { fabricSubTypeId: SubTypeReq.fabricSubTypeId },
                            { isActive: SubTypeReq.isActive,updatedUser: SubTypeReq.updatedUser });
                       
                        if (SubTypeExists.isActive) {
                            if (SubTypeSatatus.affected) {
                                const FabricResponse: FabricSubTypeResponse = new FabricSubTypeResponse (true, 10115, ' Fabric subType is de-activated successfully');
                                return FabricResponse;
                            } else {
                                throw new ErrorResponse(10111, ' Fabric subType is already deactivated');
                            }
                        } else {
                            if (SubTypeSatatus.affected) {
                                const FabricResponse: FabricSubTypeResponse = new FabricSubTypeResponse(true, 10114, ' Fabric subType is activated successfully');
                                return FabricResponse;
                            } else {
                                throw new ErrorResponse(10112, ' Fabric subType is already  activated');
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
    async getFabricSubTypeById(fabricSubTypeId: number): Promise<FabricSubType> {
        //  console.log(employeeId);
            const response = await this.fabricSubTypeRepository.findOne({
            where: {fabricSubTypeId:fabricSubTypeId},
            });
            // console.log(employeeresponse);
            if (response) {
            return response;
            } else {
            return null;
            }
        }

}