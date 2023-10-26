export class ItemTypeDropDownDto{
    itemTypeId : number;
    itemType : string;
    productGroupId:number;
    productGroupName:string;
    divisionId:number;
    divisionName:string;
    // itemSubCategoryCode? : string;
    
    /**
     * 
     * @param divisionId number
     * @param divisionName string
     * * @param productGroupId number
     * @param productGroupName string
     */
    constructor(itemTypeId:number,itemType:string,productGroupId:number,productGroupName:string,divisionId : number,divisionName : string){
        this.itemTypeId = itemTypeId;
        this.itemType = itemType;
        this.productGroupId=productGroupId;
        this.productGroupName=productGroupName;
        this.divisionId=divisionId;
        this.divisionName=divisionName;
      
    }
}