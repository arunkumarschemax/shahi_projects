export class ProcurmentGroupRequest {
    procurmentGroupId : number;
    procurmentGroup : string;
    createdUser : string;
    updatedUser: string;
    isActive: boolean;
    versionFlag: number;
    constructor(procurmentGroupId : number, procurmentGroup : string,createdUser : string, updatedUser: string,
        isActive: boolean,
        versionFlag: number,)
    {
        this.procurmentGroupId = procurmentGroupId;
        this.createdUser = createdUser
        this.isActive = isActive
        this.procurmentGroup= procurmentGroup
        this.versionFlag = versionFlag

    }
}
