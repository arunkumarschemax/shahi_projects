export class StructureReq{
    structure: string;
    createdUser : string;
    structureId?: number;

    constructor(structure: string,createdUser : string,structureId?: number){
        this.structure = structure
        this.createdUser = createdUser
        this.structureId = structureId
    }
}