export class CategoryActivateReq{
    categoryId: number;
    updatedUser: string;
    versionFlag: number;
    isActive: boolean;

    constructor( categoryId: number,updatedUser: string,versionFlag: number,isActive: boolean){
        this.categoryId = categoryId
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }
}