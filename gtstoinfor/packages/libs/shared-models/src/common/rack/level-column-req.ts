export class RackpositionForIds {
    levelId: number;
    levelName:string;
    columnId:number;
    column:string;


    /**
     * @param levelId
     * @param columnId 
     */
    constructor(levelId: number,columnId:number){
        this.levelId = levelId;
        this.columnId=columnId;
        
    }
}
