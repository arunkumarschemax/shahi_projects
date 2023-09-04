
export class FactoryUpdateRequest {
    poAndLine?: string;
    actualUnit?:string;
    allocatedQuantity?:string;
    constructor(poAndLine?: string,actualUnit?:string,allocatedQuantity?:string) {
        this.poAndLine = poAndLine;
        this.actualUnit = actualUnit;
        this.allocatedQuantity = allocatedQuantity
    }
}