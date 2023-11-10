export class RacActiveDeactive {
    rackId:number;
    isActive?: boolean;
    updatedUser?: string;

    constructor(rackId:number, isActive?: boolean, updatedUser?: string) {
        this.rackId = rackId;
        this.isActive = isActive;
        this.updatedUser = updatedUser;
    }

}