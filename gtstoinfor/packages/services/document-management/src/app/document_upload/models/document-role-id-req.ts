import { ApiProperty } from "@nestjs/swagger";

export class RoleActivateDeactivateDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    versionFlag: number;
    @ApiProperty()
    updatedUser: string;
    @ApiProperty()
    isActive: boolean;

    constructor(id: number, versionFlag: number,updatedUser: string,isActive: boolean) {
        this.id = id
        this.versionFlag = versionFlag
        this.updatedUser = updatedUser
        this.isActive = isActive
    }

}
