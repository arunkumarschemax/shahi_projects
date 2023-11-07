export class MasterBrandsDto{
    brandId:number;
    brandName:string;
    // createdUser:string;
    updatedUser:string;
    isActive:boolean;
    filePath:string;
    fileName:string;
    versionFlag:number;

    /**
     * 
     * @param brandId This is a number
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     * @param fileName This is a string
     * @param versionFlag This is a string
     * @param versionFlag This is a string
     */
    
    constructor(brandId:number,brandName:string,updatedUser:string,isActive:boolean,fileName:string,filePath:string,versionFlag:number){
        this.brandId = brandId;
        this.brandName = brandName;
        // this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.filePath =filePath;
        this.fileName = fileName
        this.isActive = isActive;
        this.versionFlag = versionFlag
    }
}