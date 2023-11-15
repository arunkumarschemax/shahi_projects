export class HierarchyLevelRequest {
    hierarchyLevelId : number;
    hierarchyName : string;
    level1: string;
    level1Code: string;
    level2: string;
    level2Code: string;
    level3: string;
    level3Code: string;
    level4: string;
    level4Code: string;
    level5: string;
    level5Code: string;
    createdUser : string;
    updatedUser: string;
    isActive: boolean;
    versionFlag: number;
    constructor(hierarchyLevelId : number, hierarchyName : string,
        level1: string,
        level1Code: string,
        level2: string,
        level2Code: string,
        level3: string,
        level3Code: string,
        level4: string,
        level4Code: string,
        level5: string,
        level5Code: string,createdUser : string, updatedUser: string,
        isActive: boolean,
        versionFlag: number)
    {
        this.hierarchyLevelId = hierarchyLevelId;
        this.createdUser = createdUser
        this.isActive = isActive
        this.hierarchyName= hierarchyName
        this.versionFlag = versionFlag
        this.level1 = level1
        this.level1Code = level1Code
        this.level2 = level2
        this.level3 = level3
        this.level2Code = level2Code
        this.level3Code =level3Code
        this.level4= level4
        this.level5 = level5
        this.level4Code = level4Code
        this.level5Code =level5Code
    }
}


