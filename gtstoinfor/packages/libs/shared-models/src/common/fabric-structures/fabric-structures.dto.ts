export class FabricStructuresDTO{
    fabricStructureId:number;
    fabricStructure:string;
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
    
    constructor(fabricStructureId:number,fabricStructure:string,isActive:boolean,updatedUser:string,versionFlag:number){
        this.fabricStructureId = fabricStructureId;
        this.updatedUser = updatedUser;
        this.fabricStructure = fabricStructure
        this.isActive = isActive;
        this.versionFlag = versionFlag
    }
}