export class TaxDropDownDto {
    taxId: number;
    taxName: string;
    taxPercentage?: number;
    taxCategory?: string;

    /**
     * 
     * @param taxId 
     * @param taxName 
     * @param taxPercentage 
     * @param taxCategory 
     */
    constructor(taxId: number, taxName: string, taxPercentage?: number,taxCategory?:string){
        this.taxId = taxId;
        this.taxName = taxName;
        this.taxPercentage = taxPercentage;
        this.taxCategory = taxCategory;
    }
}