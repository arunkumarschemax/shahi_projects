export class ROSLGroupsDto {
    roslGroupId: number;
    roslGroup: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const ROSLGroupsDtoDefault : ROSLGroupsDto = {
    roslGroupId: 0,
    roslGroup: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};

