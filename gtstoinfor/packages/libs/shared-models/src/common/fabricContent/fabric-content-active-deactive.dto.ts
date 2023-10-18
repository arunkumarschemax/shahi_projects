export class FabricContentActivateDeactivateDto {
    id: number
    isActive: boolean
    versionFlag: number
    

    constructor(id: number,isActive: boolean,versionFlag: number,) {
        this.id = id;
        this.isActive = isActive;
        this.versionFlag = versionFlag;
        
    }

}