export class SizeInfo {
    // sizeId : number
    colorId : number
    sizeInfo:sizeInfo[]
    // quantity : number

    constructor(
        // sizeId:number,
         colorId:number,
         sizeInfo:sizeInfo[]

        //   quantity:number
         ){

        // this.sizeId = sizeId
        this.colorId = colorId
        this.sizeInfo=sizeInfo
        // this.quantity = quantity
    }
}
    export class sizeInfo{
        sizeId : number
        quantity : number
    constructor(
        sizeId : number,
        quantity : number
    ){
        this.sizeId=sizeId
        this.quantity=quantity
    }

    }