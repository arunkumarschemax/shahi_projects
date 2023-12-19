

export class RollBasicInfoModel {
    rollId: number;
    barcode: string;
    packListId: number;
    originalQty: number;
    leftOverQuantity: number;
    phLinesId: number; // Batch or lot table id
    batch: string;
    lot: string;
    width: string;
    inspectionPick: boolean;
    issuedQuantity: number;
    inputQuantity: number;

    constructor(rollId: number, inspectionPick: boolean, barcode: string, packListId: number, originalQty: number, leftOverQuantity: number, phLinesId: number, batch: string, lot: string, width: string, issuedQuantity: number, inputQuantity: number) {
        this.rollId = rollId;
        this.barcode = barcode;
        this.packListId = packListId;
        this.originalQty = originalQty;
        this.leftOverQuantity = leftOverQuantity;
        this.phLinesId = phLinesId;
        this.batch = batch;
        this.lot = lot;
        this.width = width;
        this.inspectionPick = inspectionPick;
        this.issuedQuantity = issuedQuantity;
        this.inputQuantity = inputQuantity;
    }
}
