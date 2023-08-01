import {Injectable} from '@nestjs/common';
import { LiscenceType } from '../liscence-type.entity';
import { LiscenceTypeDTO } from './liscence-type.dto';

@Injectable()
export class LiscenceTypeAdapter {
    /**
     * 
     * @param LiscenceTypeDTO 
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity(  liscenceTypeDTO: LiscenceTypeDTO,  isUpdate: boolean = false ): LiscenceType {
        const liscenceType = new LiscenceType();
        liscenceType.liscenceType = liscenceTypeDTO.liscenceType;
        liscenceType.isActive = liscenceTypeDTO.isActive==undefined?true:liscenceTypeDTO.isActive;
        if (isUpdate) {
            liscenceType.liscenceTypeId=liscenceTypeDTO.liscenceTypeId;
            liscenceType.updatedUser = liscenceTypeDTO.updatedUser;
        } else {
            liscenceType.isActive = true;
            liscenceType.createdUser = liscenceTypeDTO.createdUser;
        }
       return liscenceType;
      }
      
      public convertEntityToDto(deliveryMethodData: LiscenceType): LiscenceTypeDTO {
        const liscenceTypeDto = new LiscenceTypeDTO;
        liscenceTypeDto.liscenceTypeId=deliveryMethodData.liscenceTypeId;
        liscenceTypeDto.liscenceType=deliveryMethodData.liscenceType;
        liscenceTypeDto.isActive = deliveryMethodData.isActive;
        liscenceTypeDto.createdAt = deliveryMethodData.createdAt;
        liscenceTypeDto.updatedAt = deliveryMethodData.updatedAt;
        liscenceTypeDto.createdUser = deliveryMethodData.createdUser;
        liscenceTypeDto.updatedUser = deliveryMethodData.updatedUser;
        liscenceTypeDto.versionFlag = deliveryMethodData.versionFlag;
        return liscenceTypeDto;
      }
}