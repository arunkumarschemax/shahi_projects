import { AttributeAgainstEnum } from "../../enum";

export class CompositionDto{

    

    compositionCode: string;

    compositionDescription: string;

  
    createdAt : Date;
  
    createdUser : string;
  
    updatedAt : Date;
    
    updatedUser : string;
  
    versionFlag : number;
    
    isActive: boolean;
    id?: number;


}