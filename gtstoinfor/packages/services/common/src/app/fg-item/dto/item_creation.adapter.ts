import { ItemCreation } from "../item_creation.entity";
import { ItemCreationDto } from "./item-creation.dto";

export class ItemCreationAdapter {
    convertDtoToEntity(dtoObj: ItemCreationDto,  isUpdate: boolean = false ): ItemCreation{
        try {
            const entityObj = new ItemCreation();
            // entityObj.createdUser = dtoObj.createdUser;
            // entityObj.attributeName = dtoObj.attributeName;
            // if (dtoObj.attributeId) {
            //     entityObj.attributeId = dtoObj.attributeId;
            //     entityObj.updatedUser = dtoObj.updatedUser;
            // }
            // entityObj.isActive = dtoObj.isActive;
            // entityObj.attributeAgainst= dtoObj.attributeAgainst
            return entityObj;
        } catch (Error) {
            throw Error;
        }
    }

    public convertEntityToDto(attribute : ItemCreation): ItemCreationDto {
        const attributesDto = new ItemCreationDto;
        // attributesDto.attributeId = attribute.attributeId;
        // attributesDto.attributeName = attribute.attributeName;
        // attributesDto.isActive = attribute.isActive;
        // attributesDto.createdAt = attribute.createdAt;
        // attributesDto.updatedAt = attribute.updatedAt;
        // attributesDto.createdUser = attribute.createdUser;
        // attributesDto.updatedUser = attribute.updatedUser;
        // attributesDto.versionFlag = attribute.versionFlag;
        // attributesDto.attributeAgainst = attribute.attributeAgainst;
        return attributesDto;
      }
}