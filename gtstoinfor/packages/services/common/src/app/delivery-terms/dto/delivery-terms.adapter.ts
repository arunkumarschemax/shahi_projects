import { Injectable } from '@nestjs/common';
import { DeliveryTerms } from '../delivery-terms.entity';
import { DeliveryTermsDTO } from './delivery-terms.dto';

@Injectable()
export class DeliveryTermsAdapter {
  /**
   *
   * @param DeliveryTermsDto
   * @returns DeliveryTerms entity
   */
  public convertDtoToEntity(  deliveryTermsDTO: DeliveryTermsDTO,  isUpdate: boolean = false ): DeliveryTerms {
    const deliveryTerms = new DeliveryTerms();
    deliveryTerms.deliveryTermsId=deliveryTermsDTO.deliveryTermsId;
    deliveryTerms.deliveryTermsName=deliveryTermsDTO.deliveryTermsName;
    deliveryTerms.isActive=deliveryTermsDTO.isActive==undefined?true:deliveryTermsDTO.isActive;
    if (isUpdate) {
      deliveryTerms.updatedUser = deliveryTermsDTO.updatedUser;
    } else {
      deliveryTerms.isActive = true;
      deliveryTerms.createdUser = deliveryTermsDTO.createdUser;
    }
   return deliveryTerms;
  }
  public convertEntityToDto(deliveryTermsObject: DeliveryTerms): DeliveryTermsDTO {
    const deliveryTermsDTO= new DeliveryTermsDTO;
    deliveryTermsDTO.deliveryTermsId = deliveryTermsObject.deliveryTermsId;
    deliveryTermsDTO.deliveryTermsName = deliveryTermsObject.deliveryTermsName;
    deliveryTermsDTO.isActive = deliveryTermsObject.isActive;
    deliveryTermsDTO.createdAt = deliveryTermsObject.createdAt;
    deliveryTermsDTO.updatedAt = deliveryTermsObject.updatedAt;
    deliveryTermsDTO.createdUser = deliveryTermsObject.createdUser;
    deliveryTermsDTO.updatedUser = deliveryTermsObject.updatedUser;
    deliveryTermsDTO.versionFlag = deliveryTermsObject.versionFlag;
    return deliveryTermsDTO;
  }
}
