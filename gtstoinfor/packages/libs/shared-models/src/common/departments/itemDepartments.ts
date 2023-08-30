export class ItemDepartment {
    departmenttId:string;
    departmenttName:string;
    isActive:boolean;
    constructor(departmenttId:string,departmenttName:string,isActive:boolean){
        this.departmenttId=departmenttId;
        this.departmenttName=departmenttName;
        this.isActive=isActive;
    }
  }