export class TypeModel{
   typeId: number;
   type: string;
    isActive: boolean;
    versionFlag: number;

    constructor(typeId: number,type: string,isActive: boolean,versionFlag: number){
        this.typeId =typeId
        this.type =type
        this.isActive = isActive
        this.versionFlag = versionFlag
    }
}