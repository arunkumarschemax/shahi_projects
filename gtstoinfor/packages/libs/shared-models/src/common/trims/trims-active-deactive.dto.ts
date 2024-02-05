export class TrimActivateDeactivateDto {
    trimid: number
    isActive: boolean
    versionFlag: number
    

    constructor(trimid: number,isActive: boolean,versionFlag: number,) {
        this.trimid = trimid;
        this.isActive = isActive;
        this.versionFlag = versionFlag;
        
    }

}