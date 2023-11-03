import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
const currency_list = ["AED","AFA","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BEF","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CVE","CZK","DEM","DJF","DKK","DOP","DZD","EEK","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD","GNF","GRD","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","ITL","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTC","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZM","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SKK","SLL","SOS","SRD","SSP","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZWL"];

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

                if (gstNumber === '33AAACM6824H4ZK') {
                    venName = 'DHL Logistics Pvt. Ltd.';
                }

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

export const extractDhlCourier = async (pdf) => {
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
                charge: extractedData[hsnId - 10].content,
                taxPercentage: taxPercentage,
                taxAmount: extractedData[hsnId - 6].content * extractedData[hsnId - 9].content,
                tax: extractedData[hsnId - 6].content,
                roe: extractedData[hsnId - 9].content,
                amount: extractedData[hsnId - 4].content,
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
    const invoiceDateRegex = /\d{2}\/\d{2}\/\d{4}/;
    const invoiceNumberRegex = /KAS[A-Z0-9]{10}/;
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

                if (gstNumber === '29AABCD3611Q1ZE') {
                    venName = 'DHL EXPRESS (INDIA) PVT LTD.';
                }

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
                    const unitPrice = parseFloat(hsnLine.unitPrice) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    // const igst = parseFloat(hsnLine.igst) || 0;
                    // const cgst = parseFloat(hsnLine.cgst) || 0;
                    // const sgst = parseFloat(hsnLine.sgst) || 0;
                    return add + unitPrice + taxAmount;
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

    console.log("DART PDF DATA", JSON.stringify(extractedData, null, 2));
    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractDart = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
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

                if (gstNumber === '29AAACD3181G1ZR') {
                    venName = 'DART GLOBAL LOGISTICS PVT LTD';
                }

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

                if (gstNumber === '33AAACE1795K2ZJ' || gstNumber === '29AAACE1795K2Z8') {
                    venName = 'Expeditors International (India) Private Limited';
                }

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

            const taxAmountContent = extractedData[hsnId + 14].content.replace(/,/g, '');
            const taxAmount = parseFloat(taxAmountContent).toFixed(2);

            const unitQuantityContent = extractedData[hsnId + 1].content;
            const unitQuantity = parseFloat(unitQuantityContent) || 1;

            const charge = parseFloat(extractedData[hsnId + 2].content.replace(/,/g, ''));
            const unitPrice = (charge / unitQuantity).toFixed(2);

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
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const vendorNameId = '1-2';
    const invoiceDateId = '1-38';
    const invoiceNumberId = '1-41';
    const invoiceCurrency = 'INR';
    // const invoiceAmountId='1-36';
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

                // const invoiceAmountData = extractedData.find((item) => item.id === invoiceAmountId);
                // const invoiceAmount = invoiceAmountData ? invoiceAmountData.content : '';

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const unitPrice = parseFloat(hsnLine.unitPrice) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    // const igst = parseFloat(hsnLine.igst) || 0;
                    // const cgst = parseFloat(hsnLine.cgst) || 0;
                    // const sgst = parseFloat(hsnLine.sgst) || 0;
                    return add + unitPrice + taxAmount;
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

export const extractApl = async (pdf) => {
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

            const taxPercentageContent = extractedData[hsnId + 20].content;
            let taxPercentage = parseFloat(taxPercentageContent.replace('%', ''));

            if (isNaN(taxPercentage) || taxPercentage === null) {
                taxPercentage = 18;
            }

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

            currentHSN = {
                description: extractedData[hsnId - 4].content + " " + extractedData[hsnId - 2].content,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: extractedData[hsnId + 2].content,
                charge: extractedData[hsnId + 10].content,
                taxPercentage: taxPercentage,
                taxAmount: parseFloat(extractedData[hsnId + 28].content) || 0,
                amount: extractedData[hsnId + 10].content,
                unitPrice: parseFloat(extractedData[hsnId + 6].content) || 0,
                taxType: taxType,
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

    const vendorNameId = '1-10';
    const invoiceDateId = '1-92';
    const invoiceNumberId = '1-91';
    const invoiceCurrency = 'INR';
    // const invoiceAmountId = '1-36';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                const vendorNameData = extractedData.find((item) => item.id === vendorNameId);
                const venName = vendorNameData ? `${vendorNameData.content} Ltd` : '';


                const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
                const invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/^INVOICE DATE:\s*/, '') : '';

                const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
                const invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/^INVOICE NUMBER:\s*/, '') : '';

                // const invoiceAmountData = extractedData.find((item) => item.id === invoiceAmountId);
                // const invoiceAmount = invoiceAmountData ? invoiceAmountData.content : '';

                // const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                //     const amount = parseFloat(hsnLine.amount) || 0;
                //     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                //     const igst = parseFloat(hsnLine.igst) || 0;
                //     const cgst = parseFloat(hsnLine.cgst) || 0;
                //     const sgst = parseFloat(hsnLine.sgst) || 0;
                //     return add + amount;
                // }, 0).toFixed(2);

                // const igst = structuredHSNLines.reduce((acc, hsnLine) => {
                //     return acc + parseFloat(hsnLine.igst) || 0;
                // }, 0).toFixed(2);

                // const cgst = structuredHSNLines.reduce((add, hsnLine) => {
                //     return add + parseFloat(hsnLine.cgst) || 0;
                // }, 0).toFixed(2);

                // const sgst = structuredHSNLines.reduce((acc, hsnLine) => {
                //     return acc + parseFloat(hsnLine.sgst) || 0;
                // }, 0).toFixed(2);

                currentInvoice = {
                    "venName": venName,
                    "gstNumber": gstNumber,
                    "invoiceDate": invoiceDate,
                    "invoiceNumber": invoiceNumber,
                    "invoiceCurrency": invoiceCurrency,
                    "financialYear": financialYear,
                    // "invoiceAmount": invoiceAmount,
                    // "igst": igst,
                    // "cgst": cgst,
                    // "sgst": sgst,
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
    const invoiceAmountRegex=[" E & O E   Total   "];
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

                if (gstNumber === '33AAKCM7465L2ZW') {
                    venName = 'MSN CONTAINER LINE PRIVATE LIMITED';
                }


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

export const extractFredexfrieght = async (pdf) => {
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;
    console.log(allLines)
    const structuredHSNLines = [];
    const hsns = [];
    const hsnTaxes = [];
    const hsnTaxesRegex = / \d+\.\d{6} /;
    const qtyArray=[]
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
                taxAmount: taxType === "No Tax" ? 0 : taxType === "IGST" ? hsnTaxesArray[6] : Number(hsnTaxesArray[2]) + Number(hsnTaxesArray[4]),
                taxPercentage: taxType === "No Tax" ? 0 : taxType === "IGST" ? hsnTaxesArray[5] : hsnTaxesArray[1],
                charge: hsnTaxesArray.length < 12 ? hsnTaxesArray[hsnTaxesArray.length - 1] : 0,
                quotation: null,
                unitPrice: unitPrice.length ? taxType === "No Tax" ? unitPrice[2] : unitPrice[2] : 0,
                unitQuantity: unitQuantity ? unitQuantity : 0,
                amount: taxType === "No Tax" ? hsnTaxesArray[hsnTaxesArray.length - 1] : 0,
                description: hsnTaxesArray.splice(1,hsnTaxesArray.length).filter(rec => (!rec.match(/([\d,]*\d+\.\d{2})/)&&!currency_list.includes(rec))).join(' '),
            }
            structuredHSNLines.push(hsnLinesData);
            hsnIndex += 1;
        }
    }


    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;

    const invoiceDateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
    const invoiceNumberRegex = /Invoice Number : (\w+)/;
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

                venName = 'FedEx Trade Networks Transport & Brokerage Private Limited';


                const invoiceDateData = extractedData.find((item) => item.content.match(invoiceDateRegex));
                invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.content.match(invoiceNumberRegex));
                invoiceNumber = invoiceNumberData ? invoiceNumberData.content.match(invoiceNumberRegex)[1] : '';

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
    const allLines = await extractPDFDataToLinesData(pdf);
    const extractedData = allLines;

    const structuredHSNLines = [];
    let currentHSN = null;
    let hsnId = null;
    let linesId = 0;
    
    for (const line of extractedData) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);
        if (hsnMatch) {
            hsnId = linesId;
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }
    
            const taxPercentageContent = extractedData[hsnId - 2].content;
            const taxPercentageMatch = taxPercentageContent.match(/\d+(\.\d+)?/);
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

            const charge=  parseFloat(extractedData[hsnId - 2].content.replace(/,/g, '')).toFixed(2);
            const amount = parseFloat(extractedData[hsnId - 2].content.replace(/,/g, ''));
            const unitPrice = (amount/ unitQuantity).toFixed(2);

            currentHSN = {
                description: extractedData[hsnId - 1].content,
                HSN: hsnMatch[0],
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

    const invoiceDateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
    const invoiceNumberRegex = /263\d{6}/;
    const invoiceAmountRegex=[" Total Amount Due   INR   "];
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

                if (gstNumber === '29AABCF6516A1ZZ') {
                    venName = 'FedEx Express Transportation and Supply Chain Services (India) Pvt. Ltd';
                }

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

export const extractPDFDataToLinesData = async (pdf: PDFDocumentProxy) => {
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
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
