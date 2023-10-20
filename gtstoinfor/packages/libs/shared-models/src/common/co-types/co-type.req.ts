export class CoTypeReq{
    coType: string;
    createdUser : string;
    coTypeId?: number;

    constructor(coType: string,createdUser : string,coTypeId?: number){
        this.coType = coType
        this.createdUser = createdUser
        this.coTypeId = coTypeId
    }
}