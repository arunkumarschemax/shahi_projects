export class PpmDateFilterRequest {
    lastModifedStartDate?: any;
    lastModifedEndtDate?: any;
    documentStartDate?:any;
    documentEndtDate?:any;
    
    constructor(lastModifedStartDate?: any,lastModifedEndtDate?: any,documentStartDate?:any,documentEndtDate?:any){
            this.lastModifedStartDate = lastModifedStartDate
            this.lastModifedEndtDate = lastModifedEndtDate
            this.documentStartDate = documentStartDate
            this.documentEndtDate= documentEndtDate

    }
}