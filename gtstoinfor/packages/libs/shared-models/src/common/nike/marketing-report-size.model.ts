export class MarketingReportSizeModel {
    sizeDescription: string;
    sizeQty: number;
    grossFobPrice: number;
    grossFobCurrencyCode: string;
    buyerGrossFobPrice: number;
    buyerGrossFobCurrencyCode: string;
    netIncludingDisc: number;
    netIncludingDiscCurrencyCode: string;
    trConetIncludingDisc: number;
    trConetIncludingDiscCurrencyCode: string;
    legalPoPrice: number;
    legalPoCurrencyCode: string;
    coPrice: number;
    coPriceCurrencyCode: string;
    CRMCoQty: number;
    legalPoQty: number;
    actualShippedQty: number;

    constructor(sizeDescription: string, sizeQty: number, grossFobPrice: number, grossFobCurrencyCode: string, buyerGrossFobPrice: number, buyerGrossFobCurrencyCode: string, netIncludingDisc: number, netIncludingDiscCurrencyCode: string, trConetIncludingDisc: number, trConetIncludingDiscCurrencyCode: string, legalPoPrice: number, legalPoCurrencyCode: string, coPrice: number, coPriceCurrencyCode: string, CRMCoQty: number, legalPoQty: number, actualShippedQty: number,
    ) {
        this.sizeQty = sizeQty
        this.sizeDescription = sizeDescription
        this.grossFobPrice = grossFobPrice
        this.grossFobCurrencyCode = grossFobCurrencyCode
        this.buyerGrossFobPrice = buyerGrossFobPrice
        this.buyerGrossFobCurrencyCode = buyerGrossFobCurrencyCode
        this.netIncludingDisc = netIncludingDisc
        this.netIncludingDiscCurrencyCode = netIncludingDiscCurrencyCode
        this.trConetIncludingDisc = trConetIncludingDisc
        this.trConetIncludingDiscCurrencyCode = trConetIncludingDiscCurrencyCode
        this.legalPoPrice = legalPoPrice
        this.legalPoCurrencyCode = legalPoCurrencyCode
        this.coPrice = coPrice
        this.coPriceCurrencyCode = coPriceCurrencyCode
        this.CRMCoQty = CRMCoQty
        this.legalPoQty = legalPoQty
        this.actualShippedQty = actualShippedQty
    };
}