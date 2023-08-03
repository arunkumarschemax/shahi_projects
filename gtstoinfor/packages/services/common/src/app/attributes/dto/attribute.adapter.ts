import { Attributes } from "../attributes.entity";
import { AttributeDto } from "./attribute.dto";

export class AttributeAdapter {
    convertDtoToEntity(dtoObj: AttributeDto,  isUpdate: boolean = false ): Attributes{
        try {
            const entityObj = new Attributes();
            entityObj.createdUser = dtoObj.createdUser;
            entityObj.attributeName = dtoObj.attributeName;
            if (dtoObj.attributeId) {
                entityObj.attributeId = dtoObj.attributeId;
                entityObj.updatedUser = dtoObj.updatedUser;
            }
            entityObj.isActive = dtoObj.isActive;
            entityObj.attributeAgainst= dtoObj.attributeAgainst
            return entityObj;
        } catch (Error) {
            throw Error;
        }
    }

    public convertEntityToDto(attribute : Attributes): AttributeDto {
        const attributesDto = new AttributeDto;
        attributesDto.attributeId = attribute.attributeId;
        attributesDto.attributeName = attribute.attributeName;
        attributesDto.isActive = attribute.isActive;
        attributesDto.createdAt = attribute.createdAt;
        attributesDto.updatedAt = attribute.updatedAt;
        attributesDto.createdUser = attribute.createdUser;
        attributesDto.updatedUser = attribute.updatedUser;
        attributesDto.versionFlag = attribute.versionFlag;
        attributesDto.attributeAgainst = attribute.attributeAgainst;
        return attributesDto;
      }
}