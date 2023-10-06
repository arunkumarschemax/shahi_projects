export class DestinationInfoReq{
    destinationId: number;
    destination:string;

    constructor(destinationId: number,destination:string){
        this.destinationId = destinationId;
        this.destination = destination;
    }
}