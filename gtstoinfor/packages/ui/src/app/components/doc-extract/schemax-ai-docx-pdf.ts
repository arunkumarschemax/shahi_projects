import { flatten } from "@nestjs/common";
import { HsnDto } from "@xpparel/shared-models";
import { match } from "assert";
import { parse } from "path";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
const currency_list = ["AED", "AFA", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BEF", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC", "CVE", "CZK", "DEM", "DJF", "DKK", "DOP", "DZD", "EEK", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GRD", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "ITL", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTC", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZM", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SKK", "SLL", "SOS", "SRD", "SSP", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZWL"];

//CGST\s+(\d+\.\d+)\s*%\s*(\d+\.\d+)//
//SGST\s+(\d+\.\d+)\s*%\s*(\d+\.\d+)//

// /(\w+)\s+(\d+\.+\d+)+\s+%+\s+(\d+\.+\d+)/ for both CGST and SGST mathces regex

//CGST+\s+(\d+\.+\d+)+\s+%+\s+(\d+\.+\d+)// cgst
//SGST+\s+(\d+\.+\d+)+\s+%+\s+(\d+\.+\d+)// sgst

// /\s(\d+\/+\d+\/+\d+)\s+(\d+)\s+(\d+)\s+(\d+\.\d+)\s+(\w+)\s+(\d+\.\d+)\s+(\d+\.\d+)/ unitQuantity

// /(\w+)\s+(\w+)\s+(\w+)\s+(\d+)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+)/invoiceAmount

// const unitQuantityRegex =/\s(\d+\/+\d+\/+\d+)\s+(\d+)\s+(\d+)\s+(\d+\.\d+)\s+(\w+)\s+(\d+\.\d+)\s+(\d+\.\d+)/;


// const taxPercentage = parseFloat(extractedData[hsnId - 5].content);
// let taxType = "No Tax";
// if (taxPercentage === 18) {
//     taxType = "IGST";
// } else if (taxPercentage === 9) {
//     taxType = "CGST & SGST";
// }

export const extractdachser = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    // /(.+)996\d+/
    // /(.+?)\s+([\d.,]+)\s+(.*?)\s+996(\d+)/
    const structuredHSNLines = [];
    let currentHSN = null;
    let currentTax = null;
    const taxRegMatch = /(\w+)\s+(\d{1,3}(?:,\d{3})*\.\d+)\s+(\d{1,3}(?:,\d{3})*\.\d+)\s+(\d+\.\d+)\s+(\d{1,3}(?:,\d{3})*\.\d+)/;
    const taxMatchElement = extractedData.find((item) => item.content.match(taxRegMatch));
    const matchTax = taxMatchElement?.content?.match(taxRegMatch);
    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/(.*?)\s+(\d{1,},?\d{1,}\.\d{2})\s+(.*?)\s+(\w+)\s+([\d+].+)/);

        if (matchData) {
            const description = matchData[1].replace(/\d+/g, "");
            const charge = matchData[2].trim().replace(/,/g, "");
            let HSN = matchData[5];

            const kgIndex = HSN.toLowerCase().indexOf('kg');
            if (kgIndex !== -1) {
                HSN = HSN.substring(kgIndex + 2).trim();
            }

            currentHSN = {
                description: description,
                HSN: HSN,
                charge: charge,
            };

            if (matchTax) {
                const taxPercentage = parseFloat(matchTax[4]);
                const chargeValue = currentHSN.charge.replace(/,/g, "");
                const taxAmount = Number(chargeValue) * (taxPercentage / 100);

                let taxType, igst, cgst, sgst;

                if (taxPercentage === 9) {
                    taxType = 'CGST & SGST';
                    igst = 0;
                    cgst = taxAmount;
                    sgst = taxAmount;
                } else if (taxPercentage === 18) {
                    taxType = 'IGST';
                    igst = taxAmount;
                    cgst = 0;
                    sgst = 0;
                } else {
                    taxType = 'No Tax';
                    igst = 0;
                    cgst = 0;
                    sgst = 0;
                }

                currentTax = {
                    taxPercentage: taxPercentage,
                    taxAmount: taxAmount,
                    taxType: taxType,
                    igst: igst,
                    cgst: cgst,
                    sgst: sgst
                };
            }

            if (currentHSN && currentTax) {
                structuredHSNLines.push({
                    ...currentHSN,
                    ...currentTax
                });
                currentHSN = null;
                currentTax = null;
            }
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
    const invoiceNumberRegex = /BLR-[A-Z0-9]{8}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = ' DACHSER INDIA PVT. LTD';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.match(invoiceDateRegex) : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.trim() : "";

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + charge + taxAmount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage == 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage == 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(allLines, null, 2))
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }

}

export const extractnewBlobe = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let currentTax = null;
    let previousHsnIndex = 0;
    let dataIndex = 0;
    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        // /(INR|USD)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+\.\d+)\s+(\w)/

        // if (line.match(/\d+.\d+.\d+\s+\d+.\d+.\d+/)) {

        //     const taxMatch = line.match(/\d+.\d+.\d+\s+\d+.\d+.\d+/) || [];
        //     const allTax = taxMatch[0].trim();
        //     const match = allTax.match(/^(\d+\.\d+)\s+(\d+\.\d+)/);

        //     if (match) {
        //         const unitPrice = parseFloat(match[1]).toFixed(2);
        //         const unitQuantity = parseFloat(match[2]);

        //         currentTax = {
        //             allTax: allTax,
        //             unitPrice: unitPrice,
        //             unitQuantity: unitQuantity,
        //         };


        //         if (currentHSN && currentTax) {
        //             const combinedData = {
        //                 ...currentHSN,
        //                 ...currentTax,
        //             };
        //             structuredHSNLines.push(combinedData);
        //             currentHSN = null;
        //             currentTax = null;
        //         }
        //     }
        // }
        const matchData = line.match(/(996\d+)\s+(.+)/);

        // /\s+\d+(,|.)+(\s)+(\d)+(,|.)+\d/
        if (matchData) {
            const currentHsnIndex = Number(dataIndex);
            let taxMatchIndex;
            const taxMatchData = extractedData.find((item, index) => {
                if ((index >= Number(previousHsnIndex) && index <= currentHsnIndex) && item.content.match(/^\s\d+.\d+.\d+\s+\d+.\d+.\d+/)) {
                    taxMatchIndex = index;
                    return true;
                } else {
                    return false;
                }
            });
            const descriptionArray = extractedData.filter((item, index) => (index > Number(taxMatchIndex) && index < currentHsnIndex));
            const taxMatch = taxMatchData?.content?.match(/\d+.\d+.\d+\s+\d+.\d+.\d+/);
            if (taxMatch) {
                const unitPriceMatchData = extractedData.find((item, index) => (index >= Number(currentHsnIndex)) && item.content.match(/(INR|USD)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+\.\d+)\s+(\w)/));
                const allTax = taxMatch[0].trim();
                const taxValues = allTax.split(' ');
                const taxAmount = parseFloat(taxValues[0].replace(/,/g, "")).toFixed(2);
                const charge = parseFloat(taxValues[1].replace(/,/g, ""));

                if (unitPriceMatchData) {
                    const unitPriceData = unitPriceMatchData.content.match(/(INR|USD)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+\.\d+)\s+(\w)/);
                    if (unitPriceData) {
                        const unitPrice = parseFloat(unitPriceData[2]).toFixed(3);
                        const unitQuantity = parseFloat(unitPriceData[3].replace(/,/g, "")).toFixed(3);

                        currentTax = {
                            allTax: allTax,
                            description: descriptionArray.map(rec => rec.content).join(),
                            taxAmount: taxAmount,
                            charge: charge,
                            unitPrice: unitPrice,
                            unitQuantity: unitQuantity,
                        };
                    }
                }
            }

            const HSN = matchData[1];
            const nextData = matchData[2];
            const parts = nextData.split(/\s+/);

            if (parts.length >= 2) {
                const taxPercentage = parseFloat(parts[0]);
                const amount = parseFloat(parts[1].replace(/,/g, ""));

                let taxType;
                if (taxPercentage == 9) {
                    taxType = 'CGST & SGST';
                } else if (taxPercentage == 18) {
                    taxType = 'IGST';
                } else {
                    taxType = 'No Tax';
                }

                currentHSN = {
                    data: line,
                    HSN: HSN,
                    taxPercentage: taxPercentage,
                    amount: amount,
                    taxType: taxType,
                };
                if (currentHSN && currentTax) {
                    const combinedData = {
                        ...currentHSN,
                        ...currentTax,
                    };
                    structuredHSNLines.push(combinedData);
                    currentHSN = null;
                    currentTax = null;
                }
            }
            previousHsnIndex = Number(dataIndex);
        }
        dataIndex += 1;
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));



    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /MAA[A-Z0-9]{2}\/[0-9]{4}\/[0-9]{2}-[0-9]{2}|MAA[A-Z0-9]{6}\/[A-Z0-9]{2}-[A-Z0-9]{2}/;
    const invoiceAmountId = '1-5';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'New Globe Logistik LLP';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.match(invoiceDateRegex) : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex) : '';

                const invoiceAmountData = extractedData.find((item) => item.id === invoiceAmountId);
                const invoiceAmount = invoiceAmountData ? invoiceAmountData.content : '';


                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

    // /(99\d+|[0-9]{6})\s+\d+.\d+\s+\d+.\d.+/

    // const structuredHSNLines = [];
    // let currentHSN = null;
    // let hsnId = null;
    // let linesId = 0;

    // for (const line of extractedData) {
    //     if (line.content.match(/^\d{6}$/)) {
    //         hsnId = linesId;
    //         if (currentHSN) {
    //             structuredHSNLines.push(currentHSN);
    //         }

    //         const taxPercentage = parseFloat(extractedData[hsnId + 2].content);
    //         let taxType = "No Tax";
    //         if (taxPercentage === 18) {
    //             taxType = "IGST";
    //         } else if (taxPercentage === 9) {
    //             taxType = "CGST & SGST";
    //         }

    //         currentHSN = {
    //             description: extractedData[hsnId - 2].content + " " + extractedData[hsnId - 4].content,
    //             HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
    //             // unitQuantity: extractedData[hsnId - 1].content,
    //             unitQuantity: extractedData[hsnId + 12].content,
    //             // unitPrice: extractedData[hsnId - 2].content,
    //             unitPrice: extractedData[hsnId + 10].content,
    //             taxType: taxType,
    //             // charge: extractedData[hsnId - 4].content,
    //             charge: extractedData[hsnId + 14].content,
    //             taxPercentage: taxPercentage,
    //             taxAmount: extractedData[hsnId - 6].content,
    //         };

    //     }
    //     linesId += 1;
    // }

    // if (currentHSN) {
    //     structuredHSNLines.push(currentHSN);
    // }
}

export const extractSavinoDell = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    console.log(allLines)
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let currentTax = null;
    const taxRegMatch = /(IGST|CGST|SGST|GST)\s+\((\d.+\d+%)\s+(\w+)\s+(\w+\s+\w+)\)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/
    const taxMatchElement = extractedData.find((item) => item.content.match(taxRegMatch));
    const taxMatch = taxMatchElement.content.match(taxRegMatch);

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/([\w\s]+)\s+\[SAC:(\d+)\]\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\s*)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+([A-Za-z]+)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{3})?)/) || [];

        if (matchData.length > 0) {
            const description = matchData[1].trim();
            const HSN = matchData[2] || '';
            const unitPrice = matchData[3].replace(/,/g, "");
            const charge = matchData[4].replace(/,/g, "") || '';
            currentHSN = {
                description: description,
                HSN: HSN,
                charge: charge,
                unitPrice: unitPrice
            };
            if (taxMatch) {
                const taxPercentage = taxMatch[2].replace(/[.0,%]/g, '');

                const chargeValue = currentHSN.charge.replace(/,/g, "");
                const taxAmount = Number(chargeValue) * (taxPercentage / 100);
                console.log(`${Number(chargeValue)} * (${taxPercentage} / ${100})`)
                console.log(Number(chargeValue) * (taxPercentage / 100))

                console.log(taxMatch, "tttt");

                let taxType, igst, cgst, sgst;
                if (taxPercentage == 9) {
                    taxType = 'CGST & SGST';
                    igst = 0;
                    cgst = taxAmount;
                    sgst = taxAmount;
                } else if (taxPercentage == 18) {
                    taxType = 'IGST';
                    igst = taxAmount;
                    cgst = 0;
                    sgst = 0;
                } else {
                    taxType = 'No Tax';
                    igst = 0;
                    cgst = 0;
                    sgst = 0;
                }

                currentTax = {
                    taxPercentage: taxPercentage,
                    taxAmount: taxAmount,
                    taxType: taxType,
                    igst: igst,
                    cgst: cgst,
                    sgst: sgst
                };
            }

            if (currentHSN && currentTax) {
                structuredHSNLines.push({
                    ...currentHSN,
                    ...currentTax
                });
                currentHSN = null;
                currentTax = null;
            }
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));


    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    let venName = '';
    const invoiceDateRegex = /([0-9]{2}\/[0-9]{2}\/[0-9]{4})/;
    const invoiceNumberRegex = /IAN[A-Z0-9]{6}\/[A-Z0-9]{6}/;
    const invoiceAmountRegex = /Amount\s+chargeable(|.)+/;
    const igstRegex = /(IGST|CGST|SGST|GST)\s+\((\d.+\d+%)\s+(\w+)\s+(\w+\s+\w+)\)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                venName = 'SAVINO DEL BENE FREIGHT FORWARDERS';
                const gstNumber = gstMatch[0];
                let invoiceNumber = '';
                let invoiceDate = '';
                let invoiceAmount = '';
                let igst = '';

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/ Amount\s+chargeable\s+to\s+Goods\s+and\s+Service\s+Tax/g, "") : '';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/ INVOICE DATE /g, "") : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/TAX\s+INVOICE\s+|Original for Recipient/g, "") : '';

                const igstRegex = /(IGST|CGST|SGST|GST)\s+\((\d+\.\d+%)\s+(\w+)\s+(\w+\s+\w+)\)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/;
                const igstData = extractedData.find((item) => item.content.match(igstRegex));
                if (igstData) {
                    const matches = igstData.content.match(igstRegex);
                    igst = matches[matches.length - 1];
                }


                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }


                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount.trim(),
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };
                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }
    console.log("APL PDF DATA", JSON.stringify(allLines, null, 2))
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractLxpantos = async (pdf) => {
    // /([\])(\w+)\s+(\w+)\s+([^\d]+)\s+(\d+)\s+(\w+)\s+(\w+)\s+(\d.+)/
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    // const structuredHSNLines = [];
    // let currentHSN = null;
    // let hsnId = null;
    // let linesId = 0;

    // for (const line of extractedData) {
    //     if (line.content.match(/^\d{6}$/)) {
    //         hsnId = linesId;
    //         if (currentHSN) {
    //             structuredHSNLines.push(currentHSN);
    //         }

    //         const taxPercentage = parseFloat(extractedData[hsnId + 18].content.replace(/%/g, ""));
    //         let taxType = "No Tax";
    //         if (taxPercentage === 18) {
    //             taxType = "IGST";
    //         } else if (taxPercentage === 9) {
    //             taxType = "CGST & SGST";
    //         }

    //         const charge = extractedData[hsnId + 12].content.replace(/,/g, "");

    //         currentHSN = {
    //             // quotation:extractedData[hsnId-1].content,
    //             description: extractedData[hsnId - 2].content,
    //             HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
    //             unitQuantity: extractedData[hsnId + 8].content,
    //             unitPrice: extractedData[hsnId + 10].content,
    //             taxType: taxType,
    //             charge: charge,
    //             taxPercentage: taxPercentage,
    //             taxAmount: extractedData[hsnId + 20].content,
    //             tax: extractedData[hsnId - 6].content,
    //             roe: extractedData[hsnId - 9].content,
    //             amount: extractedData[hsnId - 10].content,
    //             // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
    //         };

    //     }
    //     linesId += 1;
    // }

    // if (currentHSN) {
    //     structuredHSNLines.push(currentHSN);
    // }

    const structuredHSNLines = [];
    let currentHSN = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/([\])(\w+)\s+(\w+)\s+([^\d]+)\s+(\d+)\s+(\w+)\s+(\w+)\s+(\d.+)/) || [];

        if (matchData.length > 0) {
            const mainDatas = matchData[0].trim().split(/\s+/);

            const hsnIndex = mainDatas.findIndex(item => item.startsWith('996'));

            if (hsnIndex !== -1) {
                const description = mainDatas.slice(0, hsnIndex).join(' ');
                const HSN = mainDatas[hsnIndex];
                const unitQuantity = parseFloat(mainDatas[hsnIndex + 4]);
                const unitPrice = parseFloat(mainDatas[hsnIndex + 5].replace(/,/g, ""));
                const charge = parseFloat(mainDatas[hsnIndex + 6].replace(/,/g, ""));
                const taxPercentage = parseFloat(mainDatas[hsnIndex + 9]);
                const taxAmount = parseFloat(mainDatas[hsnIndex + 10].replace(/,/g, ""));

                let taxType, igst, cgst, sgst;
                if (taxPercentage === 9 || taxPercentage === 6) {
                    taxType = 'CGST & SGST';
                    igst = 0;
                    cgst = taxAmount;
                    sgst = taxAmount;
                } else if (taxPercentage === 18 || taxPercentage === 12) {
                    taxType = 'IGST';
                    igst = taxAmount;
                    cgst = 0;
                    sgst = 0;
                } else {
                    taxType = 'No Tax';
                    igst = 0;
                    cgst = 0;
                    sgst = 0;
                }

                currentHSN = {
                    mainDatas: matchData[0].trim(),
                    description: description,
                    HSN: HSN,
                    unitQuantity: unitQuantity,
                    unitPrice: unitPrice,
                    charge: charge,
                    taxPercentage: taxPercentage,
                    taxType: taxType,
                    taxAmount: taxAmount,
                    igst: igst,
                    cgst: cgst,
                    sgst: sgst,
                };

                structuredHSNLines.push(currentHSN);
            }
        }
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    const invoiceNumberRegex = /IIN[A-Z0-9]{13}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;
    let isAlreadyClientMatched = false;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                if (!isAlreadyClientMatched) {
                    isAlreadyClientMatched = true;
                    continue;
                }
                const gstNumber = gstMatch[0];

                venName = 'LX PANTOS INDIA PRIVATE LIMITED';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.match(invoiceDateRegex)[0] : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex)[0] : '';


                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + charge + taxAmount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

export const extractMgh = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/99\d+\s+(|.)+/)) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const amount = parseFloat(extractedData[hsnId + 12].content.replace(/,/g, ""));
            const taxPercentage = parseFloat(extractedData[hsnId + 8].content);
            const taxAmount = parseFloat(extractedData[hsnId + 10].content.replace(/,/g, ""));
            let taxType, igst, cgst, sgst;
            if (taxPercentage === 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage === 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }

            const hsnMatch = line.content.match(/(\d+)/);
            const unitPriceMatch = line.content.match(/99\d+\s+([\d.|\d]+)\s+/);

            currentHSN = {
                description: extractedData[hsnId - 2].content,
                HSN: hsnMatch ? hsnMatch[0] : line.content.trim(),
                unitQuantity: extractedData[hsnId + 2].content,
                unitPrice: unitPriceMatch ? unitPriceMatch[1] : line.content.trim(),
                taxType: taxType,
                charge: extractedData[hsnId + 6].content,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                amount: amount,
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /[0-9]{2}\.+[0-9]{2}\.[0-9]{4}/;
    const invoiceNumberRegex = /ODN/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'MGH Logistics Pvt. Ltd';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.split(':')[1]?.trim() : '';


                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    return add + amount;
                }, 0).toFixed(2);

                console.log("iii", invoiceAmount)
                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

export const extractToll = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/(\[+\w+:)\s+(\d+|.)+/) || [];

        if (matchData.length > 0) {
            const percentageMatch = line.match(/(\d+(\.\d+)?)%/);
            const taxAmountMatch = line.match(/=(\d{1,3}(,\d{3})*(\.\d{2})?)/);
            const hsnMatch = line.match(/99(\d+){4}/);
            const chargeMatch = line.match(/\s([^ ]+)$/);
            const charge = chargeMatch[0] ? chargeMatch[0] : "";
            const mainDesc = line + " " + extractedData[hsnId + 1].content;

            // const description = line+" "+extractedData[hsnId + 1].content;
            const descriptionData = extractedData[hsnId + 1].content + " " + line;
            const matchResult = descriptionData.match(/\](.*?)%/);
            const description = matchResult ? matchResult[1].replace(/IGST|SGST|CGST/g, '') : null;

            if (percentageMatch) {
                matchData.taxPercentage = parseFloat(percentageMatch[1]);
            }
            if (taxAmountMatch) {
                const taxAmountWithoutCommas = taxAmountMatch[1].replace(/,/g, '');
                matchData.taxAmount = parseFloat(taxAmountWithoutCommas);
            }
            if (hsnMatch) {
                matchData.HSN = parseFloat(hsnMatch);
            }

            let taxType, igst, cgst, sgst;
            if (matchData.taxPercentage == 18) {
                taxType = 'IGST';
                igst = matchData.taxAmount;
                cgst = 0;
                sgst = 0;
            } else if (matchData.taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = matchData.taxAmount;
                sgst = matchData.taxAmount;
            }

            currentHSN = {
                taxPercentage: matchData.taxPercentage,
                taxAmount: matchData.taxAmount,
                HSN: matchData.HSN,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                taxType: taxType,
                charge: charge,
                description: description,
                mainDesc: mainDesc
            };

            structuredHSNLines.push(currentHSN);
            console.log("toll", matchData);

            hsnId++;
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));



    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    let venName = '';
    const invoiceDateRegex = /(\d+-+\w+-+\d+)/;
    const invoiceNumberRegex = /BLR+[A-Z0-9]{9}|MAA+[A-Z0-9]{8}/;
    const invoiceAmountRegex = /TOTAL INR\s+(\d+|.)+([\d])/
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                venName = 'APL Logistics (India) Private Ltd';
                const gstNumber = gstMatch[0];
                let invoiceNumber = '';
                let invoiceDate = '';
                let invoiceAmount = '';

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/ TOTAL\s+INR\s+/i, '').trim() : '';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/INVOICE\s+\DATE\s+/g, '').trim() : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/TAX\s+\INVOICE\s+/g, '').trim() : '';

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };
                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }
    console.log("APL PDF DATA", JSON.stringify(allLines, null, 2))
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractDelmar = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/996\d+\s+(|.)+/)) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const amount = parseFloat(extractedData[hsnId + 12].content.replace(/,/g, ""));
            const taxPercentage = parseFloat(extractedData[hsnId + 8].content);
            const taxAmount = parseFloat(extractedData[hsnId + 10].content);
            let taxType, igst, cgst, sgst;
            if (taxPercentage === 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage === 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }

            const hsnMatch = line.content.match(/(\d+)/);
            const unitPriceMatch = line.content.match(/99\d+\s+([\d.|\d]+)\s+/);

            currentHSN = {
                description: extractedData[hsnId - 3].content + " " + extractedData[hsnId - 2].content,
                HSN: hsnMatch ? hsnMatch[0] : line.content.trim(),
                unitQuantity: extractedData[hsnId + 2].content,
                unitPrice: unitPriceMatch ? unitPriceMatch[1] : line.content.trim(),
                taxType: taxType,
                charge: extractedData[hsnId + 6].content,
                taxPercentage: taxPercentage,
                taxAmount: extractedData[hsnId + 10].content,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                amount: amount,
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /[0-9]{2}\.+[0-9]{2}\.[0-9]{4}/;
    const invoiceNumberRegex = /ODN\s+:\s+[A-Z0-9]{2}[A-Z0-9]{10}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'DELMAR TOTAL TRANSPORTATION PVT';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/ODN\s+:\s/g, "") : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    return add + amount;
                }, 0).toFixed(2);

                console.log("iii", invoiceAmount)
                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

export const extractDhl = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/^\d{6}$/)) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentage = parseFloat(extractedData[hsnId - 5].content);
            let taxType = "No Tax";
            if (taxPercentage === 18) {
                taxType = "IGST";
            } else if (taxPercentage === 9) {
                taxType = "CGST & SGST";
            }

            currentHSN = {
                // quotation:extractedData[hsnId-1].content,
                description: extractedData[hsnId + 1].content,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: extractedData[hsnId - 1].content,
                unitPrice: extractedData[hsnId - 2].content,
                taxType: taxType,
                charge: extractedData[hsnId - 4].content,
                taxPercentage: taxPercentage,
                taxAmount: extractedData[hsnId - 6].content,
                tax: extractedData[hsnId - 6].content,
                roe: extractedData[hsnId - 9].content,
                amount: extractedData[hsnId - 10].content,
                // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
            };

        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /GTO[A-Z0-9]{5}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let taxableAmount = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '33AAACM6824H4ZK') {
                venName = 'DHL Logistics Pvt. Ltd.';
                // }

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const taxableAmountData = extractedData.find((item) => item.content.includes("Taxable Amount (INR) :"));
                if (taxableAmountData) {
                    const match = taxableAmountData.content.match(/Taxable Amount \(INR\) : ([\d.]+)/);
                    if (match) {
                        taxableAmount = match[1];
                    }
                }

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    return add + amount;
                }, 0).toFixed(2);

                let igst = (invoiceAmount - parseFloat(taxableAmount)).toFixed(2);
                let cgst = "0.00";
                let sgst = "0.00";

                // Convert igst to a number for the comparison
                if (parseFloat(igst) > 0) {
                    cgst = "0.00";
                    sgst = "0.00";
                } else {
                    // Calculate CGST and SGST based on conditions
                    for (const hsnLine of structuredHSNLines) {
                        if (hsnLine.taxPercentage === 18) {
                            cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        } else if (hsnLine.taxPercentage === 9) {
                            sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        }
                    }
                }

                const result = igst;

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "taxableAmount": taxableAmount,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                    "result": result
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

export const extractDhlCourierfrieght = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    const taxRegex = /(\w+)\s+(\d+\.+\d+)+\s+%+\s+(\d+\.+\d+)/;
    const chargeRegex = /TOTAL FOR SHIPMENT\s+(\d+)\s+(\d+\.\d+)\s+(\d+\.\d+)\s+(\d+\.\d)/;
    const unitQuantityRegex = /\s(\d+\/+\d+\/+\d+)\s+(\d+)\s+(\d+)\s+(\d+\.\d+)\s+(\w+)\s+(\d+\.\d+)\s+(\d+\.\d)/;

    for (const line of extractedData) {
        if (line.content.match(/996(\d+)/)) {
            hsnId = linesId;

            const chargeMatch = extractedData.find((cha) => cha.content.match(chargeRegex));
            const chargeGroups = chargeMatch.content.match(chargeRegex);
            const charge = chargeGroups[4] ? parseFloat(chargeGroups[4]) : '-';

            const taxMatch = extractedData.find((tax) => tax.content.match(taxRegex));
            const taxFind = taxMatch.content.match(taxRegex);
            const taxPercentage = taxFind[2] ? parseFloat(taxFind[2]) : '-';
            const taxAmount = taxFind[3] ? parseFloat(taxFind[3]) : '-';

            const unitQuantityMatch = extractedData.find((rec) => rec.content.match(unitQuantityRegex));
            const unitQuantityFind = unitQuantityMatch.content.match(unitQuantityRegex);
            const unitQuantity = unitQuantityFind[4] ? parseFloat(unitQuantityFind[4]) : '-';
            const unitPrice = unitQuantityFind[3] ? parseFloat(unitQuantityFind[3]) : '-';

            let taxType, igst, cgst, sgst;
            if (taxPercentage === 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage === 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }

            currentHSN = {
                description: '-',
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: unitQuantity,
                unitPrice: unitPrice,
                taxType: taxType,
                charge: charge,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                tax: extractedData[hsnId - 6].content,
                roe: extractedData[hsnId - 9].content,
                amount: extractedData[hsnId - 4].content,
            }
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }


    const InvoiceLines = [];
    let gstNumberExtracted = false;
    const invoiceDateRegex = /\d{2}\/\d{2}\/\d{4}/;
    const invoiceNumberRegex = /KAS[A-Z0-9]{10}/;
    const invoiceAmountRegex = ['TOTAL   ']
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let taxableAmount = '';
        let invoiceAmount = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '29AABCD3611Q1ZE') {
                venName = 'DHL EXPRESS (INDIA) PVT LTD.';
                // }

                // const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                // invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/DATE\s+/i, '').trim() : '';

                // const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                // invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/ INVOICE\s+NO\s+/i, '').trim() : '';

                const taxableAmountData = extractedData.find((item) => item.content.includes("Taxable Amount (INR) :"));
                if (taxableAmountData) {
                    const match = taxableAmountData.content.match(/Taxable Amount \(INR\) : ([\d.]+)/);
                    if (match) {
                        taxableAmount = match[1];
                    }
                }

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/TOTAL\s+/i, '').trim() : '';

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                if (parseFloat(igst) > 0) {
                    cgst = "0.00";
                    sgst = "0.00";
                } else {
                    for (const hsnLine of structuredHSNLines) {
                        if (hsnLine.taxPercentage === 18) {
                            igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        } else if (hsnLine.taxPercentage === 9) {
                            cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                            sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        }
                    }
                }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "taxableAmount": taxableAmount,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DhlCourier PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractDhlairduty = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentDescription = null;
    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        if (line.match(/^.*?(\(+\w+\s+\w+\s+\w+\)+\s+(\d.+\d+))/)) {

            const descriptionData = line.match(/^.*?(\(+\w+\s+\w+\s+\w+\)+\s+(\d.+\d+))/) || [];
            const description = descriptionData[0] ? descriptionData[0].replace(/\([^)]*\)|\d+.+\d+/g, "") : '';

            const chargeRegex = line.match(/^.*?(\(+\w+\s+\w+\s+\w+\)+\s+(\d.+\d+))/);
            const charge = chargeRegex ? chargeRegex[2] : '';
            const unitPrice = chargeRegex ? chargeRegex[2] : '';

            const taxTypeRegex = line.match(/IGST\s+\(\w+\s+\w+\s+\w+\)/) || [];
            const taxType = taxTypeRegex ? taxTypeRegex[0]?.replace(/\([^)]*\)/g, "").replace(/,/g, "") : '';

            currentDescription = {
                description: description || '',
                taxType: taxType || '-',
                charge: charge || '-',
                unitQuantity: unitPrice || '-',
            };
            if (currentDescription) {
                structuredHSNLines.push(currentDescription);
            }
        }

        if (line.match(/996(\d{3})/)) {

            const taxPercentageRegex = /(\w+)\s+@+\s+(\d+)%\s+(\d+\.\d+)/;

            const taxPercentageMatch = extractedData[hsnId + 1].content.match(taxPercentageRegex);
            const taxPercentage = taxPercentageMatch ? parseFloat(taxPercentageMatch[2]) : 0;
            const taxAmount = taxPercentageMatch ? parseFloat(taxPercentageMatch[3]) : 0;

            const descriptionMatch = line.match(/996\d+-(\D+)/);
            const description = descriptionMatch ? descriptionMatch[1].trim() : '';
            const hsnWithoutDescription = line.match(/\d+/) || [];

            let taxType, igst, cgst, sgst;
            if (taxPercentage === 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage === 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }

            const chargeMatch = line.match(/(\d+-\w+)\s+(\w+)\s+(.+)/);
            const chargeValue = chargeMatch ? chargeMatch[3].trim().replace(/,/g, "") : '';
            const charge = parseFloat(chargeValue.match(/[\d.]+/)).toFixed(2) || 0;
            const unitPrice = parseFloat(chargeValue.match(/[\d.]+/)).toFixed(2) || 0;


            structuredHSNLines.push({
                description: description,
                HSN: hsnWithoutDescription[0] || '',
                unitQuantity: "1",
                unitPrice: unitPrice,
                mainTax: extractedData[hsnId + 1].content,
                taxType: taxType,
                charge: charge,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                tax: extractedData[hsnId - 6].content,
                roe: extractedData[hsnId - 9].content,
                amount: extractedData[hsnId - 10].content,
            });
        }

    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /BLR[A-Z0-9]{6}/;
    const invoiceAmountRegex = /([\d,]+(?:\.\d+)?)(?:\s+)?(INR)/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let taxableAmount = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'DHL Express (India) Pvt Ltd';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                let invoiceAmount = invoiceAmountData ? invoiceAmountData.content : '';

                invoiceAmount = invoiceAmount.replace(/INR/g, "");

                const taxableAmountData = extractedData.find((item) => item.content.includes("Taxable Amount (INR) :"));
                if (taxableAmountData) {
                    const match = taxableAmountData.content.match(/Taxable Amount \(INR\) : ([\d.]+)/);
                    if (match) {
                        taxableAmount = match[1];
                    }
                }

                // const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                //     const amount = parseFloat(hsnLine.amount) || 0;
                //     return add + amount;
                // }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                if (parseFloat(igst) > 0) {
                    cgst = "0.00";
                    sgst = "0.00";
                } else {
                    for (const hsnLine of structuredHSNLines) {
                        if (hsnLine.taxPercentage === 18) {
                            igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        } else if (hsnLine.taxPercentage === 9) {
                            cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                            sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        }
                    }
                }

                const result = igst;

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "taxableAmount": taxableAmount,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                    "result": result
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

export const extractDart = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;

    for (const line of allLines) {
        if (line.content.includes("996") || line.content.match(/^\d{6}$/)) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            currentHSN = {
                description: '',
                HSN: line.content.includes("SAC")
                    ? line.content.match(/\d+/)
                    : line.content.replace(/\]/g, '').trim(),
                unitQuantity: null,
                unitPrice: null,
                taxType: null,
                charge: null,
                taxAmount: null,
                amount: null,
                quotation: null,
            };

        } else if (currentHSN && !currentHSN.taxType) {
            const taxtypeMatch = line.content.match(/IGST|CGST|SGST|GST/);
            if (taxtypeMatch) {
                if (taxtypeMatch[0] === "CGST" || taxtypeMatch[0] === "SGST") {
                    currentHSN.taxType = "CGST & SGST";
                    if (currentHSN.taxPercentage === 18) {
                        currentHSN.charge = "0.00";
                    }
                } else {
                    currentHSN.taxType = taxtypeMatch[0];
                    if (currentHSN.taxPercentage === 9) {
                        currentHSN.charge = "0.00";
                    }
                }
            }
        }

        if (currentHSN && currentHSN.HSN && !currentHSN.taxType) {
            if (!line.content.includes("996")) {
                const wholeNumberMatch = line.content.match(/\b(\d+)\b/);
                if (wholeNumberMatch) {
                    if (!currentHSN.unitQuantity) {
                        currentHSN.unitQuantity = parseInt(wholeNumberMatch[1]);
                    }
                }
                currentHSN.description += ' ' + line.content.trim();
                currentHSN.description = currentHSN.description.replace(/[^a-zA-Z ]/g, '');
            }
        }

        if (line.content.includes("quotation")) {
            const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
            if (quotationValueMatch) {
                currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
            }
        }

        const percentageMatch = line.content.match(/(\d+(\.\d+)?)%/);
        if (percentageMatch && currentHSN) {
            currentHSN.taxPercentage = parseFloat(percentageMatch[1]);
        }

        if (line.content.includes("=") && currentHSN) {
            const taxAmountMatch = line.content.match(/=(\d{1,3}(,\d{3})*(\.\d{2})?)/);
            if (taxAmountMatch) {
                currentHSN.taxAmount = parseFloat(taxAmountMatch[1].replace(/,/g, ""));

                if (!isNaN(currentHSN.taxAmount) && !isNaN(currentHSN.taxPercentage)) {
                    const taxAmountFloat = parseFloat(currentHSN.taxAmount);
                    const taxPercentageFloat = parseFloat(currentHSN.taxPercentage);
                    if (!isNaN(taxAmountFloat) && !isNaN(taxPercentageFloat) && taxPercentageFloat !== 0) {
                        const equivalentFor100Percent = (taxAmountFloat * 100) / taxPercentageFloat;
                        currentHSN.charge = equivalentFor100Percent.toFixed(2);
                        currentHSN.amount = equivalentFor100Percent.toFixed(2);

                        const unitQuantity = parseFloat(currentHSN.unitQuantity);
                        if (!isNaN(unitQuantity) && unitQuantity !== 0) {
                            currentHSN.unitPrice = (equivalentFor100Percent / unitQuantity).toFixed(2);
                        } else {
                            currentHSN.unitQuantity = 1;
                            currentHSN.unitPrice = equivalentFor100Percent.toFixed(2);
                        }
                    } else {
                        currentHSN.charge = "0";
                        currentHSN.amount = "0";
                    }
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }


    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /BLR\d{10}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '29AAACD3181G1ZR') {
                venName = 'DART GLOBAL LOGISTICS PVT LTD';
                // }

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';
                invoiceNumber = invoiceNumber.replace(/\bTAX\s*INVOICE\b/, '').trim();

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + charge + taxAmount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(allLines, null, 2))
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }

}

export const extractApl = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    // /[A-Z0-9]{4}\s+(\d+\s+%)\s+(\w+)\s+(\d+.\d+)\s+(\d+.\d+)/
    ///(\w+)\s+(\w+)\s+(\d+)\s+(\d+.\d+)\s+(\w+)\s+(\d+.\d+)\s+(\w+)\s+(\d+.\d+)\s+(\d+.\d+)/

    // const charge = taxMatch[3] ? Number(taxMatch[3].trim()).toFixed(2) : '';

    // /(\w+)\s+(\w+)\s+(\w+)\s+(\d+)(\d+\.\d+|.\d+\s+\w+\s\s+.\d+|.\s)+\s+\s+(\w+)\s+(\w+|.)+(\d+)/
    const structuredHSNLines = [];
    let currentHSN = null;
    let currentTax = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        if (line.match(/([^\d]+)\s+(\d+)\s+(\d+\.\d+)\s+(\w+)\s+(\d+|.+)\s+(\w+)\s+(\d+\.\d+)\s+(\d+\.\d+)/)) {
            const matchData = line.match(/([^\d]+)\s+(\d+)\s+(\d+\.\d+)\s+(\w+)\s+(\d+|.+)\s+(\w+)\s+(\d+\.\d+)\s+(\d+\.\d+)/) || [];
            const description = matchData[1] ? matchData[1] : " ";
            const HSN = matchData[2] ? matchData[2].trim() : '';
            const unitQuantity = matchData[3] ? matchData[3].trim() : '';
            const unitPrice = matchData[5] ? matchData[5].trim() : '';

            currentHSN = {
                description: description,
                HSN: HSN,
                unitQuantity: unitQuantity,
                unitPrice: unitPrice,
            };
        }

        if (line.match(/[A-Z0-9]{4}\s+(\d+\s+%)\s+(\w+)\s+(\d+\.\d+)\s+(\d+\.\d+)/)) {
            const taxMatch = line.match(/[A-Z0-9]{4}\s+(\d+\s+%)\s+(\w+)\s+(\d+\.\d+)\s+(\d+\.\d+)/) || [];
            const taxPercentageData = taxMatch[1] ? taxMatch[1].trim() : '';
            const taxPercentage = taxPercentageData.replace(/%/g, "");
            const taxAmount = taxMatch[4] ? taxMatch[4].trim() : '';
            const charge = taxMatch[3] ? taxMatch[3].trim() : '';

            let taxType, igst, cgst, sgst;
            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentTax = {
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                charge: charge,
                taxType: taxType,
                igst: igst,
                cgst: cgst,
                sgst: sgst
            };

            if (currentHSN && currentTax) {
                structuredHSNLines.push({
                    ...currentHSN,
                    ...currentTax
                });
                currentHSN = null;
                currentTax = null;
            }
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    let venName = '';
    const invoiceDateRegex = /(\d+-+\w+-+\d+)/;
    const invoiceNumberRegex = /[A-Za-z]{2}ILF+(\d+)/;
    const invoiceAmountRegex = /TOTAL\s+(\w+)\s(\(+\w+\)\s+(\w+.\d+))/
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                venName = 'APL Logistics (India) Private Ltd';
                const gstNumber = gstMatch[0];
                let invoiceNumber = '';
                let invoiceDate = '';
                let invoiceAmount = '';

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(' TOTAL AMOUNT (INR)   ', '') : '';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                let igst = 0.00;
                let cgst = 0.00;
                let sgst = 0.00;

                structuredHSNLines.forEach(hsnLine => {
                    const igstValue = parseFloat(hsnLine.charge) || 0.00;
                    const cgstValue = parseFloat(hsnLine.charge) || 0.00;
                    const sgstValue = parseFloat(hsnLine.charge) || 0.00;

                    if (igstValue > 0) {
                        cgst = 0.00;
                        sgst = 0.00;
                        igst += igstValue;
                    } else {
                        igst = 0.00;
                        if (cgstValue > 0 || sgstValue > 0) {
                            cgst += cgstValue;
                            sgst += sgstValue;
                        }
                    }
                });

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };
                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }
    console.log("APL PDF DATA", JSON.stringify(allLines, null, 2))
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractExpeditors = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/^\d{6}$/)) {
            hsnId = linesId;
            if (currentHSN) {
                if (currentHSN.taxType === "IGST") {
                    currentHSN.amount = (parseFloat(currentHSN.charge.replace(/,/g, '')) + currentHSN.taxAmount).toFixed(2);
                } else if (currentHSN.taxType === "CGST & SGST") {
                    currentHSN.amount = (parseFloat(currentHSN.charge.replace(/,/g, '')) + currentHSN.taxAmount * 2).toFixed(2);
                }
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentageContent = extractedData[hsnId + 4].content;
            const taxPercentage = parseFloat(taxPercentageContent.replace('%', ''));

            let igst = 0;
            let cgst = 0;
            let sgst = 0;
            let taxType = "No Tax";

            if (taxPercentage === 18) {
                igst = parseFloat(extractedData[hsnId + 6].content.replace(/,/g, '')) || 0;
                taxType = "IGST";
            } else if (taxPercentage === 9) {
                cgst = parseFloat(extractedData[hsnId + 6].content.replace(/,/g, '')) || 0;
                sgst = parseFloat(extractedData[hsnId + 6].content.replace(/,/g, '')) || 0;
                taxType = "CGST & SGST";
            }

            const unitQuantityContent = extractedData[hsnId + 1].content;

            currentHSN = {
                description: extractedData[hsnId - 2].content,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: unitQuantityContent || "1",
                unitPrice: extractedData[hsnId + 2].content.replace(/,/g, ''),
                taxType: taxType,
                charge: extractedData[hsnId + 2].content.replace(/,/g, ''),
                taxPercentage: taxPercentage,
                taxAmount: parseFloat(extractedData[hsnId + 6].content.replace(/,/g, '')) || 0,
                amount: 0,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        if (currentHSN.taxType === "IGST") {
            currentHSN.amount = (parseFloat(currentHSN.charge) + currentHSN.taxAmount).toFixed(2);
        } else if (currentHSN.taxType === "CGST & SGST") {
            currentHSN.amount = (parseFloat(currentHSN.charge) + currentHSN.taxAmount * 2).toFixed(2);
        }
        structuredHSNLines.push(currentHSN);
    }


    // const InvoiceLines = [];
    // let currentInvoice = null;
    // let gstNumberExtracted = false;

    // const vendorNameId = '1-5';
    // const invoiceDateId = '1-19';
    // const invoiceNumberId = '1-21';
    // const invoiceCurrency = 'INR';
    // const invoiceAmountId = '1-36';
    // const currentYear = new Date().getFullYear();
    // const nextYear = currentYear + 1;
    // const financialYear = `${currentYear}-${nextYear}`;

    // if (extractedData && Array.isArray(extractedData)) {
    //     for (const line of extractedData) {
    //         const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
    //         if (gstMatch && !gstNumberExtracted) {
    //             const gstNumber = gstMatch[0];

    //             const vendorNameData = extractedData.find((item) => item.id === vendorNameId);
    //             const venName = vendorNameData ? vendorNameData.content : '';

    //             const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
    //             const invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/^INVOICE DATE:\s*/, '') : '';

    //             const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
    //             const invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/^INVOICE NUMBER:\s*/, '') : '';

    //             const invoiceAmountData = extractedData.find((item) => item.id === invoiceAmountId);
    //             const invoiceAmount = invoiceAmountData ? invoiceAmountData.content : '';

    //             // const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
    //             //     const amount = parseFloat(hsnLine.amount) || 0;
    //             //     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
    //             //     const igst = parseFloat(hsnLine.igst) || 0;
    //             //     const cgst = parseFloat(hsnLine.cgst) || 0;
    //             //     const sgst = parseFloat(hsnLine.sgst) || 0;
    //             //     return add + amount;
    //             // }, 0).toFixed(2);

    //             const igst = structuredHSNLines.reduce((acc, hsnLine) => {
    //                 return acc + parseFloat(hsnLine.igst) || 0;
    //             }, 0).toFixed(2);

    //             const cgst = structuredHSNLines.reduce((add, hsnLine) => {
    //                 return add + parseFloat(hsnLine.cgst) || 0;
    //             }, 0).toFixed(2);

    //             const sgst = structuredHSNLines.reduce((acc, hsnLine) => {
    //                 return acc + parseFloat(hsnLine.sgst) || 0;
    //             }, 0).toFixed(2);

    //             currentInvoice = {
    //                 "venName": venName,
    //                 "gstNumber": gstNumber,
    //                 "invoiceDate": invoiceDate,
    //                 "invoiceNumber": invoiceNumber,
    //                 "invoiceCurrency": invoiceCurrency,
    //                 "financialYear": financialYear,
    //                 "invoiceAmount": invoiceAmount,
    //                 "igst": igst,
    //                 "cgst": cgst,
    //                 "sgst": sgst,
    //             };
    //             InvoiceLines.push(currentInvoice);
    //             gstNumberExtracted = true;
    //         }
    //     }
    // }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /INVOICE DATE:\s*(\d{2}\/\d{2}\/\d{4})/;
    const invoiceNumberRegex = /INVOICE NUMBER:\s*([A-Z]{2}\d{6}[A-Z]\d{6})/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '33AAACE1795K2ZJ' || gstNumber === '29AAACE1795K2Z8') {
                venName = 'Expeditors International (India) Private Limited';
                // }

                const invoiceDateData = extractedData.find((item) => {
                    const match = item.content.match(invoiceDateRegex);
                    if (match) {
                        invoiceDate = match[1];
                        return true;
                    }
                    return false;
                });

                const invoiceNumberData = extractedData.find((item) => {
                    const match = item.content.match(invoiceNumberRegex);
                    if (match) {
                        invoiceNumber = match[1];
                        return true;
                    }
                    return false;
                });
                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + amount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2))
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }

}

export const extractEfl = async (pdf: PDFDocumentProxy) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;

    const calculateChargeAndAmountForItem = (item) => {
        const taxAmountFloat = parseFloat(item.taxAmount);
        const taxPercentageFloat = parseFloat(item.taxPercentage);
        if (!isNaN(taxAmountFloat) && !isNaN(taxPercentageFloat) && taxPercentageFloat !== 0) {
            const equivalentFor100Percent = (taxAmountFloat * 100) / taxPercentageFloat;
            const charge = equivalentFor100Percent.toFixed(2);
            const amount = calculateAmountForItem(charge, item.unitQuantity);
            return { charge, amount };
        } else {
            return { charge: "0.00", amount: "0.00" };
        }
    };

    const calculateAmountForItem = (charge, unitQuantity) => {
        if (!isNaN(charge) && !isNaN(unitQuantity) && unitQuantity !== 0) {
            const unitPrice = (charge / unitQuantity).toFixed(2);
            const amount = (unitQuantity * parseFloat(unitPrice)).toFixed(2);
            return amount;
        } else {
            return "0.00";
        }
    };

    for (const line of allLines) {
        if (line.content.includes("996") || line.content.match(/^\d{6}$/)) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            currentHSN = {
                HSN: line.content.includes("HSN")
                    ? line.content.match(/\d+/)
                    : line.content.replace(/\]/g, '').trim(),
                taxType: null,
                taxAmount: null,
                taxPercentage: null,
                charge: null,
                quotation: null,
                unitPrice: null,
                unitQuantity: null,
                amount: null,
                description: '',
            };
        } else if (currentHSN && !currentHSN.taxType) {
            const taxtypeMatch = line.content.match(/IGST|CGST|SGST|GST/);
            if (taxtypeMatch) {
                if (taxtypeMatch[0] === "CGST" || taxtypeMatch[0] === "SGST") {
                    currentHSN.taxType = "CGST & SGST";
                } else {
                    currentHSN.taxType = taxtypeMatch[0];
                }
            }
        }

        if (currentHSN && currentHSN.HSN && !currentHSN.taxType) {
            if (!line.content.includes("996")) {
                const wholeNumberMatch = line.content.match(/\b(\d+)\b/);
                if (wholeNumberMatch) {
                    if (!currentHSN.unitQuantity) {
                        currentHSN.unitQuantity = parseInt(wholeNumberMatch[1]);
                    }
                }
                currentHSN.description += ' ' + line.content.trim();
                currentHSN.description = currentHSN.description.replace(/(\d+).*/, '$1');
            }
        }
        if (currentHSN?.description?.includes('-')) {
            currentHSN.description = currentHSN.description.split('-')[0];
        }

        const calculateChargeForItem = (item) => {
            const taxAmountFloat = parseFloat(item.taxAmount);
            const taxPercentageFloat = parseFloat(item.taxPercentage);
            if (!isNaN(taxAmountFloat) && !isNaN(taxPercentageFloat) && taxPercentageFloat !== 0) {
                const equivalentFor100Percent = (taxAmountFloat * 100) / taxPercentageFloat;
                return equivalentFor100Percent.toFixed(2);
            } else {
                return "0";
            }
        };

        for (const hsnLine of structuredHSNLines) {
            hsnLine.charge = calculateChargeForItem(hsnLine);

            if (!isNaN(hsnLine.charge) && !isNaN(hsnLine.unitQuantity) && hsnLine.unitQuantity !== 0) {
                hsnLine.unitPrice = (hsnLine.charge / hsnLine.unitQuantity).toFixed(2);
            }
        }

        if (line.content.includes("quotation")) {
            const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
            if (quotationValueMatch) {
                currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
            }
        }

        const percentageMatch = line.content.match(/(\d+(\.\d+)?)%/);
        if (percentageMatch && currentHSN) {
            currentHSN.taxPercentage = parseFloat(percentageMatch[1]);
        }
        if (line.content.includes("=") && currentHSN) {
            const taxAmountMatch = line.content.match(/=(\d+(,\d+)?(\.\d+)?)/);
            if (taxAmountMatch) {
                const taxAmountString = taxAmountMatch[1].replace(/,/g, '');
                currentHSN.taxAmount = parseFloat(taxAmountString);
            }
        }

        if (currentHSN) {
            const { charge, amount } = calculateChargeAndAmountForItem(currentHSN);
            currentHSN.charge = charge;
            currentHSN.amount = amount;
        }
    }

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;
    const invoiceDateId = /\b\d{1,2}-(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}\b/g;
    const invoiceNumberId = /EFL-[A-Z]{3}-\d{8}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);

            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];
                const venName = 'EXPO FREIGHT PVT LTD';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateId));
                const invoiceDate = invoiceDateData ? invoiceDateData.content.match(invoiceDateId) : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberId));
                const invoiceNumberNew = invoiceNumberData ? invoiceNumberData.content.split('|')[1] : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + amount + taxAmount * 2;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumberNew,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "cgst": cgst,
                    "sgst": sgst,
                    "igst": igst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("EFL PDF DATA", JSON.stringify(allLines, null, 2))
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractOocl = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.includes("996")) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentageContent = extractedData[hsnId + 12].content;
            const taxPercentage = parseFloat(taxPercentageContent.replace('%', ''));

            const taxAmountContent = extractedData[hsnId + 14].content.replace(/,/g, '');
            const taxAmount = parseFloat(taxAmountContent).toFixed(2);

            const unitQuantityContent = extractedData[hsnId + 1].content;
            const unitQuantity = parseFloat(unitQuantityContent) || 1;

            const charge = parseFloat(extractedData[hsnId + 2].content.replace(/,/g, ''));
            const unitPrice = (charge / unitQuantity).toFixed(2);

            let taxType, igst, cgst, sgst;
            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentHSN = {
                description: extractedData[hsnId - 2].content,
                HSN: line.content.includes("996") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: unitQuantity,
                unitPrice: unitPrice,
                taxType: taxType,
                charge: charge,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                amount: charge,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /724[A-Z0-9]{7}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'OOCL Logistics (India) Private Limited';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + amount + taxAmount;
                }, 0).toFixed(2);

                const igst = structuredHSNLines.reduce((add, hsnLine) => {
                    const igst = parseFloat(hsnLine.igst) || 0;
                    return add + igst;
                }, 0).toFixed(2);

                const cgst = structuredHSNLines.reduce((add, hsnLine) => {
                    const cgst = parseFloat(hsnLine.cgst) || 0;
                    return add + cgst;
                }, 0).toFixed(2);

                const sgst = structuredHSNLines.reduce((add, hsnLine) => {
                    const sgst = parseFloat(hsnLine.sgst) || 0;
                    return add + sgst;
                }, 0).toFixed(2);


                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

export const extractNagel = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/^\d{8}$/)) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentageContent = extractedData[hsnId - 3].content;
            const taxPercentage = parseFloat(taxPercentageContent.replace('%', ''));

            let igst = 0;
            let cgst = 0;
            let sgst = 0;
            let taxType = "No Tax";

            if (taxPercentage === 18) {
                igst = parseFloat(extractedData[hsnId + 6].content) || 0;
                taxType = "IGST";
            } else if (taxPercentage === 9) {
                cgst = parseFloat(extractedData[hsnId + 6].content) || 0;
                sgst = parseFloat(extractedData[hsnId + 6].content) || 0;
                taxType = "CGST & SGST";
            }

            const amount = parseFloat(extractedData[hsnId - 16].content);
            const charge = parseFloat(extractedData[hsnId - 8].content);
            const unitQuantity = parseFloat(extractedData[hsnId + 1].content) || 1;
            const unitPrice = (amount / unitQuantity).toFixed(2);

            currentHSN = {
                description: extractedData[hsnId - 17].content,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: unitQuantity,
                unitPrice: unitPrice,
                taxType: taxType,
                charge: charge,
                taxPercentage: taxPercentage,
                taxAmount: parseFloat(extractedData[hsnId - 11].content) || 0,
                amount: amount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const vendorNameId = '1-4';
    const invoiceDateId = '1-51';
    const invoiceNumberId = '1-50';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                const vendorNameData = extractedData.find((item) => item.id === vendorNameId);
                const venName = vendorNameData ? vendorNameData.content : '';

                const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
                const invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/^INVOICE DATE:\s*/, '') : '';

                const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
                const invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/^INVOICE NUMBER:\s*/, '') : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + charge;
                }, 0).toFixed(2);

                const igst = structuredHSNLines.reduce((acc, hsnLine) => {
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return acc + taxAmount
                }, 0).toFixed(2);

                const cgst = structuredHSNLines.reduce((add, hsnLine) => {
                    return add + parseFloat(hsnLine.cgst) || 0;
                }, 0).toFixed(2);

                const sgst = structuredHSNLines.reduce((acc, hsnLine) => {
                    return acc + parseFloat(hsnLine.sgst) || 0;
                }, 0).toFixed(2);

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };
                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractMaersk = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.includes("996")) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentageContent = extractedData[hsnId - 2].content;
            const taxPercentageMatch = taxPercentageContent.match(/(\d+(\.\d+)?)/);
            const taxPercentage = taxPercentageMatch ? parseFloat(taxPercentageMatch[0]) : 0;

            let igst = 0;
            let cgst = 0;
            let sgst = 0;
            let taxType = "No Tax";

            if (taxPercentage === 18) {
                igst = parseFloat(extractedData[hsnId + 6].content) || 0;
                taxType = "IGST";
            } else if (taxPercentage === 9) {
                cgst = parseFloat(extractedData[hsnId + 6].content) || 0;
                sgst = parseFloat(extractedData[hsnId + 6].content) || 0;
                taxType = "CGST & SGST";
            }

            const taxAmountContent = extractedData[hsnId + 17].content.replace(/,/g, '');
            const taxAmount = parseFloat(taxAmountContent).toFixed(2);

            const unitQuantityContent = extractedData[hsnId + 12].content;
            const unitQuantity = parseFloat(unitQuantityContent) || 1;

            const charge = parseFloat(extractedData[hsnId + 14].content.replace(/,/g, ''));
            const amount = parseFloat(extractedData[hsnId + 14].content.replace(/,/g, ''));
            const unitPrice = (amount / unitQuantity).toFixed(2);

            currentHSN = {
                description: extractedData[hsnId - 6].content + extractedData[hsnId - 5].content,
                HSN: line.content.includes("996") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: unitQuantity,
                unitPrice: unitPrice,
                taxType: taxType,
                charge: charge,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                amount: amount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }
    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2} [A-Z][a-z]{2} \d{4}/;
    const invoiceNumberRegex = /1033\d{8}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let gstNumber = '';

        for (const line of extractedData) {
            if (line.content.includes('DAMCO GSTIN:')) {
                gstNumber = line.content.split('DAMCO GSTIN:')[1].trim();
                venName = 'Damco India Pvt. Ltd';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';
                invoiceNumber = invoiceNumber.replace(/\bTAX\s*INVOICE\b/, '').trim();

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + charge + taxAmount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(allLines, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

    // const InvoiceLines = [];
    // let currentInvoice = null;
    // let gstNumberExtracted = false;
    // let venName = '';
    // const vendorNameId = '1-2';
    // const invoiceDateId = '1-9';
    // const invoiceDateId2 = '1-10';
    // const invoiceNumberId = '1-254';
    // const invoiceNumberId2 = '1-224';
    // const invoiceCurrency = 'INR';
    // const currentYear = new Date().getFullYear();
    // const nextYear = currentYear + 1;
    // const financialYear = `${currentYear}-${nextYear}`;

    // if (extractedData && Array.isArray(extractedData)) {
    //     let invoiceDate = '';
    //     let invoiceNumber = '';

    //     for (const line of extractedData) {
    //         if (line.id >= '1-201' && line.id <= '2-300') {
    //             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
    //             if (gstMatch && !gstNumberExtracted) {
    //                 const gstNumber = gstMatch[0];

    //                 if (gstNumber === '33AAHCA6078Q1Z3') {
    //                     venName = 'Damco India Pvt. Ltd';
    //                 } else {
    //                     const vendorNameData = extractedData.find((item) => item.id === vendorNameId);
    //                     venName = vendorNameData ? vendorNameData.content : '';
    //                 }

    //                 const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
    //                 if (invoiceDateData && invoiceDateData.content.trim() !== '') {
    //                     invoiceDate = invoiceDateData.content.replace(/^INVOICE DATE:\s*/, '');
    //                 } else {
    //                     const invoiceDateData2 = extractedData.find((item) => item.id === invoiceDateId2);
    //                     if (invoiceDateData2 && invoiceDateData2.content.trim() !== '') {
    //                         invoiceDate = invoiceDateData2.content.replace(/^INVOICE DATE:\s*/, '');
    //                     }
    //                 }

    //                 const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
    //                 if (invoiceNumberData && invoiceNumberData.content.trim() !== '') {
    //                     invoiceNumber = invoiceNumberData.content.replace(/^INVOICE NUMBER:\s*/, '');
    //                 } else {
    //                     const invoiceNumberData2 = extractedData.find((item) => item.id === invoiceNumberId2);
    //                     if (invoiceNumberData2 && invoiceNumberData2.content.trim() !== '') {
    //                         invoiceNumber = invoiceNumberData2.content.replace(/^INVOICE NUMBER:\s*/, '');
    //                     }
    //                 }

    //                 const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
    //                     const amount = parseFloat(hsnLine.amount) || 0;
    //                     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
    //                     return add + amount + taxAmount;
    //                 }, 0).toFixed(2);

    //                 const igst = structuredHSNLines.reduce((acc, hsnLine) => {
    //                     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
    //                     return acc + taxAmount;
    //                 }, 0).toFixed(2);

    //                 const cgst = structuredHSNLines.reduce((add, hsnLine) => {
    //                     return add + parseFloat(hsnLine.cgst) || 0;
    //                 }, 0).toFixed(2);

    //                 const sgst = structuredHSNLines.reduce((acc, hsnLine) => {
    //                     return acc + parseFloat(hsnLine.sgst) || 0;
    //                 }, 0).toFixed(2);

    //                 currentInvoice = {
    //                     "venName": venName,
    //                     "gstNumber": gstNumber,
    //                     "invoiceDate": invoiceDate,
    //                     "invoiceNumber": invoiceNumber,
    //                     "invoiceCurrency": invoiceCurrency,
    //                     "financialYear": financialYear,
    //                     "invoiceAmount": invoiceAmount,
    //                     "igst": igst,
    //                     "cgst": cgst,
    //                     "sgst": sgst,
    //                 };
    //                 InvoiceLines.push(currentInvoice);
    //                 gstNumberExtracted = true;
    //             }
    //         }
    //     }
    // }
    // console.log("ALL LINES", JSON.stringify(allLines, null, 2));
    // return {
    //     extractedData: InvoiceLines[0],
    //     extractedHsnData: structuredHSNLines
    // };


}

export const extractMsn = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    const hsns = [];
    const hsnTaxes = [];
    const hsnTaxesRegex = /\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\b/g;
    allLines.forEach(line => {
        if (line.content.match(/ \d{6} /g)) {
            hsns.push(line.content);
        }
        const match = line.content.match(hsnTaxesRegex);
        if (match?.length === 8) {
            hsnTaxes.push(line.content);
        }
    });
    if (hsns.length === hsnTaxes.length) {
        let hsnIndex = 0;
        for (const rec of hsns) {
            const unitQuantity = rec.match(/\d{6}\s+(\d+\.\d{3})/)?.[1]?.trim();
            const unitPrice = rec.match(/[A-Z]{3}\s+([\d,]*\d+\.\d{2})/)?.[1]?.trim();
            const hsnTaxesArray = hsnTaxes[hsnIndex].split(' ').filter(rec => rec != '');
            console.log(hsnTaxesArray)
            const taxType = (hsnTaxesArray[1] == 0 && hsnTaxesArray[3] == 0 && hsnTaxesArray[5] == 0) ? "No Tax" : (hsnTaxesArray[1] == 0 && hsnTaxesArray[3] == 0) ? "IGST" : "CGST & SGST";
            const hsnLinesData = {
                HSN: rec.match(/ \d{6} /g)?.[0]?.trim(),
                taxType,
                taxAmount: taxType === "No Tax" ? 0 : taxType === "IGST" ? hsnTaxesArray[6] : Number(hsnTaxesArray[2]) + Number(hsnTaxesArray[4]),
                taxPercentage: taxType === "No Tax" ? 0 : taxType === "IGST" ? hsnTaxesArray[5] : hsnTaxesArray[1],
                charge: hsnTaxesArray[0],
                quotation: null,
                unitPrice: unitPrice ? unitPrice : 0,
                unitQuantity: unitQuantity ? unitQuantity : 0,
                amount: hsnTaxesArray[hsnTaxesArray.length - 1],
                description: rec.match(/^(.*?)\s+\d{6}\b/)?.[1]?.trim(),
            }
            structuredHSNLines.push(hsnLinesData);
            hsnIndex += 1;
        }
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{2}\/\d{2}\/\d{4}/;
    const invoiceNumberRegex = /CHE[A-Z0-9]{11}/;
    const invoiceAmountRegex = [" E & O E   Total   "];
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let invoiceAmount = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '33AAKCM7465L2ZW') {
                venName = 'MSN CONTAINER LINE PRIVATE LIMITED';
                // }


                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';
                invoiceDate = invoiceDate.split(',')[0].trim();

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceNumberMatch = invoiceNumber.match(/CHE[A-Z0-9]{11}/);
                invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[0] : '';

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/E & O E\s+Total\s+/i, '').trim() : '';


                const igst = structuredHSNLines.reduce((acc, hsnLine) => {
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return acc + taxAmount;
                }, 0).toFixed(2);

                const cgst = structuredHSNLines.reduce((add, hsnLine) => {
                    return add + parseFloat(hsnLine.cgst) || 0;
                }, 0).toFixed(2);

                const sgst = structuredHSNLines.reduce((acc, hsnLine) => {
                    return acc + parseFloat(hsnLine.sgst) || 0;
                }, 0).toFixed(2);

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("MSN PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractTiger = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    // /.*\b(SAC:\s*\d+).*[\d]/;

    // /.*\b(\s*(\d+)).*\b\s+(\d+%)[=]*([\d,]+\.\d+)\s+([\d,]+\.\d+)/

    const structuredHSNLines = [];
    let currentHSN = null;
    // /.*\b(SAC:\s*(\d+)).*\bIGST\s+(\d+%)[=]*([\d,]+\.\d+)\s+([\d,]+\.\d+).*\n(.*).*\n(.*).*\n(.*).*\n(.*)/
    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/.*\b(SAC:\s*(\d+)).*\bIGST\s+(\d+%)[=]*([\d,]+\.\d+)\s+([\d,]+\.\d+)/) || [];

        if (matchData.length > 0) {
            const description = (matchData[0] || '').split('[')[0].trim();
            const HSN = matchData[2] || '';
            const taxPercentage = matchData[3].replace(/%/g, "");
            const taxAmount = matchData[4].replace(/,/g, "") || '';
            const charge = matchData[5] || '';

            let taxType, igst, cgst, sgst;
            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentHSN = {
                description: description,
                HSN: HSN,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                taxType: taxType,
                charge: charge
            };

            structuredHSNLines.push(currentHSN);
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    let venName = '';
    const invoiceDateRegex = /(\d+-+\w+-+\d+)/;
    const invoiceNumberRegex = /TAX\s+INVOICE\s+(BOM[0-9]+)\s+/;
    const invoiceAmountRegex = /TOTAL\s+INR\s+(\d+|.)+([\d])/
    const igstRegex = /ADD IGST\s+(\d+|.)+([\d])/
    const cgstRegex = /ADD CGST\s+(\d+|.)+([\d])/
    const sgstRegex = /ADD SGST\s+(\d+|.)+([\d])/
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                venName = 'TIGERS WORLDWIDE LOGISTICS PVT LTD';
                const gstNumber = gstMatch[0];
                let invoiceNumber = '';
                let invoiceDate = '';
                let invoiceAmount = '';
                let igst = '';
                let cgst = '';
                let sgst = '';

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/ TOTAL INR /g, "") : '';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/ INVOICE DATE /g, "") : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/TAX\s+INVOICE\s+|Original for Recipient/g, "") : '';

                const igstData = extractedData.find((item) => item.content.match(igstRegex));
                igst = igstData ? igstData.content.replace(/ADD IGST /g, "") : '' || 0.00;

                const cgstData = extractedData.find((item) => item.content.match(cgstRegex));
                cgst = cgstData ? cgstData.content.replace(/ADD CGST /g, "") : '' || 0.00;

                const sgstData = extractedData.find((item) => item.content.match(sgstRegex));
                sgst = sgstData ? sgstData.content.replace(/ADD SGST /g, "") : '' || 0.00;


                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };
                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }
    console.log("APL PDF DATA", JSON.stringify(allLines, null, 2))
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractOia = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    // /(\[+SAC:\s+(\d.+))/
    // /[(^\s\w.+\-)?]+(\d.+%=\d.+)/
    const structuredHSNLines = [];
    let currentHSN = null;
    let currentTax = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/\[SAC:\s+(\d+)\]\s+(.+?)\s+INR\s+([\d,.]+)\s+(\d+\.\d+)\s+IGST\s+([\d,.]+)/);

        if (matchData) {
            const HSN = matchData[1];
            const description = matchData[2];
            const unitPrice = parseFloat(matchData[3].replace(/,/g, ""));
            const unitQuantity = parseFloat(matchData[4]);
            const charge = parseFloat(matchData[5].replace(/,/g, ""));

            currentHSN = {
                data: line,
                description: description,
                HSN: HSN,
                charge: charge,
                unitPrice: unitPrice,
                unitQuantity: unitQuantity
            };
        }

        if (line.match(/(.+)(\b\d+%=\d+\.\d+)/)) {
            const taxMatch = line.match(/(.+)(\b\d+%=\d+\.\d+)/) || [];
            const allTax = taxMatch[1].trim();
            const taxData = taxMatch[2].split('=');
            const taxPercentage = taxData[0].replace(/%/g, "").trim();
            const taxAmount = parseFloat(taxData[1]);
            const taxDescriptionMatch = allTax.match(/[^\d=%]+\b/);
            const mainDesc = taxDescriptionMatch ? taxDescriptionMatch[0].trim() : '';

            let taxType, igst, cgst, sgst;

            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }

            currentTax = {
                allTax: allTax,
                mainDesc: mainDesc,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                taxType: taxType,
                igst: igst,
                cgst: cgst,
                sgst: sgst
            };

            if (currentHSN && currentTax) {
                currentHSN.description += ` ${currentTax.mainDesc}`;

                const combinedData = {
                    ...currentHSN,
                    ...currentTax
                };
                structuredHSNLines.push(combinedData);
                currentHSN = null;
                currentTax = null;
            }
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /MAA+[A-Z0-9]{7}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'OIA GLOBAL INDIA PVT LTD';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/INVOICE\s+DATE/i, "").trim() : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';
                invoiceNumber = invoiceNumber.replace(/\bTAX\s*INVOICE\b/, '').trim();

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + charge + taxAmount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage == 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage == 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(allLines, null, 2))
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }

}

export const extractFredexfrieght = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    console.log(allLines)
    const structuredHSNLines = [];
    const hsns = [];
    const hsnTaxes = [];
    const hsnTaxesRegex = / \d+\.\d{6} /;
    const qtyArray = []
    for (const line of allLines) {
        if (line.content.includes("996", /^\d{3}$/)) {
            hsns.push(line.content);
        }
        const match = line.content.match(hsnTaxesRegex);
        if (match) {
            hsnTaxes.push(line.content);
        }
        if (line.content.includes(`DUPLICATE FOR SUPPLIER`)) {
            break;
        }
        if (line.content.includes("CTN")) {
            qtyArray.push(line.content);
        }
    };
    console.log(hsns, hsnTaxes)
    const itemCodesArray = ['OTC1', 'DOFD1', 'CCOD1', '%']
    if (hsns.length != 0 && hsnTaxes.length != 0) {
        let hsnIndex = 0;
        for (const rec of hsnTaxes) {
            // const unitQuantity = rec.match(/\d{6}\s+(\d+\.\d{3})/)?.[1]?.trim();
            const hsnTaxesArray = hsnTaxes[hsnIndex].split(' ').filter(rec => rec != '');
            console.log(hsnTaxesArray)
            const unitPrice = hsnTaxesArray.filter(rec => rec.match(/([\d,]*\d+\.\d{2})/));
            console.log(unitPrice)
            const taxType = hsnTaxesArray.length < 12 ? "No Tax" : (hsnTaxesArray[1] == 0 && hsnTaxesArray[3] == 0) ? "IGST" : "CGST & SGST";
            const qtySplittedArray = qtyArray[0].split(' ').filter(rec => rec != '');
            const unitQuantity = qtySplittedArray.find(rec => rec.match(/([\d,]*\d+\.\d{2})/));
            const hsnLinesData = {
                HSN: hsns[0].match(/ \d{6} /g)?.[0]?.trim(),
                taxType,
                taxAmount: taxType === "No Tax" ? 0 : taxType === "IGST" ? hsnTaxesArray[6] : Number(unitPrice[5]) + Number(unitPrice[6]),
                taxPercentage: taxType === "No Tax" ? 0 : taxType === "IGST" ? hsnTaxesArray[5] : unitPrice[1],
                // charge: hsnTaxesArray.length < 12 ? hsnTaxesArray[hsnTaxesArray.length - 1] : 0,
                quotation: null,
                unitPrice: unitPrice.length ? taxType === "No Tax" ? unitPrice[2] : unitPrice[2] : 0,
                innAmount: unitPrice.length ? taxType === "No Tax" ? unitPrice[2] : unitPrice[2] : 0,
                igst: unitPrice.length ? taxType === "IGST" ? unitPrice[7] : unitPrice[7] : 0,
                cgst: unitPrice.length ? taxType === "CGST & SGST" ? unitPrice[5] : unitPrice[5] : 0,
                sgst: unitPrice.length ? taxType === "CGST & SGST" ? unitPrice[6] : unitPrice[6] : 0,
                charge: (unitPrice[4] || '').trim() !== '' ? unitPrice[4] : unitPrice[3],
                unitQuantity: unitQuantity ? unitQuantity : 0,
                amount: taxType === "No Tax" ? hsnTaxesArray[hsnTaxesArray.length - 1] : 0,
                description: hsnTaxesArray.splice(1, hsnTaxesArray.length).filter(rec => (!rec.match(/([\d,]*\d+\.\d{2})/) && !currency_list.includes(rec) && !itemCodesArray.includes(rec))).join(' '),
            }
            structuredHSNLines.push(hsnLinesData);
            hsnIndex += 1;
        }
    }


    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /(\d+\/\d+\/\d+)\s+(\d+\/\d+\/\d+)/;
    const invoiceNumberRegex = /Invoice Number : (\w+)/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (let i = 0; i < extractedData.length; i++) {
            const line = extractedData[i];

            if (line.content.match(/GSTIN:\s[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/)) {
                continue;
            }

            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];
                venName = 'FedEx Trade Networks Transport & Brokerage Private Limited';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.match(invoiceDateRegex)[1] : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex)[1] : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const cgst = parseFloat(hsnLine.cgst) || 0;
                    const igst = parseFloat(hsnLine.igst) || 0;
                    const sgst = parseFloat(hsnLine.sgst) || 0;
                    const innAmount = hsnLine.innAmount && typeof hsnLine.innAmount === 'string' ? parseFloat(hsnLine.innAmount.replace(/,/g, '')) : 0;
                    return add + innAmount + cgst + igst + sgst;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxType === "IGST") {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.isgt || 0)).toFixed(2);
                    } else if (hsnLine.taxType === "CGST & SGST") {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.cgst || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.sgst || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
            if (line.content.includes(`DUPLICATE FOR SUPPLIER`)) {
                break;
            }
        }
    }

    console.log("FREDEX FRIEGHT PDF DATA", JSON.stringify(allLines, null, 2))
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }

}

export const extractFredexCourier = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf, [1]);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let taxId = null;
    let cgstId = null;
    let linesId = 0;
    const mainMatch = extractedData.find(line => line.content.match((/Charges\s+KA\s+IGST\s+18%\s+Total/)));
    if (mainMatch) {
        taxId = mainMatch.id;
    }
    for (const line of extractedData) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);
        if (hsnMatch) {
            hsnId = linesId;

            currentHSN = {
                description: extractedData[hsnId - 1].content,
                HSN: hsnMatch[0],
                unitQuantity: 0,
                unitPrice: 0,
                charge: 0,
                amount: 0,
                igst: 0,
                cgst: 0,
                sgst: 0,
                taxType: "No Tax",
                taxPercentage: 0,
            };
            const cgstMatch = extractedData.find(line => line.content.match(/KA (SGST|CGST) (\d+%)/));
            cgstId = cgstMatch.id;
            if (cgstMatch) {
                const taxIdArray = taxId.split('-');
                taxIdArray[1] = Number(taxIdArray[1]) + 1;

                const cgstIdArray = cgstId.split('-');
                cgstIdArray[1] = Number(cgstIdArray[1]) + 1;

                const igstMatch = extractedData.find(rec => rec.id === taxIdArray.join('-')).content.match(/(\d{1,3}(,\d{3})*\.\d{2})/g);
                const igst = igstMatch ? parseFloat(igstMatch[1].replace(/,/g, '')).toFixed(2) : "0.00";

                const cgstMatch = extractedData.find(rec => rec.id === cgstIdArray.join('-')).content.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/);
                const cgst = cgstMatch ? parseFloat(cgstMatch[0].replace(/,/g, '')).toFixed(2) : "0.00";

                const sgstMatch = extractedData.find(rec => rec.id === cgstIdArray.join('-')).content.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/);
                const sgst = sgstMatch ? parseFloat(sgstMatch[0].replace(/,/g, '')).toFixed(2) : "0.00";

                const unitQuantityContent = extractedData[hsnId + 12].content;
                const unitQuantity = parseFloat(unitQuantityContent) || 1;

                const charge = parseFloat(extractedData[hsnId - 2].content.replace(/,/g, '')).toFixed(2);
                const amount = parseFloat(extractedData[hsnId - 2].content.replace(/,/g, ''));
                const unitPrice = (amount / unitQuantity).toFixed(2);

                let taxType;
                let taxAmount;
                let taxPercentage;

                if (igst === "0.00" && (cgst !== "0.00" || sgst !== "0.00")) {
                    taxType = "CGST & SGST";
                    taxPercentage = 9;
                    taxAmount = parseFloat(cgst) && parseFloat(sgst);
                } else if (igst !== "0.00") {
                    taxType = "IGST";
                    taxPercentage = 18;
                    taxAmount = parseFloat(igst);
                } else {
                    taxType = "No Tax";
                    taxPercentage = 0;
                    taxAmount = 0;
                }

                currentHSN = {
                    description: extractedData[hsnId - 1].content,
                    HSN: hsnMatch[0],
                    unitQuantity: unitQuantity,
                    unitPrice: unitPrice,
                    taxType: taxType,
                    taxPercentage: taxPercentage,
                    charge: charge,
                    taxAmount: taxAmount,
                    amount: amount,
                    igst: igst,
                    cgst: cgst,
                    sgst: sgst,
                };
            }

            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }
        }

        linesId += 1;
    }



    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
    const invoiceNumberRegex = /263\d{6}/;
    const invoiceAmountRegex = [" Total Amount Due   INR   "];
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let invoiceAmount = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '29AABCF6516A1ZZ') {
                venName = 'FedEx Express Transportation and Supply Chain Services (India) Pvt. Ltd';
                // }

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                invoiceNumber = invoiceNumber.replace(/\bTAX\s*INVOICE\b/, '').trim();
                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/ Total\s+Amount\s+Due\s+INR\s+/i, '').trim() : '';

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxType === "IGST") {
                        igst = (parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxType === "CGST & SGST") {
                        cgst = (parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("FREDEX COURIER PDF DATA", JSON.stringify(allLines, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

    // const InvoiceLines = [];
    // let currentInvoice = null;
    // let gstNumberExtracted = false;
    // let venName = '';
    // const vendorNameId = '1-2';
    // const invoiceDateId = '1-9';
    // const invoiceDateId2 = '1-10';
    // const invoiceNumberId = '1-254';
    // const invoiceNumberId2 = '1-224';
    // const invoiceCurrency = 'INR';
    // const currentYear = new Date().getFullYear();
    // const nextYear = currentYear + 1;
    // const financialYear = `${currentYear}-${nextYear}`;

    // if (extractedData && Array.isArray(extractedData)) {
    //     let invoiceDate = '';
    //     let invoiceNumber = '';

    //     for (const line of extractedData) {
    //         if (line.id >= '1-201' && line.id <= '2-300') {
    //             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
    //             if (gstMatch && !gstNumberExtracted) {
    //                 const gstNumber = gstMatch[0];

    //                 if (gstNumber === '33AAHCA6078Q1Z3') {
    //                     venName = 'Damco India Pvt. Ltd';
    //                 } else {
    //                     const vendorNameData = extractedData.find((item) => item.id === vendorNameId);
    //                     venName = vendorNameData ? vendorNameData.content : '';
    //                 }

    //                 const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
    //                 if (invoiceDateData && invoiceDateData.content.trim() !== '') {
    //                     invoiceDate = invoiceDateData.content.replace(/^INVOICE DATE:\s*/, '');
    //                 } else {
    //                     const invoiceDateData2 = extractedData.find((item) => item.id === invoiceDateId2);
    //                     if (invoiceDateData2 && invoiceDateData2.content.trim() !== '') {
    //                         invoiceDate = invoiceDateData2.content.replace(/^INVOICE DATE:\s*/, '');
    //                     }
    //                 }

    //                 const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
    //                 if (invoiceNumberData && invoiceNumberData.content.trim() !== '') {
    //                     invoiceNumber = invoiceNumberData.content.replace(/^INVOICE NUMBER:\s*/, '');
    //                 } else {
    //                     const invoiceNumberData2 = extractedData.find((item) => item.id === invoiceNumberId2);
    //                     if (invoiceNumberData2 && invoiceNumberData2.content.trim() !== '') {
    //                         invoiceNumber = invoiceNumberData2.content.replace(/^INVOICE NUMBER:\s*/, '');
    //                     }
    //                 }

    //                 const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
    //                     const amount = parseFloat(hsnLine.amount) || 0;
    //                     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
    //                     return add + amount + taxAmount;
    //                 }, 0).toFixed(2);

    //                 const igst = structuredHSNLines.reduce((acc, hsnLine) => {
    //                     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
    //                     return acc + taxAmount;
    //                 }, 0).toFixed(2);

    //                 const cgst = structuredHSNLines.reduce((add, hsnLine) => {
    //                     return add + parseFloat(hsnLine.cgst) || 0;
    //                 }, 0).toFixed(2);

    //                 const sgst = structuredHSNLines.reduce((acc, hsnLine) => {
    //                     return acc + parseFloat(hsnLine.sgst) || 0;
    //                 }, 0).toFixed(2);

    //                 currentInvoice = {
    //                     "venName": venName,
    //                     "gstNumber": gstNumber,
    //                     "invoiceDate": invoiceDate,
    //                     "invoiceNumber": invoiceNumber,
    //                     "invoiceCurrency": invoiceCurrency,
    //                     "financialYear": financialYear,
    //                     "invoiceAmount": invoiceAmount,
    //                     "igst": igst,
    //                     "cgst": cgst,
    //                     "sgst": sgst,
    //                 };
    //                 InvoiceLines.push(currentInvoice);
    //                 gstNumberExtracted = true;
    //             }
    //         }
    //     }
    // }
    // console.log("ALL LINES", JSON.stringify(allLines, null, 2));
    // return {
    //     extractedData: InvoiceLines[0],
    //     extractedHsnData: structuredHSNLines
    // };


}

export const extractTotalTransport = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/996\d{3}$/)) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentage = parseFloat(extractedData[hsnId - 7].content);
            let taxType = "No Tax";
            if (taxPercentage === 18) {
                taxType = "IGST";
            } else if (taxPercentage === 9) {
                taxType = "CGST & SGST";
            }

            currentHSN = {
                description: extractedData[hsnId + 1].content,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: extractedData[hsnId - 3].content,
                unitPrice: extractedData[hsnId - 2].content,
                taxType: taxType,
                charge: extractedData[hsnId - 6].content,
                taxPercentage: taxPercentage,
                taxAmount: extractedData[hsnId + 3].content,
                amount: extractedData[hsnId - 8].content,

            };

        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /812[A-Z0-9]{13}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'TOTAL TRANSPORT SYSTEMS LIMITED';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    return add + amount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }


                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

// /\*\s+(.+)\s+(\d+)\s+(\w+)\s+([\d,.]+)\s+([X\d.]+)\s+([\d.,]+(\d+|.)+)/

export const extractSanjayForwarder = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/996\d{3}$/)) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentage = parseFloat(extractedData[hsnId - 7].content);
            let taxType = "No Tax";
            if (taxPercentage === 18) {
                taxType = "IGST";
            } else if (taxPercentage === 9) {
                taxType = "CGST & SGST";
            }

            currentHSN = {
                description: extractedData[hsnId + 1].content,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: extractedData[hsnId - 3].content,
                unitPrice: extractedData[hsnId - 2].content,
                taxType: taxType,
                charge: extractedData[hsnId - 6].content,
                taxPercentage: taxPercentage,
                taxAmount: extractedData[hsnId + 3].content,
                amount: extractedData[hsnId - 8].content,

            };

        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /118\s+-\s+(\d+)/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'SANJAY FORWARDERS PVT LTD';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    return add + amount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }


                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

// export const extractOneTime = async (pdf) => {
//     const allLines = await extractPDFDataToLinesData(pdf);
//     const extractedData = allLines;
//     const structuredHSNLines = [];
//     let currentHSN = null;
//     let hsnId = null;
//     let linesId = 0;

//     for (const line of extractedData) {
//         if (line.content.match(/996\d{3}$/)) {
//             hsnId = linesId;
//             if (currentHSN) {
//                 structuredHSNLines.push(currentHSN);
//             }

//             const taxPercentage = parseFloat(extractedData[hsnId - 7].content);
//             let taxType = "No Tax";
//             if (taxPercentage === 18) {
//                 taxType = "IGST";
//             } else if (taxPercentage === 9) {
//                 taxType = "CGST & SGST";
//             }

//             currentHSN = {
//                 description: extractedData[hsnId -2].content,
//                 HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
//                 unitQuantity: extractedData[hsnId + 8].content,
//                 unitPrice: extractedData[hsnId + 4].content,
//                 taxType: taxType,
//                 charge: extractedData[hsnId + 12].content,
//                 taxPercentage: taxPercentage,
//                 taxAmount: extractedData[hsnId + 3].content,
//                 amount: extractedData[hsnId - 8].content,

//             };

//         }
//         linesId += 1;
//     }

//     if (currentHSN) {
//         structuredHSNLines.push(currentHSN);
//     }

//     const InvoiceLines = [];
//     let gstNumberExtracted = false;

//     const invoiceDateRegex = /[A-Z0-9]{2}\s+[A-Za-z]{3}\s+(\d+)/;
//     const invoiceNumberRegex =/DMA[A-Z0-9]{10}/;
//     const invoiceCurrency = 'INR';
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     if (extractedData && Array.isArray(extractedData)) {
//         let venName = '';
//         let invoiceDate = '';
//         let invoiceNumber = '';

//         for (const line of extractedData) {
//             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//             if (gstMatch && !gstNumberExtracted) {
//                 const gstNumber = gstMatch[0];

//                 venName = 'ON TIME INTERNATIONAL LOGISTICS PRIVATE LIMITED';

//                 const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
//                 invoiceDate = invoiceDateData ? invoiceDateData.content : '';

//                 const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
//                 invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

//                 const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
//                     const amount = parseFloat(hsnLine.amount) || 0;
//                     return add + amount;
//                 }, 0).toFixed(2);

//                 let igst = "0.00";
//                 let cgst = "0.00";
//                 let sgst = "0.00";

//                     for (const hsnLine of structuredHSNLines) {
//                         if (hsnLine.taxPercentage === 18) {
//                             igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                         } else if (hsnLine.taxPercentage === 9) {
//                             cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                             sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                         }
//                     }


//                 const currentInvoice = {
//                     "venName": venName,
//                     "gstNumber": gstNumber,
//                     "invoiceDate": invoiceDate,
//                     "invoiceNumber": invoiceNumber,
//                     "invoiceCurrency": invoiceCurrency,
//                     "financialYear": financialYear,
//                     "invoiceAmount": invoiceAmount,
//                     "igst": igst,
//                     "cgst": cgst,
//                     "sgst": sgst,
//                 };

//                 InvoiceLines.push(currentInvoice);
//                 gstNumberExtracted = true;
//             }
//         }
//     }

//     console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
//     console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
//     console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

//     return {
//         extractedData: InvoiceLines[0],
//         extractedHsnData: structuredHSNLines
//     };
// }

export const extractOneTime = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    const uniqueDescriptions = new Set();

    let currentHSN = null;
    let currentTax = null;
    let taxAmount = 0;
    const taxRegMatch = /(IGST|CGST|SGST)\s+(\d+|.)+(%)/
    const taxMatchElement = extractedData.find((item) => item.content.match(taxRegMatch));
    const taxMatch = taxMatchElement.content.match(taxRegMatch);
    const taxPercentageData = taxMatch[0] ? taxMatch[0] : '';
    const taxPercentage = parseFloat(taxPercentageData.replace(/[a-zA-Z%|]/g, ""));

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        if (extractedData[hsnId].content.includes('Signature'))
            break;
        const line = extractedData[hsnId].content;

        const matchData = line.match(/\*\s+(.+)\s+(\d+)\s+(\w+)\s+([\d,.]+)\s+([X\d.]+)\s+([\d.,]+(\d+|.)+)/);

        if (matchData) {
            const description = matchData[1] ? matchData[1].trim() : " ";

            if (!uniqueDescriptions.has(description)) {
                const HSN = matchData[2] ? matchData[2].trim() : '';
                const unitPrice = matchData[4] ? matchData[4].trim() : '';
                const chargeComponents = matchData[6] ? matchData[6].trim().split(/\s+/) : [];
                const charge = chargeComponents.length > 0 ? chargeComponents[chargeComponents.length - 1].replace(/,/g, "") : '';
                const unitQuantityComponents = matchData[6] ? matchData[6].trim().split(/\s+/) : [];
                const unitQuantity = unitQuantityComponents.length > 2 ? unitQuantityComponents[unitQuantityComponents.length - 3] : '';

                let taxType, igst, cgst, sgst;
                taxAmount = (taxPercentage * charge) / 100;
                if (taxPercentage === 9) {
                    taxType = 'CGST & SGST';
                    igst = 0;
                    cgst = taxAmount;
                    sgst = taxAmount;
                } else if (taxPercentage === 18) {
                    taxType = 'IGST';
                    igst = taxAmount;
                    cgst = 0;
                    sgst = 0;
                } else {
                    taxType = 'No Tax';
                    igst = 0;
                    cgst = 0;
                    sgst = 0;
                }

                currentTax = {
                    taxPercentage: taxPercentage,
                    taxType: taxType,
                    igst: igst,
                    cgst: cgst,
                    sgst: sgst
                };
                currentHSN = {
                    description: description,
                    HSN: HSN,
                    unitQuantity: unitQuantity,
                    unitPrice: unitPrice,
                    charge: charge,
                    taxAmount: taxAmount,
                };
                if (currentHSN && currentTax) {
                    structuredHSNLines.push({
                        ...currentHSN,
                        ...currentTax,
                    });
                    currentHSN = null;
                    currentTax = null;
                }
                uniqueDescriptions.add(description);
            }
        }


    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));


    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    let venName = '';
    const invoiceDateRegex = /[A-Z0-9]{2}\s+[A-Za-z]{3}\s+(\d+)/;
    const invoiceNumberRegex = /DMA[A-Z0-9]{10}/;
    const invoiceAmountRegex = /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+(\w+)\s+(\w+)\s+(\w+):\s(\d{1,2}\s[A-Za-z]{3}\s\d{4})+(|.)+([\w])+/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;
    // let isAlreadyClientMatched = false;
    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                // if (!isAlreadyClientMatched) {
                //     isAlreadyClientMatched = true;
                //     continue; 
                // }
                venName = ' ON TIME INTERNATIONAL LOGISTICS PRIVATE LIMITED';
                const gstNumber = gstMatch[0];
                let invoiceNumber = '';
                let invoiceDate = '';
                let invoiceAmount = '';

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                if (invoiceAmountData) {
                    const invoiceAmountMatches = invoiceAmountData.content.match(invoiceAmountRegex);
                    if (invoiceAmountMatches) {
                        const innAmount = invoiceAmountMatches[1];
                        invoiceAmount = innAmount;

                    }
                }

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/:/g, "") : '';

                // /GST\s+(\w+)(:)\s+(|.)+/ igst data 

                // /IGST\s+(\d+|.)+(\%)/ taxPercentage


                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (
                            parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)
                        ).toFixed(2);
                        sgst = (
                            parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)
                        ).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };
                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }
    console.log("APL PDF DATA", JSON.stringify(allLines, null, 2))
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

// /(\d.+)\s+([^\d]+)\s+(\d+)\s+(\d.+)\s(\d+)\s+(\d+)|(\d+)\s+([^\d]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/
export const extractTextiles = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    // const structuredHSNLines = [];
    // let currentHSN = null;

    // for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
    //     const line = extractedData[hsnId].content;

    //     const matchData = line.match(/(\d.+)\s+([^\d]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/) || [];

    //     if (matchData.length > 0) {
    //         const description = matchData[1].trim();
    //         const HSN = matchData[3] || '';
    //         const unitPrice = matchData[3].replace(/,/g, "");
    //         const charge = matchData[4].replace(/,/g, "") || '';
    //         const taxPercentage = Number(matchData[9]) + Number(matchData[7]) || 0;
    //         const taxAmount = Number(matchData[8]) + Number(matchData[10]) || 0;

    //         let taxType, igst, cgst, sgst;
    //         if (taxPercentage === 9|| taxPercentage === 6) {
    //             taxType = 'CGST & SGST';
    //             igst = 0;
    //             cgst = taxAmount;
    //             sgst = taxAmount;
    //         } else if (taxPercentage === 18 || taxPercentage === 12) {
    //             taxType = 'IGST';
    //             igst = taxAmount;
    //             cgst = 0;
    //             sgst = 0;
    //         } else {
    //             taxType = 'No Tax';
    //             igst = 0;
    //             cgst = 0;
    //             sgst = 0;
    //         }

    //         currentHSN = {
    //             description: description,
    //             HSN: HSN,
    //             charge: charge,
    //             unitPrice: unitPrice,
    //             taxPercentage: taxPercentage,
    //             taxType: taxType,
    //             taxAmount: taxAmount,
    //             igst: igst,
    //             cgst: cgst,
    //             sgst: sgst,
    //         };

    //         structuredHSNLines.push(currentHSN);
    //     }
    // }

    const structuredHSNLines = [];
    let currentHSN = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/(\d.+)\s+([^\d]+)\s+(\d+)\s+(\d+)\s+(\d+(\.\d+)?)\s+(\d+)\s+(\d+(\.\d+)?)\s+(\d+)\s+(\d+)\s+(\d+)/) || [];

        if (matchData.length > 0) {
            let description = matchData[1].trim();
            const charge = parseInt(matchData[3]);
            const taxPercentage = Number(matchData[4]) + Number(matchData[10]);
            const taxAmount = Number(matchData[5]) + Number(matchData[11]);
            const hsnMatch = description.match(/\b998\d+\b/);
            const HSN = hsnMatch ? hsnMatch[0] : '';

            if (HSN) {
                description = description.replace(HSN, '').trim();
            }

            let taxType, igst, cgst, sgst;
            if (taxPercentage === 9 || taxPercentage === 6) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage === 18 || taxPercentage === 12) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }

            currentHSN = {
                description: description,
                HSN: HSN,
                charge: charge,
                taxPercentage: taxPercentage,
                taxType: taxType,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
            };

            structuredHSNLines.push(currentHSN);
        }
    }



    const InvoiceLines = [];
    let gstNumberExtracted = false;
    const invoiceDateRegex = /[0-9]{2}-[0-9]{2}-[0-9]{4}/;
    const invoiceNumberRegex = /TCB+[A-Z0-9]{12}|FIO[A-Z0-9]{13}/;
    const invoiceAmountRegex = ['Total   '];
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let invoiceAmount = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '29AABCD3611Q1ZE') {
                venName = 'TEXTILES COMMITTEE';
                // }

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                const dateMatch = invoiceDateData ? invoiceDateData.content.match(/Invoice Date:\s*([0-9]{2}-[0-9]{2}-[0-9]{4})/) : null;
                invoiceDate = dateMatch ? dateMatch[1] : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                const numberMatch = invoiceNumberData ? invoiceNumberData.content.match(/Invoice No:\s*([A-Z0-9]{15})/) : null;
                invoiceNumber = numberMatch ? numberMatch[1] : '';

                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                if (invoiceAmountData) {
                    const amounts = invoiceAmountData.content.split(/\s+/).filter(val => val !== '');
                    invoiceAmount = amounts.length > 0 ? amounts[amounts.length - 1] : '';
                } else {
                    invoiceAmount = '';
                }


                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18 || hsnLine.taxPercentage === 12) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9 || hsnLine.taxPercentage === 6) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DhlCourier PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };


}

export const checkIsScannedPdf = async (pdf) => {
    // Analyze each page for text or images
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();

        // Check if there's any text content
        if (content.items.length === 0) {
            return true;
        }
    }
    return false;
};

export const extractedUnicorn = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/^\d{6}$/)) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxAmount = extractedData[hsnId - 8].content.replace(/,/g, "");
            const taxPercentage = parseFloat(extractedData[hsnId - 7].content);
            let taxType = "No Tax";
            if (taxPercentage === 18) {
                taxType = "IGST";
            } else if (taxPercentage === 9) {
                taxType = "CGST & SGST";
            }

            currentHSN = {
                // quotation:extractedData[hsnId-1].content,
                description: extractedData[hsnId - 10].content,
                HSN: line.content.includes("HSN")
                    ? line.content.match(/\d+/)
                    : line.content.trim(),
                unitQuantity: extractedData[hsnId - 2].content,
                unitPrice: extractedData[hsnId - 3].content,
                taxType: taxType,
                charge: extractedData[hsnId - 6].content,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                tax: extractedData[hsnId - 6].content,
                roe: extractedData[hsnId - 9].content,
                // amount: (parseFloat(extractedData[hsnId - 6].content.replace(/,/g, '')) || 0) + ( parseFloat(extractedData[hsnId - 8].content.replace(/,/g, '')) || 0 ),
                amount: Math.round(
                    (parseFloat(extractedData[hsnId - 6].content.replace(/,/g, "")) ||
                        0) +
                    (parseFloat(extractedData[hsnId - 8].content.replace(/,/g, "")) ||
                        0)
                ),
                // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /USL(\/[A-Z0-9]{4}(\/[0-9]{2})(\/[0-9]{3}))/;

    const invoiceCurrency = "INR";
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = "";
        let invoiceDate = "";
        let invoiceNumber = "";
        let taxableAmount = "";

        for (const line of extractedData) {
            const gstMatch = line.content.match(
                /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g
            );
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '33AAACM6824H4ZK') {
                venName = "UNICORN SHIPPING AND LOGISTICS";
                // }

                const invoiceDateData = extractedData.find((item) =>
                    item.content.match(invoiceDateRegex)
                );
                invoiceDate = invoiceDateData ? invoiceDateData.content : "";

                const invoiceNumberData = extractedData.find((item) =>
                    item.content.match(invoiceNumberRegex)
                );
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : "";

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + amount;
                }, 0);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxType === "IGST") {
                        igst = (
                            parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)
                        ).toFixed(2);
                    } else if (hsnLine.taxType === "CGST & SGST") {
                        cgst = (
                            parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)
                        ).toFixed(2);
                        sgst = (
                            parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)
                        ).toFixed(2);
                    }
                }

                const currentInvoice = {
                    venName: venName,
                    gstNumber: gstNumber,
                    invoiceDate: invoiceDate,
                    invoiceNumber: invoiceNumber,
                    invoiceCurrency: invoiceCurrency,
                    financialYear: financialYear,
                    invoiceAmount: invoiceAmount,
                    igst: igst,
                    cgst: cgst,
                    sgst: sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines,
    };
};

export const extractedUnique = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;

    for (const line of allLines) {
        if (line.content.includes("996") || line.content.match(/^\d{6}$/)) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            currentHSN = {
                description: "",
                HSN: line.content.includes("SAC")
                    ? line.content.match(/\d+/)
                    : line.content.replace(/\]/g, "").trim(),
                unitQuantity: null,
                unitPrice: null,
                taxType: null,
                charge: null,
                taxAmount: null,
                amount: null,
                quotation: null,
            };
        } else if (currentHSN && !currentHSN.taxType) {
            const taxtypeMatch = line.content.match(/IGST|CGST|SGST|GST/);
            if (taxtypeMatch) {
                if (taxtypeMatch[0] === "CGST" || taxtypeMatch[0] === "SGST") {
                    currentHSN.taxType = "CGST & SGST";
                    if (currentHSN.taxPercentage === 18) {
                        currentHSN.charge = "0.00";
                    }
                } else {
                    currentHSN.taxType = taxtypeMatch[0];
                    if (currentHSN.taxPercentage === 9) {
                        currentHSN.charge = "0.00";
                    }
                }
            }
        }

        if (currentHSN && currentHSN.HSN && !currentHSN.taxType) {
            if (!line.content.includes("996")) {
                const wholeNumberMatch = line.content.match(/\b(\d+)\b/);
                if (wholeNumberMatch) {
                    if (!currentHSN.unitQuantity) {
                        currentHSN.unitQuantity = parseInt(wholeNumberMatch[1]);
                    }
                }
                currentHSN.description += " " + line.content.trim();
                currentHSN.description = currentHSN.description.replace(
                    /[^a-zA-Z ]/g,
                    ""
                );
            }
        }

        if (line.content.includes("quotation")) {
            const quotationValueMatch = line.content.match(
                /^\d{1,3}(,\d{3})*(\.\d{2})?/
            );
            if (quotationValueMatch) {
                currentHSN.quotation = parseFloat(
                    quotationValueMatch[0].replace(/,/g, "")
                );
            }
        }

        const percentageMatch = line.content.match(/(\d+%)=(\d+|.)+/);
        if (percentageMatch && currentHSN) {
            currentHSN.taxPercentage = parseFloat(percentageMatch[1]);
        }

        //   const percentageMatch = line.content.match(/(\d+(\.\d+)?)%/);
        //   if (percentageMatch && currentHSN) {
        //     const extractedPercentage = parseFloat(percentageMatch[1]);
        //     // Check if the extractedPercentage is any number
        //     if (!isNaN(extractedPercentage)) {
        //       currentHSN.taxPercentage = extractedPercentage;
        //     }
        //   }

        if (line.content.includes("=") && currentHSN) {
            const taxAmountMatch = line.content.match(
                /=(\d{1,3}(,\d{3})*(\.\d{2})?)/
            );
            if (taxAmountMatch) {
                currentHSN.taxAmount = parseFloat(taxAmountMatch[1].replace(/,/g, ""));

                if (!isNaN(currentHSN.taxAmount) && !isNaN(currentHSN.taxPercentage)) {
                    const taxAmountFloat = parseFloat(currentHSN.taxAmount);
                    const taxPercentageFloat = parseFloat(currentHSN.taxPercentage);
                    if (
                        !isNaN(taxAmountFloat) &&
                        !isNaN(taxPercentageFloat) &&
                        taxPercentageFloat !== 0
                    ) {
                        const equivalentFor100Percent =
                            (taxAmountFloat * 100) / taxPercentageFloat;
                        currentHSN.charge = equivalentFor100Percent.toFixed(2);
                        currentHSN.amount = equivalentFor100Percent.toFixed(2);

                        const unitQuantity = parseFloat(currentHSN.unitQuantity);
                        if (!isNaN(unitQuantity) && unitQuantity !== 0) {
                            currentHSN.unitPrice = (
                                equivalentFor100Percent / unitQuantity
                            ).toFixed(2);
                        } else {
                            currentHSN.unitQuantity = 1;
                            currentHSN.unitPrice = equivalentFor100Percent.toFixed(2);
                        }
                    } else {
                        currentHSN.charge = "0";
                        currentHSN.amount = "0";
                    }
                }
                if (currentHSN.taxPercentage === 18) {
                    currentHSN.cgst = currentHSN.taxAmount;
                } else if (currentHSN.taxPercentage === 9) {
                    currentHSN.sgst = currentHSN.taxAmount;
                    currentHSN.cgst = currentHSN.taxAmount;
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /(TAX)\s+(INVOICE)\s+MAA[A-Z0-9]{7}/;
    const invoiceCurrency = "INR";
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = "";
        let invoiceDate = "";
        let invoiceNumber = "";

        for (const line of extractedData) {
            const gstMatch = line.content.match(
                /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g
            );
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '29AAACD3181G1ZR') {
                venName = "UNIQUE LOGISTICS INTERNATIONAL INDIA PVT LTD";
                // }

                const invoiceDateData = extractedData.find((item) =>
                    item.content.match(invoiceDateRegex)
                );
                invoiceDate = invoiceDateData ? invoiceDateData.content : "";

                const invoiceNumberData = extractedData.find((item) =>
                    item.content.match(invoiceNumberRegex)
                );
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : "";
                invoiceNumber = invoiceNumber.replace(/\bTAX\s*INVOICE\b/, "").trim();

                const invoiceAmount = structuredHSNLines
                    .reduce((add, hsnLine) => {
                        const charge = parseFloat(hsnLine.charge) || 0;
                        const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                        return add + charge + taxAmount;
                    }, 0)
                    .toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (
                            parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)
                        ).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (
                            parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)
                        ).toFixed(2);
                        sgst = (
                            parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)
                        ).toFixed(2);
                    }
                }

                currentInvoice = {
                    venName: venName,
                    gstNumber: gstNumber,
                    invoiceDate: invoiceDate,
                    invoiceNumber: invoiceNumber,
                    invoiceCurrency: invoiceCurrency,
                    financialYear: financialYear,
                    invoiceAmount: invoiceAmount,
                    igst: igst,
                    cgst: cgst,
                    sgst: sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(allLines, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines,
    };
};

//   /\: ".*?(\w+).*?(\d{6}).*?(\d+\.\d{2}).*?(\d+)(|.)+/   

//   export const extractedTvs = async (pdf) => {
//     const allLines = await extractPDFData(pdf);
//     const extractedData = allLines;

//     const structuredHSNLines = [];
//     let currentHSN = null;

//     for (const line of allLines) {
//       if (line.content.includes("996") || line.content.match(/^\d{6}$/)) {
//         if (currentHSN) {
//           structuredHSNLines.push(currentHSN);
//         }

//         currentHSN = {
//           description: "",
//           HSN: line.content.includes("SAC")
//             ? line.content.match(/\d+/)
//             : line.content.replace(/\]/g, "").trim(),
//           unitQuantity: null,
//           unitPrice: null,
//           taxType: null,
//           charge: null,
//           taxAmount: null,
//           amount: null,
//           quotation: null,
//         };
//       } else if (currentHSN && !currentHSN.taxType) {
//         const taxtypeMatch = line.content.match(/IGST|CGST|SGST|GST/);
//         if (taxtypeMatch) {
//           if (taxtypeMatch[0] === "CGST" || taxtypeMatch[0] === "SGST") {
//             currentHSN.taxType = "CGST & SGST";
//             if (currentHSN.taxPercentage === 18) {
//               currentHSN.charge = "0.00";
//             }
//           } else {
//             currentHSN.taxType = taxtypeMatch[0];
//             if (currentHSN.taxPercentage === 9) {
//               currentHSN.charge = "0.00";
//             }
//           }
//         }
//       }

//       // /(\w+)\s+(\w+)\s+(.*)(?:\s+)?(?:INR|@)/

//       if (currentHSN && currentHSN.HSN && !currentHSN.taxType) {
//         if (!line.content.includes("996")) {
//           const wholeNumberMatch = line.content.match(/\b(\d+)\b/);
//           if (wholeNumberMatch) {
//             if (!currentHSN.unitPrice) {
//               currentHSN.unitPrice = parseInt(wholeNumberMatch[1], 10);
//             }
//           }
//           currentHSN.description += ' ' + line.content.trim();
//           currentHSN.description = currentHSN.description.replace(/[^a-zA-Z ]/g, '');
//         }
//       }

//       if (line.content.includes("quotation")) {
//         const quotationValueMatch = line.content.match(
//           /^\d{1,3}(,\d{3})*(\.\d{2})?/
//         );
//         if (quotationValueMatch) {
//           currentHSN.quotation = parseFloat(
//             quotationValueMatch[0].replace(/,/g, "")
//           );
//         }
//       }

//       const percentageMatch = line.content.match(/(\d+(\.\d+)?)%/);
//       if (percentageMatch && currentHSN) {
//         currentHSN.taxPercentage = parseFloat(percentageMatch[1]);
//       }

//       if (line.content.includes("=") && currentHSN) {
//         const taxAmountMatch = line.content.match(
//           /=(\d{1,3}(,\d{3})*(\.\d{2})?)/
//         );
//         if (taxAmountMatch) {
//           currentHSN.taxAmount = parseFloat(taxAmountMatch[1].replace(/,/g, ""));

//           if (!isNaN(currentHSN.taxAmount) && !isNaN(currentHSN.taxPercentage)) {
//             const taxAmountFloat = parseFloat(currentHSN.taxAmount);
//             const taxPercentageFloat = parseFloat(currentHSN.taxPercentage);
//             if (
//               !isNaN(taxAmountFloat) &&
//               !isNaN(taxPercentageFloat) &&
//               taxPercentageFloat !== 0
//             ) {
//               const equivalentFor100Percent =
//                 (taxAmountFloat * 100) / taxPercentageFloat;
//               currentHSN.charge = equivalentFor100Percent.toFixed(2);
//               currentHSN.amount = equivalentFor100Percent.toFixed(2);

//               const unitPrice = parseFloat(currentHSN.unitPrice);
//               if (!isNaN(unitPrice) && unitPrice !== 0) {
//                 currentHSN.unitQuantity = (
//                   equivalentFor100Percent / unitPrice
//                 ).toFixed(2);
//               } else {
//                 currentHSN.unitPrice = 1;
//                 currentHSN.unitQuantity = equivalentFor100Percent.toFixed(2);
//               }
//             } else {
//               currentHSN.charge = "0";
//               currentHSN.amount = "0";
//             }
//           }
//         }
//       }
//     }

//     if (currentHSN) {
//       structuredHSNLines.push(currentHSN);
//     }

//     const InvoiceLines = [];
//     let currentInvoice = null;
//     let gstNumberExtracted = false;

//     const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
//     const invoiceNumberRegex = /MAAFES+[A-Z0-9]+/;
//     const invoiceCurrency = "INR";
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     if (extractedData && Array.isArray(extractedData)) {
//       let venName = "";
//       let invoiceDate = "";
//       let invoiceNumber = "";

//       for (const line of extractedData) {
//         const gstMatch = line.content.match(
//           /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g
//         );
//         if (gstMatch && !gstNumberExtracted) {
//           const gstNumber = gstMatch[0];

//           // if (gstNumber === '29AAACD3181G1ZR') {
//           venName = "TVS SCS GLOBAL FREIGHT SOLUTIONS LIMITED";
//           // }

//           const invoiceDateData = extractedData.find((item) =>
//             item.content.match(invoiceDateRegex)
//           );
//           invoiceDate = invoiceDateData ? invoiceDateData.content : "";

//           const invoiceNumberData = extractedData.find((item) =>
//             item.content.match(invoiceNumberRegex)
//           );
//           invoiceNumber = invoiceNumberData ? invoiceNumberData.content : "";
//           invoiceNumber = invoiceNumber.replace(/\bTAX\s*INVOICE\b/, "").trim();

//           const invoiceAmount = structuredHSNLines
//             .reduce((add, hsnLine) => {
//               const charge = parseFloat(hsnLine.charge) || 0;
//               const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
//               return add + charge + taxAmount;
//             }, 0)
//             .toFixed(2);

//           let igst = "0.00";
//           let cgst = "0.00";
//           let sgst = "0.00";

//           for (const hsnLine of structuredHSNLines) {
//             if (hsnLine.taxPercentage === 18) {
//               igst = (
//                 parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)
//               ).toFixed(2);
//             } else if (hsnLine.taxPercentage === 9) {
//               cgst = (
//                 parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)
//               ).toFixed(2);
//               sgst = (
//                 parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)
//               ).toFixed(2);
//             }
//           }

//           currentInvoice = {
//             venName: venName,
//             gstNumber: gstNumber,
//             invoiceDate: invoiceDate,
//             invoiceNumber: invoiceNumber,
//             invoiceCurrency: invoiceCurrency,
//             financialYear: financialYear,
//             invoiceAmount: invoiceAmount,
//             igst: igst,
//             cgst: cgst,
//             sgst: sgst,
//           };

//           InvoiceLines.push(currentInvoice);
//           gstNumberExtracted = true;
//         }
//       }
//     }

//     console.log("DART PDF DATA", JSON.stringify(allLines, null, 2));
//     console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
//     console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
//     return {
//       extractedData: InvoiceLines[0],
//       extractedHsnData: structuredHSNLines,
//     };
//   };

export const extractedTvs = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    // const structuredHSNLines = [];
    // let currentHSN = null;
    // let hsnId = null;
    // let linesId = 0;

    // for (const line of extractedData) {
    //     if (line.content.match(/^\d{6}$/)) {
    //         hsnId = linesId;
    //         if (currentHSN) {
    //             structuredHSNLines.push(currentHSN);
    //         }

    //         const taxPercentage = parseFloat(extractedData[hsnId + 10].content);
    //         let taxType = "No Tax";
    //         if (taxPercentage === 18) {
    //             taxType = "IGST";
    //         } else if (taxPercentage === 9) {
    //             taxType = "CGST & SGST";
    //         }
    //         const description = extractedData[hsnId - 2].content;
    //         // const firstNumberInDescription = description.match(/\d+/);
    //         // const secondNumberInDescription = description.match(/(\d+\.\d+)/);


    //         currentHSN = {
    //             description: description,
    //             HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
    //             //   unitPrice: secondNumberInDescription ? secondNumberInDescription[0] : "",
    //             //   unitQuantity: firstNumberInDescription ? firstNumberInDescription[0] : "",
    //             unitQuantity: extractedData[hsnId + 8].content.replace(/./g, ""),
    //             unitPrice: extractedData[hsnId + 4].content,
    //             taxType: taxType,
    //             charge: extractedData[hsnId + 8].content,
    //             taxPercentage: taxPercentage,
    //             taxAmount: (
    //                 (parseFloat(extractedData[hsnId - 2].content.replace(/,/g, "")) * taxPercentage) /
    //                 100
    //             ).toFixed(2),
    //             tax: extractedData[hsnId - 6].content,
    //             roe: extractedData[hsnId - 9].content,
    //             amount: extractedData[hsnId - 2].content.replace(/,/g, ""),
    //             // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
    //         };


    //         // currentHSN = {
    //         //   // quotation:extractedData[hsnId-1].content,
    //         //   description: extractedData[hsnId -4].content,
    //         //   HSN: line.content.includes("HSN")
    //         //     ? line.content.match(/\d+/)
    //         //     : line.content.trim(),
    //         //   unitQuantity: extractedData[hsnId - 1].content,
    //         //   unitPrice: /^\d/.test(extractedData[hsnId - 4].content) ? extractedData[hsnId - 2].content : "",
    //         //   taxType: taxType,
    //         //   charge: extractedData[hsnId - 2].content,
    //         //   taxPercentage: taxPercentage,
    //         //   taxAmount: extractedData[hsnId - 6].content,
    //         //   tax: extractedData[hsnId - 6].content,
    //         //   roe: extractedData[hsnId - 9].content,
    //         //   amount: extractedData[hsnId - 10].content,
    //         //   // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
    //         // };
    //     }
    //     linesId += 1;
    // }

    // if (currentHSN) {
    //     structuredHSNLines.push(currentHSN);
    // }
    const structuredHSNLines = [];
    let currentHSN = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/\s+[A-Z].+\s+-+.(\d|\w)+.(\d|\w)+.(\d|\w)+.(\d|\w)+(\(|\.)+.+/) || [];

        if (matchData.length > 0) {
            const description = matchData[0].match(/\s+[A-Z].+\s+-/g, "");
            const HSN = line.match(/(996|99\d)+\d+/g, "");

            const unitQuantityMatch = line.match(/(\d+)\s+([A-Za-z]+)/);
            const unitQuantity = unitQuantityMatch ? unitQuantityMatch[1].replace(/(996|99\d)+\d+/g, "") : null;

            const unitPriceMatch = line.match(/(\d+\.\d+)/);
            const unitPrice = unitPriceMatch ? unitPriceMatch[1] : null;

            const chargeMatch = line.match(/\d+\.\d+\s+\d+\s+(IGST|CGST|SGST|Exempt)/g, "");
            const charge = chargeMatch && chargeMatch[0] ? chargeMatch[0].replace(/\s+\d+\s+(IGST|CGST|SGST|Exempt)/g, "").replace(/,/g, "") : null;

            const taxPercentageMatch = line.match(/(CGST|IGST|SGST)\s+\d+%+(\s|=)+(\d|,)+\.\d+/g, "");
            const taxPercentage = taxPercentageMatch && taxPercentageMatch[0] ? taxPercentageMatch[0].replace(/(CGST|IGST|SGST)\s+/g, "").replace(/=+\d+.\d+/g, "").replace(/%/g, "") : null;

            const taxAmountMatch = line.match(/(CGST|IGST|SGST)\s+\d+%+(\s|=)+(\d|,)+\.\d+(,|\s)+\d+\.\d+/g, "");
            const taxAmount = taxAmountMatch && taxAmountMatch[0] ? taxAmountMatch[0].replace(/(CGST|IGST|SGST)\s+\d+%+(\s|=)/g, "").replace(/,/g, "") : "";


            let taxType, igst, cgst, sgst;

            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18 || taxPercentage == 5) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentHSN = {
                description: description,
                HSN: HSN,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                taxType: taxType,
                charge: charge,
                unitPrice: unitPrice,
                unitQuantity: unitQuantity,
            };

            structuredHSNLines.push(currentHSN);
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /MAA[A-Z0-9]{13}|BLR[A-Z0-9]{13}/;
    const invoiceAmountRegex = /SUBTOTAL+\s+\d+.+/;
    const invoiceCurrency = "INR";
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = "";
        let invoiceDate = "";
        let invoiceNumber = "";
        let invoiceAmount = "";
        let isAlreadyClientMatched = false;
        if (extractedData && Array.isArray(extractedData)) {
            for (const line of extractedData) {
                const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
                if (gstMatch && !gstNumberExtracted) {
                    if (!isAlreadyClientMatched) {
                        isAlreadyClientMatched = true;
                        continue;
                    }
                    const gstNumber = gstMatch[0];

                    // if (gstNumber === '33AAACM6824H4ZK') {
                    venName = "TVS SCS GLOBAL FREIGHT SOLUTIONS LIMITED";
                    // }

                    const invoiceDateData = extractedData.find((item) =>
                        item.content.match(invoiceDateRegex)
                    );
                    invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/\w+\s+\w+:+\s/g, "") : "";

                    const invoiceNumberData = extractedData.find((item) =>
                        item.content.match(invoiceNumberRegex)
                    );
                    invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex) : "";


                    const invoiceAmountData = extractedData.find((item) =>
                        item.content.match(invoiceAmountRegex)
                    );
                    invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/\w+\s+\w+\s+\w+\s+(\d|,)+\.\d+\s+(\d|,)+\.\d+\s+/g, "") : "";

                    let igst = "0.00";
                    let cgst = "0.00";
                    let sgst = "0.00";

                    for (const hsnLine of structuredHSNLines) {
                        if (hsnLine.taxPercentage == 18) {
                            igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        } else if (hsnLine.taxPercentage == 9) {
                            cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                            sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        }
                    }
                    const currentInvoice = {
                        venName: venName,
                        gstNumber: gstNumber,
                        invoiceDate: invoiceDate,
                        invoiceNumber: invoiceNumber,
                        invoiceCurrency: invoiceCurrency,
                        financialYear: financialYear,
                        invoiceAmount: invoiceAmount,
                        igst: igst,
                        cgst: cgst,
                        sgst: sgst,
                    };

                    InvoiceLines.push(currentInvoice);
                    gstNumberExtracted = true;
                }
            }
        }


        console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
        console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
        console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    }
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines,
    };
};

//   export const extractedVelogicIndia = async (pdf) => {
//     const allLines = await extractPDFDataToLinesData(pdf);
//     const extractedData = allLines;

//     const structuredHSNLines = [];
//     let currentHSN = null;
//     let currentTax = null;

//     for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
//       const line = extractedData[hsnId].content;

//       const matchData = line.match(/99\d+\s+(\w+)\s+(|.)+([\d])/);

//       if (matchData) {
//         const HSN = matchData[1] ? matchData[1].trim() : '';
//         const description = matchData[2] ? matchData[2].trim() : '';
//         const taxPercentage = matchData[3] ? matchData[3].trim() : '';
//         const taxAmount = matchData[4] ? matchData[4].trim() : '';
//         const charge = matchData[5] ? matchData[5].trim() : '';  // Use group 5 for charge

//         const currentHSN = {
//           description: description,
//           HSN: HSN,
//           taxPercentage: taxPercentage,
//           taxAmount: taxAmount,
//           charge: charge,
//         };

//         structuredHSNLines.push(currentHSN);
//         console.log(currentHSN);
//         console.log("mmmmmmmmm", matchData);
//       }

//     }

//     console.log("Combined Data", structuredHSNLines);
//     console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

//     const InvoiceLines = [];
//     let currentInvoice = null;
//     let gstNumberExtracted = false;

//     let venName = "";
//     const invoiceDateRegex = /(\d+-+\w+-+\d+)/;
//     const invoiceNumberRegex = /[A-Za-z]{2}ILF+(\d+)/;
//     const invoiceAmountRegex = /TOTAL\s+(\w+)\s(\(+\w+\)\s+(\w+.\d+))/;
//     const invoiceCurrency = "INR";
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     if (extractedData && Array.isArray(extractedData)) {
//       for (const line of extractedData) {
//         const gstMatch = line.content.match(
//           /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g
//         );
//         if (gstMatch && !gstNumberExtracted) {
//           venName = "APL Logistics (India) Private Ltd";
//           const gstNumber = gstMatch[0];
//           let invoiceNumber = "";
//           let invoiceDate = "";
//           let invoiceAmount = "";

//           const invoiceAmountData = extractedData.find((item) =>
//             item.content.match(invoiceAmountRegex)
//           );
//           invoiceAmount = invoiceAmountData
//             ? invoiceAmountData.content.replace(" TOTAL AMOUNT (INR)   ", "")
//             : "";

//           const invoiceDateData = extractedData.find((item) =>
//             item.content.match(invoiceDateRegex)
//           );
//           invoiceDate = invoiceDateData ? invoiceDateData.content : "";

//           const invoiceNumberData = extractedData.find((item) =>
//             item.content.match(invoiceNumberRegex)
//           );
//           invoiceNumber = invoiceNumberData ? invoiceNumberData.content : "";

//           let igst = 0.0;
//           let cgst = 0.0;
//           let sgst = 0.0;

//           structuredHSNLines.forEach((hsnLine) => {
//             const igstValue = parseFloat(hsnLine.charge) || 0.0;
//             const cgstValue = parseFloat(hsnLine.charge) || 0.0;
//             const sgstValue = parseFloat(hsnLine.charge) || 0.0;

//             if (igstValue > 0) {
//               cgst = 0.0;
//               sgst = 0.0;
//               igst += igstValue;
//             } else {
//               igst = 0.0;
//               if (cgstValue > 0 || sgstValue > 0) {
//                 cgst += cgstValue;
//                 sgst += sgstValue;
//               }
//             }
//           });

//           currentInvoice = {
//             venName: venName,
//             gstNumber: gstNumber,
//             invoiceDate: invoiceDate,
//             invoiceNumber: invoiceNumber,
//             invoiceCurrency: invoiceCurrency,
//             financialYear: financialYear,
//             invoiceAmount: invoiceAmount,
//             igst: igst,
//             cgst: cgst,
//             sgst: sgst,
//           };
//           InvoiceLines.push(currentInvoice);
//           gstNumberExtracted = true;
//         }
//       }
//     }
//     console.log("APL PDF DATA", JSON.stringify(allLines, null, 2));
//     return {
//       extractedData: InvoiceLines[0],
//       extractedHsnData: structuredHSNLines,
//     };
//   };

export const extractedVelogicIndia = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    const uniqueDescriptions = new Set();
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/\b996\d{3}\b/)) {
            hsnId = linesId;
            if (currentHSN) {
                if (!uniqueDescriptions.has(currentHSN.description)) {
                    structuredHSNLines.push(currentHSN);
                    uniqueDescriptions.add(currentHSN.description);
                }
            }

            const taxPercentage = parseFloat(extractedData[hsnId + 2].content);
            const taxAmount = parseFloat(extractedData[hsnId + 7].content);
            let taxType;
            let igst;
            let cgst;
            let sgst;

            if (taxPercentage === 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage === 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }
            // .replace(/996\d+/, '').replace(/\+91+\s+[\d]+/, '').trim()
            // const description = extractedData[hsnId - 0].content.match(/996+\d+\s+\w+\s+\w.+/g,"").replace(/996\d+/, '');
            const matchResult = extractedData[hsnId - 0].content.match(/996+\d+\s+\w+\s+\w.+/g);
            const description = matchResult ? matchResult[0].replace(/996\d+/, '') : "";
            const hsnMatch = line.content.match(/(99+\d+)/)
            currentHSN = {
                description: description,
                HSN: hsnMatch ? hsnMatch[0] : line.content.trim(),
                taxType: taxType,
                charge: extractedData[hsnId + 10].content,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                tax: extractedData[hsnId - 6].content,
                roe: extractedData[hsnId - 9].content,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                amount: extractedData[hsnId - 10].content,
            };
        }
        linesId += 1;
    }

    if (currentHSN && !uniqueDescriptions.has(currentHSN.description)) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];


    const invoiceDateRegex = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}/;
    const invoiceNumberRegex = /IN+[\w]+[\d]/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let taxableAmount = '';
        let gstNumberExtracted = false;
        let isAlreadyClientMatched = false;

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                if (!isAlreadyClientMatched) {
                    isAlreadyClientMatched = true;
                    continue;
                }

                // if (gstNumber === '33AAACM6824H4ZK') {
                venName = 'VELOGIC INDIA PVT LTD';
                // }

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const taxableAmountData = extractedData.find((item) => item.content.includes("Taxable Amount (INR) :"));
                if (taxableAmountData) {
                    const match = taxableAmountData.content.match(/Taxable Amount \(INR\) : ([\d.]+)/);
                    if (match) {
                        taxableAmount = match[1];
                    }
                }

                // const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                //     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                //     const charge = parseFloat(hsnLine.charge) || 0;
                //     return add + taxAmount+ charge;
                // }, 0).toFixed(2);

                const invoiceAmount = structuredHSNLines.reduce((total, hsnLine) => {
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxPercentage = parseFloat(hsnLine.taxPercentage) || 0;

                    if (taxPercentage === 18) {
                        return total + taxAmount + charge;
                    } else if (taxPercentage === 9) {
                        return total + ((taxAmount * 2) + charge);
                    }

                    return total;
                }, 0).toFixed(2);


                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "taxableAmount": taxableAmount,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("VELOGIC PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

export const extracteWiderlogistics = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.match(/^\d{6}$/)) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentage = parseFloat(extractedData[hsnId - 1].content);
            let taxType = "No Tax";
            if (taxPercentage === 18) {
                taxType = "IGST";
            } else if (taxPercentage === 9) {
                taxType = "CGST & SGST";
            }
            const descriptionMatch = extractedData[hsnId - 4].content;
            const description=extractedData[hsnId - 4].content.replace( /(\()+\s+.+\)/g,"");
            const firstNumberInDescription = descriptionMatch.match(/\d+/);
            const secondNumberInDescription = descriptionMatch.match(/(\d+\.\d+)/);

            currentHSN = {
                description: description,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitPrice: secondNumberInDescription ? secondNumberInDescription[0] : "",
                unitQuantity: firstNumberInDescription ? firstNumberInDescription[0] : "",
                taxType: taxType,
                charge: extractedData[hsnId - 2].content.replace(/,/g, ""),
                taxPercentage: taxPercentage,
                taxAmount: (
                    (parseFloat(extractedData[hsnId - 2].content.replace(/,/g, "")) * taxPercentage) /
                    100
                ).toFixed(2),
                tax: extractedData[hsnId - 6].content,
                roe: extractedData[hsnId - 9].content,
                amount: extractedData[hsnId - 2].content.replace(/,/g, ""),
                // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
            };


            // currentHSN = {
            //   // quotation:extractedData[hsnId-1].content,
            //   description: extractedData[hsnId -4].content,
            //   HSN: line.content.includes("HSN")
            //     ? line.content.match(/\d+/)
            //     : line.content.trim(),
            //   unitQuantity: extractedData[hsnId - 1].content,
            //   unitPrice: /^\d/.test(extractedData[hsnId - 4].content) ? extractedData[hsnId - 2].content : "",
            //   taxType: taxType,
            //   charge: extractedData[hsnId - 2].content,
            //   taxPercentage: taxPercentage,
            //   taxAmount: extractedData[hsnId - 6].content,
            //   tax: extractedData[hsnId - 6].content,
            //   roe: extractedData[hsnId - 9].content,
            //   amount: extractedData[hsnId - 10].content,
            //   // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
            // };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /DS[A-Z0-9]{3}(\-)+(\d+)+/;
    const invoiceCurrency = "INR";
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = "";
        let invoiceDate = "";
        let invoiceNumber = "";
        let taxableAmount = "";

        for (const line of extractedData) {
            const gstMatch = line.content.match(
                /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g
            );
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = "WIDER LOGISTICS (India) Pvt. Ltd.";
                const invoiceDateData = extractedData.find((item) =>item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : "";

                const invoiceNumberData = extractedData.find((item) =>item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/:/g, '') : "";

                const invoiceAmount = Math.round(
                    structuredHSNLines.reduce((add, hsnLine) => {
                        const amount = parseFloat(hsnLine.amount) || 0;
                        const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                        return add + amount + taxAmount;
                    }, 0)
                );

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage === 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage === 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }
                const currentInvoice = {
                    venName: venName,
                    gstNumber: gstNumber,
                    invoiceDate: invoiceDate,
                    invoiceNumber: invoiceNumber,
                    invoiceCurrency: invoiceCurrency,
                    financialYear: financialYear,
                    invoiceAmount: invoiceAmount,
                    igst: igst,
                    cgst: cgst,
                    sgst: sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines,
    };
};

// export const extractedWorldLine = async (pdf) => {
//     const allLines = await extractPDFData(pdf);
//     const extractedData = allLines;
//     const structuredHSNLines = [];
//     let currentHSN = null;
//     let hsnId = null;
//     let linesId = 0;

//     for (const line of extractedData) {
//         if (line.content.match(/^\d{6}$/)) {
//             hsnId = linesId;
//             if (currentHSN) {
//                 structuredHSNLines.push(currentHSN);
//             }


//             const taxPercentage = parseFloat(extractedData[hsnId - 2].content);
//             let taxType = "No Tax";
//             if (taxPercentage === 18) {
//                 taxType = "IGST";
//             } else if (taxPercentage === 9) {
//                 taxType = "CGST & SGST";
//             }

//             currentHSN = {
//                 // quotation: extractedData[hsnId-1].content,
//                 // description: extractedData[hsnId + 1].content,
//                 description: extractedData[hsnId + 1]?.content,
//                 HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
//                 unitQuantity: extractedData[hsnId + 8]?.content.replace(/CBM|KGS/g, ""),
//                 taxType: taxType,
//                 unitPrice: extractedData[hsnId + 7]?.content,
//                 charge: extractedData[hsnId - 1].content,
//                 taxPercentage: taxPercentage,
//                 taxAmount: extractedData[hsnId - 3].content.replace(/,/g, ""),
//                 tax: extractedData[hsnId - 6].content,
//                 roe: extractedData[hsnId - 9].content,
//                 //   amount: extractedData[hsnId - 10].content,
//                 amount: Math.round(
//                     (parseFloat(extractedData[hsnId - 6].content.replace(/,/g, "")) ||
//                         0) +
//                     (parseFloat(extractedData[hsnId - 8].content.replace(/,/g, "")) ||
//                         0)
//                 ),
//             };


//         }
//         linesId += 1;
//     }

//     if (currentHSN) {
//         structuredHSNLines.push(currentHSN);
//     }

//     const InvoiceLines = [];
//     let gstNumberExtracted = false;

//     const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
//     const invoiceNumberRegex = /WLL[A-Z0-9]+[0-9A-Z]/;
//     const invoiceCurrency = 'INR';
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     if (extractedData && Array.isArray(extractedData)) {
//         let venName = '';
//         let invoiceDate = '';
//         let invoiceNumber = '';
//         let taxableAmount = '';

//         for (const line of extractedData) {
//             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//             if (gstMatch && !gstNumberExtracted) {
//                 const gstNumber = gstMatch[0];

//                 // if (gstNumber === '33AAACM6824H4ZK') {
//                 venName = 'WORLD LINE LOGISTICS PRIVATE LIMITED';
//                 // }

//                 const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
//                 invoiceDate = invoiceDateData ? invoiceDateData.content : '';

//                 const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
//                 invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

//                 const taxableAmountData = extractedData.find((item) => item.content.includes("Taxable Amount (INR) :"));
//                 if (taxableAmountData) {
//                     const match = taxableAmountData.content.match(/Taxable Amount \(INR\) : ([\d.]+)/);
//                     if (match) {
//                         taxableAmount = match[1];
//                     }
//                 }

//                 // const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
//                 //     const amount = parseFloat(hsnLine.amount) || 0;
//                 //     return add + amount;
//                 // }, 0).toFixed(2);
//                 const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
//                     const amount = parseFloat(hsnLine.amount) || 0;
//                     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
//                     return add + amount;
//                 }, 0);

//                 let igst = "0.00"
//                 let cgst = "0.00";
//                 let sgst = "0.00";

//                 if (parseFloat(igst) > 0) {
//                     cgst = "0.00";
//                     sgst = "0.00";
//                 } else {
//                     for (const hsnLine of structuredHSNLines) {
//                         if (hsnLine.taxPercentage === 18) {
//                             igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                         } else if (hsnLine.taxPercentage === 9) {
//                             cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                             sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                         }
//                     }
//                 }

//                 const result = igst;

//                 const currentInvoice = {
//                     "venName": venName,
//                     "gstNumber": gstNumber,
//                     "invoiceDate": invoiceDate,
//                     "taxableAmount": taxableAmount,
//                     "invoiceNumber": invoiceNumber,
//                     "invoiceCurrency": invoiceCurrency,
//                     "financialYear": financialYear,
//                     "invoiceAmount": invoiceAmount,
//                     "igst": igst,
//                     "cgst": cgst,
//                     "sgst": sgst,
//                     "result": result
//                 };

//                 InvoiceLines.push(currentInvoice);
//                 gstNumberExtracted = true;
//             }
//         }
//     }

//     console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
//     console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
//     console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

//     return {
//         extractedData: InvoiceLines[0],
//         extractedHsnData: structuredHSNLines
//     };
// }


// export const extractedKwe = async (pdf) => {
//     const allLines = await extractPDFData(pdf);
//     const extractedData = allLines;
//     const structuredHSNLines = [];
//     let currentHSN = null;
//     let hsnId = null;
//     let linesId = 0;

//     for (const line of extractedData) {
//         if (line.content.match(/99\d{4}/)) {
//             hsnId = linesId;
//             if (currentHSN) {
//                 structuredHSNLines.push(currentHSN);
//             }

//             const taxPercentage = parseFloat(extractedData[hsnId + 2].content);
//             // const taxAmount = parseFloat(extractedData[hsnId + 7].content);
//             const taxAmount = parseFloat(extractedData[hsnId + 7].content.replace(/,/g, ""));
//             let taxType;
//             let igst;
//             let cgst;
//             let sgst;

//             if (taxPercentage === 9) {
//                 taxType = 'CGST & SGST';
//                 igst = 0;
//                 cgst = taxAmount;
//                 sgst = taxAmount;
//             } else if (taxPercentage === 18) {
//                 taxType = 'IGST';
//                 igst = taxAmount;
//                 cgst = 0;
//                 sgst = 0;
//             } else {
//                 taxType = 'No Tax';
//                 igst = 0;
//                 cgst = 0;
//                 sgst = 0;
//             }

//             const charge = extractedData[hsnId + 5].content.replace(/,/g, "");
//             const descriptionMatch = extractedData[hsnId - 3].content.trim();
//             const description = extractedData[hsnId - 3].content.trim().replace(/(\()+.+\)/g, "");

//             const firstNumberInDescription = descriptionMatch.match(/\d+/);
//             const secondNumberInDescription = descriptionMatch.match(/(\d+\.\d+)/);
//             currentHSN = {
//                 description: description,
//                 HSN: line.content.startsWith("996") ? line.content.trim() : line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),

//                 unitPrice: firstNumberInDescription,
//                 unitQuantity: secondNumberInDescription && secondNumberInDescription[0] ? secondNumberInDescription[0] : "",
//                 taxType: taxType,
//                 charge: charge,
//                 taxPercentage: taxPercentage,
//                 taxAmount: taxAmount,
//                 tax: extractedData[hsnId - 6].content,
//                 roe: extractedData[hsnId - 9].content,
//                 igst: igst,
//                 cgst: cgst,
//                 sgst: sgst,
//                 amount: extractedData[hsnId - 10].content,
//                 // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
//             };

//         }
//         linesId += 1;
//     }

//     if (currentHSN) {
//         structuredHSNLines.push(currentHSN);
//     }

//     const InvoiceLines = [];
//     let gstNumberExtracted = false;

//     const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
//     const invoiceNumberRegex = /530\d{11}/;
//     const invoiceCurrency = 'INR';
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     if (extractedData && Array.isArray(extractedData)) {
//         let venName = '';
//         let invoiceDate = '';
//         let invoiceNumber = '';

//         for (const line of extractedData) {
//             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//             if (gstMatch && !gstNumberExtracted) {
//                 const gstNumber = gstMatch[0];

//                 // if (gstNumber === '33AAACM6824H4ZK') {
//                 venName = 'KINTETSU WORLD EXPRESS (India) Pvt. Ltd.';
//                 // }

//                 const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
//                 invoiceDate = invoiceDateData ? invoiceDateData.content : '';

//                 const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
//                 invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

//                 // const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
//                 //     const charge = parseFloat(hsnLine.charge) || 0;
//                 //     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
//                 //     return add + charge + taxAmount;
//                 // }, 0).toFixed(2);
//                 const invoiceAmount = structuredHSNLines.reduce((total, hsnLine) => {
//                     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
//                     const charge = parseFloat(hsnLine.charge) || 0;
//                     const taxPercentage = parseFloat(hsnLine.taxPercentage) || 0;

//                     if (taxPercentage === 18) {
//                         return total + taxAmount + charge;
//                     } else if (taxPercentage === 9) {
//                         return total + ((taxAmount * 2) + charge);
//                     }

//                     return total;
//                 }, 0).toFixed(2);

//                 let igst = "0.00";
//                 let cgst = "0.00";
//                 let sgst = "0.00";

//                 for (const hsnLine of structuredHSNLines) {
//                     if (hsnLine.taxPercentage === 18) {
//                         igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                     } else if (hsnLine.taxPercentage === 9) {
//                         cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                         sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                     }
//                 }

//                 const currentInvoice = {
//                     "venName": venName,
//                     "gstNumber": gstNumber,
//                     "invoiceDate": invoiceDate,
//                     "invoiceNumber": invoiceNumber,
//                     "invoiceCurrency": invoiceCurrency,
//                     "financialYear": financialYear,
//                     "invoiceAmount": invoiceAmount,
//                     "igst": igst,
//                     "cgst": cgst,
//                     "sgst": sgst,
//                 };

//                 InvoiceLines.push(currentInvoice);
//                 gstNumberExtracted = true;
//             }
//         }
//     }

//     console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
//     console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
//     console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

//     return {
//         extractedData: InvoiceLines[0],
//         extractedHsnData: structuredHSNLines
//     };
// }

export const extractedKwe = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
   
    const structuredHSNLines = [];
    let currentHSN = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/\w+\s+(\w|\s)+(\(|\s\w)+\d+(\s|\d)(\*|\@|\s)\s+\d+(,|\.\d)\d+.+/) || [];

        if (matchData.length > 0) {
            const description = matchData[0].match(/\w+\s+(\w|\s)+(\(|\s\w)/g, "");
            
            const HSN = line.match(/(996|998)\d+/g, "");

            const unitQuantityMatch = line.match(/(\(|\s)+\d+(\s|\*)+\s+\d+(,|\.\d)\d+\s+(CBM|KGS)+(\)|\s)/g,"");
            const unitQuantity = unitQuantityMatch && unitQuantityMatch[0] ? unitQuantityMatch[0].replace(/(\(|\s)+\d+(\s|\*)+\s+/g,"").replace(/\)/g,"").replace(/(CBM|KGS)/g,""): "";

            const unitPriceMatch = line.match(/(\(|\s)+\d+(\s|\*)+\s+\d+(,|\.\d)\d+\s+(CBM|KGS)+(\)|\s)/g,"");
            const unitPrice = unitPriceMatch && unitPriceMatch[0] ? unitPriceMatch[0].replace(/\d+(,|\.\d)\d+\s+(CBM|KGS)+(\)|\s)/g,"").replace(/(CBM|KGS)/g,"").replace(/\)/g,"").replace(/\*/g,"").replace(/\(/g,"") : "";

            const chargeMatch = line.match(/(996|998)\d+\s+\d+(,|\.\d|d)\d+\s+\d+(,|\.\d|d)\d+\s+\d+(,|\.\d)(\d|\.\d)+/g, "");
            const charge = chargeMatch && chargeMatch[0] ? chargeMatch[0].replace(/(996|998)\d+\s+\d+(,|\.\d|d)\d+\s+\d+(,|\.\d|d)\d+\s+/g, "").replace(/,/g, "") : null;

            const taxPercentageMatch = line.match(/(996|998)\d+\s+\d+(,|\.\d|d)\d+/g, "");
            const taxPercentage = taxPercentageMatch && taxPercentageMatch[0] ? taxPercentageMatch[0].replace(/(996|998)\d+\s+/g, "").replace(/%/g, "") : null;

            const taxAmountMatch = line.match(/(996|998)\d+\s+\d+(,|\.\d|d)\d+\s+\d+(,|\.\d|d)\d+\s+\d+(,|\.\d)(\d|\.\d)+\s+(\d|\.\d)+\s+\d+/g, "");
            const taxAmount = taxAmountMatch && taxAmountMatch[0] ? taxAmountMatch[0].replace(/(996|998)\d+\s+\d+(,|\.\d|d)\d+\s+\d+(,|\.\d|d)\d+\s+\d+(,|\.\d)(\d|\.\d)+\s+(\d|\.\d)+\s+/g, "").replace(/,/g, "") : "";


            let taxType, igst, cgst, sgst;

            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18 || taxPercentage == 5) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentHSN = {
                description: description,
                HSN: HSN,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                taxType: taxType,
                charge: charge,
                unitPrice: unitPrice,
                unitQuantity: unitQuantity,
            };

            structuredHSNLines.push(currentHSN);
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /MAA[A-Z0-9]{13}|BLR[A-Z0-9]{13}/;
    const invoiceAmountRegex = /SUBTOTAL+\s+\d+.+/;
    const invoiceCurrency = "INR";
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = "";
        let invoiceDate = "";
        let invoiceNumber = "";
        let invoiceAmount = "";
        let isAlreadyClientMatched = false;
        if (extractedData && Array.isArray(extractedData)) {
            for (const line of extractedData) {
                const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
                if (gstMatch && !gstNumberExtracted) {
                    if (!isAlreadyClientMatched) {
                        isAlreadyClientMatched = true;
                        continue;
                    }
                    const gstNumber = gstMatch[0];

                    // if (gstNumber === '33AAACM6824H4ZK') {
                    venName = "TVS SCS GLOBAL FREIGHT SOLUTIONS LIMITED";
                    // }

                    const invoiceDateData = extractedData.find((item) =>
                        item.content.match(invoiceDateRegex)
                    );
                    invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/\w+\s+\w+:+\s/g, "") : "";

                    const invoiceNumberData = extractedData.find((item) =>
                        item.content.match(invoiceNumberRegex)
                    );
                    invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex) : "";


                    const invoiceAmountData = extractedData.find((item) =>
                        item.content.match(invoiceAmountRegex)
                    );
                    invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/\w+\s+\w+\s+\w+\s+(\d|,)+\.\d+\s+(\d|,)+\.\d+\s+/g, "") : "";

                    let igst = "0.00";
                    let cgst = "0.00";
                    let sgst = "0.00";

                    for (const hsnLine of structuredHSNLines) {
                        if (hsnLine.taxPercentage == 18) {
                            igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        } else if (hsnLine.taxPercentage == 9) {
                            cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                            sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        }
                    }
                    const currentInvoice = {
                        venName: venName,
                        gstNumber: gstNumber,
                        invoiceDate: invoiceDate,
                        invoiceNumber: invoiceNumber,
                        invoiceCurrency: invoiceCurrency,
                        financialYear: financialYear,
                        invoiceAmount: invoiceAmount,
                        igst: igst,
                        cgst: cgst,
                        sgst: sgst,
                    };

                    InvoiceLines.push(currentInvoice);
                    gstNumberExtracted = true;
                }
            }
        }


        console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
        console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
        console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    }
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines,
    };
};

// export const extractedWorldLine = async (pdf) => {
//     const allLines = await extractPDFDataToLinesData(pdf);
//     const extractedData = allLines;
   
//     const structuredHSNLines = [];
//     let currentHSN = null;

//     for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
//         const line = extractedData[hsnId].content;

//         const matchData = line.match(/\w+\s+(\w|\s)+\w+\s+\d+\s+/) || [];

//         if (matchData.length > 0) {
//             const description = matchData[0].match(/\w+\s+(\w|\s)+\w+\s+\d+\s+/g, "");

//             // const HSNMatch = line.match(/T+\s+\d+(,|\.\d)+\d+\s+\d+(,|\.\d)(\.\d|\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+(996|998)+\d+/g, "");
//             // const HSN = HSNMatch&& HSNMatch[7] ? HSNMatch[7]:null;

//             const HSNMatch = line.match(/T+\s+\d+(,|\.\d)+\d+\s+\d+(,|\.\d)(\.\d|\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996\d+/g, "");
//             const HSN = HSNMatch && HSNMatch[0] ? HSNMatch[0] : null;

//             const unitQuantityMatch = line.match(/(INR|USD)\s+(KGS|CBM|(\d+\.\d+\d))+\s+(\d+\.\d+\d|\s+)+/);
//             const unitQuantity = unitQuantityMatch ? unitQuantityMatch[0] : null;

//             const unitPriceMatch = line.match(/(INR|USD)\s+(\d+\.\d+)\s+(\d+\.\d+)/);
//             const unitPrice = unitPriceMatch ? unitPriceMatch[3] : null;



//             // const unitQuantityMatch = line.match(/(INR|USD)\s+(KGS|CBM|(\d+\.\d+\d))+\s+(\d+\.\d+\d|\s+)+/);
//             // const unitQuantity = unitQuantityMatch ? unitQuantityMatch[0] : null;

//             // const unitPriceMatch = line.match(/(INR|USD)\s+(KGS|CBM|(\d+\.\d+\d))+\s+(\d+\.\d+\d|\s+)+/);
//             // const unitPrice = unitPriceMatch ? unitPriceMatch[1] : null;

//             const chargeMatch = line.match(/\d+\.\d+\s+\d+\s+(IGST|CGST|SGST|Exempt)/g, "");
//             const charge = chargeMatch && chargeMatch[0] ? chargeMatch[0].replace(/\s+\d+\s+(IGST|CGST|SGST|Exempt)/g, "").replace(/,/g, "") : null;

//             const taxPercentageMatch = line.match(/(CGST|IGST|SGST)\s+\d+%+(\s|=)+(\d|,)+\.\d+/g, "");
//             const taxPercentage = taxPercentageMatch && taxPercentageMatch[0] ? taxPercentageMatch[0].replace(/(CGST|IGST|SGST)\s+/g, "").replace(/=+\d+.\d+/g, "").replace(/%/g, "") : null;

//             const taxAmountMatch = line.match(/(CGST|IGST|SGST)\s+\d+%+(\s|=)+(\d|,)+\.\d+(,|\s)+\d+\.\d+/g, "");
//             const taxAmount = taxAmountMatch && taxAmountMatch[0] ? taxAmountMatch[0].replace(/(CGST|IGST|SGST)\s+\d+%+(\s|=)/g, "").replace(/,/g, "") : "";


//             let taxType, igst, cgst, sgst;

//             if (taxPercentage == 9) {
//                 taxType = 'CGST & SGST';
//                 igst = 0;
//                 cgst = taxAmount;
//                 sgst = taxAmount;
//             } else if (taxPercentage == 18 || taxPercentage == 5) {
//                 taxType = 'IGST';
//                 igst = taxAmount;
//                 cgst = 0;
//                 sgst = 0;
//             } else {
//                 taxType = 'No Tax';
//                 igst = 0;
//                 cgst = taxAmount;
//                 sgst = taxAmount;
//             }

//             currentHSN = {
//                 description: description,
//                 HSN: HSN,
//                 taxPercentage: taxPercentage,
//                 taxAmount: taxAmount,
//                 igst: igst,
//                 cgst: cgst,
//                 sgst: sgst,
//                 taxType: taxType,
//                 charge: charge,
//                 unitPrice: unitPrice,
//                 unitQuantity: unitQuantity,
//             };

//             structuredHSNLines.push(currentHSN);
//         }
//     }

//     console.log("Combined Data", structuredHSNLines);
//     console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

//     const InvoiceLines = [];
//     let gstNumberExtracted = false;

//     const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
//     const invoiceNumberRegex = /MAA[A-Z0-9]{13}|BLR[A-Z0-9]{13}/;
//     const invoiceAmountRegex = /SUBTOTAL+\s+\d+.+/;
//     const invoiceCurrency = "INR";
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     if (extractedData && Array.isArray(extractedData)) {
//         let venName = "";
//         let invoiceDate = "";
//         let invoiceNumber = "";
//         let invoiceAmount = "";
//         let isAlreadyClientMatched = false;
//         if (extractedData && Array.isArray(extractedData)) {
//             for (const line of extractedData) {
//                 const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//                 if (gstMatch && !gstNumberExtracted) {
//                     if (!isAlreadyClientMatched) {
//                         isAlreadyClientMatched = true;
//                         continue;
//                     }
//                     const gstNumber = gstMatch[0];

//                     // if (gstNumber === '33AAACM6824H4ZK') {
//                     venName = "TVS SCS GLOBAL FREIGHT SOLUTIONS LIMITED";
//                     // }

//                     const invoiceDateData = extractedData.find((item) =>
//                         item.content.match(invoiceDateRegex)
//                     );
//                     invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/\w+\s+\w+:+\s/g, "") : "";

//                     const invoiceNumberData = extractedData.find((item) =>
//                         item.content.match(invoiceNumberRegex)
//                     );
//                     invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex) : "";


//                     const invoiceAmountData = extractedData.find((item) =>
//                         item.content.match(invoiceAmountRegex)
//                     );
//                     invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/\w+\s+\w+\s+\w+\s+(\d|,)+\.\d+\s+(\d|,)+\.\d+\s+/g, "") : "";

//                     let igst = "0.00";
//                     let cgst = "0.00";
//                     let sgst = "0.00";

//                     for (const hsnLine of structuredHSNLines) {
//                         if (hsnLine.taxPercentage == 18) {
//                             igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                         } else if (hsnLine.taxPercentage == 9) {
//                             cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                             sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//                         }
//                     }
//                     const currentInvoice = {
//                         venName: venName,
//                         gstNumber: gstNumber,
//                         invoiceDate: invoiceDate,
//                         invoiceNumber: invoiceNumber,
//                         invoiceCurrency: invoiceCurrency,
//                         financialYear: financialYear,
//                         invoiceAmount: invoiceAmount,
//                         igst: igst,
//                         cgst: cgst,
//                         sgst: sgst,
//                     };

//                     InvoiceLines.push(currentInvoice);
//                     gstNumberExtracted = true;
//                 }
//             }
//         }


//         console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
//         console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
//         console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
//     }
//     return {
//         extractedData: InvoiceLines[0],
//         extractedHsnData: structuredHSNLines,
//     };
// };

export const extractedWorldLine = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let currentTax = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/(\w|\d|\s)+\s+\d+(,|\.\d)+\d+\s+\d+(,|\.\d)(\.\d|\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996\d+/);

        if (matchData) {
        const aaaa=matchData[0];
            const HSN = matchData[0].replace(/(\w|\d|\s)+\s+\d+(,|\.\d)+\d+\s+\d+(,|\.\d)(\.\d|\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s/g,"");
            const charge = matchData[0].replace(/T+\s+\d+(,|\.\d)+\d+\s+/g,"").replace(/\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996\d+/g,"").replace(/,/g,"");
            const taxAmount=matchData[0].replace(/(\w|\d|\s)+\s+\d+(,|\.\d)+\d+\s+\d+(,|\.\d)(\.\d|\d)+\s+\d+(,|\.\d)(\d|\.\d)+/g,"").replace(/\s+\d+(,|\.\d)(\d|\.\d)+\s+996\d+/g,"").replace(/,/g,"");
            const taxPercentage=matchData[0].replace(/(\w|\d|\s)+\s+\d+(,|\.\d)+\d+\s+\d+(,|\.\d)(\.\d|\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s+\d+(,|\.\d)(\d|\.\d)+\s/g,"").replace(/\d+(,|\.\d)(\d|\.\d)+\s+996\d+/g,"");
            const description=extractedData[hsnId+1].content.replace(/\d+/g, "");
            
            let taxType, igst, cgst, sgst;
            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18 || taxPercentage == 5) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }
            currentHSN = {
                aaaa:aaaa,
                HSN: HSN,
                charge: charge,
                taxAmount:taxAmount,
                taxPercentage:taxPercentage,
                taxType: taxType,
                description:description,
                
            };
        }
if (line.match(/(INR|USD)\s+(KGS|CBM|(\d+\.\d+\d))+\s+(\d+\.\d+\d|\s+)+/)) {
    const taxMatch = line.match(/(INR|USD)\s+(KGS|CBM|(\d+\.\d+\d))+\s+(\d+\.\d+\d|\s+)+/) || [];
    const unitPrice = taxMatch[0].replace(/(INR|USD)\s+(KGS|CBM)?\s+(\d+\.\d+)\s+/g,"");

    // const unitQuantityMatch =line.match(/(INR)\s+(KGS)?\s+(\d+\.\d+)\s+/);
    // const unitQuantity = unitQuantityMatch[0].replace(/(INR|USD)\s+/g,"").replace(/(KGS|CBM)/g,"");
   const unitQuantityMatch = line.match(/(INR|USD)\s+(KGS|CBM)?\s+(\d+\.\d+)\s+/);
        if (unitQuantityMatch) {
            const unitQuantity = unitQuantityMatch[0].replace(/(INR|USD)\s+/g, "").replace(/(KGS|CBM)/g, "");

    currentTax = {
        unitPrice: unitPrice,
        unitQuantity: unitQuantity,
    };

    if (currentHSN && currentTax) {

        const combinedData = {
            ...currentHSN,
            ...currentTax
        };
        structuredHSNLines.push(combinedData);
        currentHSN = null;
        currentTax = null;
    }
}
}
}

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{4}/;
    const invoiceNumberRegex = /WLL[A-Z0-9]{10}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                venName = 'Worldline Logistics Private Limited';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.match(invoiceDateRegex) : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex) : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return add + charge + taxAmount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage == 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage == 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(allLines, null, 2))
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }

}

export const extractedUps = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.includes("996")) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            const taxPercentageContent = extractedData[hsnId + 4].content;
            const taxPercentage = parseFloat(taxPercentageContent.replace('%', ''));

            const charge = parseFloat(extractedData[hsnId + 2].content.replace(/,/g, ''));
            const taxAmount = ((charge * taxPercentage) / 100).toFixed(2);

            const mainAmount = extractedData[hsnId + 6].content.replace(/,/g, '');
            const mainInvoice = parseFloat(mainAmount).toFixed(2);

            const unitQuantityContent = extractedData[hsnId + 1].content;
            const unitQuantity = parseFloat(unitQuantityContent) || 1;

            let taxType, igst, cgst, sgst;
            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentHSN = {
                // description: extractedData[hsnId - 2].content,
                description: `${extractedData[hsnId - 3].content} ${extractedData[hsnId - 2].content} `,
                HSN: line.content.includes("996") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: unitQuantity,
                unitPrice: (charge / unitQuantity).toFixed(2),
                taxType: taxType,
                charge: charge,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                amount: charge,
                mainInvoice: mainInvoice,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }


    const InvoiceLines = [];
    let gstNumberExtracted = false;
    let date = false;
    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /UMA+[0-9]+/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;
    let isAlreadyClientMatched = false;
    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                if (!isAlreadyClientMatched) {
                    isAlreadyClientMatched = true;
                    continue;
                }
                const gstNumber = gstMatch[0];

                venName = 'UPS SCS (INDIA) PRIVATE LIMITED';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const mainInvoice = parseFloat(hsnLine.mainInvoice) || 0;
                    return add + mainInvoice;
                }, 0).toFixed(2);

                const igst = structuredHSNLines.reduce((add, hsnLine) => {
                    const igst = parseFloat(hsnLine.igst) || 0;
                    return add + igst;
                }, 0).toFixed(2);

                const cgst = structuredHSNLines.reduce((add, hsnLine) => {
                    const cgst = parseFloat(hsnLine.cgst) || 0;
                    return add + cgst;
                }, 0).toFixed(2);

                const sgst = structuredHSNLines.reduce((add, hsnLine) => {
                    const sgst = parseFloat(hsnLine.sgst) || 0;
                    return add + sgst;
                }, 0).toFixed(2);


                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}

export const extractedCube = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    // const structuredHSNLines = [];
    // let currentHSN = null;
    // let hsnId = null;
    // let linesId = 0;

    // for (const line of extractedData) {
    //     if (line.content.match(/99\d{4}/)) {
    //         hsnId = linesId;
    //         if (currentHSN) {
    //             structuredHSNLines.push(currentHSN);
    //         }

    //         const taxMatch = extractedData[hsnId + 2].content.match(/(\d+\.\d+)%/g);
    //         const taxPercentage = taxMatch ? taxMatch[0].replace(/[.%0]/g, '') : "";

    //         // const taxAmount = extractedData[hsnId + 2].content.match(/(IGST|CGST|SGST|IGST\d)+\s+\d.+/g, "");
    //         const taxAmount = extractedData[hsnId + 2].content.match(/(IGST|CGST|SGST|IGST\d)+\s+\d+\.\d+%+=\d+.+/g);



    //         let taxType;
    //         let igst;
    //         let cgst;
    //         let sgst;

    //         if (taxPercentage == 9) {
    //             taxType = 'CGST & SGST';
    //             igst = 0;
    //             cgst = taxAmount;
    //             sgst = taxAmount;
    //         } else if (taxPercentage == 18 || taxPercentage == 5) {
    //             taxType = 'IGST';
    //             igst = taxAmount;
    //             cgst = 0;
    //             sgst = 0;
    //         } else {
    //             taxType = 'No Tax';
    //             igst = 0;
    //             cgst = 0;
    //             sgst = 0;
    //         }

    //         const description = extractedData[hsnId - 0].content.replace(/\[\s+\w+\s+-\s+\d+\s\]+\s+-/g, "")
    //         const HSN = extractedData[hsnId - 0].content.match(/99+\w+/g, "")
    //         const firstNumberInDescription = description.match(/\d+/ || /(\d+\.\d+)/);
    //         const secondNumberInDescription = description.match(/(\d+\.\d+)/ || /\d+/);
    //         currentHSN = {
    //             description: description,
    //             HSN: HSN,
    //             // HSN: line.content.startsWith("996") ? line.content.trim() : line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
    //             unitPrice: firstNumberInDescription && firstNumberInDescription[0] ? firstNumberInDescription[0] : "",
    //             unitQuantity: secondNumberInDescription && secondNumberInDescription[1] ? secondNumberInDescription[1] : "",
    //             taxType: taxType,
    //             charge: extractedData[hsnId + 4].content,
    //             taxPercentage: taxPercentage,
    //             taxAmount: taxAmount,
    //             tax: extractedData[hsnId - 6].content,
    //             roe: extractedData[hsnId - 9].content,
    //             igst: igst,
    //             cgst: cgst,
    //             sgst: sgst,
    //             amount: extractedData[hsnId - 10].content,
    //             // variance: extractedData[hsnId - 2].content - extractedData[hsnId-1].content
    //         };

    //     }
    //     linesId += 1;
    // }

    // if (currentHSN) {
    //     structuredHSNLines.push(currentHSN);
    // }
    // const taxAmount = matchData[0] ? parseFloat(matchData[0].match(/\s+(IGST|IGST\d)\s+\d+.\d+%+=+\d+.\d+\s+/)[1]) : "";
    // const taxAmount =matchData[0] ?parseFloat(matchData[0].match(/\s+(IGST|IGST\d)\s+\d+.\d+%+=+\d+.\d+\s+/)[1]): "";
    // const taxAmount =taxAmountMatch && taxAmountMatch[0] ? taxAmountMatch[0] :"";
    const structuredHSNLines = [];
    let currentHSN = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/\[+\s+SAC+.+/) || [];

        if (matchData.length > 0) {
            const description = matchData[0].replace(/\[+\s+SAC+\s+(\-|\s)+\s+\d+\s+\]+\s+-\s+/g, "").replace(/\s+(USD|IGST|\()+.+/g, "");

            const hsnMatch = line.match(/\[+\s+SAC\s+-\s+(\d+)\s+\]/);
            const HSN = hsnMatch && hsnMatch[0] ? hsnMatch[0].replace(/\[+\s+SAC\s+-/g, "").replace(/\]/g, "") : "";

            const taxPercentage = matchData[0] ? parseFloat(matchData[0].match(/(\d+\.\d+)%/)[1]) : "";

            const taxInfoMatch = line.match(/=\s*([\d,.]+)/);
            const taxAmount = taxInfoMatch ? parseFloat(taxInfoMatch[1].replace(/,/g, '')) : null;

            const unitQuantityMatch = line.match(/(\@|\*)+\s+\d+.\d+/);
            const unitQuantity = unitQuantityMatch && unitQuantityMatch[0] ? unitQuantityMatch[0].replace(/\*|@/g, "") : "";

            const unitPriceMatch = line.match(/(\d+)+(\s|\w)+(\@|\*)/);
            const unitPrice = unitPriceMatch ? parseFloat(unitPriceMatch[1]) : null;

            const chargeMatch = line.match(/(\d+(?:,\d{3})*(?:\.\d+)?)\s*$/);
            const charge = chargeMatch ? parseFloat(chargeMatch[1].replace(/,/g, '')) : null;

            let taxType, igst, cgst, sgst;

            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18 || taxPercentage == 5) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentHSN = {
                description: description,
                HSN: HSN,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                taxType: taxType,
                charge: charge,
                unitPrice: unitPrice,
                unitQuantity: unitQuantity
            };

            structuredHSNLines.push(currentHSN);
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /MAA\w+\d/;
    const igstRegex = /IGST\s+(\d|,)+.\d+.\d+/;
    const cgstRegex = /CGST\s+(\d|,)+.\d+.\d+/;
    const sgstRegex = /SGST\s+(\d|,)+.\d+.\d+/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let igst = '';
        let sgst = '';
        let cgst = '';

        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                // if (gstNumber === '33AAACM6824H4ZK') {
                venName = '20Cube Logistics Private Limited';
                // }

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/AH+\w+\s+\w+\d\s+.+/g, "") : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/AH+\w+\s+\w+\d\s+/g, "") : '';

                const igstData = extractedData.find((item) => item.content.match(igstRegex));
                igst = igstData ? igstData.content.replace(/IGST\s+/g, "") : '';

                const cgstData = extractedData.find((item) => item.content.match(cgstRegex));
                cgst = cgstData ? cgstData.content.replace(/CGST\s+/g, "") : '';

                const sgstData = extractedData.find((item) => item.content.match(sgstRegex));
                sgst = sgstData ? sgstData.content.replace(/SGST\s+/g, "") : '';

                // const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                //     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                //     const charge = parseFloat(hsnLine.charge) || 0;
                //     return add + taxAmount+charge;
                // }, 0).toFixed(2);
                const invoiceAmount = structuredHSNLines.reduce((total, hsnLine) => {
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxPercentage = parseFloat(hsnLine.taxPercentage) || 0;

                    if (taxPercentage == 18 || taxPercentage == 5) {
                        return total + taxAmount + charge;
                    } else if (taxPercentage == 9) {
                        return total + ((taxAmount * 2) + charge);
                    }

                    return total;
                }, 0).toFixed(2);

                // let igst = "0.00";
                // let cgst = "0.00";
                // let sgst = "0.00";

                // for (const hsnLine of structuredHSNLines) {
                //     if (hsnLine.taxPercentage === 18) {
                //         igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                //     } else if (hsnLine.taxPercentage === 9) {
                //         cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                //         sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                //     }
                // }

                const currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };
}
// /(\w.+)\s+(\w+)\s+(\d+\.\d+)?\s+(\d+\.\d+)?\s+(\d+\.\d+)?\s+(\d+\.\d+)/

export const extractedAps = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/(\w.+)\s+(\w+)\s+(\d+\.\d+)?\s+(\d+\.\d+)?\s+(\d+\.\d+)?\s+(\d+\.\d+)/) || [];

        if (matchData.length > 0) {
            const mainDatas = (matchData[0]);
            const description = matchData[1];
            const HSN = matchData[2];
            const unitPrice = matchData[3]
            const unitQuantity = matchData[4]
            const taxPercentage = matchData[7];
            const taxAmount = matchData[4];
            const charge = matchData[5];

            let taxType, igst, cgst, sgst;
            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentHSN = {
                mainDatas: mainDatas,
                description: description,
                HSN: HSN,
                unitPrice: unitPrice,
                unitQuantity: unitQuantity,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                taxType: taxType,
                charge: charge
            };

            structuredHSNLines.push(currentHSN);
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    let venName = '';
    const invoiceDateRegex = /(\d+-+\w+-+\d+)/;
    const invoiceNumberRegex = /[A-Z0-9]+-+[A-Z0-9]+-+\d+/;
    const igstRegex = /ADD IGST\s+(\d+|.)+([\d])/
    const cgstRegex = /ADD CGST\s+(\d+|.)+([\d])/
    const sgstRegex = /ADD SGST\s+(\d+|.)+([\d])/
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                venName = 'APS LOGISTICS INTERNATIONAL LTD';
                const gstNumber = gstMatch[0];
                let invoiceNumber = '';
                let invoiceDate = '';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/ INVOICE DATE /g, "") : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/Invoice No   :/g, "") : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    return add + charge;
                }, 0).toFixed(2);

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                };
                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }
    console.log("APL PDF DATA", JSON.stringify(allLines, null, 2))
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractChRowbin = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let currentTax = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/SAC\s(\w+:)+\s+(\d+)\s+(\w+)\s+(\d.+)/) || [];

        if (matchData.length > 0) {
            const mainDataa = hsnId > 0 ? extractedData[hsnId - 1].content : '';

            const mainDataaParts = mainDataa.split(/\s+/);
            const description = mainDataaParts.slice(0, -5).join(' ').replace(/\b(W\/M|Flat Rate)\b/g, "");

            const unitQuantity = parseFloat(mainDataaParts[mainDataaParts.length - 5]);
            // const unitPrice = parseFloat(mainDataaParts[mainDataaParts.length - 3].replace(/,/g, ""));
            const charge = parseFloat(mainDataaParts[mainDataaParts.length - 1].replace(/,/g, ""));


            const hh = matchData[0] || '';
            const HSN = matchData[2] || '';
            const taxPercentage = matchData[4] ? matchData[4].replace(/INR\s+\d.+/g, "") : "";
            const taxAmount = matchData[4].replace(/\d+.\d+\s+INR/g, "");

            let taxType, igst, cgst, sgst;
            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }

            currentHSN = {
                mainDataa: mainDataa,
                hh: hh,
                description: description,
                unitQuantity: unitQuantity,
                HSN: HSN,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                charge: charge,
                taxType: taxType,
                igst: igst,
                sgst: sgst,
                cgst: cgst,
            };
            structuredHSNLines.push(currentHSN);
        }
        const mainTax = line.match(/(INR|USD)+\s+(\d|,)+\.\d+\s+(INR|USD)+\s+(\d|,)+\.\d+/) || [];

        if (mainTax) {
            const unitPrice = matchData[0] || '';

            currentTax = {
                unitPrice: unitPrice
            };
            structuredHSNLines.push(currentTax);
        }

    }




    //     if (line.match(/(IGST|CGST|SGST|GST)\s+\((\d.+\d+%)\s+(\w+)\s+(\w+\s+\w+)\)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/)) {
    //         const taxMatch = line.match(/(IGST|CGST|SGST|GST)\s+\((\d.+\d+%)\s+(\w+)\s+(\w+\s+\w+)\)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/) || [];
    //         const taxPercentage = taxMatch[2].replace(/[.0,%]/g, '');

    //         const chargeValue = currentHSN.charge.replace(/,/g, "");
    //         const taxAmount = (chargeValue * taxPercentage) / 100;

    //         console.log(taxMatch, "tttt");

    //         let taxType, igst, cgst, sgst;
    //         if (taxPercentage == 9) {
    //             taxType = 'CGST & SGST';
    //             igst = 0;
    //             cgst = taxAmount;
    //             sgst = taxAmount;
    //         } else if (taxPercentage == 18) {
    //             taxType = 'IGST';
    //             igst = taxAmount;
    //             cgst = 0;
    //             sgst = 0;
    //         } else {
    //             taxType = 'No Tax';
    //             igst = 0;
    //             cgst = 0;
    //             sgst = 0;
    //         }

    //         currentTax = {
    //             taxPercentage: taxPercentage,
    //             taxAmount: taxAmount, // Set the calculated taxAmount
    //             taxType: taxType,
    //             igst: igst,
    //             cgst: cgst,
    //             sgst: sgst
    //         };

    //         globalTax = currentTax;

    //         if (currentHSN && currentTax) {
    //             structuredHSNLines.push({
    //                 ...currentHSN,
    //                 ...currentTax
    //             });
    //             currentHSN = null;
    //             currentTax = null;
    //         }

    //     }
    // }

    // console.log("Combined Data", structuredHSNLines);
    // console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));
    // structuredHSNLines.forEach((rec, index) => {
    //     structuredHSNLines[index] = { ...rec, ...globalTax }
    //     console.log(globalTax);
    // })

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    let venName = '';
    const invoiceDateRegex = /(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}/;
    const invoiceNumberRegex = /190+\d+/;
    const invoiceAmountRegex = /INR\s+\d.+\.\d+/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                venName = 'C.H.ROBINSON Worldwide Freight India Pvt. Ltd.';
                const gstNumber = gstMatch[0];
                let invoiceNumber = '';
                let invoiceDate = '';
                let invoiceAmount = '';


                const invoiceAmountData = extractedData.find((item) => item.content.match(invoiceAmountRegex));
                invoiceAmount = invoiceAmountData ? invoiceAmountData.content.replace(/INR+\s+/g, "") : '';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/ INVOICE DATE /g, "") : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/TAX\s+INVOICE\s+|Original for Recipient/g, "") : '';


                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage == 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage == 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }



                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };
                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }
    console.log("APL PDF DATA", JSON.stringify(allLines, null, 2))
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractDBSCHENKAR = async (pdf) => {
    const allLines = await extractPDFData(pdf);
    const extractedData = allLines;
    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;

    for (const line of extractedData) {
        if (line.content.includes("996")) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }


            const taxPercentageContent1 = extractedData[hsnId - 2].content;
            const taxPercentageContent2 = extractedData[hsnId - 3].content;

            const taxPercentage1 = parseFloat(taxPercentageContent1.match(/(\d+(\.\d+)?)/)?.[0]) || 0;
            const taxPercentage2 = parseFloat(taxPercentageContent2.match(/(\d+(\.\d+)?)/)?.[0]) || 0;
            const taxPercentage = taxPercentage1 !== 0 ? taxPercentage1 : taxPercentage2;

            // const taxAmount = (extractedData[hsnId + 15].content + extractedData[hsnId + 17].content).replace(/,/g, '');
            // const taxAmount= extractedData[hsnId + 15].content||extractedData[hsnId + 17].content .replace(/,/g,"") ;
            // const taxAmount = parseFloat(taxAmountContent).toFixed(2);

            const hsnId15Content = extractedData[hsnId + 15].content;
            const hsnId17Content = extractedData[hsnId + 17].content;

            const taxAmount = (parseInt(hsnId15Content, 10) === 0) ? hsnId17Content.replace(/,/g, "") : hsnId15Content.replace(/,/g, "");


            let taxType, igst, cgst, sgst;
            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = 0;
                sgst = 0;
            }

            const unitQuantityContent = extractedData[hsnId + 4].content;
            const unitQuantity = parseFloat(unitQuantityContent) || 1;

            const charge = parseFloat(extractedData[hsnId + 14].content.replace(/,/g, ''));
            const amount = parseFloat(extractedData[hsnId + 14].content.replace(/,/g, ''));
            const unitPrice = parseFloat(extractedData[hsnId + 10].content.replace(/,/g, ''));

            currentHSN = {
                description: extractedData[hsnId - 6].content + extractedData[hsnId - 5].content,
                HSN: line.content.includes("996") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: unitQuantity,
                unitPrice: unitPrice,
                taxType: taxType,
                charge: charge,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                amount: amount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
            };
        }
        linesId += 1;
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }
    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2} [A-Z][a-z]{2} \d{4}/;
    const invoiceNumberRegex = /(103|102)\d{8}/;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = '';
        let invoiceDate = '';
        let invoiceNumber = '';
        let gstNumber = '';

        for (const line of extractedData) {
            if (line.content.includes('DAMCO GSTIN:')) {
                gstNumber = line.content.split('DAMCO GSTIN:')[1].trim();
                venName = 'Damco India Pvt. Ltd';

                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';
                invoiceNumber = invoiceNumber.replace(/\bTAX\s*INVOICE\b/, '').trim();

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    const taxPercentage = hsnLine.taxPercentage;

                    const adjustedTaxAmount = taxPercentage === 18 ? taxAmount : taxAmount * 2;

                    return add + charge + adjustedTaxAmount;
                }, 0).toFixed(2);

                let igst = "0.00";
                let cgst = "0.00";
                let sgst = "0.00";

                for (const hsnLine of structuredHSNLines) {
                    if (hsnLine.taxPercentage == 18) {
                        igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    } else if (hsnLine.taxPercentage == 9) {
                        cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                    }
                }

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    "invoiceAmount": invoiceAmount,
                    "igst": igst,
                    "cgst": cgst,
                    "sgst": sgst,
                };

                InvoiceLines.push(currentInvoice);
                gstNumberExtracted = true;
            }
        }
    }

    console.log("DART PDF DATA", JSON.stringify(allLines, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };


}

export const extractCeva = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;

    for (let hsnId = 0; hsnId < extractedData.length; hsnId++) {
        const line = extractedData[hsnId].content;

        const matchData = line.match(/(USD|INR)+\s+\d+(,|\d)+(\.|\d)+\s+\d+\s+\d+(.|\d)+\s/) || [];

        if (matchData.length > 0) {
            const description = matchData[0].match(/\s+[A-Z].+\s+-/g, "");
            const HSN = line.match(/(996|99\d)+\d+/g, "");

            const unitQuantityMatch = line.match(/996+\d+\s+\d+(,|.)(\d|.\d)+\s+(\d|.\d)+/);
            const unitQuantity = unitQuantityMatch ? unitQuantityMatch[0].replace(/996+\d+\s+\d+(,|.)(\d|.\d)+\s+/g, "") : null;

            const unitPriceMatch = line.match(/996+\d+\s+\d+(,|.)(\d|.\d)+/);
            const unitPrice = unitPriceMatch ? unitPriceMatch[0].replace(/996+\d+\s+/g, "") : null;

            const chargeMatch = line.match(/(USD|INR)+\s+\d+(,|.|)(\d|\.\d)+/g, "");
            const charge = chargeMatch && chargeMatch[0] ? chargeMatch[0].replace(/(USD|INR)+\s+/g, "").replace(/,/g, "") : null;

            const taxPercentageMatch = line.match(/996+\d+\s+\d+(,|.)(\d|.\d)+\d+\s+\d+\s+\d+(,|\.\d)\d+\s+\d+(,|.)\d+\s+\d+(,|.)(\d|\.\d)+\s+\d+(\.\d|\d)+%/g, "");
            const taxPercentage = taxPercentageMatch && taxPercentageMatch[0] ? taxPercentageMatch[0].replace(/996+\d+\s+\d+(,|.)(\d|.\d)+\d+\s+\d+\s+\d+(,|\.\d)\d+\s+\d+(,|.)\d+\s+\d+(,|.)(\d|\.\d)+\s+/g, "").replace(/%/g, "") : null;

            const taxAmountMatch = line.match(/996+\d+\s+\d+(,|.)(\d|.\d)+\d+\s+\d+\s+\d+(,|\.\d)\d+\s+\d+(,|.)\d+\s+/g, "");
            const taxAmount = taxAmountMatch && taxAmountMatch[0] ? taxAmountMatch[0].replace(/996+\d+\s+\d+(,|.)(\d|.\d)+\d+\s+\d+\s+/g, "").replace(/,/g, "") : "";


            const invoiceMatch = line.match(/((USD|INR)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996+\d+\s+\d+(,|.)(\d|.\d)+\d+\s+\d+\s+\d+(,|\.\d)\d+\s+\d+(,|.)\d+\s+\d+(,|.)(\d|\.\d)+\s+\d+(\.\d|\d)+%+\s+\d+(\.\d|\d)+%+\s+\d+(,|\.\d)(\d|\.\d)+)|(((USD|INR)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996+\d+\s+\d+(,|.)(\d|.\d)+\d+)\s+((\d|\.\d)|(\d+\.\d))+\s+\d+(,|\.\d)\d+\s+\d+(,|\.)(\d|\.\d)+)/g, "");
            const amount = invoiceMatch && invoiceMatch[0] ? invoiceMatch[0].replace(/((USD|INR)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996+\d+\s+\d+(,|.)(\d|.\d)+\d+\s+\d+\s+\d+(,|\.\d)\d+\s+\d+(,|.)\d+\s+\d+(,|.)(\d|\.\d)+\s+\d+(\.\d|\d)+%+\s+\d+(\.\d|\d)+%+\s+)|(((USD|INR)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996+\d+\s+\d+(,|.)(\d|.\d)+\d+)\s+((\d|\.\d)|(\d+\.\d))+\s+\d+(,|\.\d)\d+\s+)/g, "").replace(/,/g, "") : "";

            // /((USD|INR)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996+\d+\s+\d+(,|.)(\d|.\d)+\d+\s+\d+\s+\d+(,|\.\d)\d+\s+\d+(,|.)\d+\s+\d+(,|.)(\d|\.\d)+\s+\d+(\.\d|\d)+%+\s+\d+(\.\d|\d)+%+\s+)|(((USD|INR)+\s+\d+(,|\.\d)(\d|\.\d)+\s+996+\d+\s+\d+(,|.)(\d|.\d)+\d+)\s+((\d|\.\d)|(\d+\.\d))+\s+\d+(,|\.\d)\d+\s+)/
            let taxType, igst, cgst, sgst;

            if (taxPercentage == 9) {
                taxType = 'CGST & SGST';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            } else if (taxPercentage == 18 || taxPercentage == 5) {
                taxType = 'IGST';
                igst = taxAmount;
                cgst = 0;
                sgst = 0;
            } else {
                taxType = 'No Tax';
                igst = 0;
                cgst = taxAmount;
                sgst = taxAmount;
            }

            currentHSN = {
                description: description,
                HSN: HSN,
                taxPercentage: taxPercentage,
                taxAmount: taxAmount,
                igst: igst,
                cgst: cgst,
                sgst: sgst,
                taxType: taxType,
                charge: charge,
                unitPrice: unitPrice,
                unitQuantity: unitQuantity,
                amount: amount,
            };

            structuredHSNLines.push(currentHSN);
        }
    }

    console.log("Combined Data", structuredHSNLines);
    console.log("PDF JSON DATA", JSON.stringify(structuredHSNLines, null, 2));

    const InvoiceLines = [];
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}-[A-Z][a-z]{2}-\d{2}/;
    const invoiceNumberRegex = /KA+\d{10}/;
    const invoiceCurrency = "INR";
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        let venName = "";
        let invoiceDate = "";
        let invoiceNumber = "";
        let invoiceAmount = "";
        let isAlreadyClientMatched = false;
        if (extractedData && Array.isArray(extractedData)) {
            for (const line of extractedData) {
                const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
                if (gstMatch && !gstNumberExtracted) {
                    if (!isAlreadyClientMatched) {
                        isAlreadyClientMatched = true;
                        continue;
                    }
                    const gstNumber = gstMatch[0];

                    venName = "CEVA LOGISTICS INDIA PVT LTD";

                    const invoiceDateData = extractedData.find((item) =>
                        item.content.match(invoiceDateRegex)
                    );
                    invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/\w+\s+\w+:+\s/g, "") : "";

                    const invoiceNumberData = extractedData.find((item) =>
                        item.content.match(invoiceNumberRegex)
                    );
                    invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex) : "";

               const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    return add + amount;
                }, 0).toFixed(2);

                    let igst = "0.00";
                    let cgst = "0.00";
                    let sgst = "0.00";

                    for (const hsnLine of structuredHSNLines) {
                        if (hsnLine.taxPercentage == 18) {
                            igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        } else if (hsnLine.taxPercentage == 9) {
                            cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                            sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
                        }
                    }
                    const currentInvoice = {
                        venName: venName,
                        gstNumber: gstNumber,
                        invoiceDate: invoiceDate,
                        invoiceNumber: invoiceNumber,
                        invoiceCurrency: invoiceCurrency,
                        financialYear: financialYear,
                        invoiceAmount: invoiceAmount,
                        igst: igst,
                        cgst: cgst,
                        sgst: sgst,
                    };

                    InvoiceLines.push(currentInvoice);
                    gstNumberExtracted = true;
                }
            }
        }


        console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
        console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
        console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    }
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines,
    };
};

export const extractPDFDataToLinesData = async (pdf: PDFDocumentProxy, pageNumbers?: number[]) => {
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        if (pageNumbers && pageNumbers.length) {
            if (!pageNumbers.includes(pageNumber)) {
                continue;
            }
        }
        const page = await pdf.getPage(pageNumber);
        const textContent: any = await page.getTextContent();
        // Merge text items within a certain vertical tolerance
        const verticalTolerance = 1;
        for (let i = 0; i < textContent.items.length; i++) {
            const item = textContent.items[i];
            if (i > 0) {
                const prevItem = textContent.items[i - 1];
                if (Math.abs(item.transform[5] - prevItem.transform[5]) <= verticalTolerance) {
                    // Merge text items within the same vertical position
                    extractedData[extractedData.length - 1].content += ' ' + item.str;
                } else {
                    // Add a new line for a new vertical position
                    extractedData.push({ content: item.str, id: `${pageNumber}-${idCounter}` });
                    idCounter++;
                }
            } else {
                // Add the first item
                extractedData.push({ content: item.str, id: `${pageNumber}-${idCounter}` });
                idCounter++;
            }
        }
    }
    return extractedData;
}

const extractPDFData = async (pdf: PDFDocumentProxy) => {
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const textContent: any = await page.getTextContent();

        let line = '';
        let rec = null;

        // eslint-disable-next-line no-loop-func 
        textContent.items.forEach((item) => {
            if (rec !== null) {
                rec = item.transform[5];
            }

            if (item.transform[5]) {
                extractedData.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                idCounter++;
                line = '';
            }
            line += item.str + ' ';
        });
    }
    return extractedData;
}


// /([\:]).*\[(\w+):(\d+)\]\s+(|.)+\s+(\w+)\s+(|.)+/

// /(\d+\.+\d+)\s+(%)/

// /(\d.+)\s+(\d.+)+INR+\s+INR/