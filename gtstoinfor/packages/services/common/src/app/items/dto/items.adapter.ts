import { Injectable } from '@nestjs/common';
import {  ItemsDTO } from './items.dto';
import { Items } from '../items.entity';

@Injectable()
export class ItemsAdapter {
  /**
   * 
   * @param itemsDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  itemsDto: ItemsDTO,  isUpdate: boolean = false ): Items {
    const items = new Items();
    items.itemId=itemsDto.itemId;
    items.item=itemsDto.item;
    items.consumptionrequired=itemsDto.consumptionrequired;
    items.consumption=itemsDto.consumption;
    items.moq=itemsDto.moq;
    items.wastage=itemsDto.wastage;
    // company.isActive = statesDto.isActive == undefined ? true : statesDto.isActive;
    items.isActive=itemsDto.isActive==undefined?true:itemsDto.isActive;
    if (isUpdate) {
        items.updatedUser = itemsDto.updatedUser;
    } else {
        items.isActive = true;
        items.createdUser = itemsDto.createdUser;
    }
   return items;
  }
  public convertEntityToDto(itemsObject: Items): ItemsDTO {
    const itemsDto= new ItemsDTO;
    itemsDto.itemId=itemsObject.itemId;
    itemsDto.item=itemsObject.item;
    itemsDto.consumptionrequired=itemsObject.consumptionrequired;
    itemsDto.consumption=itemsObject.consumption;
    itemsDto.moq=itemsObject.moq;
    itemsDto.wastage=itemsObject.wastage;
    itemsDto.isActive = itemsObject.isActive;
    itemsDto.createdAt = itemsObject.createdAt;
    itemsDto.updatedAt = itemsObject.updatedAt;
    itemsDto.createdUser = itemsObject.createdUser;
    itemsDto.updatedUser = itemsObject.updatedUser;
    itemsDto.versionFlag = itemsObject.versionFlag;
    return itemsDto;
  }
}
