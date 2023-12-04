export class TypeReq{
    type: string;
    createdUser : string;
    typeId?: number;

    constructor(type: string,createdUser : string,typeId?: number){
        this.type = type
        this.createdUser = createdUser
        this.typeId = typeId
    }
}