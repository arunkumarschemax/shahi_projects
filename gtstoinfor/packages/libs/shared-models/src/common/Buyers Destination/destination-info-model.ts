export class DestinationInfoModel{
    destinationId: number;
    destination?: string;
    

    constructor(destinationId: number,destination?: string){
        this.destinationId = destinationId;
        this.destination = destination;
    }

}