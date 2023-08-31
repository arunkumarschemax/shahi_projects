export class FabricsDto {
    fabricId?: number;
    fabricsName: string;
    fabricsCode:string;
    description:string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const FabricsDtoDefault : FabricsDto = {
    fabricId:0,
    fabricsName:"",
    fabricsCode:"",
    description:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};

