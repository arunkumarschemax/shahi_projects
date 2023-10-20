import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupTechClassEntity,} from './group-tech-class.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllGroupTechClassResponse, AllItemCategoryResponse, CommonResponseModel, GroupTechClassResponse, ItemCategoriesDropDownResponseModel, ItemCategoryDropDownDto, ItemCategoryResponse } from '@project-management-system/shared-models';
import { GroupTechClassAdapter } from './dto/group-tech-class.adapter';
import { GroupTechClassDto } from './dto/group-tech-class.dto';

@Injectable()
export class GroupTechClassService {
    constructor(
        @InjectRepository(GroupTechClassEntity) private groupTechClassRepository: Repository<GroupTechClassEntity>,
        private groupTechClassAdapter: GroupTechClassAdapter,
      ) { }

      async getAllActiveGroupTechClass(): Promise<AllGroupTechClassResponse> {  
        try {
            const DTO: GroupTechClassDto [] = [];
            const Entities: GroupTechClassEntity[] = await this.groupTechClassRepository.find({
                order: {groupTechClassCode : "ASC" },where:{isActive:true}
            
            });
            if (Entities.length>0) {
                Entities.forEach(itEntity => {
                const convertedItemcatDto: GroupTechClassDto = this.groupTechClassAdapter.convertEntityToDto(itEntity);
                DTO.push(convertedItemcatDto);
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
}
