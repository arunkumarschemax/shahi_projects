export class StructureModel{
    structureId: number;
    structure: string;
     isActive: boolean;
     versionFlag: number;
 
     constructor(structureId: number,structure: string,isActive: boolean,versionFlag: number){
         this.structureId =structureId
         this.structure =structure
         this.isActive = isActive
         this.versionFlag = versionFlag
     }
 }