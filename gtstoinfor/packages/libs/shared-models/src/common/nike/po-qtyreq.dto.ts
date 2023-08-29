import { PoData } from "./po-qty-data.dto";


export class PoDataResDto {
    names:string[];
    PoData: PoData;
    

    constructor(names: string[], stockIn: PoData){
            this.names= names;
            this.PoData= stockIn;            
    }
}