import { CoeffDataDto } from "./in-coeff.dto";
import { PcsDataDto } from "./in-pcs.dto";

export class MonthWiseDto {
    phasetype: string;
    pcsData:PcsDataDto[]
    coeffData:CoeffDataDto[];
    totalPcs:number;
    totalCoeff:number;
    orderPlanNo?:number;
     constructor(phasetype: string, pcsData:PcsDataDto[],coeffData:CoeffDataDto[],totalPcs:number,totalCoeff:number,orderPlanNo?:number) {
         this.phasetype = phasetype
         this.pcsData = pcsData
         this.coeffData = coeffData
         this.totalCoeff =totalCoeff
         this.totalPcs = totalPcs
         this.orderPlanNo =orderPlanNo
     };
 }


 export class pcsData{
    monthName:string
    inPcs:number
    inCoeffPcs:number
    total?:number
    constructor(
        monthName:string,
        inPcs:number,
        inCoeffPcs:number,
       total?:number

    ){
        this.monthName=monthName
        this.inPcs=inPcs
        this.inCoeffPcs=inCoeffPcs
        this.total=total
    }
 }

 export class NewMonthWiseDto{
    phaseType:string;
    pcsData:pcsData[]
    totalInpcs?:number
    totalCoeffpcs?:number
    constructor(
        phaseType:string,
        pcsData:pcsData[],
        totalInpcs?:number,
        totalCoeffpcs?:number
    ){
        this.phaseType=phaseType
        this.pcsData=pcsData
        this.totalCoeffpcs=totalCoeffpcs
        this.totalInpcs=totalInpcs
    }

 }