export class ItemSubCategoriesDto {
    itemSubCategoryId?:number;
    itemSubCategory: string;
    itemSubCategoryCode: string;
    itemCategoryId?: number;
    itemCategoryName?: string;
    remarks: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;


}

export const ItemSubCategoryDtoDefault : ItemSubCategoriesDto = {
    itemSubCategory: "",
    itemSubCategoryCode: "",
    remarks: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1

};