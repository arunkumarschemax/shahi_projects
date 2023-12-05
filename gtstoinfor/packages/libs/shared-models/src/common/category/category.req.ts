
export class CategoryReq {
    categoryId?: number;
    category: string;
    categoryCode:string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const CategoryDtoDefault : CategoryReq = {
    categoryId: 0,
    category: "",
    categoryCode:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};