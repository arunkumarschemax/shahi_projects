export class AddressModel{
    addressId: number;
    country:string;
    deliveryAddress: number;
    buyerAddress: number;

    constructor(addressId: number,country:string,deliveryAddress: number,buyerAddress: number){
        this.addressId = addressId
        this.country = country
        this.deliveryAddress = deliveryAddress
        this.buyerAddress = buyerAddress
    }
}