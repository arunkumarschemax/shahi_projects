export class RoleActivateDeactivateDto {
    id: number;
    versionFlag: number;
    updatedUser: string;
    isActive: boolean;

    constructor(id: number, versionFlag: number,updatedUser: string,isActive: boolean) {
        this.id = id
        this.versionFlag = versionFlag
        this.updatedUser = updatedUser
        this.isActive = isActive
    }

}
