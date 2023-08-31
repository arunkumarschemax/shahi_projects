export class SampleSubTypesDTO{
    sampleSubTypeId:number;
    sampleSubType:string;
    isActive:boolean;
    updatedUser:string;
    versionFlag:number;
    sampleTypeId:number;
    sampleType:string
    /**
     * 
     * @param operationId This is a number
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     * @param operationCode This is a string
     * @param versionFlag This is a string

     */
    
    constructor(sampleSubTypeId:number,sampleSubType:string, sampleType:string,isActive:boolean,updatedUser:string,versionFlag:number,SampleTypeId:number){
        this.sampleSubTypeId = sampleSubTypeId;
        this.updatedUser = updatedUser;
        this.sampleSubType = sampleSubType
        this.isActive = isActive;
        this.versionFlag = versionFlag
        this.sampleTypeId = SampleTypeId
        this.sampleType = sampleType
    }
}