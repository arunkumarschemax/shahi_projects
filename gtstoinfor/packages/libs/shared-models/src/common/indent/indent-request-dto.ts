export class IndentRequestDto {
    requestNo?: string;
    confirmStartDate?:string;
     confirmEndDate?:string;
     extRefNo?:string;
    tab?:string
    constructor(requestNo?: string,    
        confirmStartDate?:string,confirmEndDate?:string,extRefNo?:string,tab?:string) {
        this.requestNo= requestNo;
        this.confirmStartDate = confirmStartDate 
        this.confirmEndDate  = confirmEndDate
        this.extRefNo=extRefNo
        this.tab = tab

    }

}