export class FabricsRequestDto{
    fabricsId:number;
    fabricsCode:string;
    description:string;
    updatedUser:string;
    FabricsName:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param fabricsId This is a number
     * @param fabricsThis is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(fabricsId:number,fabricsCode:string,description:string,updatedUser:string, FabricsName:string, isActive:boolean,versionFlag:number){
        this.fabricsId = fabricsId;
        this.fabricsCode=fabricsCode;
        this.description=description;
        this.updatedUser = updatedUser;
        this.FabricsName = FabricsName;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }