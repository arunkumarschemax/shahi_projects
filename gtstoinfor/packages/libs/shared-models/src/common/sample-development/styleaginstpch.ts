
export class StyleAgainstPchDto{
    styleId?:number;
    pchId?:number;

    constructor(styleId?:number,pchId?:number){
        this.pchId=pchId
        this.styleId=styleId
    }
}