import { StatusEnum } from "../common";

export class HsnDto { 

  HSN: string;
  Taxtype: string;
  Taxamount: string;
  Taxpercentage: string;
  Charge: string;
  unitquantity: string;
  quotation: string;
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
        quotation: string,
        variance: string,
        VarianceStatus: StatusEnum,
        HsnId?: number,
    
    )
        {
  
     this.HSN = HSN
     this.Taxtype = Taxtype
     this.Taxamount = Taxamount
     this.Taxpercentage = Taxpercentage
     this.Charge = Charge
     this.unitquantity = unitquantity
     this.quotation = quotation
     this.variance = variance
     this.VarianceStatus = VarianceStatus
     this.HsnId = HsnId
   
        }
    }


