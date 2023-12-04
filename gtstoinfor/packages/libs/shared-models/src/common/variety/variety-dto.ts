
export class VarietyDtos {
    varietyId?: number;
    variety: string;
    varietyCode:string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const VarietyDtoDefault : VarietyDtos = {
    varietyId: 0,
    variety: "",
    varietyCode:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};