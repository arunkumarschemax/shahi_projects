import { PalletBinStatusEnum } from "../../enum/pallet-bin-status.enum";

export class RollInfoModel {
  id: number;
  rollNumber: number;
  barcode: string;
  quantity: number;
  m3ItemName: string;
  itemType: string;
  grn: string
  constructor(
    id: number,
  rollNumber: number,
  barcode: string,
  quantity: number,
  m3ItemName: string,
  itemType: string,
  grn: string
  ) {
    this.id = id;
    this.rollNumber = rollNumber;
    this.barcode = barcode;
    this.quantity = quantity;
    this.m3ItemName = m3ItemName;
    this.itemType = itemType;
    this.grn = grn;
  }
}
