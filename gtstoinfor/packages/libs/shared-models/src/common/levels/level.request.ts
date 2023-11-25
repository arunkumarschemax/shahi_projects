export class LevelsRequestDto{
    levelId:number;
    levelName:string;
    updatedUser:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param levelId This is a number
     * @param fabricsThis is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(levelId:number,levelName:string,updatedUser:string,  isActive:boolean,versionFlag:number){
        this.levelId = levelId;
        this.levelName=levelName;
        this.updatedUser = updatedUser;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }