import { Injectable } from '@nestjs/common';
import { Buyers } from '../buyers.entity';
import { BuyersDTO } from './buyers.dto';
import { Countries } from '../../countries/countries.entity';
import { PaymentTerms } from '../../payment-terms/payment-terms.entity';
import { PaymentMethod } from '../../payment-methods/payment-method-entity';


@Injectable()
export class BuyersAdapter {
  /**
   *
   * @param CustomersDto
   * @returns Customers entity
   */
  public convertDtoToEntity(  buyersDTO: BuyersDTO,  isUpdate: boolean = false ): Buyers {
    const buyer = new Buyers();
    buyer.buyerCode=buyersDTO.buyerCode;
    buyer.buyerName=buyersDTO.buyerName;
    // buyer.accountType=buyersDTO.accountType;
    buyer.gstNumber=buyersDTO.gstNumber;
    buyer.contactPerson=buyersDTO.contactPerson;
    buyer.phoneNo=buyersDTO.phoneNo;
    buyer.email=buyersDTO.email;
    buyer.currency = buyersDTO.currency;
    buyer.state = buyersDTO.state;
    buyer.district = buyersDTO.district;
    buyer.city = buyersDTO.city;
    buyer.landmark = buyersDTO.landmark;
    buyer.lane1 = buyersDTO.lane1;
    buyer.lane2 = buyersDTO.lane2;
    buyer.pincode = buyersDTO.pincode;
    buyer.publicNote=buyersDTO.publicNote;
    buyer.privateNote=buyersDTO.privateNote;
    buyer.countryInfo = new Countries()
    buyer.countryInfo.countryId = Number(buyersDTO.countryId)
    buyer.paymentTermsInfo = new PaymentTerms()
    buyer.paymentTermsInfo.paymentTermsId=Number(buyersDTO.paymentTermsId);
    buyer.paymentMethodInfo = new PaymentMethod()
    buyer.paymentMethodInfo.paymentMethodId=Number(buyersDTO.paymentMethodId);
    // buyer.buyerAccountType=buyersDTO.buyerAccountType;
    buyer.isActive=buyersDTO.isActive==undefined?true:buyersDTO.isActive;

    if (isUpdate) {
      buyer.buyerId=buyersDTO.buyerId;
      buyer.updatedUser = buyersDTO.updatedUser;
    } else {
      buyer.isActive = true;
      buyer.createdUser = buyersDTO.createdUser;
    }
   return buyer;
  }
  public convertEntityToDto(buyersObject: Buyers): BuyersDTO {
    const buyersDTO= new BuyersDTO;
    buyersDTO.buyerId=buyersObject.buyerId;
    buyersDTO.buyerCode=buyersObject.buyerCode;
    buyersDTO.buyerName=buyersObject.buyerName;
    // buyersDTO.accountType=buyersObject.accountType;
    buyersDTO.gstNumber=buyersObject.gstNumber;
    buyersDTO.phoneNo=buyersObject.phoneNo;
    buyersDTO.contactPerson=buyersObject.contactPerson;
    buyersDTO.email=buyersObject.email;
    buyersDTO.currency = buyersObject.currency;
    buyersDTO.state = buyersObject.state;
    buyersDTO.district = buyersObject.district;
    buyersDTO.city = buyersObject.city;
    buyersDTO.landmark = buyersObject.landmark;
    buyersDTO.lane1 = buyersObject.lane1;
    buyersDTO.lane2 = buyersObject.lane2;
    buyersDTO.pincode = buyersObject.pincode;
    buyersDTO.publicNote=buyersObject.publicNote;
    buyersDTO.privateNote=buyersObject.privateNote;
    // const entity = new Countries()
    // entity.countryId = buyersDTO.countryId;
    // buyersDTO.countryId = entity.countryId;
    buyersDTO.countryId = buyersObject.countryInfo.countryId;
    buyersDTO.countryName = buyersObject.countryInfo.countryName;
    buyersDTO.paymentTermsId = buyersObject.paymentTermsInfo.paymentTermsId
    buyersDTO.paymentTerms=buyersObject.paymentTermsInfo.paymentTermsName;
    buyersDTO.paymentMethodId = buyersObject.paymentMethodInfo.paymentMethodId
    buyersDTO.paymentMethod=buyersObject.paymentMethodInfo.paymentMethod;
    // buyersDTO.shipmentTerms=buyersObject.shipmentTerms;
    buyersDTO.isActive = buyersObject.isActive;
    buyersDTO.createdAt = buyersObject.createdAt;
    buyersDTO.updatedAt = buyersObject.updatedAt;
    buyersDTO.createdUser = buyersObject.createdUser;
    buyersDTO.updatedUser = buyersObject.updatedUser;
    buyersDTO.versionFlag = buyersObject.versionFlag;
    return buyersDTO;
  }
}
