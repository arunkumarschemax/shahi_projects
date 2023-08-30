

export class DepartmentRequestDto{
    deptId:number;
    updatedUser:string;
    deptName:string;
    deptHead:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param deptId This is a number
     * @param colourThis is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(deptId:number,updatedUser:string, deptName:string,deptHead:string, isActive:boolean,versionFlag:number){
        this.deptId = deptId;
        this.updatedUser = updatedUser;
        this.deptName = deptName;
        this.deptHead=deptHead;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }