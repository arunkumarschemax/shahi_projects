

export class GroupTechClassRequest{
    groupTechClassId:number;
    groupTechClassCode:string;
    groupTechClassDescription: string;
    buyerId: number;
    divisionId: number;
    createdUser:string;
    createdAt:Date;
    updatedAt:Date;
    updatedUser:string;
    isActive:boolean;
    versionFlag : number;


   
    constructor(groupTechClassId:number,
        groupTechClassCode:string,
        groupTechClassDescription: string,
        buyerId: number,
        divisionId: number,
        createdUser:string,
        createdAt:Date,
        updatedAt:Date,
        updatedUser:string,
        isActive:boolean,
        versionFlag : number){
         this.groupTechClassId = groupTechClassId;
         this.groupTechClassCode = groupTechClassCode;
         this.groupTechClassDescription = groupTechClassDescription;
         this.buyerId = buyerId;
         this.divisionId = divisionId;
         this.createdUser = createdUser;
         this.createdAt = createdAt
         this.updatedAt = updatedAt
         this.updatedUser = updatedUser;
         this.versionFlag = versionFlag
        this.isActive = isActive;
    }
}

