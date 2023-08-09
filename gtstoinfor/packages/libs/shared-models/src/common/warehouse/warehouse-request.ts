export class WarehouseDto{
    warehouseId:number;
    warehouseName:string;
    warehouseCode:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

    /**
     * 
     * @param warehouseId This is a number
     * @param warehouseName This is a string
     * @param warehouseCode This is a string
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(warehouseId:number,warehouseName:string,warehouseCode:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.warehouseId = warehouseId;
        this.warehouseName = warehouseName;
        this.warehouseCode = warehouseCode
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.isActive = isActive;
    }
}