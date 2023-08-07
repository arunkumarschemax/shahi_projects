import { Injectable } from '@nestjs/common';
import {WarehouseDTO } from './warehouse.dto';
import { Warehouse } from '../warehouse.entity';

@Injectable()
export class WareHouseAdapter {
  /**
   * 
   * @param warehouseDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  Dto: WarehouseDTO,  isUpdate: boolean = false ): Warehouse {
    const warehouse = new Warehouse();
    warehouse.warehouseId=Dto.warehouseId;
    warehouse.warehouseName=Dto.warehouseName;
    warehouse.warehouseCode=Dto.warehouseCode;
    // company.isActive = statesDto.isActive == undefined ? true : statesDto.isActive;
    warehouse.isActive=Dto.isActive==undefined?true:Dto.isActive;
    if (isUpdate) {
        warehouse.updatedUser = Dto.updatedUser;
    } else {
        warehouse.isActive = true;
        warehouse.createdUser = Dto.createdUser;
    }
   return warehouse;
  }
  public convertEntityToDto(Wobject: Warehouse): WarehouseDTO {
    const warehouseDto= new WarehouseDTO;
    warehouseDto.warehouseId=Wobject.warehouseId;
    warehouseDto.warehouseName=Wobject.warehouseName;
    warehouseDto.warehouseCode = Wobject.warehouseCode;
    warehouseDto.isActive = Wobject.isActive;
    warehouseDto.createdAt = Wobject.createdAt;
    warehouseDto.updatedAt = Wobject.updatedAt;
    warehouseDto.createdUser = Wobject.createdUser;
    warehouseDto.updatedUser = Wobject.updatedUser;
    warehouseDto.versionFlag = Wobject.versionFlag;
    return warehouseDto;
  }
}
