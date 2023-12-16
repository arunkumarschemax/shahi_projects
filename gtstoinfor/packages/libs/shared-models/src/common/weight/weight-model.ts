export class weightModel{
    weightId: number;
    category: string;

     isActive: boolean;
     versionFlag: number;
 
     constructor(weightId: number,category: string,isActive: boolean,versionFlag: number){
         this.weightId =weightId
         this.category =category
         this.isActive = isActive
         this.versionFlag = versionFlag
     }
 }