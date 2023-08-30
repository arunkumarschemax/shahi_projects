
import { MappedData } from "./mapped-data-model";

export class MappedDetails {
  mappedAgainst: string;
  mappedData: MappedData[];

   constructor(mappedAgainst:string,mappedData: MappedData[]){
    this.mappedAgainst = mappedAgainst
    this.mappedData = mappedData
   }
}