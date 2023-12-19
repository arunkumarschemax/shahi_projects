import { ApiProperty } from "@nestjs/swagger";


export class FinishDTO {
    // type: string
    finish:string;
    finishCode: string;
    isActive?: boolean;
    createdAt? : Date;
    createdUser? : string;
    updatedAt?: Date;
    updatedUser? : string;
    versionFlag? : number;
    finishId? :number;

    constructor(
        // type: string,
        finish:string,
        finishCode: string,
        isActive?: boolean,
        createdAt? : Date,
        createdUser? : string,
        updatedAt? : Date,
        updatedUser? : string,
        versionFlag?: number,
        finishId?:number,
    ){
        // this.type = type
        this.finish = finish
        this.finishCode = finishCode
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.finishId = finishId
    }

}

