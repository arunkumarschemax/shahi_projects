export class IndentRequestDto {
    requestNo?: string;
    confirmStartDate?:string;
     confirmEndDate?:string;
     extRefNo?:string;

    constructor(requestNo?: string,    extRefNo?:string,
        confirmStartDate?:string,confirmEndDate?:string) {
        this.requestNo= requestNo;
        this.extRefNo=extRefNo;
        this.confirmStartDate = confirmStartDate 
        this.confirmEndDate  = confirmEndDate
    }

}