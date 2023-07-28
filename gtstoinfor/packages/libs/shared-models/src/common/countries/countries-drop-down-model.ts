export class CountriesDropDownData{
    countryId:number;
    countryName:string;
    
    /**
     * 
     * @param countryId 
     * @param countryName 
     * 
     */
    constructor(countryId:number,countryName:string){
      this.countryId = countryId;
      this.countryName = countryName;
    }
}