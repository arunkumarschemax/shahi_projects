import { Injectable } from '@nestjs/common';
import { PaymentTerms } from '../payment-terms.entity';
import { PaymentTermsDTO } from './payment-terms.dto';

@Injectable()
export class PaymentTermsAdapter {
  /**
   *
   * @param PaymentTermsDto
   * @returns PaymentTerms entity
   */
  public convertDtoToEntity(  paymentTermsDTO: PaymentTermsDTO,  isUpdate: boolean = false ): PaymentTerms {
    const paymentTerms = new PaymentTerms();
    paymentTerms.paymentTermsId=paymentTermsDTO.paymentTermsId;
    paymentTerms.paymentTermsName=paymentTermsDTO.paymentTermsName;
    paymentTerms.PaymentTermsCategory=paymentTermsDTO.PaymentTermsCategory;
    paymentTerms.isActive=paymentTermsDTO.isActive==undefined?true:paymentTermsDTO.isActive;
    if (isUpdate) {
      paymentTerms.updatedUser = paymentTermsDTO.updatedUser;
    } else {
      paymentTerms.isActive = true;
      paymentTerms.createdUser = paymentTermsDTO.createdUser;
    }
   return paymentTerms;
  }
  public convertEntityToDto(paymentTermsObject: PaymentTerms): PaymentTermsDTO {
    const paymentTermsDTO= new PaymentTermsDTO;
    paymentTermsDTO.paymentTermsId = paymentTermsObject.paymentTermsId;
    paymentTermsDTO.PaymentTermsCategory=paymentTermsObject.PaymentTermsCategory;
    paymentTermsDTO.paymentTermsName = paymentTermsObject.paymentTermsName;
    paymentTermsDTO.isActive = paymentTermsObject.isActive;
    paymentTermsDTO.createdAt = paymentTermsObject.createdAt;
    paymentTermsDTO.updatedAt = paymentTermsObject.updatedAt;
    paymentTermsDTO.createdUser = paymentTermsObject.createdUser;
    paymentTermsDTO.updatedUser = paymentTermsObject.updatedUser;
    paymentTermsDTO.versionFlag = paymentTermsObject.versionFlag;
    return paymentTermsDTO;
  }
}
