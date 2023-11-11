export class M3StyleActiveDeactive {
    m3StyleId:number;
    isActive?: boolean;
    updatedUser?: string;

    constructor(m3StyleId:number, isActive?: boolean, updatedUser?: string) {
        this.m3StyleId = m3StyleId;
        this.isActive = isActive;
        this.updatedUser = updatedUser;
    }

}