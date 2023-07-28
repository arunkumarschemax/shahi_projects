import { Injectable } from "@nestjs/common";
import { BrandsDTO } from "./master-brands.dto";
import { Brands } from "../master-brands.entity";

@Injectable()
export class MasterBrandAdapter {
    /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity( brandsDto: BrandsDTO, isUpdate: boolean = false): Brands {
    const brands = new Brands();
    brands.brandId = brandsDto.brandId;
    brands.brandName = brandsDto.brandName;
    brands.fileName = brands.fileName;
    brands.filePath = brands.filePath;
    brands.isActive = brandsDto.isActive == undefined?true:brandsDto.isActive;
    if(isUpdate){
        brands.updatedUser = brands.updatedUser;
    } else {
        brands.isActive = true;
        brands.createdUser = brandsDto.createdUser;
    }
    return brands;
  }
  public convertEntityToDto(brandsObject: Brands): BrandsDTO {
    const brandsDto = new BrandsDTO;
    brandsDto.brandId = brandsObject.brandId;
    brandsDto.brandName = brandsObject.brandName;
    brandsDto.isActive = brandsObject.isActive;
    brandsDto.createdAt = brandsObject.createdAt;
    brandsDto.createdUser = brandsObject.createdUser;
    brandsDto.fileName = brandsObject.fileName;
    brandsDto.filePath = brandsObject.filePath;
    brandsDto.updatedAt = brandsObject.updatedAt;
    brandsDto.updatedUser = brandsObject.updatedUser;
    brandsDto.versionFlag = brandsObject.versionFlag;
    return brandsDto;
  }
}