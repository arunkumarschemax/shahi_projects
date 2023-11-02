
export class CoUpdateReq{
     
    coId: number;
    coLineId : number;
    coNumber:string;
    oldValue:string;
    updateValue:string;
    parameter:string
    createUser:string
    updateUser?:string


    constructor(
        coId: number,
    coLineId : number,
    coNumber:string,
    oldValue:string,
    updateValue:string,
    parameter:string,
    createUser:string,
    updateUser?:string)
    {
    this.coId = coId
    this.coLineId = coLineId
    this.coNumber = coNumber
    this.oldValue = oldValue
    this.updateValue = updateValue
    this.parameter = parameter
    this.createUser = createUser
    this.updateUser = updateUser
    }
}