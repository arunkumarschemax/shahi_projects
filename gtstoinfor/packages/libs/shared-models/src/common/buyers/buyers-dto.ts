
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
    state:string;
    district:string;                       
    city : string;
    landmark:string;
    lane1:string;
    lane2:string;
    pincode:string;   
    publicNote : string;            
    privateNote : string; 
    countryId:number; 
    paymentTerms : string; 
    shipmentTerms : string;
    paymentMethodId : number;    
    isActive: boolean;
    createdUser : string;
    updatedUser : string;
    versionFlag:number;
    paymentTermsId: number;
    paymentMethod : string;
    
    /**
    * @param buyerId  number
    * @param buyerCode  string            
    * @param buyerName  string  
    * @param gstNumber  string   
    * @param contactPerson  string                     
    * @param phoneNo  string            
    * @param email  string            
    * @param currency  string            
    * @param state  string  
    * @param district  string           
    * @param city  string    
    * @param landmark  string            
    * @param lane1  string    
    * @param lane2  string    
    * @param pincode  string    
    * @param publicNote  string            
    * @param privateNote  string 
    * @param countryId  number            
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
    constructor(buyerId : number,buyerCode : string,buyerName : string,gstNumber : string,contactPerson :string,phoneNo : string,email : string, currency : string,state:string,district:string,city : string,landmark:string,lane1:string,lane2:string,pincode:string, publicNote : string,privateNote : string, countryId:number, paymentTerms : string, shipmentTerms : string,paymentMethodId : number,isActive: boolean,createdUser : string,updatedUser : string,versionFlag:number,paymentTermsId: number,paymentMethod : string)
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
        this.state = state;
        this.district = district;
        this.city = city;
        this.landmark = landmark;
        this.lane1 = lane1;
        this.lane2 = lane2;
        this.pincode = pincode;
        this.publicNote = publicNote;            
        this.privateNote = privateNote;     
        this.countryId = countryId;            
        this.paymentTerms = paymentTerms;
        this.shipmentTerms = shipmentTerms;
        this.paymentMethodId = paymentMethodId;            
        this.isActive= isActive;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.paymentTermsId = paymentTermsId;
        this.paymentMethod = paymentMethod;

    }
}
export const BuyersDtoDefault : BuyersDto = {
    buyerId : 0,
    buyerCode : '',            
    buyerName : '',
    // accountType : '',            
    gstNumber : '',  
    contactPerson : '',                      
    phoneNo : '',            
    email : '',             
    currency : '',
    state:'',
    district:'',
    city:'',
    landmark:'',
    lane1:'',
    lane2:'',
    pincode:'',
    publicNote : '',            
    privateNote : '',            
    countryId : 0,            
    paymentTerms : '',
    shipmentTerms : '',
    paymentMethodId : 0,            
    isActive: true,
    createdUser : '',
    updatedUser : '',
    versionFlag:0,
    paymentTermsId : 0,
    paymentMethod: ''

    
}; 