export class RackPositionDropDownDto{
    positionId : number;
    rackPositionName : string;
    levelId:number;
    levelName:string;
    // itemSubCategoryCode? : string;
    
    /**
     * 
     * @param columnId number
     * @param column string
     * @param levelId string
     * @param level string
     */
    constructor(columnId : number,column : string,levelId : number,levelName:string){
        this.positionId = columnId;
        this.rackPositionName = column;
        this.levelId=levelId;
        this.levelName=levelName;
    }
}