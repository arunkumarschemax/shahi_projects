export class ProductGroupRequest {
    productGroupId : number;
    productGroup : string;
    createdUser : string;
    updatedUser: string;
    isActive: boolean;
    versionFlag: number;

    constructor(productGroupId : number, productGroup : string,createdUser : string, updatedUser: string,
        isActive: boolean,
        versionFlag: number)
    {
        this.productGroupId = productGroupId;
        this.createdUser = createdUser
        this.isActive = isActive
        this.productGroup= productGroup
        this.versionFlag = versionFlag
this.updatedUser = updatedUser
        
    }
}
