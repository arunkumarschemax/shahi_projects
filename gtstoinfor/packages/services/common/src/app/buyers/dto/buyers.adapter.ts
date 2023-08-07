import { Injectable } from '@nestjs/common';
import { Buyers } from '../buyers.entity';
import { BuyersDTO } from './buyers.dto';
import { Countries } from '../../countries/countries.entity';


@Injectable()
export class BuyersAdapter {
  /**
   *
   * @param CustomersDto
   * @returns Customers entity
   */
  public convertDtoToEntity(  buyersDTO: BuyersDTO,  isUpdate: boolean = false ): Buyers {
    const buyer = new Buyers();
    console.log(buyersDTO);
    buyer.clientCode=buyersDTO.clientCode;
    buyer.clientName=buyersDTO.clientName;
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
    // buyer.paymentTerms=buyersDTO.paymentTerms;
    // buyer.shipmentTerms=buyersDTO.shipmentTerms;
    // buyer.paymentModeId=buyersDTO.paymentModeId;
    // buyer.buyerAccountType=buyersDTO.buyerAccountType;
    buyer.isActive=buyersDTO.isActive==undefined?true:buyersDTO.isActive;

    if (isUpdate) {
      buyer.buyerId=buyersDTO.buyerId;
      buyer.updatedUser = buyersDTO.updatedUser;
    } else {
      buyer.isActive = true;
      buyer.createdUser = buyersDTO.createdUser;
    }

    console.log(buyersDTO);

   return buyer;
  }
  public convertEntityToDto(buyersObject: Buyers): BuyersDTO {
    const buyersDTO= new BuyersDTO;
    buyersDTO.buyerId=buyersObject.buyerId;
    buyersDTO.clientCode=buyersObject.clientCode;
    buyersDTO.clientName=buyersObject.clientName;
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
    // buyersDTO.paymentTerms=buyersObject.paymentTerms;
    // buyersDTO.shipmentTerms=buyersObject.shipmentTerms;
    // buyersDTO.paymentModeId=buyersObject.paymentModeId;
    // buyersDTO.buyerAccountType=buyersObject.buyerAccountType;
    buyersDTO.isActive = buyersObject.isActive;
    buyersDTO.createdAt = buyersObject.createdAt;
    buyersDTO.updatedAt = buyersObject.updatedAt;
    buyersDTO.createdUser = buyersObject.createdUser;
    buyersDTO.updatedUser = buyersObject.updatedUser;
    buyersDTO.versionFlag = buyersObject.versionFlag;
    return buyersDTO;
  }
}
