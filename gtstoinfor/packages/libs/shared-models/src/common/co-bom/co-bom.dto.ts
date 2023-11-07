export class CoBomDto{

    fgItemBomId:number;
    quantity:string;
    coNumber:string;
    coLineNumber:string;
    fgSku:string;
    isActive: boolean;
    createdAt: Date;
    createdUser: string | null;
    updatedAt: Date;
    updatedUser: string | null;
    versionFlag: number;
    co_id?:number;
    constructor(fgItemBomId:number, quantity:string, coNumber:string,coLineNumber:string,fgSku:string,isActive: boolean,createdAt: Date, createdUser: string | null,updatedAt: Date, updatedUser: string | null,versionFlag: number,Co_id?:number){
 this.fgItemBomId=fgItemBomId;
 this.quantity=quantity;
 this.coNumber=coNumber;
 this.coLineNumber=coLineNumber;
 this.fgSku=fgSku;
 this.isActive=isActive;
 this.createdAt=createdAt;
 this.updatedAt=updatedAt;
 this.updatedUser=updatedUser;
 this.versionFlag=versionFlag;
 this.co_id=this.co_id
    }
}


