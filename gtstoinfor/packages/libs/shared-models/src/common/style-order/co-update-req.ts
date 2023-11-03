
export class CoUpdateReq{
     
    coId: number;
    coLineId : number;
    coNumber:string;
    oldValue:string;
    updateValue:string;
    parameter:string
    createdUser:string
    updatedUser?:string


    constructor(
        coId: number,
    coLineId : number,
    coNumber:string,
    oldValue:string,
    updateValue:string,
    parameter:string,
    createdUser:string,
    updatedUser?:string)
    {
    this.coId = coId
    this.coLineId = coLineId
    this.coNumber = coNumber
    this.oldValue = oldValue
    this.updateValue = updateValue
    this.parameter = parameter
    this.createdUser = createdUser
    this.updatedUser = updatedUser
    }
}