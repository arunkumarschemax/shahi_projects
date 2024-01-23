
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
    oShipmentType: string;
    oOGAC: string;
    oGAC: string;
    oInventorySegmentCode: string;
    oItemVasText: string;
    oItemText: string;
    oldVal: string;
    factory?: string;
    oFOBPrice?: string;
    otradingCoNetIncDis?: string;
    orequestDate?: string;


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
        oShipmentType: string,
        oOGAC: string,
        oGAC: string,
        oInventorySegmentCode: string,
        oItemVasText: string, oItemText: string, oldVal: string, factory?: string, oFOBPrice?: string, otradingCoNetIncDis?: string, orequestDate?: string,

    ) {

        this.oItem = oItem
        this.oPlant = oPlant
        this.oProductCode = oProductCode
        this.oFactory = oFactory
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
        this.oItemText = oItemText
        this.factory = factory
        this.oFOBPrice = oFOBPrice
        this.otradingCoNetIncDis = otradingCoNetIncDis
        this.oldVal = oldVal
        this.orequestDate = orequestDate
    };
}