import { HsnDto } from "./hsn.dto";

export class AllScanDto {
    gstNumber: string;
    venName: string;
    venCod:string;
    invoiceDate: string;
    invoiceNumber: string;
    invoiceAmount: string;
    igst: string;
    cgst: string;
    sgst: string;
    invoiceCurrency: string;
    financialYear: string;
    status: string;
    createdUser: string;
    Hsninfo: HsnDto[]
    updatedUser?: string;


    constructor(
        gstNumber: string,
        venName: string,
        venCod:string,
        invoiceDate: string,
        invoiceNumber: string,
        invoiceAmount: string,
        igst: string,
        cgst: string,
        sgst: string,
        invoiceCurrency: string,
        financialYear: string,
        status: string,
        createdUser: string,
        Hsninfo: HsnDto[],
        updatedUser?: string,


    ) {

        this.gstNumber = gstNumber;
        this.venName = venName;
        this.venCod=venCod;
        this.invoiceDate = invoiceDate;
        this.invoiceNumber = invoiceNumber;
        this.invoiceAmount = invoiceAmount;
        this.cgst = cgst;
        this.igst = igst;
        this.sgst = sgst;
        this.invoiceCurrency = invoiceCurrency;
        this.financialYear = financialYear;
        this.status = status;
        this.createdUser = createdUser;
        this.Hsninfo = Hsninfo;
        this.updatedUser = updatedUser

    }
}


