import { ItemCategory } from "../item-categories.entity";
import { ItemCategoryDto } from "./item-categories.dto";

export class ItemCategoryAdapter {
    convertDtoToEntity(dtoObj: ItemCategoryDto,  isUpdate: boolean = false ): ItemCategory {
        try {
            const entityObj = new ItemCategory();
            entityObj.createdUser = dtoObj.createdUser;
            entityObj.itemCategory = dtoObj.itemCategory;
            entityObj.itemCategoryCode = dtoObj.itemCategoryCode;
            entityObj.remarks = dtoObj.remarks;
            if (dtoObj.itemCategoryId) {
                entityObj.itemCategoryId = dtoObj.itemCategoryId;
                entityObj.updatedUser = dtoObj.updatedUser;
            }
            entityObj.isActive = dtoObj.isActive;
            return entityObj;
        } catch (Error) {
            throw Error;
        }
    }

    public convertEntityToDto(employeeObject: ItemCategory): ItemCategoryDto {
        const foodTypeDetailsDTO= new ItemCategoryDto;
        foodTypeDetailsDTO.itemCategoryId = employeeObject.itemCategoryId;
        foodTypeDetailsDTO.itemCategory = employeeObject.itemCategory;
        foodTypeDetailsDTO.itemCategoryCode = employeeObject.itemCategoryCode;
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