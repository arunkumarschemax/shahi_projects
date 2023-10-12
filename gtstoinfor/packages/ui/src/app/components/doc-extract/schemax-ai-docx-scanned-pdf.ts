import { createWorker } from "tesseract.js";


export const getImagesFromPdf = async (pdf) => {
    const pagePromises = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
            canvasContext,
            viewport,
        };
        const renderTask = page.render(renderContext);
        const promise = new Promise((resolve, reject) => {
            renderTask.promise.then(
                function () {
                    resolve(canvas.toDataURL('image/jpeg'));
                },
                reject
            );
        });
        pagePromises.push(promise);
    }

    const pageImages = await Promise.all(pagePromises);
    return pageImages;
}

export const parseExtractedText = (text, indexStart: number) => {
    const lines = text.split('\n');
    const data = [];

    lines.forEach((line, index) => {
        data.push({
            id: index + 1,
            content: line.trim(),
        });
    });
    return data;
};


export const extractDataFromScannedImages = async (pageImages: any[], invoicePageNos: number[]) => {
    const worker = createWorker({
        logger: (m) => console.log(m), // Optional: Enable logging
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const allPageLines = [];
    let indexStart = 0;
    for (let i = 0; i < pageImages.length; i++) {
        if (!invoicePageNos.includes(i))
            continue;
        const imageBase64 = pageImages[i];
        const { data: { text } } = await worker.recognize(imageBase64);
        console.log(`Page ${i + 1} Text:`, text);
        const allLines = parseExtractedText(text, indexStart);
        indexStart += allLines.length;
        allPageLines.push(...allLines);
    }
    await worker.terminate();
    return allPageLines;
}


export const extractEflInvoiceDataFromScanned = async (allLines: any[]) => {
    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines')
    for (const line of allLines) {
        if (line.content.includes("HSN") || line.content.match(/^\d{6}$/)) {
            if (currentHSN) {
                currentHSN.variance = currentHSN.charge - currentHSN.quotation;
                structuredHSNLines.push(currentHSN);
            }
            currentHSN = {
                HSN: line.content.includes("HSN")
                    ? line.content.match(/\d+/)
                    : line.content.trim(),
                taxType: line.content.match(/IGST|CGST|SGST/),
                taxAmount: null,
                description: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };

            const taxAmountMatch = line.content.match(
                /(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/
            );
            if (taxAmountMatch) {
                currentHSN.taxAmount = {
                    taxPercentage: parseFloat(taxAmountMatch[1]),
                    taxAmount: parseFloat(taxAmountMatch[3]),
                };
            }
        } else if (line.content.includes("IGST|CGST|SGST|GST")) {
            currentHSN.taxType = "IGST";
        }
        if (line.content.includes("charge")) {
            const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
            if (chargeValueMatch) {
                currentHSN.charge = parseFloat(
                    chargeValueMatch[1].replace(/,/g, "")
                );
            }
        }

        if (line.content.includes("quotation")) {
            const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
            if (quotationValueMatch) {
                currentHSN.quotation = parseFloat(
                    quotationValueMatch[1].replace(/,/g, "")
                );
            }
        }

        if (currentHSN && !currentHSN.description) {
            currentHSN.description = line.content.trim();
        }
    }
    structuredHSNLines.forEach((line) => {
        if (line.taxAmount) {
            line.taxPercentage = line.taxAmount.taxPercentage;
            line.taxAmount = line.taxAmount.taxAmount;
        }
    });

    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;
    const invoiceDateId = '9';
    const invoiceNumberId = '8';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '33AAACE2126J1Z3': 'EXPO FREIGHT PRIVATE LIMITED',
    };

    if (allLines && Array.isArray(allLines)) {
        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);

            if (gstMatch && !gstNumberExtracted) {
                const gstNumber = gstMatch[0];
                const vendorName = gstVendorMapping[gstNumber];

                const invoiceDateData = allLines.find((item) => item.id === parseInt(invoiceDateId, 10));
                const invoiceDate = invoiceDateData ? invoiceDateData.content : '';

                const invoiceNumberData = allLines.find((item) => item.id === parseInt(invoiceNumberId, 10));
                const invoiceNumberNew = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceNumberMatch = invoiceNumberNew.match(/\|([^|]+)\|/);
                const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[1] : '';

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
                    "venName": vendorName || '',
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
    console.log(
        "IMAGE HSN DATA",
        JSON.stringify(structuredHSNLines, null, 2)
    );

    console.log(
        "IMAGE HSN DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractSrivaruInvoiceDataFromScanned = async (allLines: any[]) => {
    const structuredHSNLines = [];
    let currentHSN = null;

    const InvoiceLines = [];
    return {
        extractedData: InvoiceLines?.[0],
        extractedHsnData: structuredHSNLines
    }
}