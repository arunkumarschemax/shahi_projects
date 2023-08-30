export class AccountControlObjectDto {
    accountControlObjectsId:number;
    accountControlObjectsName: string;
    profitControlHeadId:number;
    profitControlHead:string;
     isActive: boolean;
     createdAt : Date | any;
     createdUser : string;
     updatedAt : Date | any;
     updatedUser : string;
     versionFlag : number;
 
 
 }
 export const AccountControlObjectDtoDefault : AccountControlObjectDto = {
    accountControlObjectsId:0,
    accountControlObjectsName: "",
    profitControlHeadId:0,
    profitControlHead:"",
     isActive: true,
     createdAt : new Date() ,
     createdUser : '0',
     updatedAt : new Date() ,
     updatedUser : '0',
     versionFlag : 1
 
 };