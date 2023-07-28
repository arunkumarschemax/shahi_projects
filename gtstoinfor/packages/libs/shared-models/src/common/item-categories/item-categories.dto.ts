export class ItemCategoriesDto {
    itemCategoryId?:number;
    itemCategory: string;
    itemCategoryCode: string;
    remarks: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;


}

export const ItemCategoryDtoDefault : ItemCategoriesDto = {
    itemCategory: "",
    itemCategoryCode: "",
    remarks: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1

};