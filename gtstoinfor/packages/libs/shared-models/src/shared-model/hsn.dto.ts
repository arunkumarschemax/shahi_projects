import { StatusEnum } from "../common";

export class HsnDto {

  HSN: string;
  taxType: string;
  taxAmount: string;
  taxPercentage: string;
  charge: string;
  unitQuantity: string;
  quotation: string;
  // status:string;
  unitPrice:string;
  variance?:string;
  // VarianceStatus?: StatusEnum;
  description: string;
  HsnId?: number;


  constructor(

    HSN: string,
    taxType: string,
    taxAmount: string,
    description: string,
    taxPercentage: string,
    charge: string,
    unitQuantity: string,
    quotation: string,
    // status:string,
    unitPrice:string,
    variance?: string,
    // VarianceStatus?: StatusEnum,
    HsnId?: number,

  ) {

    this.HSN = HSN
    this.taxType = taxType
    this.taxAmount = taxAmount
    this.taxPercentage = taxPercentage
    this.charge = charge
    this.unitQuantity = unitQuantity
    this.unitPrice = unitPrice
    this.quotation = quotation
    // this.status=status
    this.variance = variance
    this.description=description
    // this.VarianceStatus = VarianceStatus
    this.HsnId = HsnId

  }
}


