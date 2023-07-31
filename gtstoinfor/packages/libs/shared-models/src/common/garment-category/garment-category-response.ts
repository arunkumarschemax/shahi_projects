import { GarmentCategoryDto } from "./garment-category.dto";
import { GlobalResponseObject } from "../global-response-object";

export class GarmentCategoryResponse extends GlobalResponseObject{
    data?: GarmentCategoryDto[];
  /**
   * 
   * @param status 
   * @param internalMessage 
   * @param data 
   */
  constructor(status:boolean, intlCode:number, internalMessage:string, data?: GarmentCategoryDto[]){
      super(status,intlCode,internalMessage);
      this.status = status;
      this.internalMessage = internalMessage;
      this.data = data;
  }

}