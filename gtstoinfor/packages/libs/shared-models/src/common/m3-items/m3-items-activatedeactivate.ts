export class M3ItemsActiveDeactive {
    m3ItemsId:number;
    isActive?: boolean;
    updatedUser?: string;

    constructor(m3ItemsId:number, isActive?: boolean, updatedUser?: string) {
        this.m3ItemsId = m3ItemsId;
        this.isActive = isActive;
        this.updatedUser = updatedUser;
    }

}