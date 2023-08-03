import { GarmentCategory } from "../garment-category.entity";
import { GarmentCategoryDto } from "./garment-category.dto";

export class GarmentCategoryAdapter{
convertDtoEntity(dtoObj:GarmentCategoryDto,isUpdate: boolean = false): GarmentCategory{
    try {
        const entityObj = new GarmentCategory();
        entityObj.createdUser = dtoObj.createdUser;
        entityObj.garmentCategory= dtoObj.garmentCategory;
        entityObj.remarks = dtoObj.remarks;
        entityObj.isActive=dtoObj.isActive==undefined?true:dtoObj.isActive;

        if (dtoObj.garmentCategoryId) {
            entityObj.garmentCategoryId = dtoObj.garmentCategoryId;
            entityObj.updatedUser = dtoObj.updatedUser;
        }
        entityObj.isActive = true;
        return entityObj;
    } catch (Error) {
        throw Error;
    }
}

public convertEntityToDto(employeeObject: GarmentCategory): GarmentCategoryDto {
    const foodTypeDetailsDTO= new GarmentCategoryDto;
    foodTypeDetailsDTO.garmentCategoryId = employeeObject.garmentCategoryId;
    foodTypeDetailsDTO.garmentCategory = employeeObject.garmentCategory;
    foodTypeDetailsDTO.remarks = employeeObject.remarks;
    foodTypeDetailsDTO.isActive = employeeObject.isActive;
    foodTypeDetailsDTO.createdAt = employeeObject.createdAt;
    foodTypeDetailsDTO.updatedAt = employeeObject.updatedAt;
    foodTypeDetailsDTO.createdUser = employeeObject.createdUser;
    foodTypeDetailsDTO.updatedUser = employeeObject.updatedUser;
    foodTypeDetailsDTO.versionFlag = employeeObject.versionFlag;
    return foodTypeDetailsDTO;
}
}