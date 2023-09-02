export class PpmDateFilterRequest {
    lastModifedStartDate?: any;
    lastModifedEndtDate?: any;
    documentStartDate?:any;
    documentEndtDate?:any;
    productCode?:any;
    poandLine?:any;
    colorDescription?:any;
    categoryDescription?:any;
    destinationCountry?:any;
    palntcode?:any;
    item?:any;
    factory?:any;
    
    constructor(lastModifedStartDate?: any,lastModifedEndtDate?: any,documentStartDate?:any,documentEndtDate?:any, productCode?:any,
        poandLine?:any,
        colorDescription?:any,
        categoryDescription?:any,
        destinationCountry?:any,
        palntcode?:any,
        item?:any,
        factory?:any){
            this.lastModifedStartDate = lastModifedStartDate
            this.lastModifedEndtDate = lastModifedEndtDate
            this.documentStartDate = documentStartDate
            this.documentEndtDate= documentEndtDate
            this.productCode= productCode
            this.poandLine= poandLine
            this.colorDescription= colorDescription
            this.categoryDescription= categoryDescription
            this.destinationCountry= destinationCountry
            this.palntcode= palntcode
            this.item= item
            this.factory= factory

    }
}