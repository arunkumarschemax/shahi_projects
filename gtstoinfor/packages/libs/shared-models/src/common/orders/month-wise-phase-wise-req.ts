
export class itemData{
    monthName:string
    inPcs:number
    coeffPcs:number
    constructor(
        monthName:string,
        inPcs:number,
        coeffPcs:number
    ){
        this.monthName=monthName
        this.inPcs=inPcs
        this.coeffPcs=coeffPcs
    }
}

export class PhaseWiseReq{
    phase:string
    itemData:itemData[]
    constructor(
        phase:string,
    itemData:itemData[]
    ){
        this.phase=phase
        this.itemData=itemData
    }
}