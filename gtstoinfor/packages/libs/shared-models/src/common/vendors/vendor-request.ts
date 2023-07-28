
export class VendorRequest{
    vendorId:number;
    updatedUser?:string;
    versionFlag?: number;
    isActive?:boolean;
    
    constructor(vendorId:number,updatedUser?:string,versionFlag?: number,isActive?:boolean){
        this.vendorId = vendorId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
    }
}