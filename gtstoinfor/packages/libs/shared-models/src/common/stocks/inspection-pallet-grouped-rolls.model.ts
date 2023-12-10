import { RollInfoModel } from "./roll-info.model";

export class InspectionPalletGroupedRollsModel {
    groupedBy: string;
    groupedObjDesc: string;
    groupedObjNumber: string;
    rollsInfo: RollInfoModel[];

    constructor( groupedBy: string, groupedObjDesc: string, groupedObjNumber: string, rollsInfo: RollInfoModel[]) {
        this.groupedBy = groupedBy;
        this.groupedObjDesc = groupedObjDesc;
        this.groupedObjNumber = groupedObjNumber;
        this.rollsInfo = rollsInfo;
    }
}

