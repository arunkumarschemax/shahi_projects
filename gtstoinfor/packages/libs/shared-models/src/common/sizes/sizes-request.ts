export class SizeRequestDto{
    sizeId:number;
    updatedUser:string;
    size:string;
    sizeCode:string;
    description:string;
    optionGroup:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param sizeId This is a number
     * @param size is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(sizeId:number,sizeCode:string,description:string,optionGroup:string,updatedUser:string, size:string, isActive:boolean,versionFlag:number){
        this.sizeId = sizeId;
        this.sizeCode=sizeCode;
        this.description=description;
        this.optionGroup=optionGroup;
        this.updatedUser = updatedUser;
        this.size = size;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }