import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { SampleTypes } from "./sample-types.entity";
import { SampleTypesAdapter } from "./dto/sample-types.adapter";
import { SampleTypesDto } from "./dto/sample-types.dto";
import { AllSampleTypesResponseModel, OperationGroupsDto, OperationGroupsRequest, SampleTypesRequest, SampleTypesResponseModel } from "@project-management-system/shared-models";
import { OperationGroups } from "../operation-groups/operation-groups.entity";

@Injectable()
export class SampleTypesService{
    constructor(
        @InjectRepository(SampleTypes)
        private sampleTypesRepo : Repository<SampleTypes>,
        private sampleTypesAdapter : SampleTypesAdapter,
    ){}

    async getSampleTypeDetailsWithoutRelations(sampleTypeId: number): Promise<SampleTypes> {
        // tslint:disable-next-line: typedef
        const sampleTypesResponse = await this.sampleTypesRepo.findOne({
          where: {sampleTypeId: Raw(alias => `sample_type_id = '${sampleTypeId}'`)},
        });
        if (sampleTypesResponse) {
          return sampleTypesResponse;
        } else {
          return null;
        }
    }

    // async createSampleType(sampleTypeDto: SampleTypesDto, isUpdate: boolean): Promise<SampleTypesResponseModel> {
    //   try {
    //     let previousValue;
    //     if (!isUpdate) {
    //       const sampleTypesEntity = await this.sampleTypesRepo.find({where:{sampleType:sampleTypeDto.sampleType}});
    //       if (sampleTypesEntity) {
    //         return new SampleTypesResponseModel(false,11104, 'Sample Type already exists');
    //       }
    //     }
    //     else{
    //       const previous = await this.sampleTypesRepo.findOne({where:{sampleTypeId:sampleTypeDto.sampleTypeId}})
    //       previousValue = previous.sampleType;
    //       console.log(previousValue)
    //       const sampleTypesEntity = await this.getSampleTypeDetailsWithoutRelations(sampleTypeDto.sampleTypeId);
    //       if (sampleTypesEntity) {
    //         if(sampleTypesEntity.sampleTypeId!=sampleTypeDto.sampleTypeId) {
    //           return new SampleTypesResponseModel(false,11104, 'Sample Type already exists');      
    //         }
    //       }
        
    //     }
     
    //     const convertedsampleTypesEntity: SampleTypes = this.sampleTypesAdapter.convertDtoToEntity(sampleTypeDto,isUpdate);
    //     const savedOperationGroupEntity: SampleTypes = await this.sampleTypesRepo.save(
    //       convertedsampleTypesEntity
    //     );
        
    //     const savedSampleTypeDto: SampleTypesDto = this.sampleTypesAdapter.convertEntityToDto(convertedsampleTypesEntity);
    //     if (savedSampleTypeDto) {
    //       const present = savedSampleTypeDto.sampleType;
    //       console.log(present)
    //   const response = new SampleTypesResponseModel(true,1,isUpdate? 'Sample Type Updated Successfully': 'Sample Type Created Successfully',savedSampleTypeDto,);
    //   console.log(response,'-response')
    //   const name =isUpdate ? 'update':'create'
    //   const userName = isUpdate ? savedSampleTypeDto.updatedUser : savedSampleTypeDto.createdUser
    //   const displayValue = isUpdate? 'Sample Type Updated Successfully': 'Sample Type Created Successfully'
  
    //   return response;

    //     } else {
    //       return new SampleTypesResponseModel(false,11106,'Sample Type saved but issue while transforming into DTO');
    //     }
    //   //}
    //   } catch (error) {
    
    //     throw error;
    //   }
    // } 

   
    async createSampleType(sampleTypeDto: SampleTypesDto, isUpdate: boolean): Promise<SampleTypesResponseModel> {
        console.log(sampleTypeDto,'nnnnnh');
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const sampleTypeEntity =await this.getSampleTypeDetailsWithoutRelations(sampleTypeDto.sampleTypeId);
            if (sampleTypeEntity) {
              throw new SampleTypesResponseModel(false,11104, 'Sample Type already exists');
            }
          }
          else{
            const certificatePrevious = await this.sampleTypesRepo.findOne({where:{sampleTypeId:sampleTypeDto.sampleTypeId}})
            previousValue = certificatePrevious.sampleType
            const sampleTypeEntity = await this.getSampleTypeDetailsWithoutRelations(sampleTypeDto.sampleTypeId);
            if (sampleTypeEntity) {
              if(sampleTypeEntity.sampleTypeId!=sampleTypeDto.sampleTypeId) {
                throw new SampleTypesResponseModel(false,11104, 'Sample Type already exists');      
              }
            }
          }
          const convertedSampletypesEntity: SampleTypes = this.sampleTypesAdapter.convertDtoToEntity(sampleTypeDto,isUpdate);
          const savedSampleTypesEntity: SampleTypes = await this.sampleTypesRepo.save(
            convertedSampletypesEntity
          );
          const savedSampleTypesDto: SampleTypesDto = this.sampleTypesAdapter.convertEntityToDto(convertedSampletypesEntity);
          if (savedSampleTypesDto) {
            const presentValue = savedSampleTypesDto.sampleType;
           const response = new SampleTypesResponseModel(true,1,isUpdate? 'Sample Type Updated Successfully': 'Sample Type Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Sample Type Updated Successfully': 'Sample Type Created Successfully'
           const userName = isUpdate? savedSampleTypesDto.updatedUser :savedSampleTypesDto.createdUser;
          
           return response
          } else {
            throw new SampleTypesResponseModel(false,11106,'Sample Type saved but issue while transforming into DTO');
          }
        } catch (error) {
         
          return error;
        }
      }  
      async getAllSampleTypes(Req: SampleTypesRequest): Promise<AllSampleTypesResponseModel> {
        // const page: number = 1;
        try {
          const sampleTypesDto: SampleTypesDto[] = [];
          //retrieves all companies
          const sampleTypeEntities: SampleTypes[] = await this.sampleTypesRepo.find({where:{sampleType:Req.sampleType},order :{'sampleType':'ASC'}});
          //console.log(statesEntities);
          if (sampleTypeEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            sampleTypeEntities.forEach(operationEntity => {
              const convertedSampleTypesDto: SampleTypesDto = this.sampleTypesAdapter.convertEntityToDto(
                operationEntity
              );
              sampleTypesDto.push(convertedSampleTypesDto);
            });
            const response = new AllSampleTypesResponseModel(true,1,'Sample Type retrieved successfully',sampleTypesDto);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new AllSampleTypesResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }

      async getAllActiveSampleTypes(): Promise<AllSampleTypesResponseModel> {
        // const page: number = 1;
        try {
          const sampleTypesDto: SampleTypesDto[] = [];
          //retrieves all companies
          const sampleTypeEntities: SampleTypes[] = await this.sampleTypesRepo.find({where:{isActive:true},order :{'sampleType':'ASC'},});
          //console.log(statesEntities);
          if (sampleTypeEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            sampleTypeEntities.forEach(sampleTypeEntity => {
              const convertedSampleTypesDto: SampleTypesDto = this.sampleTypesAdapter.convertEntityToDto(
                sampleTypeEntity
              );
              sampleTypesDto.push(convertedSampleTypesDto);
            });
            const response = new AllSampleTypesResponseModel(true,1,'Sample Type retrieved successfully',sampleTypesDto);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new AllSampleTypesResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
    }

    async getSampleTypeById(sampleTypeId: number): Promise<SampleTypes> {
        //  console.log(employeeId);
            const Response = await this.sampleTypesRepo.findOne({
            where: {sampleTypeId: sampleTypeId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
    }

        

    async activateOrDeactivateSampleType(Req: SampleTypesRequest): Promise<SampleTypesResponseModel> {
        try {
            const sampleTypesExists = await this.getSampleTypeById(Req.sampleTypeId);
            if (sampleTypesExists) {
                if (Req.versionFlag !== sampleTypesExists.versionFlag) {
                    throw new SampleTypesResponseModel(false,10113, 'Someone updated the current Sample Type information.Refresh and try again');
                } else {
                    
                        const currencyStatus =  await this.sampleTypesRepo.update(
                            { sampleTypeId: Req.sampleTypeId},
                            { isActive: Req.isActive,updatedUser: Req.updatedUser });
                       
                        if (sampleTypesExists.isActive) {
                            if (currencyStatus.affected) {
                                const currencyResponse: SampleTypesResponseModel = new SampleTypesResponseModel(true, 10115, 'Sample Type is Deactivated successfully');
                                return currencyResponse;
                            } else {
                                throw new SampleTypesResponseModel(false,10111, 'Sample Type is already deactivated');
                            }
                        } else {
                            if (currencyStatus.affected) {
                                const CurrencyResponse: SampleTypesResponseModel = new SampleTypesResponseModel(true, 10114, 'Sample Type is activated successfully');
                                return CurrencyResponse;
                            } else {
                                throw new SampleTypesResponseModel(false,10112, 'Sample Type is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new SampleTypesResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveSampleTypeById(Req: SampleTypesRequest): Promise<SampleTypesResponseModel> {
        try {
            //retrieves all companies
            const sampleTypeEntities: SampleTypes = await this.sampleTypesRepo.findOne({
              where:{sampleTypeId:Req.sampleTypeId,isActive:true}
              });
              
              const sampleTypeData: SampleTypesDto = this.sampleTypesAdapter.convertEntityToDto(sampleTypeEntities);
              if (sampleTypeData) {
                  const response = new SampleTypesResponseModel(true, 11101 , 'Sample Type retrived Successfully',sampleTypeData);
                  return response;
              }
              else{
                  throw new SampleTypesResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    
    
}