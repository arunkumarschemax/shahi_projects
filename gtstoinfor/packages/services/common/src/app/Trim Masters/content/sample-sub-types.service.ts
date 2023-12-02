// import { Injectable, Req } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { getManager, Raw, Repository } from 'typeorm';
// import axios from 'axios';
// import { truncate } from 'fs';
// import { UserRequestDto } from '../currencies/dto/user-logs-dto';
// import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
// import { SampleSubTypes } from './sample-sub-types.entity';
// import { SampleSubTypeAdapter } from './dto/sample-sub-types.adapter';
// import { SampleSubTypeDTO } from './dto/sample-sub-types.dto';
// import { AllSampleSubTypesResponseModel, SampleSubTypesResponseModel } from '@project-management-system/shared-models';
// import { SampleSubTypeRequest } from './dto/sample-sub-types.request';




// @Injectable()
// export class SampleSubTypesService {
//     constructor(
      
//         @InjectRepository(SampleSubTypes)
//         private SampleSubTypesRepository: Repository<SampleSubTypes>,
//         private sampleSubTypesAdapter: SampleSubTypeAdapter,
//     ){}

//     async getSampleSubTypesWithoutRelations(sampleSubType: string): Promise<SampleSubTypes> {
//         //  console.log(employeeId);
//         const response = await this.SampleSubTypesRepository.findOne({
//             where: { sampleSubTypeId: Raw(alias => `sample_sub_type = "${sampleSubType}"`) },
//         });
//         // console.log(response);
//         if (response) {
//             return response;
//         } else {
//             return null;
//         }
//     }

//     async createSampleSubType(sampleSubTypesDto: SampleSubTypeDTO, isUpdate: boolean): Promise<SampleSubTypesResponseModel> {
        
//         try {
//           let previousValue
//           // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
//           if (!isUpdate) {
//             const sampleSubTypesEntity = await this.getSampleSubTypesWithoutRelations(sampleSubTypesDto.sampleSubType);
//             if (sampleSubTypesEntity) {
//               //return new InformationMessageError(11104, "State already exists");
//               throw new SampleSubTypesResponseModel(false,11104, 'Sample Sub Type already exists');
//             }
//           }
//           else{
//             const certificatePrevious = await this.SampleSubTypesRepository.findOne({where:{sampleSubTypeId:sampleSubTypesDto.sampleSubTypeId}})
//             previousValue = certificatePrevious.sampleSubType
//             const sampleSubTypesEntity = await this.getSampleSubTypesWithoutRelations(sampleSubTypesDto.sampleSubType);
//             if (sampleSubTypesEntity) {
//               if(sampleSubTypesEntity.sampleSubTypeId!=sampleSubTypesDto.sampleSubTypeId) {
//                 throw new SampleSubTypesResponseModel(false,11104, 'Sample Sub Type already exists');      
//               }
//             }
//           }
//           const convertedSampleSubTypeEntity: SampleSubTypes = this.sampleSubTypesAdapter.convertDtoToEntity(sampleSubTypesDto,isUpdate);
//           const savedSampleSubTypeEntity: SampleSubTypes = await this.SampleSubTypesRepository.save(
//             convertedSampleSubTypeEntity
//           );
//           const savedSampleSubTypesDto: SampleSubTypeDTO = this.sampleSubTypesAdapter.convertEntityToDto(convertedSampleSubTypeEntity);
//             // console.log(savedStateDto);
//           if (savedSampleSubTypesDto) {
//             const presentValue = savedSampleSubTypesDto.sampleSubType;
//            // generating resposnse
//            const response = new SampleSubTypesResponseModel(true,1,isUpdate? 'Sample Sub Type Updated Successfully': 'Sample Sub Type Created Successfully');
//            const name=isUpdate?'updated':'created'
//            const displayValue = isUpdate? 'Sample Sub Type Updated Successfully': 'Sample Sub Type Created Successfully'
//            const userName = isUpdate? savedSampleSubTypesDto.updatedUser :savedSampleSubTypesDto.createdUser;
//           //  const newLogDto = new LogsDto(1,name, 'Currencies', savedBrandsDto.currencyId, true, displayValue,userName,previousValue,presentValue)
//           //  let res = await this.logService.createLog(newLogDto);
//           //  console.log(res);
//            return response
//           } else {
//             //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
//             throw new SampleSubTypesResponseModel(false,11106,'Sample Sub Type saved but issue while transforming into DTO');
//           }
//         } catch (error) {
//           // when error occures while saving the data , the execution will come to catch block.
//           // tslint:disable-next-line: typedef
//           return error;
//         }
//       }  
  
  
//       async getAllSampleSubTypes(req?:UserRequestDto): Promise<AllSampleSubTypesResponseModel> {
//         // const page: number = 1;
//         try {
//           const sampleSubTypesDtos: SampleSubTypeDTO[] = [];
//           //retrieves all companies
//           const sampleSubTypesEntities: SampleSubTypes[] = await this.SampleSubTypesRepository.find({order :{'sampleSubType':'ASC'}, relations:["sampleSubTypes"]});
//           //console.log(statesEntities);
//           if (sampleSubTypesEntities) {
//             // converts the data fetched from the database which of type companies array to type StateDto array.
//             sampleSubTypesEntities.forEach(sampleSubTypesEntity => {
//               const convertedSampleSubTypesDto: SampleSubTypeDTO = this.sampleSubTypesAdapter.convertEntityToDto(
//                 sampleSubTypesEntity
//               );
//               sampleSubTypesDtos.push(convertedSampleSubTypesDto);
//             });
//             const response = new AllSampleSubTypesResponseModel(true,1,'Sample Sub Types retrieved successfully',sampleSubTypesDtos);
//             // if(req?.createdUser){
//             //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
//             //   let res = await this.logService.createLog(newLogDto);
//             //   console.log(res);
//             // }
//             return response;
//           } else {
//             throw new SampleSubTypesResponseModel(false,99998, 'Data not found');
//           }
          
//         } catch (err) {
//           return err;
//         }
//       }

  
//       async getAllActiveSampleSubTypes(): Promise<AllSampleSubTypesResponseModel> {
//         // const page: number = 1;
//         try {
//             const SampleSubTypeDto: SampleSubTypeDTO[] = [];
//             //retrieves all companies
//             const SampleSubTypeEntities: SampleSubTypes[] = await this.SampleSubTypesRepository.find({ order: { 'sampleSubType': 'ASC' },where:{isActive:true}
//            });
//          console.log(SampleSubTypeEntities)
//             if (SampleSubTypeEntities) {
//                 // converts the data fetched from the database which of type companies array to type StateDto array.
//                 SampleSubTypeEntities.forEach(Entity => {
//                     const convertedBrandsDtos: SampleSubTypeDTO = this.sampleSubTypesAdapter.convertEntityToDto(
//                       Entity
//                     );
//                     SampleSubTypeDto.push(convertedBrandsDtos);
//                 });
//                 const response = new AllSampleSubTypesResponseModel(true, 11108, "Sample Sub Types retrieved successfully",SampleSubTypeDto);
//                 return response;
//             } else {
//                 throw new SampleSubTypesResponseModel(false,99998, 'Data not found'); 
//             }
//         } catch (err) {
//             return err;
//         }
//     }
   

//   async activateOrDeactivateSampleSubType(Req: SampleSubTypeRequest): Promise<SampleSubTypesResponseModel> {
//     try {
//       console.log(Req.isActive,'service-----------')
//         const sampleSubTypeExists = await this.getSampleSubTypeById(Req.sampleSubTypeId);
//         if (sampleSubTypeExists) {
//             if (!sampleSubTypeExists) {
//                 throw new ErrorResponse(10113, 'Someone updated the current SampleSubType information.Refresh and try again');
//             } else {

//                 const sampleSubTypeStatus = await this.SampleSubTypesRepository.update(
//                     { sampleSubTypeId: Req.sampleSubTypeId },
//                     { isActive: Req.isActive, updatedUser: Req.updatedUser });
//                 if (sampleSubTypeExists.isActive) {
//                     if (sampleSubTypeStatus.affected) {
//                         const sampleSubTypeResponse: SampleSubTypesResponseModel = new SampleSubTypesResponseModel(true, 10115, 'sample Sub Type is de-activated successfully');
//                         return sampleSubTypeResponse;
//                     } else {
//                         throw new SampleSubTypesResponseModel(false,10111, 'sample Sub Type is already deactivated');
//                     }
//                 } else {
//                     if (sampleSubTypeStatus.affected) {
//                         const brandResponse: SampleSubTypesResponseModel = new SampleSubTypesResponseModel(true, 10114, 'sample Sub Type is activated successfully');
//                         return brandResponse;
//                     } else {
//                         throw new SampleSubTypesResponseModel(false,10112, 'sample Sub Type is already  activated');
//                     }
//                 }
//                 // }
//             }
//         } else {
//             throw new SampleSubTypesResponseModel(false,99998, 'No Records Found');
//         }
//     } catch (err) {
//         return err;
//     }
// }
//       async getActivesampleSubTypeById(Req: SampleSubTypeRequest): Promise<SampleSubTypesResponseModel> {
//         try {
//             //retrieves all companies
//             const sampleSubTypesEntities: SampleSubTypes = await this.SampleSubTypesRepository.findOne({
//               where:{sampleSubTypeId:Req.sampleSubTypeId}
//               });
              
//               const sampleSubTypeData: SampleSubTypeDTO = this.sampleSubTypesAdapter.convertEntityToDto(sampleSubTypesEntities);
//               if (sampleSubTypeData) {
//                   const response = new SampleSubTypesResponseModel(true, 11101 , 'sample Sub Type retrived Successfully',);
//                   return response;
//               }
//               else{
//                   throw new SampleSubTypesResponseModel(false,11106,'Something went wrong');
//               }
//               // generating resposnse
//         } catch (err) {
//             return err;
//         }
//     }

//     async getSampleSubTypeById(sampleSubTypeId: number): Promise<SampleSubTypes> {
//         //  console.log(employeeId);
//             const Response = await this.SampleSubTypesRepository.findOne({
//             where: {sampleSubTypeId: sampleSubTypeId},
//             });
//             // console.log(employeeResponse);
//             if (Response) {
//             return Response;
//             } else {
//             return null;
//             }
//         }

// }
