import {Injectable} from '@nestjs/common';
import { BuyingHouseDTO } from './buying-house.dto';
import { BuyingHouse } from '../buying-house.entity';

@Injectable()
export class BuyingHouseAdapter {
    /**
     * 
     * @param buyingHouseDto 
     * @param isUpdate 
     * @returns
     */

    public convertDtoToEntity(  buyingHouseDto: BuyingHouseDTO,  isUpdate: boolean = false ): BuyingHouse {
        const buyingHouse = new BuyingHouse();
        buyingHouse.buyingHouse = buyingHouseDto.buyingHouse;
        buyingHouse.contactPerson = buyingHouseDto.contactPerson
        buyingHouse.email = buyingHouseDto.email
        buyingHouse.contact = buyingHouseDto.contact
        buyingHouse.address = buyingHouseDto.address
        buyingHouse.city = buyingHouseDto.city
        buyingHouse.country = buyingHouseDto.country
        buyingHouse.isActive = buyingHouseDto.isActive == undefined?true:buyingHouseDto.isActive;
        if (isUpdate) {
            buyingHouse.buyingHouseId=buyingHouseDto.buyingHouseId;
            buyingHouse.updatedUser = buyingHouseDto.updatedUser;
        } else {
            buyingHouse.isActive = true;
            buyingHouse.createdUser = buyingHouseDto.createdUser;
        }
       return buyingHouse;
      }
      
      public convertEntityToDto(data: BuyingHouse): BuyingHouseDTO {
        const buyingHouseDto = new BuyingHouseDTO;
        buyingHouseDto.buyingHouseId = data.buyingHouseId;
        buyingHouseDto.buyingHouse = data.buyingHouse;
        buyingHouseDto.contactPerson = data.contactPerson
        buyingHouseDto.email = data.email
        buyingHouseDto.contact = data.contact
        buyingHouseDto.address = data.address
        buyingHouseDto.city = data.city
        buyingHouseDto.country = data.country
        buyingHouseDto.isActive = data.isActive;
        buyingHouseDto.createdAt = data.createdAt;
        buyingHouseDto.updatedAt = data.updatedAt;
        buyingHouseDto.createdUser = data.createdUser;
        buyingHouseDto.updatedUser = data.updatedUser;
        buyingHouseDto.versionFlag = data.versionFlag;
        return buyingHouseDto;
      }
}