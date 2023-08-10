export class SampleTypesRequest{
    sampleTypeId:number;
    updatedUser?: string;
    versionFlag?: number;
    isActive?: boolean;
    sampleType?: string;
    
    constructor(sampleTypeId:number,updatedUser?: string,versionFlag?: number,isActive?: boolean,sampleType?: string){
        this.sampleTypeId = sampleTypeId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        this.sampleType = sampleType;
    }
}