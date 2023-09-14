export class AllPriceDto {
    headOfCharges: string;
    perUnit: string;
    dpLogistics: string;
    vendor: string;
    nsh: string;
    ksr: string;
    unitPrice: string;
   
    constructor(
        headOfCharges: string,
        perUnit: string,
        dpLogistics: string,
        vendor: string,
        nsh: string,
        ksr: string,
        unitPrice: string,


       

    ) {

        this.headOfCharges = headOfCharges;
        this.perUnit = perUnit;
        this.dpLogistics = dpLogistics;
        this.vendor = vendor;
        this.nsh=nsh;
        this.ksr = ksr;

        this.unitPrice = unitPrice;


        

    }
}