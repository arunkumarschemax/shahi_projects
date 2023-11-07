export class SizeInfo {
    // sizeId : number
    colour : number
    sizeInfo:sizeInfo[]
    // quantity : number

    constructor(
        // sizeId:number,
         colour:number,
         sizeInfo:sizeInfo[]

        //   quantity:number
         ){

        // this.sizeId = sizeId
        this.colour = colour
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