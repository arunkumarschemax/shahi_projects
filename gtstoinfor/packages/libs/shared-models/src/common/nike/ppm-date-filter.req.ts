export class PpmDateFilterRequest {
    lastModifedStartDate?: any;
    lastModifedEndtDate?: any;
    documentStartDate?:any;
    documentEndtDate?:any;
    productCode?:string;
    poandLine?:string;
    colorDesc?:string;
    categoryDesc?:string;
    destinationCountry?:string;
    plant?:string;
    item?:string;
    factory?:string;
    
    constructor(lastModifedStartDate?: any,lastModifedEndtDate?: any,documentStartDate?:any,documentEndtDate?:any, productCode?:string,
        poandLine?:string,
        colorDesc?:string,
        categoryDesc?:string,
        destinationCountry?:string,
        plant?:string,
        item?:string,
        factory?:string){
            this.lastModifedStartDate = lastModifedStartDate
            this.lastModifedEndtDate = lastModifedEndtDate
            this.documentStartDate = documentStartDate
            this.documentEndtDate= documentEndtDate
            this.productCode= productCode
            this.poandLine= poandLine
            this.colorDesc= colorDesc
            this.categoryDesc= categoryDesc
            this.destinationCountry= destinationCountry
            this.plant= plant
            this.item= item
            this.factory= factory

    }
}