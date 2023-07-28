import { ItemCategory } from "../../item-categories/item-categories.entity";
import { ItemSubCategory } from "../item-sub-category.entity";
import { ItemSubCategoryDto } from "./item-sub-category.dto";

export class ItemSubCategoryAdapter {
    convertDtoToEntity(dtoObj: ItemSubCategoryDto,  isUpdate: boolean = false ): ItemSubCategory {
        try {
            const entityObj = new ItemSubCategory();
            entityObj.createdUser = dtoObj.createdUser;
            entityObj.itemSubCategory = dtoObj.itemSubCategory;
            entityObj.itemSubCategoryCode = dtoObj.itemSubCategoryCode;
            entityObj.itemCategory = new ItemCategory();
            entityObj.itemCategory.itemCategoryId = dtoObj.itemCategoryId;
            entityObj.itemCategory.itemCategory = dtoObj.itemCategoryName;
            entityObj.remarks = dtoObj.remarks;
            if (dtoObj.itemSubCategoryId) {
                entityObj.itemSubCategoryId = dtoObj.itemSubCategoryId;
                entityObj.updatedUser = dtoObj.updatedUser;
            }
            entityObj.isActive = dtoObj.isActive;
            return entityObj;
        } catch (Error) {
            throw Error;
        }
    }

    public convertEntityToDto(itemObj: ItemSubCategory): ItemSubCategoryDto {
        const foodTypeDetailsDTO= new ItemSubCategoryDto;
        foodTypeDetailsDTO.itemSubCategoryId = itemObj.itemSubCategoryId;
        foodTypeDetailsDTO.itemSubCategory = itemObj.itemSubCategory;
        foodTypeDetailsDTO.itemSubCategoryCode = itemObj.itemSubCategoryCode;
        foodTypeDetailsDTO.itemCategoryId = (itemObj.itemCategory)?.itemCategoryId;
        foodTypeDetailsDTO.itemCategoryName = (itemObj.itemCategory)?.itemCategory;
        foodTypeDetailsDTO.remarks = itemObj.remarks;
        foodTypeDetailsDTO.isActive = itemObj.isActive;
        foodTypeDetailsDTO.createdAt = itemObj.createdAt;
        foodTypeDetailsDTO.updatedAt = itemObj.updatedAt;
        foodTypeDetailsDTO.createdUser = itemObj.createdUser;
        foodTypeDetailsDTO.updatedUser = itemObj.updatedUser;
        foodTypeDetailsDTO.versionFlag = itemObj.versionFlag;
        return foodTypeDetailsDTO;
      }
}