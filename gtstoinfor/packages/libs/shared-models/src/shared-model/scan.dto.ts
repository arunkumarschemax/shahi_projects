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
    constructor(
        GST: string,
        Vendor: string,
        invoiceDate: string,
        Cgst: string,
        IGST: string,
        Sgst: string,
        InnvoiceNumber: string,
        InnvoiceAmount: string,
        InnvoiceCurrency: string)
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