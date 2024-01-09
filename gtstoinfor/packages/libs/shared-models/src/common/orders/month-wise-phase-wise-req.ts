
export class itemData{
    monthName:string
    inPcs:any
    coeffPcs:any
    // inPcsTotal?:number
    // inCoeffTotal?:number
    constructor(
        monthName:string,
        inPcs:any,
        coeffPcs:any,
        // inPcsTotal?:number,
        // inCoeffTotal?:number
    ){
        this.monthName=monthName
        this.inPcs=inPcs
        this.coeffPcs=coeffPcs
        // this.inCoeffTotal=inCoeffTotal
        // this.inPcsTotal=inPcsTotal
    }
}

export class PhaseWiseReq{
    phase:string
    itemData:itemData[]
    inPcsTotal?:any
    inCoeffTotal?:any
    constructor(
        phase:string,
        itemData:itemData[],
        inPcsTotal?:any,
        inCoeffTotal?:any
    ){
        this.phase=phase
        this.itemData=itemData
        this.inCoeffTotal=inCoeffTotal
        this.inPcsTotal=inPcsTotal
    }
}