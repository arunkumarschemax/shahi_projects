export class LiscenceTypesdDto {
    
    liscenceType: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
    liscenceTypeId?: number;
    constructor(liscenceType:string,isActive: boolean,createdAt : Date | any,createdUser : string,updatedAt : Date | any, updatedUser : string,versionFlag : number,liscenceTypeId?:number ){
            this.liscenceType = liscenceType;
            this.isActive = isActive
            this.createdAt = createdAt;
            this.createdUser = createdUser;
            this.updatedAt = updatedAt;
            this.updatedUser = updatedUser;
            this.versionFlag = versionFlag;
            this.liscenceTypeId = liscenceTypeId;

    }
}


