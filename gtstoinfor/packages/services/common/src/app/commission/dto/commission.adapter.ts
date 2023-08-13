import {Injectable} from '@nestjs/common';
import { CommissionDTO } from './commission.dto';
import { Commission } from '../commission.entity';

@Injectable()
export class CommissionAdapter {
    /**
     * 
     * @param roslGroupsDTO 
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity(  commissionDto: CommissionDTO,  isUpdate: boolean = false ): Commission {
        const entity = new Commission();
        entity.commission = commissionDto.commission;
        entity.isActive = commissionDto.isActive == undefined?true:commissionDto.isActive;
        if (isUpdate) {
            entity.commissionId=commissionDto.commissionId;
            entity.updatedUser = commissionDto.updatedUser;
        } else {
            entity.isActive = true;
            entity.createdUser = commissionDto.createdUser;
        }
       return entity;
      }
      
      public convertEntityToDto(entity: Commission): CommissionDTO {
        const dto = new CommissionDTO;
        dto.commissionId=entity.commissionId;
        dto.commission=entity.commission;
        dto.isActive = entity.isActive;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.createdUser = entity.createdUser;
        dto.updatedUser = entity.updatedUser;
        dto.versionFlag = entity.versionFlag;
        return dto;
      }
}