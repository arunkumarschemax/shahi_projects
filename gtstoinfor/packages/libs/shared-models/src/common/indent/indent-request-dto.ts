export class IndentRequestDto {
    requestNo?: string;
    confirmStartDate?:string;
     confirmEndDate?:string;
     extRefNo?:string;

    constructor(requestNo?: string,    
        confirmStartDate?:string,confirmEndDate?:string,extRefNo?:string) {
        this.requestNo= requestNo;
        this.confirmStartDate = confirmStartDate 
        this.confirmEndDate  = confirmEndDate
        this.extRefNo=extRefNo

    }

}