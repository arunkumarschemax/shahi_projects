export class ThicknessModel{
   thicknessId: number;
   thickness: string;
    isActive: boolean;
    versionFlag: number;

    constructor(thicknessId: number,thickness: string,isActive: boolean,versionFlag: number){
        this.thicknessId =thicknessId
        this.thickness =thickness
        this.isActive = isActive
        this.versionFlag = versionFlag
    }
}