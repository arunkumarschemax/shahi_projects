import { Injectable } from "@nestjs/common";
import { PaymentMethod } from "../payment-method-entity";
import { PaymentMethodDTO } from "./payment-method.dto";

@Injectable()
export class PaymentMethodAdapter{

      /**
     * 
     * @param PaymentMethodDTO 
     * @param isUpdate 
     * @returns 
     */

      public convertDtoToEntity( paymentMethodDTO: PaymentMethodDTO, isUpdate: boolean=false): PaymentMethod {
      const paymentMethod = new PaymentMethod();
      paymentMethod.paymentMethodId=paymentMethodDTO.paymentMethodId;
      paymentMethod.paymentMethod=paymentMethodDTO.paymentMethod;
      paymentMethod.isActive=paymentMethodDTO.isActive==undefined?true:paymentMethodDTO.isActive;
      if(isUpdate){
        paymentMethod.updatedUser=paymentMethodDTO.updatedUser;
      }else{
        paymentMethod.isActive = true;
        paymentMethod.createdUser = paymentMethodDTO.createdUser;
      }
      return paymentMethod;
      }

     public convertEntityToDto ( paymentMethodData: PaymentMethod): PaymentMethodDTO{
        const paymentMethod = new PaymentMethod();
      paymentMethod.paymentMethodId=paymentMethodData.paymentMethodId;
      paymentMethod.paymentMethod=paymentMethodData.paymentMethod;
      paymentMethod.isActive=paymentMethodData.isActive;
      paymentMethod.createdAt=paymentMethodData.createdAt;
      paymentMethod.updatedAt=paymentMethodData.updatedAt;
      paymentMethod.updatedUser=paymentMethod.updatedUser;
      paymentMethod.versionFlag=paymentMethodData.versionFlag;
      return paymentMethod;

     }
}