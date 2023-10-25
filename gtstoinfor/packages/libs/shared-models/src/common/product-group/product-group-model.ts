export class ProductGroupDto{
    productGroupId : number;
    productGroup : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    constructor(productGroupId : number,productGroup : string,isActive: boolean,createdUser : string,updatedUser:string){
        this.productGroupId = productGroupId;
        this.productGroup = productGroup;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}

