import { PaymentTermsCategory } from "@project-management-system/shared-models";


export class PaymentTermsDto{
    paymentTermsId : number;
    paymentTermsCategory:PaymentTermsCategory;
    paymentTermsName : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    
    /**
     * 
     * @param paymentTermsId number
     * @param paymentTermsName string
     * @param isActive boolean
     * @param createdUser string
     * @param updatedUser string
     * 
     */
    constructor(paymentTermsId : number,paymentTermsCategory:PaymentTermsCategory,paymentTermsName : string,isActive: boolean,createdUser : string,updatedUser:string){
        this.paymentTermsId = paymentTermsId;
        this.paymentTermsCategory=paymentTermsCategory;
        this.paymentTermsName = paymentTermsName;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}
// export const PaymentTermsDtoDefault : PaymentTermsDto = {
//     paymentTermsId: 0,
//     PaymentTermsCategory:PaymentTermsCategory.Customer,
//     paymentTermsName: '',
//     isActive: true,
//     createdUser : '',
//     updatedUser : '',



// }; 
