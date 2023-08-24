export class FabricTypeDropDownDto{
    fabricTypeId : number;
    fabricType: string;
    
    /**
     * 
     * @param fabricTypeId number
     * @param fabricType string
     */
    constructor(fabricTypeId  : number,fabricType : string,saleOrderId?:number){
        this.fabricTypeId = fabricTypeId;
        this.fabricType = fabricType;
        
    }
}