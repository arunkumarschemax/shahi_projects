import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
