export class AllScanDto {
    GST: string;
    Vendor: string;
    invoiceDate: string;
    Cgst: string;
    IGST: string;
    Sgst: string;
    InnvoiceNumber: string;
    InnvoiceAmount: string;
    InnvoiceCurrency: string;
    Routing: string;
    Comment: string;
    Timecreated: string;
    buyerCode:string;
    Financialyear: string;
    createdUser:string;
    updatedUser?:string;


    constructor(
        GST: string,
        Vendor: string,
        invoiceDate: string,
        Cgst: string,
        IGST: string,
        Sgst: string,
        InnvoiceNumber: string,
        InnvoiceAmount: string,
        InnvoiceCurrency: string,
        Routing: string,
        Comment: string,
        Timecreated: string,
        buyerCode:string,
        Financialyear: string,
        createdUser:string,
        updatedUser?:string,
    
    )
        {
  
     this.GST= GST;
      this.Vendor= Vendor;
      this. invoiceDate= invoiceDate;
      this. Cgst= Cgst;
      this. IGST= IGST;
      this.Sgst= Sgst;
      this.InnvoiceNumber= InnvoiceNumber;
      this.InnvoiceAmount= InnvoiceAmount;
      this. InnvoiceCurrency= InnvoiceCurrency;
      this.Routing=Routing;
      this.Comment=Comment;
      this.Financialyear=Financialyear;
      this.Timecreated=Timecreated;
      this.buyerCode=buyerCode;
      this.createdUser=createdUser;
      this.updatedUser=updatedUser

        }
    }


