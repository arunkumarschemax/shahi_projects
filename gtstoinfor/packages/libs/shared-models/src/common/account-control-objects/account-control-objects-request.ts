export class AccountControlObjectRequest{
    accountControlObjectsId:number;
    accountControlObjectsName:string;
    updatedUser?: string;
    versionFlag?: number;
    isActive?: boolean;
    constructor(accountControlObjectsId:number,){
        this.accountControlObjectsId = accountControlObjectsId;
        this.accountControlObjectsName =this.accountControlObjectsName
    }
}
