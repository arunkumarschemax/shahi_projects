export class ProductGroupDto{
    productGroupId : number;
    productGroupName : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    constructor(productGroupId : number,productGroupName : string,isActive: boolean,createdUser : string,updatedUser:string){
        this.productGroupId = productGroupId;
        this.productGroupName = productGroupName;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}

