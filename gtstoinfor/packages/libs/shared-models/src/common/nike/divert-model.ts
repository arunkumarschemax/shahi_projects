import { NewDivertModel } from "./New-po-divert-report-model";
import { OldDivertModel } from "./Old-po-divert-report-model";


export class DivertModel {
    
   oldPo: OldDivertModel[];
 
    newpo:NewDivertModel[]
    
   
    
    
    constructor(
        oldPo: OldDivertModel[],    newpo:NewDivertModel[]

        ) {

     this.oldPo =oldPo
     this.newpo = newpo
    };
}