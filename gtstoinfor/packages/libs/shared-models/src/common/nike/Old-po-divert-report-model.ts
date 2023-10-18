
export class OldDivertModel {
    
    oItem: string;
    oPlant: string;
    oProductCode: string;
    oFactory: string;
    oLineItemStatus: string;
    oDocumentDate: string;
    oPurchaseOrderNumber: string;
    oPoLineItemNumber: number;
    oTotalItemQty: string;
    oShipmentType:string;
    oOGAC: string;
    oGAC: string;
    oInventorySegmentCode: string;
    oItemVasText: string;
    factory?:string;
  
    constructor(
        oItem: string,
        oPlant: string,
        oProductCode: string,
        oFactory: string,
        oLineItemStatus: string,
        oDocumentDate: string,
        oPurchaseOrderNumber: string,
        oPoLineItemNumber: number,
        oTotalItemQty: string,
        oShipmentType:string,
        oOGAC: string,
        oGAC: string,
        oInventorySegmentCode: string,
        oItemVasText: string,factory?:string ) {

        this.oItem = oItem
        this.oPlant = oPlant
        this.oProductCode = oProductCode
        this.oFactory=oFactory
        this.oLineItemStatus = oLineItemStatus
        this.oDocumentDate = oDocumentDate
        this.oPurchaseOrderNumber = oPurchaseOrderNumber
        this.oPoLineItemNumber = oPoLineItemNumber
        this.oTotalItemQty = oTotalItemQty
       this.oShipmentType = oShipmentType
        this.oOGAC = oOGAC
        this.oGAC = oGAC
        this.oInventorySegmentCode = oInventorySegmentCode
        this.oItemVasText = oItemVasText
        this.factory = factory
        
    };
}