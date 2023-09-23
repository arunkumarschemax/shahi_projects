import { CoeffDataDto } from "./in-coeff.dto";
import { PcsDataDto } from "./in-pcs.dto";

export class MonthWiseDto {
    phasetype: string;
    pcsData:PcsDataDto[]
    coeffData:CoeffDataDto[];
    totalPcs:number;
    totalCoeff:number;
     constructor(phasetype: string, pcsData:PcsDataDto[],coeffData:CoeffDataDto[],totalPcs:number,totalCoeff:number) {
         this.phasetype = phasetype
         this.pcsData = pcsData
         this.coeffData = coeffData
         this.totalCoeff =totalCoeff
         this.totalPcs = totalPcs
     };
 }