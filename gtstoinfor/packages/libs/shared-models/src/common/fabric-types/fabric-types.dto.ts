export class FabricTypesDto {
   fabricTypeId?:number;
   fabricTypeName: string;
//    fabricSubTypeId?: number;
//    fabricSubTypeName?: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;


}
export const FabricTypesDtoDefault : FabricTypesDto = {
    fabricTypeName: "",
    // fabricSubTypeId:0,
    // fabricSubTypeName:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1

};