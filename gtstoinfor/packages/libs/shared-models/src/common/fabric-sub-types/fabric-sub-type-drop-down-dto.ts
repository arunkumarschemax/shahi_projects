export class FabricSubTypeDropDownDto{
    fabricSubTypeId : number;
    fabricSubType : string;
    // saleOrderId?:number;
    
    /**
     * 
     * @param fabricSubTypeId number
     * @param fabricSubType string
     */
    constructor(fabricSubTypeId  : number,fabricSubType : string,saleOrderId?:number){
        this.fabricSubTypeId = fabricSubTypeId;
        this.fabricSubType = fabricSubType;
        
        // this.saleOrderId = saleOrderId;
    }
}