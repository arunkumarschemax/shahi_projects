export class QualitysActiveDeactive {
    qualityId:number;
    isActive?: boolean;
    updatedUser?: string;

    constructor(qualityId:number, isActive?: boolean, updatedUser?: string) {
        this.qualityId = qualityId;
        this.isActive = isActive;
        this.updatedUser = updatedUser;
    }

}