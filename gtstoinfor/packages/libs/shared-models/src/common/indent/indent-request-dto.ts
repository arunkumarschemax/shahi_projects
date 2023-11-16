export class IndentRequestDto {
    requestNo?: string;
    confirmStartDate?:string;
     confirmEndDate?:string;
    constructor(requestNo?: string,confirmStartDate?:string,confirmEndDate?:string) {
        this.requestNo= requestNo;
        this.confirmStartDate = confirmStartDate 
        this.confirmEndDate  = confirmEndDate
    }

}