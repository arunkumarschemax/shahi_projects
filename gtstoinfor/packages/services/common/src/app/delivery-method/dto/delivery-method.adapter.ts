import {Injectable} from '@nestjs/common';
import { DeliveryMethodDTO } from './delivery-method.dto';
import { DeliveryMethod } from '../delivery-method.entity';

@Injectable()
export class DeliveryMethodAdapter {
    /**
     * 
     * @param DeliveryMethodDTO 
     * @param isUpdate 
     * @returns 
     */

    public convertDtoToEntity(  deliveryMethodDTO: DeliveryMethodDTO,  isUpdate: boolean = false ): DeliveryMethod {
        const deliveryMethod = new DeliveryMethod();
        // deliveryMethod.deliveryMethodId=deliveryMethodDTO.deliveryMethodId;
        deliveryMethod.deliveryMethod = deliveryMethodDTO.deliveryMethod;
        // company.isActive = statesDto.isActive == undefined ? true : statesDto.isActive;
        deliveryMethod.isActive = deliveryMethodDTO.isActive==undefined?true:deliveryMethodDTO.isActive;
        if (isUpdate) {
            deliveryMethod.deliveryMethodId=deliveryMethodDTO.deliveryMethodId;
            deliveryMethod.updatedUser = deliveryMethodDTO.updatedUser;
        } else {
            deliveryMethod.isActive = true;
            deliveryMethod.createdUser = deliveryMethodDTO.createdUser;
        }
       return deliveryMethod;
      }
      
      public convertEntityToDto(deliveryMethodData: DeliveryMethod): DeliveryMethodDTO {
        const deliveryMethodDto = new DeliveryMethodDTO;
        deliveryMethodDto.deliveryMethodId=deliveryMethodData.deliveryMethodId;
        deliveryMethodDto.deliveryMethod=deliveryMethodData.deliveryMethod;
        deliveryMethodDto.isActive = deliveryMethodData.isActive;
        deliveryMethodDto.createdAt = deliveryMethodData.createdAt;
        deliveryMethodDto.updatedAt = deliveryMethodData.updatedAt;
        deliveryMethodDto.createdUser = deliveryMethodData.createdUser;
        deliveryMethodDto.updatedUser = deliveryMethodData.updatedUser;
        deliveryMethodDto.versionFlag = deliveryMethodData.versionFlag;
        return deliveryMethodDto;
      }
}