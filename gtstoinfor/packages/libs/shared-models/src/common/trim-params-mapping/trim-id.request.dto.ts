export class TrimIdRequestDto{
    trimId:number;
    trimMapId?:number
    constructor( 
        trimId:number,
        trimMapId?: number
        ){
            this.trimId = trimId;
            this.trimMapId = trimMapId
    }
}