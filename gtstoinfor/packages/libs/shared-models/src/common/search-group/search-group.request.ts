export class SearchGrpRequest{
    searchGrpCode: string;
    searchGrpName: string;
    
    constructor(  searchGrpCode: string,
        searchGrpName: string){
        this.searchGrpCode = searchGrpCode;
        this.searchGrpName = searchGrpName
    }
}