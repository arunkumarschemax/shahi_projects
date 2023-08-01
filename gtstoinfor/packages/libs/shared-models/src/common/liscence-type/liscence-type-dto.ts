export class LiscenceTypesdDto {
    liscenceTypeId?: number;
    liscenceType: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const LiscenceTypesdDtoDefault : LiscenceTypesdDto = {
    liscenceTypeId: 0,
    liscenceType: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};

