export class FunctionDTO {
    function:string;
    isActive?: boolean;
    createdAt? : Date;
    createdUser? : string;
    updatedAt?: Date;
    updatedUser? : string;
    versionFlag? : number;
    functionId? :number;

    constructor(
        function1:string,
        isActive?: boolean,
        createdAt? : Date,
        createdUser? : string,
        updatedAt? : Date,
        updatedUser? : string,
        versionFlag?: number,
        functionId?:number,
    ){
        this.function = function1
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.functionId = functionId
    }

}

