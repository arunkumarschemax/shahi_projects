export class TrimUomDTO {
    uom:string;
    isActive?: boolean;
    createdAt? : Date;
    createdUser? : string;
    updatedAt?: Date;
    updatedUser? : string;
    versionFlag? : number;
    uomId? :number;

    constructor(
        uom:string,
        isActive?: boolean,
        createdAt? : Date,
        createdUser? : string,
        updatedAt? : Date,
        updatedUser? : string,
        versionFlag?: number,
        uomId?:number,
    ){
        this.uom = uom
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.uomId = uomId
    }

}

