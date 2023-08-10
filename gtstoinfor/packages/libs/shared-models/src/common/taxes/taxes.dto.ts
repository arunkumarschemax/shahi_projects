import { TaxCategoriesEnum } from "../../enum/taxes-category-enum";

export class TaxesDto {
    taxId?: number;
    taxName: string;
    taxPercentage: number;
    isActive: boolean;
    createdUser : string;
    updatedUser ?: string;

    taxCategory?:TaxCategoriesEnum;
    /**
     * 
     * @param taxId number
     * @param taxName string
     * @param taxPercentage number
     * @param isActive boolean
     * @param createdUser string
     * @param updatedUser string
     * 
     * @param taxCategory TaxCategoriesEnum
     */
    constructor(taxId: number,taxName: string,taxPercentage: number,isActive: boolean,createdUser : string,updatedUser:string,taxCategory?:TaxCategoriesEnum){ 
            this.taxId = taxId;
            this.taxName = taxName
            this.taxPercentage=taxPercentage;
            this.isActive=isActive;
            this.createdUser= createdUser;
            this.updatedUser= updatedUser;

            this.taxCategory=taxCategory;
        }
    }

export const TaxesDtoDefault : TaxesDto = {
     taxId: 0,
    taxName: "",
    taxPercentage: 0,
    isActive: true,
    createdUser : '',
    updatedUser : '',

    
};

