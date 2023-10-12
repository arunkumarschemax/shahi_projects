export const extractDhl = async (pdf) => {
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
        extractedData.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
    }

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
                description: extractedData[hsnId + 1].content,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: extractedData[hsnId - 1].content,
                unitPrice: extractedData[hsnId - 2].content,
                taxType: taxType,
                charge: extractedData[hsnId - 10].content,
                taxPercentage: taxPercentage,
                taxAmount: extractedData[hsnId - 6].content*extractedData[hsnId - 9].content,
                tax: extractedData[hsnId - 6].content,
                roe:extractedData[hsnId - 9].content,
                amount: extractedData[hsnId - 4].content,
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

    const vendorId = '1-2';
    const invoiceDateId = '1-64';
    const invoiceNumberId = '1-84';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                const vendorNameData = extractedData.find((item) => item.id === vendorId);
                const venName = vendorNameData ? vendorNameData.content : '';

                const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
                const invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
                const invoiceNumber = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceAmount = structuredHSNLines.reduce((acc, hsnLine) => {
                    const charge = parseFloat(hsnLine.charge) || 0;
                    return acc + charge;
                }, 0).toFixed(2);

                const igst = structuredHSNLines.reduce((acc, hsnLine) => {
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    return acc + taxAmount;
                }, 0).toFixed(2);


                let cgst = "0.00";
                let sgst = "0.00";

                if (igst !== "0.00") {
                    cgst = "0.00";
                    sgst = "0.00";
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

    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractDart = async (pdf) => {
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;
    const allLines = [];

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
                allLines.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                idCounter++;
                line = '';
            }
            line += item.str + ' ';
        });
    }

    const structuredHSNLines = [];
    let currentHSN = null;

    for (const line of allLines) {
        if (line.content.includes("996") || line.content.match(/^\d{6}$/)) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            currentHSN = {
                description: [],
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
                currentHSN.description.push(line.content.trim());
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

    const vendorName = '2-273';
    const invoiceDateId = '1-15';
    const invoiceNumberId = '1-2';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                const vendorNameData = extractedData.find((item) => item.id === vendorName);
                const venName = vendorNameData ? vendorNameData.content : '';

                const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
                const invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
                const invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/^TAX INVOICE \s*/, '') : '';

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

    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }

}

export const extractExpeditors = async (pdf) => {
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;
    const allLines = [];

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
                allLines.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                idCounter++;
                line = '';
            }
            line += item.str + ' ';
        });
    }

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

            const taxPercentageContent = extractedData[hsnId + 4].content;
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

            const unitQuantityContent = extractedData[hsnId + 1].content;

            currentHSN = {
                description: extractedData[hsnId - 2].content,
                HSN: line.content.includes("HSN") ? line.content.match(/\d+/) : line.content.trim(),
                unitQuantity: unitQuantityContent || "1",
                unitPrice: extractedData[hsnId + 2].content.replace(/,/g, ''),
                taxType: taxType,
                charge: extractedData[hsnId + 2].content,
                taxPercentage: taxPercentage,
                taxAmount: parseFloat(extractedData[hsnId + 6].content) || 0,
                amount: extractedData[hsnId + 2].content,
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

    const vendorNameId = '1-5';
    const invoiceDateId = '1-19';
    const invoiceNumberId = '1-21';
    const invoiceCurrency = 'INR';
    const invoiceAmountId = '1-36';
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

                const invoiceAmountData = extractedData.find((item) => item.id === invoiceAmountId);
                const invoiceAmount = invoiceAmountData ? invoiceAmountData.content : '';

                // const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                //     const amount = parseFloat(hsnLine.amount) || 0;
                //     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                //     const igst = parseFloat(hsnLine.igst) || 0;
                //     const cgst = parseFloat(hsnLine.cgst) || 0;
                //     const sgst = parseFloat(hsnLine.sgst) || 0;
                //     return add + amount;
                // }, 0).toFixed(2);

                const igst = structuredHSNLines.reduce((acc, hsnLine) => {
                    return acc + parseFloat(hsnLine.igst) || 0;
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

export const extractEfl = async (pdf) => {
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;
    const allLines = [];

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
                allLines.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                idCounter++;
                line = '';
            }

            line += item.str + ' ';
        });
    }

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
                description: [],
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
                currentHSN.description.push(line.content.trim());
            }
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
            const taxAmountMatch = line.content.match(/=(\d+(\.\d+)?)/);
            if (taxAmountMatch) {
                currentHSN.taxAmount = parseFloat(taxAmountMatch[1]);
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
    const invoiceDateId = '1-14';
    const invoiceNumberId = '1-2';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);

            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];

                if (gstNumber === '29AAJCS1175L1ZU') {
                    const venName = 'EXPO FREIGHT PVT LTD';

                    const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
                    const invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                    const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
                    const invoiceNumberNew = invoiceNumberData ? invoiceNumberData.content : '';

                    const invoiceNumberMatch = invoiceNumberNew.match(/\|([^|]+)\|/);
                    const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[1] : '';

                    const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                        const amount = parseFloat(hsnLine.amount) || 0;
                        // const igst = parseFloat(hsnLine.igst) || 0;
                        // const sgst = parseFloat(hsnLine.sgst) || 0;
                        // const cgst = parseFloat(hsnLine.cgst) || 0;
                        const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                        // const taxAmounts = parseFloat(hsnLine.taxAmount) || 0;
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
                        "invoiceNumber": invoiceNumber,
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
    }

    console.log("PDF HSN DATA", JSON.stringify(structuredHSNLines, null, 2));
    console.log("PDF INVOICE Data", JSON.stringify(InvoiceLines, null, 2));
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractOocl = async (pdf) => {
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;
    const allLines = [];

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
                allLines.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                idCounter++;
                line = '';
            }
            line += item.str + ' ';
        });
    }

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
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;
    const allLines = [];

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
                allLines.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                idCounter++;
                line = '';
            }
            line += item.str + ' ';
        });
    }

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
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;
    const allLines = [];

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
                allLines.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                idCounter++;
                line = '';
            }
            line += item.str + ' ';
        });
    }

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

            // Check if taxPercentage is NaN or null and set it to 18 as a default
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

                const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                    const amount = parseFloat(hsnLine.amount) || 0;
                    const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                    const igst = parseFloat(hsnLine.igst) || 0;
                    const cgst = parseFloat(hsnLine.cgst) || 0;
                    const sgst = parseFloat(hsnLine.sgst) || 0;
                    return add + amount;
                }, 0).toFixed(2);

                const igst = structuredHSNLines.reduce((acc, hsnLine) => {
                    return acc + parseFloat(hsnLine.igst) || 0;
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
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractMaersk = async (pdf) => {
    const numPages = pdf.numPages;
    const extractedData = [];
    let idCounter = 1;
    const allLines = [];

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
                allLines.push({ id: `${pageNumber}-${idCounter}`, content: line.trim() });
                idCounter++;
                line = '';
            }
            line += item.str + ' ';
        });
    }

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
                description: extractedData[hsnId - 5].content,
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
    let venName = '';
    const vendorNameId = '1-2';
    const invoiceDateId = '1-9';
    const invoiceNumberId = '1-254';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    if (extractedData && Array.isArray(extractedData)) {
        for (const line of extractedData) {
            if (line.id >= '1-201' && line.id <= '2-300') {
                const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
                if (gstMatch && !gstNumberExtracted) {
                    const gstNumber = gstMatch[0];

                    if (gstNumber === '33AAHCA6078Q1Z3') {
                        venName = 'Damco India Pvt. Ltd';
                    } else {
                        const vendorNameData = extractedData.find((item) => item.id === vendorNameId);
                        venName = vendorNameData ? vendorNameData.content : '';
                    }

                    const invoiceDateData = extractedData.find((item) => item.id === invoiceDateId);
                    const invoiceDate = invoiceDateData ? invoiceDateData.content.replace(/^INVOICE DATE:\s*/, '') : '';

                    const invoiceNumberData = extractedData.find((item) => item.id === invoiceNumberId);
                    const invoiceNumber = invoiceNumberData ? invoiceNumberData.content.replace(/^INVOICE NUMBER:\s*/, '') : '';


                    // const invoiceAmountData = extractedData.find((item) => item.id === invoiceAmountId); 
                    // const invoiceAmount = invoiceAmountData ? invoiceAmountData.content : ''; 

                    const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
                        const amount = parseFloat(hsnLine.amount) || 0;
                        const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
                        // const igst = parseFloat(hsnLine.igst) || 0; 
                        // const cgst = parseFloat(hsnLine.cgst) || 0; 
                        // const sgst = parseFloat(hsnLine.sgst) || 0; 
                        return add + amount + taxAmount;
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
    }
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
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
