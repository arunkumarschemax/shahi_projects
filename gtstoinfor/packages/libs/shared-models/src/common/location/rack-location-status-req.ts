export class RackLocationStatusReq {
    locationId: number;
    isActive: number;
    constructor(locationId: number, isActive: number) {
        this.locationId = locationId;
        this.isActive = isActive;
    }
}