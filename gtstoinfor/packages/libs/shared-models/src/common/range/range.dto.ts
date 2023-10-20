import { AttributeAgainstEnum } from "../../enum";

export class RangeDto{

    id: number;

    rangeCode: string;

    rangeDescription: string;

  
    createdAt : Date;
  
    createdUser : string;
  
    updatedAt : Date;
    
    updatedUser : string;
  
    versionFlag : number;
    
    isActive: boolean;


}