import { AttributeAgainstEnum } from "../../enum";

export class AttributesDto{
    attributeId: number;

    attributeName: string;

    isActive: boolean;
  
    createdAt : Date;
  
    createdUser : string;
  
    updatedAt : Date;
    
    updatedUser : string;
  
    versionFlag : number;

    attributeAgainst : AttributeAgainstEnum;


}