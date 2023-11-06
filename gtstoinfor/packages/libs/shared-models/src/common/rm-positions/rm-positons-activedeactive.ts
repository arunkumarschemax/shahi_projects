export class RPositionActivateDeactivateDto {
    positionId: number
    isActive?: boolean
    updatedUser?: string;

    constructor(positionId: number, isActive?: boolean, updatedUser?: string) {
        this.positionId = positionId;
        this.isActive = isActive;
        this.updatedUser = updatedUser;
    }

}