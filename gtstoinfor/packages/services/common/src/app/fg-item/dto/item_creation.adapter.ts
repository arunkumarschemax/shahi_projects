import { ItemCreation } from "../item_creation.entity";
import { AttributeDto } from "./attribute.dto";

export class ItemCreationAdapter {
    convertDtoToEntity(dtoObj: AttributeDto,  isUpdate: boolean = false ): ItemCreation{
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

    public convertEntityToDto(attribute : ItemCreation): AttributeDto {
        const attributesDto = new AttributeDto;
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