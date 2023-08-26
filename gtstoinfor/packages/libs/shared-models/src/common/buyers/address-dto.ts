export class AddressDto{
    addressId:number;
    countryId:number;
    state:string;
    district:string;                       
    city : string;
    landmark:string;
    lane1:string;
    lane2:string;
    pincode:string; 
    isActive: boolean;
    createdUser : string;
    updatedUser : string;
    versionFlag:number;
    countryName?: string;
    
     /**
      * @param addressId  number
    * @param countryId  number            
    * @param state  string  
    * @param district  string           
    * @param city  string    
    * @param landmark  string            
    * @param lane1  string    
    * @param lane2  string    
    * @param pincode  string 
    * @param countryName  string 
    *   */ 
  

    constructor(addressId:number, countryId:number,state:string,district:string,city : string,landmark:string,lane1:string,lane2:string,pincode:string,isActive: boolean,createdUser : string,updatedUser : string,versionFlag:number,countryName?: string){
        this.addressId = addressId;
        this.countryId = countryId;            
        this.state = state;
        this.district = district;
        this.city = city;
        this.landmark = landmark;
        this.lane1 = lane1;
        this.lane2 = lane2;
        this.pincode = pincode;
        this.isActive = isActive;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.countryName = countryName
    }

    
}