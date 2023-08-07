import { AttributeAgainstEnum } from '@project-management-system/shared-models';

export class AttributeAgainstRequest {
    attributeAgainst?: AttributeAgainstEnum;

    constructor(attributeAgainst:AttributeAgainstEnum){
        this.attributeAgainst = attributeAgainst;
    }
}