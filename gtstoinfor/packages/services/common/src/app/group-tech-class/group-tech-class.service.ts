import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { GroupTechClassEntity,} from './group-tech-class.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllGroupTechClassResponse, AllItemCategoryResponse, CommonResponseModel, GroupTechClassRequest, GroupTechClassResponse, ItemCategoriesDropDownResponseModel, ItemCategoryDropDownDto, ItemCategoryResponse } from '@project-management-system/shared-models';
import { GroupTechClassAdapter } from './dto/group-tech-class.adapter';
import { GroupTechClassDto } from './dto/group-tech-class.dto';

@Injectable()
export class GroupTechClassService {
    constructor(
        @InjectRepository(GroupTechClassEntity) private groupTechClassRepository: Repository<GroupTechClassEntity>,
        private groupTechClassAdapter: GroupTechClassAdapter,
      ) { }

    //   async getGroupTechClassDetailsWithoutRelations(groupTechClassId: number ): Promise<GroupTechClassEntity> {
    //     // tslint:disable-next-line: typedef
    //     const Response = await this.groupTechClassRepository.findOne({
    //       where: {groupTechClassId: Raw(alias => `group-tech-class_id = '${groupTechClassId}'`)},
    //     });
    //     if (Response) {
    //         console.log(Response,"response")
    //       return Response;
    //     } else {
    //       return null;
    //     }
    // }

    // async createGroupTechClass(Dto: GroupTechClassDto, isUpdate: boolean): Promise<GroupTechClassResponse> {
    //     console.log(Dto,"////")
    //   try {
    //     let previousValue;
    //     if (!isUpdate) {
    //       const GroupsEntity = await this.groupTechClassRepository.find({where:{groupTechClassCode:Dto.groupTechClassCode}});
    //       console.log(GroupsEntity,"group")
    //       if (GroupsEntity.length > 0) {
    //         //return new InformationMessageError(11104, "State already exists");
    //         return new GroupTechClassResponse(false,11104, 'Group Tech Class already exists');
    //       }
    //     }
    //     else{
    //       const previous = await this.groupTechClassRepository.findOne({where:{groupTechClassId:Dto.groupTechClassId}})
    //       previousValue = previous.groupTechClassCode+","+previous.groupTechClassDescription;
    //       console.log(previous,"77778888")
    //       const GroupsEntity = await this.getGroupTechClassDetailsWithoutRelations(Dto.groupTechClassId);
    //       if (GroupsEntity) {
    //         if(GroupsEntity.groupTechClassId!=Dto.groupTechClassId) {
    //           return new GroupTechClassResponse(false,11104, 'Group Tech Class already exists');      
    //         }
    //       }
        
    //     }
    //     // const getVendor = await this.vendorsRepository.find({where:{vendorName:vendorsDto.vendorName}})
    //     // if(getVendor){
    //     //   return new VendorsResponseModel(false,11106,'Vendor already exist');
    //     // } else {
    //     const convertedGroupsEntity: GroupTechClassDto = this.groupTechClassAdapter.convertDtoToEntity(Dto,isUpdate);
    //     const savedEntity: GroupTechClassDto = await this.groupTechClassRepository.save(
    //       convertedGroupsEntity
    //     );
        
    //     const savedGroupDto: GroupTechClassDto = this.groupTechClassAdapter.convertEntityToDto(convertedGroupsEntity);
    //     if (savedGroupDto) {
    //       const present = savedGroupDto.groupTechClassCode+","+savedGroupDto.groupTechClassDescription;
    //       // generating resposnse
    //   const response = new GroupTechClassResponse(true,1,isUpdate? 'Group Tech Class Updated Successfully': 'Group Tech Class Created Successfully',savedGroupDto,)
    //   const name =isUpdate ? 'update':'create'
    //   const userName = isUpdate ? savedGroupDto.updatedUser : savedGroupDto.createdUser
    //   const displayValue = isUpdate? 'Group Tech Class Updated Successfully': 'Group Tech Class Created Successfully'
    // //  const newLogDto = new LogsDto(1,name, 'Vendors', savedHolidayDto.vendorId, true, displayValue,userName,previousValue,present)
    // //  let res = await this.logService.createLog(newLogDto);
    //   return response;

    //     } else {
    //       //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
    //       return new GroupTechClassResponse(false,11106,'Group Tech Class saved but issue while transforming into DTO');
    //     }
    //   //}
    //   } catch (error) {
    //     // when error occures while saving the data , the execution will come to catch block.
    //     // tslint:disable-next-line: typedef
    //     throw error;
    //   }
    // } 

    async getGroupTechClassDetailsWithoutRelations(groupTechClassId: number): Promise<GroupTechClassEntity> {
  try {
    const Response = await this.groupTechClassRepository.findOne({
      where: { groupTechClassId },
    });
    if (Response) {
      console.log(Response, "response");
      return Response;
    } else {
      return null;
    }
  } catch (error) {
    // Handle the error or log it.
    console.error(error);
    throw error;
  }
}

async createGroupTechClass(Dto: GroupTechClassDto, isUpdate: boolean): Promise<GroupTechClassResponse> {
  try {
    console.log(Dto,"sevices")
    if (!isUpdate) {
      const GroupsEntity = await this.groupTechClassRepository.findOne({
        where: { groupTechClassCode: Dto.groupTechClassCode },
      });
      if (GroupsEntity) {
        return new GroupTechClassResponse(false, 11104, 'Group Tech Class already exists');
      }
    } else {
      const existingEntity = await this.groupTechClassRepository.findOne({
        where: { groupTechClassId: Dto.groupTechClassId },
      });

      if (existingEntity) {
        existingEntity.groupTechClassCode = Dto.groupTechClassCode;
        existingEntity.groupTechClassDescription = Dto.groupTechClassDescription;
        existingEntity.buyerId = Dto.buyerId;
        existingEntity.divisionId = Dto.divisionId;
        

        const updatedEntity = await this.groupTechClassRepository.save(existingEntity);
        const updatedDto: GroupTechClassDto = this.groupTechClassAdapter.convertEntityToDto(updatedEntity);

        const response = new GroupTechClassResponse(true, 1, 'Group Tech Class Updated Successfully', updatedDto);
        return response;
      } else {
        return new GroupTechClassResponse(false, 11104, 'Group Tech Class does not exist');
      }
    }

    const convertedGroupsEntity: GroupTechClassDto = this.groupTechClassAdapter.convertDtoToEntity(Dto, isUpdate);
    const savedEntity: GroupTechClassDto = await this.groupTechClassRepository.save(convertedGroupsEntity);

    const savedGroupDto: GroupTechClassDto = this.groupTechClassAdapter.convertEntityToDto(savedEntity);
    if (savedGroupDto) {
      const present = savedGroupDto.groupTechClassCode + "," + savedGroupDto.groupTechClassDescription;
      const response = new GroupTechClassResponse(true, 1, isUpdate ? 'Group Tech Class Updated Successfully' : 'Group Tech Class Created Successfully', savedGroupDto);
      return response;
    } else {
      return new GroupTechClassResponse(false, 11106, 'Group Tech Class saved but issue while transforming into DTO');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

      
      async getAllGroupTechClass(): Promise<AllGroupTechClassResponse> {  
        try {
            const Dto: GroupTechClassDto[] = [];
            const Entities: GroupTechClassEntity[] = await this.groupTechClassRepository.find({
                order: { groupTechClassCode: "ASC" },
            });
            if (Entities.length>0) {
                Entities.forEach(rec => {
                const convertedDto: GroupTechClassDto = this.groupTechClassAdapter.convertEntityToDto(rec);
                Dto.push(convertedDto);
                });
                const response = new AllGroupTechClassResponse(true, 11208, "Group Tech Class retrieved successfully", Dto);
                return response;
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
      async getAllActiveGroupTechClass(): Promise<AllGroupTechClassResponse> {  
        try {
            const DTO: GroupTechClassDto [] = [];
            const Entities: GroupTechClassEntity[] = await this.groupTechClassRepository.find({
                order: {groupTechClassCode : "ASC" },where:{isActive:true}
            
            });
            if (Entities.length>0) {
                Entities.forEach(rec => {
                const convertedDto: GroupTechClassDto = this.groupTechClassAdapter.convertEntityToDto(rec);
                DTO.push(convertedDto);
                });
                const response = new AllGroupTechClassResponse(true, 11208, "Group Tech Class retrieved successfully", DTO);
                return response;
            } else {
                throw new ErrorResponse( 99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
    async getGroupTechClassById(groupTechClassId: number): Promise<GroupTechClassEntity> {
            const response = await this.groupTechClassRepository.findOne({
            where: {groupTechClassId: groupTechClassId}, });
            if (response) {
            return response;
            } else {
            return null;
            }
        }

     async activateOrDeactivateGroupTechClass(Req: GroupTechClassRequest): Promise<AllGroupTechClassResponse> {
            try {
                const data = await this.getGroupTechClassById(Req.groupTechClassId);
                if (data) {
                    if (!data) {
                        throw new ErrorResponse(10113, 'Someone updated the current item category information.Refresh and try again');
                    } else {
                        
                            const status =  await this.groupTechClassRepository.update(
                                { groupTechClassId: Req.groupTechClassId },
                                { isActive: Req.isActive,updatedUser: Req.updatedUser });
                           
                            if (data.isActive) {
                                if (status.affected) {
                                    const Response: AllGroupTechClassResponse = new AllGroupTechClassResponse(true, 10115, 'Group Tech Class is de-activated successfully');
                                    return Response;
                                } else {
                                    throw new ErrorResponse(10111, 'Item category is already deactivated');
                                }
                            } else {
                                if (status.affected) {
                                    const Response: AllGroupTechClassResponse = new AllGroupTechClassResponse(true, 10114, 'Group Tech Class is activated successfully');
                                    return Response;
                                } else {
                                    throw new ErrorResponse(10112, 'Group Tech Class is already  activated');
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

     async getActivegetGroupTechClassById(Req: GroupTechClassRequest): Promise<AllGroupTechClassResponse> {
            try {
               
                const Entities: GroupTechClassEntity = await this.groupTechClassRepository.findOne({
                  where:{groupTechClassId:Req.groupTechClassId}
                  });
                  
                  const Data: GroupTechClassDto = this.groupTechClassAdapter.convertEntityToDto(Entities);
                  if (Data) {
                      const response = new AllGroupTechClassResponse(true, 11101 , 'Group Tech Class retrived Successfully',[Data]);
                      return response;
                  }
                  else{
                      throw new AllGroupTechClassResponse(false,11106,'Something went wrong');
                  }
                  // generating resposnse
            } catch (err) {
                return err;
            }
        }   
}
