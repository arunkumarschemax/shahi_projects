export class AllPriceDto {
    headOfChargers: string;
    perUnit: string;
    dpLogistics: string;
    vendor: string;
    nsh: string;
    ksr: string;
    unitPrice: string;
    // createdAt:Date;
    // createdUser:string;
    // updatedAt?:Date;
    // updatedUser?:string;
    // versionFlag?:number

    constructor(
        headOfChargers: string,
        perUnit: string,
        dpLogistics: string,
        vendor: string,
        nsh: string,
        ksr: string,
        unitPrice: string,


        // createdAt:Date,
        // createdUser:string,
        // updatedAt?:Date,
        // updatedUser?:string,
        // versionFlag?:number

    ) {

        this.headOfChargers = headOfChargers;
        this.perUnit = perUnit;
        this.dpLogistics = dpLogistics;
        this.vendor = vendor;
        this.nsh=nsh;
        this.ksr = ksr;

        this.unitPrice = unitPrice;


        //   this.createdAt=createdAt;
        //   this.createdUser=createdUser;
        //   this.updatedAt=updatedAt;
        //   this.updatedUser=updatedUser
        //   this.versionFlag = versionFlag

    }
}