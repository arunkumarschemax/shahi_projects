export class ServiceFilterDto {

    vendorName: string;
    hsnCode:string;
    serviceDescription:string;
   
    constructor(
        vendorName: string,
        hsnCode:string,
        serviceDescription:string,
    

    ) {

        this.vendorName = vendorName;
        this.hsnCode=hsnCode;
        this.serviceDescription=serviceDescription
    

    }
}