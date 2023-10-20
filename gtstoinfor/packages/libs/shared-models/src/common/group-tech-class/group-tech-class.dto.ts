

export class GroupTechClassDto{
    groupTechClassId:number;
    groupTechClassCode:string;
    groupTechClassDescription: string;
    buyerId: number;
    divisionId: number;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;
    versionFlag : number;


   
    constructor(groupTechClassId:number,
        groupTechClassCode:string,
        groupTechClassDescription: string,
        buyerId: number,
        divisionId: number,
        createdUser:string,
        updatedUser:string,
        isActive:boolean,
        versionFlag : number){
         this.groupTechClassId = groupTechClassId;
         this.groupTechClassCode = groupTechClassCode;
         this.groupTechClassDescription = groupTechClassDescription;
         this.buyerId = buyerId;
         this.divisionId = divisionId;
         this.createdUser = createdUser;
         this.updatedUser = updatedUser;
         this.versionFlag = versionFlag
        this.isActive = isActive;
    }
}

