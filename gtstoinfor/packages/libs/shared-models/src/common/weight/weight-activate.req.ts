export class WeightActivateReq{
     weightId: number;
    updatedUser: string;
    versionFlag: number;
    isActive: boolean;

    constructor( weightId: number,updatedUser: string,versionFlag: number,isActive: boolean){
        this.weightId = weightId
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }
}