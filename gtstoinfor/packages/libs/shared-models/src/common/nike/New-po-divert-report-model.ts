
export class NewDivertModel {

    nItem: string;
    nPlant: string;
    nProductCode: string;
    nFactory: string;
    nLineItemStatus: string;
    nDocumentDate: string;
    nPurchaseOrderNumber: string;
    nPoLineItemNumber: number;
    nTotalItemQty: string;
    nShipmentType: string;
    nOGAC: string;
    nGAC: string;
    nInventorySegmentCode: string;
    nItemVasText: string;
    nFOBPrice?: string;
    ntradingCoNetIncDis?: string;
    orequestDate?: string;
    // nNetIncDis?:string;


    constructor(
        nItem: string,
        nPlant: string,
        nProductCode: string,
        nFactory: string,
        nLineItemStatus: string,
        nDocumentDate: string,
        nPurchaseOrderNumber: string,
        nPoLineItemNumber: number,
        nTotalItemQty: string,
        nShipmentType: string,
        nOGAC: string,
        nGAC: string,
        nInventorySegmentCode: string,
        nItemVasText: string, nFOBPrice?: string, ntradingCoNetIncDis?: string, orequestDate?: string,) {

        this.nItem = nItem
        this.nPlant = nPlant
        this.nProductCode = nProductCode
        this.nFactory = nFactory
        this.nLineItemStatus = nLineItemStatus
        this.nDocumentDate = nDocumentDate
        this.nPurchaseOrderNumber = nPurchaseOrderNumber
        this.nPoLineItemNumber = nPoLineItemNumber
        this.nTotalItemQty = nTotalItemQty
        this.nShipmentType = nShipmentType
        this.nOGAC = nOGAC
        this.nGAC = nGAC
        this.nInventorySegmentCode = nInventorySegmentCode
        this.nItemVasText = nItemVasText
        this.nFOBPrice = nFOBPrice;
        this.ntradingCoNetIncDis = ntradingCoNetIncDis;
        this.orequestDate = orequestDate
        // this.nNetIncDis = nNetIncDis;
    };
}