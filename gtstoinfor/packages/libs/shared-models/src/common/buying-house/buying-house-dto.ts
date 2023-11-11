export class BuyingHouseDto {
    buyingHouseId: number;
    buyingHouse: string;
    contactPerson: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    countryId: number;
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
    countryId: 0,
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};

