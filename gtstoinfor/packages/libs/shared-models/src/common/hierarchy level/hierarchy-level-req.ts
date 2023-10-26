export class HierarchyLevelRequest {
    hierarchyLevelId : number;
    hierarchyLevel : string;
    createdUser : string;
    updatedUser: string;
    isActive: boolean;
    versionFlag: number;
    constructor(hierarchyLevelId : number, hierarchyLevel : string,createdUser : string, updatedUser: string,
        isActive: boolean,
        versionFlag: number)
    {
        this.hierarchyLevelId = hierarchyLevelId;
        this.createdUser = createdUser
        this.isActive = isActive
        this.hierarchyLevel= hierarchyLevel
        this.versionFlag = versionFlag

    }
}


