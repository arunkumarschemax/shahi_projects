import { AttributeAgainstEnum } from "../../enum";

export class CompositionDto{

    id: number;

    compositionCode: string;

    compositionDescription: string;

  
    createdAt : Date;
  
    createdUser : string;
  
    updatedAt : Date;
    
    updatedUser : string;
  
    versionFlag : number;
    
    isActive: boolean;


}