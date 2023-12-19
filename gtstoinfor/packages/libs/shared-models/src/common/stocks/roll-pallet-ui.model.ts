import { RollInfoUIModel } from "./roll-info-ui.model";

export class PalletRollsUIModel {
    phId: number;
    palletId: number;
    palletCode: string;
    palletCapacity: number;
    pgName: string;
    noOfRolls: number;
    rollsInfo: RollInfoUIModel[];
}
