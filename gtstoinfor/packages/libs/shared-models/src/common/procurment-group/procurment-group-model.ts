export class ProcurmentGroupDto{
    procurmentGroupId : number;
    procurmentGroupName : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    constructor(procurmentGroupId : number,procurmentGroupName : string,isActive: boolean,createdUser : string,updatedUser:string){
        this.procurmentGroupId = procurmentGroupId;
        this.procurmentGroupName = procurmentGroupName;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}

