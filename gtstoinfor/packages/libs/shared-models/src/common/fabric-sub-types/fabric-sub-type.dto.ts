export class FabricSubTypeDto {
    fabricSubTypeId:number;
    fabricSubTypeName: string;
    fabricTypeId: number;
    fabricTypeName: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;


}

export const FabricSubTypeDtoDefault : FabricSubTypeDto = {
    fabricSubTypeId:0,
    fabricSubTypeName: "",
    fabricTypeId: 0,
    fabricTypeName: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1

};

export class fabricTypeIdreq{
    fabricTypeId:number
}