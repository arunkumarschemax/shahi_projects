import { StatusEnum } from "../common";

export class HsnDto {

  HSN: string;
  Taxtype: string;
  Taxamount: string;
  Taxpercentage: string;
  Charge: string;
  unitquantity: string;
  description: string;
  quotation: string;
  unitPrice:string;
  variance: string;
  VarianceStatus?: StatusEnum;
  HsnId?: number;


  constructor(

    HSN: string,
    Taxtype: string,
    Taxamount: string,
    Taxpercentage: string,
    Charge: string,
    unitquantity: string,
    description: string,
    quotation: string,
    unitPrice:string,
    variance: string,
    VarianceStatus: StatusEnum,
    HsnId?: number,

  ) {

    this.HSN = HSN
    this.Taxtype = Taxtype
    this.Taxamount = Taxamount
    this.Taxpercentage = Taxpercentage
    this.Charge = Charge
    this.description=description
    this.unitquantity = unitquantity
    this.unitPrice = unitPrice
    this.quotation = quotation
    this.variance = variance
    this.VarianceStatus = VarianceStatus
    this.HsnId = HsnId

  }
}


