export class ThreadsDto{
    threadId:number;
    styleId:number;
    supplierId:number;
    tex:string;
    quality:string;
    colorCombo:string;
    colorCode:string;
    shadeNumber:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

   
    constructor(threadId:number,styleId:number,supplierId:number,tex:string,quality:string,colorCombo:string,colorCode:string,shadeNumber:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.threadId = threadId;
        this.styleId = styleId;
        this.supplierId=supplierId;
        this.tex=tex;
        this.quality=quality;
        this.colorCombo=colorCombo;
        this.colorCode=colorCode;
        this.shadeNumber=shadeNumber;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;

        this.isActive = isActive;
    }
}