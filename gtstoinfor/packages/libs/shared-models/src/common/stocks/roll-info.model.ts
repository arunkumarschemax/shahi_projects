import { PalletBinStatusEnum } from "../../enum/pallet-bin-status.enum";

export class RollInfoModel {
  id: number;
  rollNumber: number;
  barcode: string;
  quantity: number;
  constructor(
    id: number,
  rollNumber: number,
  barcode: string,
  quantity: number
  ) {
    this.id = id;
    this.rollNumber = rollNumber;
    this.barcode = barcode;
    this.quantity = quantity;
  }
}
