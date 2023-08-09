
export class TaxDto {
    taxId?: number;
    taxName: string;
    taxPercentage: number;
    isActive: boolean;
    createdAt : Date | any;
    createdUser : string;
    updatedAt : Date | any;
    updatedUser : string;
    versionFlag : number;
}

export const TaxDtoDefault : TaxDto = {
    taxId: 0,
    taxName: "",
    taxPercentage: 0,
    isActive: true,
    createdAt : new Date() ,
    createdUser : '',
    updatedAt : new Date() ,
    updatedUser : '',
    versionFlag : 1
};

