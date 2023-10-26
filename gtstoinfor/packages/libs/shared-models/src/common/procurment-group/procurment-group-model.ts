export class ProcurmentGroupDto{
    procurmentGroupId : number;
    procurmentGroup : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    constructor(procurmentGroupId : number,procurmentGroup : string,isActive: boolean,createdUser : string,updatedUser:string){
        this.procurmentGroupId = procurmentGroupId;
        this.procurmentGroup = procurmentGroup;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}

