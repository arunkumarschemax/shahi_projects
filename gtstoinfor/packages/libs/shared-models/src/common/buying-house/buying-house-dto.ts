export class BuyingHouseDto {
    buyingHouseId: number;
    buyingHouse: string;
    contactPerson: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    country: string;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const BuyingHouseDtoDefault : BuyingHouseDto = {
    buyingHouseId: 0,
    buyingHouse: "",
    contactPerson: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};

