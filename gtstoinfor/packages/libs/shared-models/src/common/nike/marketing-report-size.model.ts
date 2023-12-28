export class MarketingReportSizeModel {
    sizeDescription: string;
    sizeQty: number;
    grossFobPrice: number;
    grossFobCurrencyCode: string;
    buyerGrossFobPrice: number;
    buyerGrossFobCurrencyCode: string;
    fobPriceDiff: number;
    fobCurrencyDiff: string;
    netIncludingDisc: string;
    netIncludingDiscCurrencyCode: string;
    trConetIncludingDisc: number;
    trConetIncludingDiscCurrencyCode: string;
    legalPoPrice: number;
    legalPoCurrencyCode: string;
    coPrice: number;
    coPriceCurrencyCode: string;
    diffOfLegalPOCOPrice: number;
    diffOfLegalPOCOCurrency: string;
    CRMCoQty: number;
    legalPoQty: number;
    diffOfQty: number;
    allowedExcessShipQty: number;
    actualShippedQty: number;
    actualShipPer: string;

    constructor(sizeDescription: string, sizeQty: number, grossFobPrice: number, grossFobCurrencyCode: string, buyerGrossFobPrice: number, buyerGrossFobCurrencyCode: string, fobPriceDiff: number, fobCurrencyDiff: string, netIncludingDisc: string, netIncludingDiscCurrencyCode: string, trConetIncludingDisc: number, trConetIncludingDiscCurrencyCode: string, legalPoPrice: number, legalPoCurrencyCode: string, coPrice: number, coPriceCurrencyCode: string, diffOfLegalPOCOPrice: number,
        diffOfLegalPOCOCurrency: string, CRMCoQty: number, legalPoQty: number, diffOfQty: number, allowedExcessShipQty: number, actualShippedQty: number, actualShipPer: string
    ) {
        this.sizeQty = sizeQty
        this.sizeDescription = sizeDescription
        this.grossFobPrice = grossFobPrice
        this.grossFobCurrencyCode = grossFobCurrencyCode
        this.buyerGrossFobPrice = buyerGrossFobPrice
        this.buyerGrossFobCurrencyCode = buyerGrossFobCurrencyCode
        this.fobPriceDiff = fobPriceDiff
        this.fobCurrencyDiff = fobCurrencyDiff
        this.netIncludingDisc = netIncludingDisc
        this.netIncludingDiscCurrencyCode = netIncludingDiscCurrencyCode
        this.trConetIncludingDisc = trConetIncludingDisc
        this.trConetIncludingDiscCurrencyCode = trConetIncludingDiscCurrencyCode
        this.legalPoPrice = legalPoPrice
        this.legalPoCurrencyCode = legalPoCurrencyCode
        this.coPrice = coPrice
        this.coPriceCurrencyCode = coPriceCurrencyCode
        this.diffOfLegalPOCOPrice = diffOfLegalPOCOPrice
        this.diffOfLegalPOCOCurrency = diffOfLegalPOCOCurrency
        this.CRMCoQty = CRMCoQty
        this.legalPoQty = legalPoQty
        this.diffOfQty = diffOfQty
        this.allowedExcessShipQty = allowedExcessShipQty
        this.actualShippedQty = actualShippedQty
        this.actualShipPer = actualShipPer
    };
}