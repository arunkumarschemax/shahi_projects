import { RmItemMappingRequest } from "./rm-item.request";



export class FgRmMappingRequest {

    
    fgitemId: number;
    fgitemCode: string;    
    itemInfo: RmItemMappingRequest[]
    createdUser?: string;
   
  

    constructor(
        fgitemId: number,
        fgitemCode: string,    
        itemInfo:RmItemMappingRequest[],
        createdUser?: string
  
    ){
      this.fgitemId = fgitemId
      this.fgitemCode = fgitemCode
      this.itemInfo = itemInfo
      this.createdUser = createdUser



    }


  
  }
  