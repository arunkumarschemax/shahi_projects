export class AddressReq{
    country:string;
    deliveryAddress: number;
    buyerAddress: number;
    createdUser: string;

    constructor(country:string,deliveryAddress: number,buyerAddress: number,createdUser: string){
        this.country = country
        this.deliveryAddress = deliveryAddress
        this.buyerAddress = buyerAddress
        this.createdUser = createdUser
    }
}