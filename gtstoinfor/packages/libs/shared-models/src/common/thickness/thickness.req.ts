export class ThicknessReq{
    thickness: string;
    createdUser : string;
    thicknessId?: number;

    constructor(thickness: string,createdUser : string,thicknessId?: number){
        this.thickness = thickness
        this.createdUser = createdUser
        this.thicknessId = thicknessId
    }
}