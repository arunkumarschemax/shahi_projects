export class FobFilterRequest {
    planningSeasonCode?: string;
    planningSeasonYear?: string;
    styleNumber?: string;
    colorCode?: string;
    sizeDescription?: string;
    shahiConfirmedGrossPrice?: string;
    shahiConfirmedGrossPriceCurrencyCode?: string;





    constructor(
        planningSeasonCode?: string, planningSeasonYear?: string,styleNumber?: string,
        colorCode?: string, sizeDescription?: string, shahiConfirmedGrossPrice?: string,
        shahiConfirmedGrossPriceCurrencyCode?: string, 

    ) {

        this.planningSeasonCode = planningSeasonCode;
        this.planningSeasonYear = planningSeasonYear;
        this.styleNumber = styleNumber;
        this.colorCode = colorCode;
        this.sizeDescription = sizeDescription;
        this.shahiConfirmedGrossPrice = shahiConfirmedGrossPrice;
        this.shahiConfirmedGrossPriceCurrencyCode = shahiConfirmedGrossPriceCurrencyCode;



    }
}
