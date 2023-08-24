import { AddressDto } from "./address-dto";

export class BuyersDto{
    buyerId : number;
    buyerCode : string;            
    buyerName : string; 
    // accountType : string;           
    gstNumber : string; 
    contactPerson : string;                       
    phoneNo : string;           
    email : string; 
    currency : string;
    publicNote : string;            
    privateNote : string; 
    paymentTerms : string; 
    shipmentTerms : string;
    paymentMethodId : number;    
    isActive: boolean;
    createdUser : string;
    updatedUser : string;
    versionFlag:number;
    paymentTermsId: number;
    paymentMethod : string;
    addressInfo: AddressDto[];
    
    /**
    * @param buyerId  number
    * @param buyerCode  string            
    * @param buyerName  string  
    * @param gstNumber  string   
    * @param contactPerson  string                     
    * @param phoneNo  string            
    * @param email  string            
    * @param currency  string              
    * @param publicNote  string            
    * @param privateNote  string 
    * @param paymentTerms  string            
    * @param shipmentTerms  string 
    * @param paymentMethodId  number              
    * @param isActive boolean
    * @param createdUser  string
    * @param updatedUser  string
    * @param paymentTermsId number
    * @param paymentMethod string
    * 
    */
    constructor(buyerId : number,buyerCode : string,buyerName : string,gstNumber : string,contactPerson :string,phoneNo : string,email : string, currency : string, publicNote : string,privateNote : string,paymentTerms : string, shipmentTerms : string,paymentMethodId : number,isActive: boolean,createdUser : string,updatedUser : string,versionFlag:number,paymentTermsId: number,paymentMethod : string,addressInfo: AddressDto[])
    {
        this.buyerId = buyerId;
        this.buyerCode = buyerCode;     
        this.buyerName = buyerName;
        // this.accountType = accountType;  
        this.gstNumber = gstNumber;
        this.contactPerson = contactPerson;                
        this.phoneNo = phoneNo;
        this.email = email;         
        this.currency = currency; 
        this.publicNote = publicNote;            
        this.privateNote = privateNote;     
        this.paymentTerms = paymentTerms;
        this.shipmentTerms = shipmentTerms;
        this.paymentMethodId = paymentMethodId;            
        this.isActive= isActive;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.paymentTermsId = paymentTermsId;
        this.paymentMethod = paymentMethod;
        this.addressInfo = addressInfo;

    }
}
