export class FabricFinishTypesDTO{
    fabricFinishTypeId:number;
    fabricFinishType:string;
    isActive:boolean;
    updatedUser:string;
    versionFlag:number;
    /**
     * 
     * @param operationId This is a number
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     * @param operationCode This is a string
     * @param versionFlag This is a string

     */
    
    constructor(fabricFinishTypeId:number,fabricFinishType:string,isActive:boolean,updatedUser:string,versionFlag:number){
        this.fabricFinishTypeId = fabricFinishTypeId;
        this.updatedUser = updatedUser;
        this.fabricFinishType = fabricFinishType
        this.isActive = isActive;
        this.versionFlag = versionFlag
    }
}