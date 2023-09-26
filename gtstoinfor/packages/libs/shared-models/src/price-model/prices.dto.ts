export class AllPriceDto {
    headOfCharges: string;
    perUnit: string;
    dpLogistics: string;
    vendor: string;
    hsnCode:string;
    serviceDescription:string;
    buyersName:string;
    nsh: string;
    ksr: string;
    unitPrice: string;
   
    constructor(
        headOfCharges: string,
        perUnit: string,
        dpLogistics: string,
        vendor: string,
        buyersName: string,
        hsnCode:string,
        serviceDescription:string,
        nsh: string,
        ksr: string,
        unitPrice: string,


       

    ) {

        this.headOfCharges = headOfCharges;
        this.perUnit = perUnit;
        this.dpLogistics = dpLogistics;
        this.vendor = vendor;
        this.buyersName=buyersName
        this.hsnCode=hsnCode;
        this.serviceDescription=serviceDescription
        this.nsh=nsh;
        this.ksr = ksr;

        this.unitPrice = unitPrice;


        

    }
}