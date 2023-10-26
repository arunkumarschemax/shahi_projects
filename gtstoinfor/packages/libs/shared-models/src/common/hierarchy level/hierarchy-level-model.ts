export class HierarchyLevelDto{
    hierarchyLevelId : number;
    hierarchyLevel : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;
    versionFlag:number

    constructor(hierarchyLevelId : number,hierarchyLevel : string,isActive: boolean,createdUser : string,updatedUser:string,versionFlag:number        ){
        this.hierarchyLevelId = hierarchyLevelId;
        this.hierarchyLevel = hierarchyLevel;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;
        this.versionFlag = versionFlag
    }
}

