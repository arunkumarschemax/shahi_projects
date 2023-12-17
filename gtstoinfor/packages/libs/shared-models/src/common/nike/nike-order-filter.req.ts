export class nikeFilterRequest {

    documentStartDate?: string;
    documentEndDate?: string;
    productCode?: string;
    poandLine?: string;
    colorDesc?: string;
    categoryDesc?: string;
    destinationCountry?: string;
    plant?: string;
    item?: string;
    factory?: string;
    DPOMLineItemStatus?: string;

    constructor(
        documentStartDate?: string,
        documentEndDate?: string, productCode?: string, poandLine?: string,
        colorDesc?: string, categoryDesc?: string, destinationCountry?: string,
        plant?: string, item?: string, factory?: string, DPOMLineItemStatus?: string
    ) {

        this.documentStartDate = documentStartDate;
        this.documentEndDate = documentEndDate;
        this.productCode = productCode;
        this.poandLine = poandLine;
        this.colorDesc = colorDesc;
        this.categoryDesc = categoryDesc;
        this.destinationCountry = destinationCountry;
        this.plant = plant;
        this.item = item;
        this.factory = factory;
        this.DPOMLineItemStatus = DPOMLineItemStatus;
    }
}
