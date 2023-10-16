import { StatusEnum } from "../common";

export class HsnDto {

  HSN: string;
  taxType: string;
  taxAmount: string;
  taxPercentage: string;
  charge: string;
  unitQuantity: string;
  description: string;
  quotation: string;
  // status:string;
  unitPrice:string;
  variance: string;
  // VarianceStatus?: StatusEnum;
  HsnId?: number;


  constructor(

    HSN: string,
    taxType: string,
    taxAmount: string,
    taxPercentage: string,
    charge: string,
    unitQuantity: string,
    description: string,
    quotation: string,
    // status:string,
    unitPrice:string,
    variance: string,
    // VarianceStatus?: StatusEnum,
    HsnId?: number,

  ) {

    this.HSN = HSN
    this.taxType = taxType
    this.taxAmount = taxAmount
    this.taxPercentage = taxPercentage
    this.charge = charge
    this.description=description
    this.unitQuantity = unitQuantity
    this.unitPrice = unitPrice
    this.quotation = quotation
    // this.status=status
    this.variance = variance
    // this.VarianceStatus = VarianceStatus
    this.HsnId = HsnId

  }
}


