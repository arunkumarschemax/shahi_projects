export class DeliveryTermsDto{
    deliveryTermsId : number;
    deliveryTermsName : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    
    /**
     * 
     * @param deliveryTermsId number
     * @param deliveryTermsName string
     * @param isActive boolean
     * @param createdUser string
     * @param updatedUser string
     * 
     */
    constructor(deliveryTermsId : number,deliveryTermsName : string,isActive: boolean,createdUser : string,updatedUser:string,){
        this.deliveryTermsId = deliveryTermsId;
        this.deliveryTermsName = deliveryTermsName;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}
export const DeliveryTermsDtoDefault : DeliveryTermsDto = {
    deliveryTermsId: 0,
    deliveryTermsName: '',
    isActive: true,
    createdUser : '',
    updatedUser : '',



}; 