export class ProductReq{
    productId : number;
    updatedUser:string;
    isActive?:boolean;
    
    constructor(productId : number,updatedUser:string,isActive?:boolean)
    {
        this.productId = productId;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
        
    }
}
