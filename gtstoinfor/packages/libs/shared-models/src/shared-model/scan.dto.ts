import { HsnDto } from "./hsn.dto";

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
    unitPrice: string;
    Financialyear: string;
    status: string;
    createdUser: string;
    Hsninfo: HsnDto[]
    updatedUser?: string;


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
        Financialyear: string,
        status: string,
        createdUser: string,
        Hsninfo: HsnDto[],
        updatedUser?: string,


    ) {

        this.GST = GST;
        this.Vendor = Vendor;
        this.invoiceDate = invoiceDate;
        this.Cgst = Cgst;
        this.IGST = IGST;
        this.Sgst = Sgst;
        this.InnvoiceNumber = InnvoiceNumber;
        this.InnvoiceAmount = InnvoiceAmount;
        this.InnvoiceCurrency = InnvoiceCurrency;
        this.Financialyear = Financialyear;
        this.status = status;
        this.createdUser = createdUser;
        this.Hsninfo = Hsninfo;
        this.updatedUser = updatedUser

    }
}


