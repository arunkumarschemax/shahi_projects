export class SettingsIdReq{
    settingsId?:number;
    externalRefNumber?: string;

    constructor(settingsId?: number,externalRefNumber?: string){
        this.settingsId = settingsId
        this.externalRefNumber = externalRefNumber

    }
}