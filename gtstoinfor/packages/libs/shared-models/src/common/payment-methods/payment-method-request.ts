export class PayementMethodRequestDto{

    paymentMethodId:number;
    updatedUser:string;
    paymentMethod:string;
    isActive:boolean;
    versionFlag:number;



   /**
     * 
     * @param paymentMethodId This is a number
     * @param paymentMethod This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

   constructor(paymentMethodId:number,updatedUser:string, paymentMethod:string, isActive:boolean,versionFlag:number){
   this.paymentMethodId =paymentMethodId;
   this.updatedUser=updatedUser;
   this.paymentMethod=paymentMethod;
   this.isActive=isActive;
   this.versionFlag=versionFlag
   }
}