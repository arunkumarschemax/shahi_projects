export class VendorFilterRequest{

    vendorCode?: string;
    contactNumber?: string;
    city?: string;

    constructor(vendorCode?: string,contactNumber?: string,city?: string){
        this.vendorCode = vendorCode;
        this.contactNumber = contactNumber;
        this.city = city;
    }
}