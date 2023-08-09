import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { OperationGroups } from "./operation-groups.entity";
import { OperationGroupsAdapter } from "./dto/operation-groups.adapter";
import { OperationGroupsDto } from "./dto/operation-groups.dto";
import { AllOperationGroupsResponseModel, OperationGroupsResponseModel } from "@project-management-system/shared-models";
import { OperationGroupsRequest } from "./dto/operation-groups.req";

@Injectable()
export class OperationGroupsService{
    constructor(
        @InjectRepository(OperationGroups)
        private operationGroupsRepo : Repository<OperationGroups>,
        private operationGroupsAdapter : OperationGroupsAdapter,
    ){}

    async getOperationGroupDetailsWithoutRelations(operationGroupId: number): Promise<OperationGroups> {
        // tslint:disable-next-line: typedef
        const operationGroupResponse = await this.operationGroupsRepo.findOne({
          where: {operationGroupId: Raw(alias => `operation_group_id = '${operationGroupId}'`)},
        });
        if (operationGroupResponse) {
          return operationGroupResponse;
        } else {
          return null;
        }
    }

    async createOperationGroup(operationGroupDto: OperationGroupsDto, isUpdate: boolean): Promise<OperationGroupsResponseModel> {
      // console.log(statesDto);
      try {
        let previousValue;
        if (!isUpdate) {
          const operationGroupsEntity = await this.operationGroupsRepo.find({where:{operationGroupName:operationGroupDto.operationGroupName}});
          if (operationGroupsEntity) {
            //return new InformationMessageError(11104, "State already exists");
            return new OperationGroupsResponseModel(false,11104, 'Operation Group  already exists');
          }
        }
        else{
          const previous = await this.operationGroupsRepo.findOne({where:{operationGroupId:operationGroupDto.operationGroupId}})
          previousValue = previous.operationGroupCode+","+previous.operationGroupName;
          console.log(previousValue)
          const operationGroupsEntity = await this.getOperationGroupDetailsWithoutRelations(operationGroupDto.operationGroupId);
          if (operationGroupsEntity) {
            if(operationGroupsEntity.operationGroupId!=operationGroupDto.operationGroupId) {
              return new OperationGroupsResponseModel(false,11104, 'Operation Group already exists');      
            }
          }
        
        }
        // const getVendor = await this.vendorsRepository.find({where:{vendorName:vendorsDto.vendorName}})
        // if(getVendor){
        //   return new VendorsResponseModel(false,11106,'Vendor already exist');
        // } else {
        const convertedOperationGroupsEntity: OperationGroups = this.operationGroupsAdapter.convertDtoToEntity(operationGroupDto,isUpdate);
        const savedOperationGroupEntity: OperationGroups = await this.operationGroupsRepo.save(
          convertedOperationGroupsEntity
        );
        
        const savedOperationGroupDto: OperationGroupsDto = this.operationGroupsAdapter.convertEntityToDto(convertedOperationGroupsEntity);
          // console.log(savedStateDto);
        if (savedOperationGroupDto) {
          const present = savedOperationGroupDto.operationGroupCode+","+savedOperationGroupDto.operationGroupName;
          console.log(present)
          // generating resposnse
      const response = new OperationGroupsResponseModel(true,1,isUpdate? 'Operation Group Updated Successfully': 'Operation Group Created Successfully',savedOperationGroupDto,);
      console.log(response,'-response')
      const name =isUpdate ? 'update':'create'
      const userName = isUpdate ? savedOperationGroupDto.updatedUser : savedOperationGroupDto.createdUser
      const displayValue = isUpdate? 'Operation Group Updated Successfully': 'Operation Group Created Successfully'
    //  const newLogDto = new LogsDto(1,name, 'Vendors', savedHolidayDto.vendorId, true, displayValue,userName,previousValue,present)
    //  let res = await this.logService.createLog(newLogDto);
    //  console.log(res);
      return response;

        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          return new OperationGroupsResponseModel(false,11106,'OPeration Group saved but issue while transforming into DTO');
        }
      //}
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        throw error;
      }
    } 

    // async createOperationGroup(operationGroupDto: OperationGroupsDto, isUpdate: boolean):Promise<OperationGroupsResponseModel> {
    //     console.log(operationGroupDto,'nnnnnh');
        
    //     try {
    //       let previousValue
    //       // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
    //       if (!isUpdate) {
    //         const operationGroupsEntity = await this.getOperationGroupDetailsWithoutRelations(operationGroupDto.operationGroupCode);
    //         if (operationGroupsEntity) {
    //           //return new InformationMessageError(11104, "State already exists");
    //           throw new OperationGroupsResponseModel(false,11104, 'Operation Group already exists');
    //         }
    //       }
    //       else{
    //         const operationGroupPrevious = await this.operationGroupsRepo.findOne({where:{operationGroupId:operationGroupDto.operationGroupId}})
    //         previousValue = operationGroupPrevious.operationGroupCode
    //         const operationGroupsEntity = await this.getOperationGroupDetailsWithoutRelations(operationGroupDto.operationGroupCode);
    //         if (operationGroupsEntity) {
    //           if(operationGroupsEntity.operationGroupId!=operationGroupDto.operationGroupId) {
    //             throw new OperationGroupsResponseModel(false,11104, 'Operation Group already exists');      
    //           }
    //         }
    //       }
    //       const convertedOperationGroupsEntity: OperationGroups = this.operationGroupsAdapter.convertDtoToEntity(operationGroupDto,isUpdate);
    //       const savedCurrencyEntity: OperationGroups = await this.operationGroupsRepo.save(
    //         convertedOperationGroupsEntity
    //       );
    //       const savedOperationGroupDto: OperationGroupsDto = this.operationGroupsAdapter.convertEntityToDto(convertedOperationGroupsEntity);
    //         // console.log(savedStateDto);
    //       if (savedOperationGroupDto) {
    //         const presentValue = savedOperationGroupDto.operationGroupCode;
    //        // generating resposnse
    //        const response = new OperationGroupsResponseModel(true,1,isUpdate? 'Operation Group Updated Successfully': 'Operation Group Created Successfully');
    //        const name=isUpdate?'updated':'created'
    //        const displayValue = isUpdate? 'Operation Group Updated Successfully': 'Operation Group Created Successfully'
    //        const userName = isUpdate? savedOperationGroupDto.updatedUser :savedOperationGroupDto.createdUser;
    //       //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
    //       //  let res = await this.logService.createLog(newLogDto);
    //       //  console.log(res);
    //        return response
    //       } else {
    //         //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
    //         throw new OperationGroupsResponseModel(false,11106,'Operation Group saved but issue while transforming into DTO');
    //       }
    //     } catch (error) {
    //       // when error occures while saving the data , the execution will come to catch block.
    //       // tslint:disable-next-line: typedef
    //       return error;
    //     }
    //   }  

      async getAllOperationGroups(operationReq: OperationGroupsRequest): Promise<AllOperationGroupsResponseModel> {
        // const page: number = 1;
        try {
          const operationGroupsDto: OperationGroupsDto[] = [];
          //retrieves all companies
          const operationGroupEntities: OperationGroups[] = await this.operationGroupsRepo.find({where:{operationGroupCode:operationReq.operationGroupCode},order :{'operationGroupName':'ASC'}});
          //console.log(statesEntities);
          if (operationGroupEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            operationGroupEntities.forEach(operationEntity => {
              const convertedOperationGroupsDto: OperationGroupsDto = this.operationGroupsAdapter.convertEntityToDto(
                operationEntity
              );
              operationGroupsDto.push(convertedOperationGroupsDto);
            });
            const response = new AllOperationGroupsResponseModel(true,1,'Operation Group retrieved successfully',operationGroupsDto);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new AllOperationGroupsResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }

      async getAllActiveOperationGroups(): Promise<AllOperationGroupsResponseModel> {
        // const page: number = 1;
        try {
          const operationGroupsDto: OperationGroupsDto[] = [];
          //retrieves all companies
          const operationGroupEntities: OperationGroups[] = await this.operationGroupsRepo.find({where:{isActive:true},order :{'operationGroupName':'ASC'},});
          //console.log(statesEntities);
          if (operationGroupEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            operationGroupEntities.forEach(operationEntity => {
              const convertedOperationGroupsDto: OperationGroupsDto = this.operationGroupsAdapter.convertEntityToDto(
                operationEntity
              );
              operationGroupsDto.push(convertedOperationGroupsDto);
            });
            const response = new AllOperationGroupsResponseModel(true,1,'Operation Group retrieved successfully',operationGroupsDto);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new AllOperationGroupsResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
    }

    async getOperationGroupById(operationGroupId: number): Promise<OperationGroups> {
        //  console.log(employeeId);
            const Response = await this.operationGroupsRepo.findOne({
            where: {operationGroupId: operationGroupId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
    }

        

    async activateOrDeactivateOperationGroup(operationReq: OperationGroupsRequest): Promise<OperationGroupsResponseModel> {
        try {
            const operationGroupExists = await this.getOperationGroupById(operationReq.operationGroupId);
            if (operationGroupExists) {
                if (operationReq.versionFlag !== operationGroupExists.versionFlag) {
                    throw new OperationGroupsResponseModel(false,10113, 'Someone updated the current Operation Group information.Refresh and try again');
                } else {
                    
                        const currencyStatus =  await this.operationGroupsRepo.update(
                            { operationGroupId: operationReq.operationGroupId},
                            { isActive: operationReq.isActive,updatedUser: operationReq.updatedUser });
                       
                        if (operationGroupExists.isActive) {
                            if (currencyStatus.affected) {
                                const currencyResponse: OperationGroupsResponseModel = new OperationGroupsResponseModel(true, 10115, 'Operation Group is de-activated successfully');
                                return currencyResponse;
                            } else {
                                throw new OperationGroupsResponseModel(false,10111, 'Operation Group is already deactivated');
                            }
                        } else {
                            if (currencyStatus.affected) {
                                const CurrencyResponse: OperationGroupsResponseModel = new OperationGroupsResponseModel(true, 10114, 'Operation Group is activated successfully');
                                return CurrencyResponse;
                            } else {
                                throw new OperationGroupsResponseModel(false,10112, 'Operation Group is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new OperationGroupsResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveOperationGroupById(operationReq: OperationGroupsRequest): Promise<OperationGroupsResponseModel> {
        try {
            //retrieves all companies
            const operationGroupEntities: OperationGroups = await this.operationGroupsRepo.findOne({
              where:{operationGroupId:operationReq.operationGroupId,isActive:true}
              });
              
              const currencyData: OperationGroupsDto = this.operationGroupsAdapter.convertEntityToDto(operationGroupEntities);
              if (currencyData) {
                  const response = new OperationGroupsResponseModel(true, 11101 , 'Operation Group retrived Successfully',currencyData);
                  return response;
              }
              else{
                  throw new OperationGroupsResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    
    
}