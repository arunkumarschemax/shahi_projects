export class AirHoleDTO {
    airHole:string;
    isActive?: boolean;
    createdAt? : Date;
    createdUser? : string;
    updatedAt?: Date;
    updatedUser? : string;
    versionFlag? : number;
    airHoleId? :number;

    constructor(
        airHole:string,
        isActive?: boolean,
        createdAt? : Date,
        createdUser? : string,
        updatedAt? : Date,
        updatedUser? : string,
        versionFlag?: number,
        airHoleId?:number,
    ){
        this.airHole = airHole
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.airHoleId = airHoleId
    }

}

