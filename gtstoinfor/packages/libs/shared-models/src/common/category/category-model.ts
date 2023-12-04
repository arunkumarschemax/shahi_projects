export class CategoryModel{
    categoryId: number;
    category: string;
    categorycode: string;

     isActive: boolean;
     versionFlag: number;
 
     constructor(categoryId: number,category: string,categorycode:string,isActive: boolean,versionFlag: number){
         this.categoryId =categoryId
         this.category =category
         this.categorycode=categorycode
         this.isActive = isActive
         this.versionFlag = versionFlag
     }
 }