
export class VendorsDto {
    vendorId?: number;
    vendorCode:string;
    vendorName: string;
    gstNumber: string;
    website: string;
    contactPerson: string;
    street: string;
    apartment: string;
    city: string;
    postalCode: string;
    countryId: number;
    countryName?: string;
    currencyId: number;
    currencyName?: string;
    privateNote: string;
    publicNote: string;
    bankAccNo: string;
    bankIfsc: string;
    bankName: string;
    bankBranch: string;
    contactNumber: string;
    emailId: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
    // priceNeeded? : GlobalStatus;
}

export const VendorsDtoDefault : VendorsDto = {
    vendorId: 0,
    vendorCode:'',
    vendorName: '',
    gstNumber: '',
    website: '',
    contactPerson: '',
    street: '',
    apartment: '',
    city: '',
    postalCode: '',
    countryId: null,
    currencyId: null,
    privateNote: '',
    publicNote: '',
    bankAccNo: '',
    bankIfsc: '',
    bankName: '',
    bankBranch: '',
    contactNumber: '',
    emailId: '',
    isActive: true,
    createdAt : new Date(),
    createdUser : '0',
    updatedAt : new Date(),
    updatedUser : '0',
    versionFlag : 1,

};