export  class SeasonWiseQtyModel{
    plannedSeason: string
    itemCode: string
    itemName: string
    whDate: Date
    whMonth : number
    exfDate: Date
    exfMonth : number
    orderQty: number
    year : number

    constructor(
        plannedSeason: string,
        itemCode: string,
        itemName: string,
        whDate: Date,
        whMonth : number,
        exfDate: Date,
        exfMonth : number,
        orderQty: number ,
        year : number
    ){
        this.plannedSeason = plannedSeason
        this.itemCode = itemCode
        this.itemName = itemName
        this.whDate = whDate
        this.whMonth = whMonth
        this.exfDate = exfDate
        this.exfMonth = exfMonth
        this.orderQty = orderQty
        this.year = year
    }
}