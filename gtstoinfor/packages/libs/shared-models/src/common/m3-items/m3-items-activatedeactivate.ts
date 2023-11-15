export class M3ItemsActiveDeactive {
    itemCode:number;
    isActive?: boolean;
    updatedUser?: string;

    constructor(itemCode:number, isActive?: boolean, updatedUser?: string) {
        this.itemCode = itemCode;
        this.isActive = isActive;
        this.updatedUser = updatedUser;
    }

}