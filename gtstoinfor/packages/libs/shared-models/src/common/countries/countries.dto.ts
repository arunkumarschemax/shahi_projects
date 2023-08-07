export class CountryDto {
    countryId?: number;
    countryName: string;
    createdUser:string;
    updatedUser:string;
    isActive: boolean;
    constructor(countryId:number,countryName:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.countryId = countryId;
        this.countryName = countryName;
        this.createdUser =createdUser;
        this.updatedUser =updatedUser;

        this.isActive = isActive;
    }
}

export const CountryDtoDefault : CountryDto = {
    countryId: 0,
    countryName: "",
    createdUser:"",
    updatedUser:"",
    isActive:true,
};

