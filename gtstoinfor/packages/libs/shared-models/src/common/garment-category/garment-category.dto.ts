export class GarmentCategoryDto {
    garmentCategoryId?:number;
    garmentCategory: string;
    remarks: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;


}

export const GarmentCategoryDtoDefault : GarmentCategoryDto = {
    garmentCategoryId:0,
    garmentCategory: "",
    remarks: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1

};