export  class SupplierCreateDto{
    id: number;
    category: string;
    supplierCode: number;  
    supplierName: string;  
    GstNumber: number;
    contactPerson: string;
    street: string;
    apartment: string;
    city: string;
    state: string;
    district: string;
    postalCode: number;
    commision: string;
    bankAccountNo: string;
    bankIFSC: string;
    bankName: string;
    bankBranch: string;
    contactNumber: number;
    email: string;
    creditPaymentPeriod: string;
    createdUser: string;
    isActive?:boolean
    versionFlag?: number;
    constructor(id: number,
    category: string,
    supplierCode: number, 
    supplierName: string,  
    GstNumber: number,
    contactPerson: string,
    street: string,
    apartment: string,
    city: string,
    state: string,
    district: string,
    postalCode: number,
    commision: string,
    bankAccountNo: string,
    bankIFSC: string,
    bankName: string,
    bankBranch: string,
    contactNumber: number,
    email: string,
    creditPaymentPeriod: string,
    createdUser:string,
    isActive?:boolean,
    versionFlag?: number)  {
        this.id = id;
        this.category= category;
        this.supplierCode = supplierCode;
        this.supplierName = supplierName;
        this.GstNumber = GstNumber;
        this.contactPerson = contactPerson;
        this.street = street;
        this.apartment = apartment;
        this.city = city;
        this.state = state;
        this.district = district;
        this.postalCode = postalCode;
        this.commision = commision;
        this.bankAccountNo = bankAccountNo;
        this.bankIFSC = bankIFSC;
        this.bankName = bankName;
        this.bankBranch = bankBranch;
        this.contactNumber = contactNumber;
        this.email = email;
        this.creditPaymentPeriod = creditPaymentPeriod;
        this.createdUser = createdUser;
        this.isActive = isActive;
        this.versionFlag = versionFlag;
    }
    
    
}