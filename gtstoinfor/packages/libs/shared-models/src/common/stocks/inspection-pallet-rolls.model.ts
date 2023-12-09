import { CurrentPalletLocationEnum, CurrentPalletStateEnum } from "../../enum";
import { InspectionPalletGroupedRollsModel } from "./inspection-pallet-grouped-rolls.model";
export class InspectionPalletRollsModel   {
    phId: number;
    palletId: number;
    palletCode: string;
    palletCapacity: number;
    uom: string;
    maxItems: number;
    palletCurrentLoc: CurrentPalletLocationEnum;
    palletCureentState: CurrentPalletStateEnum;
    groupedRolls: InspectionPalletGroupedRollsModel[];

    constructor(phId: number, palletId: number,palletCode: string, palletCapacity: number, uom: string, maxItems: number, palletCurrentLoc: CurrentPalletLocationEnum, palletCureentState: CurrentPalletStateEnum,
        groupedRolls: InspectionPalletGroupedRollsModel[]
        ) {
        this.phId = phId;
        this.palletId = palletId;
        this.palletCode = palletCode;
        this.palletCapacity = palletCapacity;
        this.uom = uom;
        this.maxItems = maxItems;
        this.palletCurrentLoc = palletCurrentLoc;
        this.palletCureentState = palletCureentState;
        this.groupedRolls = groupedRolls;
        
    }
}
