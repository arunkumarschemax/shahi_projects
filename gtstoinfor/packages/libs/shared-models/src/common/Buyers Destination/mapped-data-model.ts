
import { ColourInfoModel } from "./colour-info-model";
import { DestinationInfoModel } from "./destination-info-model";
import { SizeInfoModel } from "./size-info-model";

export class MappedData {
//   size?: SizeInfoModel[];
//   destination?: DestinationInfoModel[];
//   colour?: ColourInfoModel[]
  id:number;
  name:string;

   constructor(id:number,name:string){
    this.id= id
    this.name = name;
   }
}