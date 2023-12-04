export class CategoryReq{
    category: string;
    createdUser : string;
    categoryId?: number;
    categorycode:string;
    constructor(category: string,categorycode:string,createdUser : string,categoryId?: number){
        this.category = category
        this.createdUser = createdUser
        this.categoryId = categoryId
        this.categorycode=categorycode
    }
}