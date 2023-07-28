export class VendorFilterRequest{

    vendorCode?: string;
    contactNumber?: string;
    city?: string;
    gstNumber?: string;

    constructor(vendorCode?: string,contactNumber?: string,city?: string,gstNumber?: string){
        this.vendorCode = vendorCode;
        this.contactNumber = contactNumber;
        this.city = city;
        this.gstNumber = gstNumber;
    }
}