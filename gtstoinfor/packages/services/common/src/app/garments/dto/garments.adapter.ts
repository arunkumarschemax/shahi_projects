import { GarmentCategory } from "../../garment-category/garment-category.entity";
import { Garments } from "../garments.entity";
import { GarmentDto } from "./garments.dto";

export class GarmentsAdapter {
    convertDtoToEntity(dtoObj: GarmentDto,  isUpdate: boolean = false ): Garments {
        try {
            const entityObj = new Garments();
            entityObj.createdUser = dtoObj.createdUser;
            entityObj.garmentName = dtoObj.garmentName;
            entityObj.garmentCategory = new GarmentCategory();
            entityObj.garmentCategory.garmentCategoryId = dtoObj.garmentCategoryId;
            entityObj.remarks = dtoObj.remarks;
            if (dtoObj.garmentId) {
                entityObj.garmentId = dtoObj.garmentId;
                entityObj.updatedUser = dtoObj.updatedUser;
            }
            entityObj.isActive = dtoObj.isActive;
            return entityObj;
        } catch (Error) {
            throw Error;
        }
    }

    public convertEntityToDto(itemObj: Garments): GarmentDto {
        const foodTypeDetailsDTO= new GarmentDto;
        foodTypeDetailsDTO.garmentId = itemObj.garmentId;
        foodTypeDetailsDTO.garmentName = itemObj.garmentName;
        foodTypeDetailsDTO.garmentCategoryId = (itemObj.garmentCategory)?.garmentCategoryId;
        foodTypeDetailsDTO.garmentCategory = (itemObj.garmentCategory)?.garmentCategory;
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