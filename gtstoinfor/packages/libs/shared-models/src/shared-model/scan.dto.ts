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
    Financialyear: string;
    createdAt:Date;
    createdUser:string;
    updatedAt?:Date;
    updatedUser?:string;
    versionFlag?:number


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
        Financialyear: string,
        createdAt:Date,
        createdUser:string,
        updatedAt?:Date,
        updatedUser?:string,
        versionFlag?:number
    
    
    
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
      this.createdAt=createdAt;
      this.createdUser=createdUser;
      this.updatedAt=updatedAt;
      this.updatedUser=updatedUser
      this.versionFlag = versionFlag

        }
    }



// export class AllScanDto {
//     GST: string;
//     Vendor: string;
//     invoiceDate: string;
//     Cgst: string;
//     IGST: string;
//     Sgst: string;
//     InnvoiceNumber: string;
//     InnvoiceAmount: string;
//     InnvoiceCurrency: string;
//       constructor(
//           GST: string,
//           Vendor: string,
//           invoiceDate: string,
//           Cgst: string,
//           IGST: string,
//           Sgst: string,
//           InnvoiceNumber: string,
//           InnvoiceAmount: string,
//           InnvoiceCurrency: string) {
  
//           this.GST= GST;
//     this.Vendor= Vendor;
//     this. invoiceDate= invoiceDate;
//     this. Cgst= Cgst;
//     this. IGST= IGST;
//     this.Sgst= Sgst;
//     this.InnvoiceNumber= InnvoiceNumber;
//     this.InnvoiceAmount= InnvoiceAmount;
//     this. InnvoiceCurrency= InnvoiceCurrency;
//       }
//   }