export class HierarchyLevelDto{
    hierarchyLevelId : number;
    hierarchyLevelName : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    constructor(hierarchyLevelId : number,hierarchyLevelName : string,isActive: boolean,createdUser : string,updatedUser:string){
        this.hierarchyLevelId = hierarchyLevelId;
        this.hierarchyLevelName = hierarchyLevelName;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}

