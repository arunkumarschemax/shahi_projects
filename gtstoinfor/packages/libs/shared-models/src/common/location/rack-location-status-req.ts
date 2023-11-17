export class RackLocationStatusReq {
    locationStatusValue: string;
    locationId: number;
    isActive: number;
    constructor(locationStatusValue: string, locationId: number, isActive: number) {
        this.locationStatusValue = locationStatusValue;
        this.locationId = locationId;
        this.isActive = isActive;
    }
}