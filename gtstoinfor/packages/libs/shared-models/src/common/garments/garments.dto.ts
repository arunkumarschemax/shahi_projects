export class GarmentsDto {
    garmentId?:number;
    garmentName: string;
    garmentCategoryId?: number;
    garmentCategoryName?: string;
    remarks: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;


}

export const GarmentsDtoDefault : GarmentsDto = {
    garmentName: "",
    remarks: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1

};