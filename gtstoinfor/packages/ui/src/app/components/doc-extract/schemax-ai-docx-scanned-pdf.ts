import { createWorker } from "tesseract.js";
import { rgb } from 'pdf-lib';
import { SizeConverter } from "./helper/sizeConverter";

const cleanOcrDate = (dateString) => {
    // Remove extra spaces and leading/trailing whitespace
    dateString = dateString.trim();
    dateString = dateString.replace(/\s+/g, ' ');

    // Use regular expressions to match and correct the date format
    const datePattern = /(\d{1,2})?-((\d{1,2})?[A-Za-z]*?)-(\d{2})/;
    const match = dateString.match(datePattern);
    if (match) {
        console.log(match)
        const day = (match[1] || '').padStart(2, '0');
        let month = match[2].replace(/[^A-Za-z]/g, ''); // Remove non-alphabet characters
        const year = Number(match[3]) ? match[3].padStart(2, '0') : match[4].padStart(2, '0');

        // Convert the date to a standardized format
        const cleanedDate = `${day}-${month}-${year}`;

        // Validate the date to ensure it's a valid date
        const parsedDate = new Date(cleanedDate);
        if (!isNaN(parsedDate.getTime())) {
            return cleanedDate;
        }
    }

    // Return null for invalid dates or non-matching formats
    return null;
}
const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = url;
});


export const getImagesFromPdf = async (pdf, setImageDownloadLinks) => {
    const pagePromises = [];
    const pageImages = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.0, rotation: 0 });
        // const pixelRatio = window.devicePixelRatio * 2;
        // let pdfOriginalWidth = viewport.width;
        // let viewpointHeight = viewport.height;
        // const canvas = document.createElement('canvas');
        // canvas.getContext('2d').scale(pixelRatio, pixelRatio);
        // canvas.style.width = `${pdfOriginalWidth}px`;
        // canvas.style.height = `${viewpointHeight}px`;
        // const canvasContext = canvas.getContext('2d');
        // canvas.height = viewport.height * pixelRatio;
        // canvas.width = viewport.width * pixelRatio;
        // const renderContext = {
        //     canvasContext,
        //     viewport,
        // };

        const canvas = document.createElement('canvas');
        const horizontalMm = SizeConverter.ConvertFromPxToMm(viewport.width, 72);
        const verticalMm = SizeConverter.ConvertFromPxToMm(viewport.height, 72);

        const actualWidth = SizeConverter.ConvertFromMmToPx(horizontalMm, 300);
        const actualHeight = SizeConverter.ConvertFromMmToPx(verticalMm, 300);

        canvas.width = actualWidth;
        canvas.height = actualHeight;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const scale = Math.min(actualWidth / viewport.width, actualHeight / viewport.height);
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        await page.render({
            canvasContext: ctx,
            viewport: page.getViewport({ scale: scale, rotation: 0 }),
        }).promise;

        let b64str = canvas.toDataURL();
        let loadedImg = await loadImage(b64str);
        canvas.toBlob(function (blob) {
            const downloadURL = URL.createObjectURL(blob);
            setImageDownloadLinks((prevLinks) => [
                ...prevLinks,
                { url: downloadURL, filename: `page_${pageNumber}.jpg` },
            ]);
        })
        //pagePromises.push(promise);
        pageImages.push(loadedImg);
    }

    //const pageImages = await Promise.all(pagePromises);
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
    const customWhitelist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%@#()-: .,/$';
    await worker.setParameters({
        tessedit_char_whitelist: customWhitelist,
    });
    const allPageLines = [];
    let indexStart = 0;
    const alreadyProcessedPages = [];
    for (let i = 0; i < pageImages.length; i++) {
        if (!invoicePageNos.includes(i))
            continue;
        if (alreadyProcessedPages.includes(i))
            continue;
        const imageBase64 = pageImages[i];
        const { data: { text } } = await worker.recognize(imageBase64);
        console.log(`Page ${i + 1} Text:`, text);
        const allLines = parseExtractedText(text, indexStart);
        indexStart += allLines.length;
        allPageLines.push(...allLines);
        alreadyProcessedPages.push(i)
    }
    await worker.terminate();
    return allPageLines;
}

export const convertScannedPdfToSelectablePdf = async (scannedPdfDoc, selectablePdf, images: any[]) => {
    const worker = createWorker({
        logger: (m) => console.log(m), // Optional: Enable logging
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const pdfPages = scannedPdfDoc.getPages();
    const newTextPages: any[] = [];
    let imageIndex = 0;
    for (const pdfPage of pdfPages) {
        const { data: { text, words } } = await worker.recognize(images[imageIndex]);
        const newTextPage = selectablePdf
            .addPage([pdfPage.getWidth(), pdfPage.getHeight()])
        try {
            words.forEach((word) => {
                const x = word.bbox.x0;
                const y = pdfPage.getHeight() - word.bbox.y1;
                newTextPage.drawText(word.text, {
                    x,
                    y,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
            });
        } catch (error) {

        }
        newTextPages.push(newTextPage);
        imageIndex += 1;
    }
    const modifiedPdfBytes = await selectablePdf.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const objectURL = URL.createObjectURL(blob);
    return objectURL;
}

export const extractEflInvoiceDataFromScanned = async (allLines: any[]): Promise<any> => {
    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '29AAACE2126J1ZS': 'EXPO FREIGHT PRIVATE LIMITED',
    };

    const invoiceNumberIds = [/EFL-BLR-\w{8}/];
    const invoiceDateIds = [/(\d{2}-[A-Z][a-z]{2}-\d{2})/];

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            for (const item of data) {
                const invoiceDateRegex = invoiceDateId;
                if (invoiceDateRegex.test(item.content)) {
                    const match = item.content.match(invoiceDateRegex);
                    if (match) {
                        extractedData.invoiceDate = match[0];
                    }
                }
            }
        }

        for (const invoiceNumberId of invoiceNumberIds) {
            for (const item of data) {
                const invoiceNumberRegex = invoiceNumberId;
                if (invoiceNumberRegex.test(item.content)) {
                    const match = item.content.match(invoiceNumberRegex);
                    if (match) {
                        extractedData.invoiceNumber = match[0];
                    }
                }
            }
        }

        return extractedData;
    };

    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GST No\. ([A-Z\d]{15})/;
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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

        console.log(
            "IMAGE HSN DATA",
            JSON.stringify(structuredHSNLines, null, 2)
        );

        console.log(
            "IMAGE Invoice DATA",
            JSON.stringify(InvoiceLines, null, 2)
        );

        return {
            extractedData: InvoiceLines[0],
            extractedHsnData: structuredHSNLines
        };
    }

}

export const extractKrsnaInvoiceDataFromScanned = async (allLines: any[]) => {
    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }
            currentHSN = {
                HSN: hsnMatch[0],
                description: null,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };

            const descriptionStart = line.content.indexOf("996");
            if (descriptionStart !== -1) {
                currentHSN.description = line.content.slice(0, descriptionStart).trim();
            }

            const descriptionAfterHSN = line.content.slice(descriptionStart + 3);
            const taxAmountMatch = descriptionAfterHSN.match(/(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/);
            if (taxAmountMatch) {
                currentHSN.taxAmount = {
                    taxPercentage: parseFloat(taxAmountMatch[1]),
                    taxAmount: parseFloat(taxAmountMatch[3]),
                };
            }
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }

                if (!currentHSN.description) {
                    currentHSN.description = line.content.trim();
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceDateId = '8';
    const invoiceNumberId = '7';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '29AAGCI8189K1ZP': 'INSTANT PANTHER LOGISTICS PVT LTD'
    };

    if (allLines && Array.isArray(allLines)) {
        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN\s*No:\s*([\dA-Z]{15})/;
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

                const invoiceDateData = allLines.find((item) => item.id === parseInt(invoiceDateId, 10));
                const invoiceDatNew = invoiceDateData ? invoiceDateData.content : '';
                const invoiceDate = invoiceDatNew.replace(/.*:/, '').trim();


                const invoiceNumberData = allLines.find((item) => item.id === parseInt(invoiceNumberId, 10));
                const invoiceNumberNew = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceNumber = invoiceNumberNew.replace(/.*:/, '').trim();

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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractKsrInvoiceDataFromScanned = async (allLines: any[]) => {
    // const structuredHSNLines = [];
    // let currentHSN = null;
    // console.log(allLines, 'allLines');

    // for (const line of allLines) {
    //     const hsnMatch = line.content.match(/\b996\d{3}\b/);

    //     if (hsnMatch) {
    //         if (currentHSN) {
    //             structuredHSNLines.push(currentHSN);
    //         }
    //         currentHSN = {
    //             HSN: hsnMatch[0],
    //             description: line.content,
    //             taxType: null,
    //             taxAmount: null,
    //             charge: null,
    //             quotation: null,
    //             unitPrice: null,
    //         };
    //     } else {
    //         if (line.content.includes("IGST|CGST|SGST|GST")) {
    //             currentHSN.taxType = "IGST";
    //         }

    //         if (line.content.includes("charge")) {
    //             const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
    //             if (chargeValueMatch) {
    //                 currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
    //             }
    //         }

    //         if (line.content.includes("quotation")) {
    //             const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
    //             if (quotationValueMatch) {
    //                 currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
    //             }

    //             if (!currentHSN.description) {
    //                 currentHSN.description = line.content.trim();
    //             }
    //         }
    //     }
    // }

    // if (currentHSN) {
    //     structuredHSNLines.push(currentHSN);
    // }

    // structuredHSNLines.forEach((line) => {
    //     if (line.taxAmount) {
    //         line.taxPercentage = line.taxAmount.taxPercentage;
    //         line.taxAmount = line.taxAmount.taxAmount;
    //     }
    // });

    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            let description = line.content.slice(0, hsnMatch.index).trim();
            const pipeIndex = description.indexOf('|');
            if (pipeIndex !== -1) {
                description = description.slice(pipeIndex + 1).trim();
            }

            currentHSN = {
                HSN: hsnMatch[0],
                description: description,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceDateId = '13';
    const invoiceNumberId = '12';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '33AAACK1360L1ZR': ' K.S.R Freight Forwarders Pvt. Ltd ',
        '29AAACK1360L1ZG': ' K.S.R Freight Forwarders Pvt. Ltd ',
        '290AAACK1360L12G': ' K.S.R Freight Forwarders Pvt. Ltd ',
        '290AAACK1360L12': ' K.S.R Freight Forwarders Pvt. Ltd ',


    };

    if (allLines && Array.isArray(allLines)) {
        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN\s*:\s*([\dA-Z]{15})/;
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

                const invoiceDateData = allLines.find((item) => item.id === parseInt(invoiceDateId, 10));
                const invoiceDatNew = invoiceDateData ? invoiceDateData.content : '';
                const invoiceDate = invoiceDatNew.replace(/.*:/, '').trim();


                const invoiceNumberData = allLines.find((item) => item.id === parseInt(invoiceNumberId, 10));
                const invoiceNumberNew = invoiceNumberData ? invoiceNumberData.content : '';

                const invoiceNumber = invoiceNumberNew.replace(/.*:/, '').trim();

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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractDpInvoiceDataFromScanned = async (allLines: any[]) => {
    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            let description = line.content.slice(0, hsnMatch.index).trim();
            const pipeIndex = description.indexOf('|');
            if (pipeIndex !== -1) {
                description = description.slice(pipeIndex + 1).trim();
            }

            currentHSN = {
                HSN: hsnMatch[0],
                description: description,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '33AACCD7172M12G': 'DP LOGISTICS PVT LTD',
        '27AACCD7172M129': 'DP LOGISTICS PVT LTD',
    };

    const invoiceDateId = 'Date :';
    const invoiceNumberId = 'Invoice No. :';

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
        const InvoiceDateValue = InvoiceDateItem ? InvoiceDateItem.content.split(invoiceDateId)[1].trim() : '';

        const invoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
        const invoiceNumberValue = invoiceNumberItem ? invoiceNumberItem.content.split(invoiceNumberId)[1].trim() : '';

        const trimmedInvoiceNumberValue = invoiceNumberValue.replace(/Date.*/, '').trim();

        return {
            invoiceDate: InvoiceDateValue,
            invoiceNumber: trimmedInvoiceNumberValue
        };
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GST NO:\s*([\dA-Z]{15})/;
            const regex1 = /GST NO\. (\w{15})/;
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            const match1 = regex1.exec(line.content);
            if ((match && !gstNumberExtracted) || (match1 && !gstNumberExtracted)) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match?.[1] ? match[1] : match1?.[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractSrijiInvoiceDataFromScanned = async (allLines: any[]) => {
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '29AAECS360282ZR': 'Shreeji Transport Services',
    };

    const invoiceDateIds = [' BILL DATE: ', 'BILL DATE : '];
    const invoiceNumberIds = ['BILL NO :'];

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
            if (InvoiceDateItem) {
                extractedData.invoiceDate = InvoiceDateItem.content.split(invoiceDateId)[1].trim();
                break;
            }
        }
        for (const invoiceNumberId of invoiceNumberIds) {
            const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
            if (InvoiceNumberItem) {
                extractedData.invoiceNumber = InvoiceNumberItem.content.split(invoiceNumberId)[1].trim();
                break;
            }
        }


        return extractedData;
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN :\s*([\dA-Z]{15})/;
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines?.[0],
        extractedHsnData: structuredHSNLines
    }
};

export const extractSrivaruInvoiceDataFromScanned = async (allLines: any[]) => {
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '23A00PS56793J2Z': 'Srivaru Transport',
        '29A00PS6793J2ZQ': 'Srivaru Transport',
    };

    const invoiceDateIds = [' Invoice Date +', 'Invoice Date :'];
    const invoiceNumberIds = ['Invoice No :'];

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
            if (InvoiceDateItem) {
                extractedData.invoiceDate = InvoiceDateItem.content.split(invoiceDateId)[1].trim();
                break;
            }
        }
        for (const invoiceNumberId of invoiceNumberIds) {
            const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
            if (InvoiceNumberItem) {
                extractedData.invoiceNumber = InvoiceNumberItem.content.split(invoiceNumberId)[1].trim();
                break;
            }
        }


        return extractedData;
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN\s*([\dA-Z]{15})/;
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractWaymarknvoiceDataFromScanned = async (allLines: any[]) => {

    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            let description = line.content.slice(0, hsnMatch.index).trim();
            const pipeIndex = description.indexOf('|');
            if (pipeIndex !== -1) {
                description = description.slice(pipeIndex + 1).trim();
            }

            currentHSN = {
                HSN: hsnMatch[0],
                description: description,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '26AAACW7308Q1ZM': 'WAYMARK LOGISTICS INDIA PRIVATE LIMITED',
        '20AAACW7308Q1ZM': 'WAYMARK LOGISTICS INDIA PRIVATE LIMITED',
    };

    const invoiceDateIds = ['Dt.'];
    const invoiceNumberIds = [' Involce No /Date', ' Invoice No /Date '];

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
            if (InvoiceDateItem) {
                extractedData.invoiceDate = InvoiceDateItem.content.split(invoiceDateId)[1].trim();
                break;
            }
        }
        for (const invoiceNumberId of invoiceNumberIds) {
            const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
            if (InvoiceNumberItem) {
                const invoiceNumberContent = InvoiceNumberItem.content;
                const invoiceNumberSplit = invoiceNumberContent.split(invoiceNumberId);
                if (invoiceNumberSplit[1].includes("Dt")) {
                    extractedData.invoiceNumber = invoiceNumberSplit[1].split("Dt")[0].trim();
                } else {
                    extractedData.invoiceNumber = invoiceNumberSplit[1].trim();
                }

                break;
            }
        }

        return extractedData;
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN\.NO:\s*([\dA-Z]{15})/;
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractVinayakaInvoiceDataFromScanned = async (allLines: any[]) => {
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '29AEAPL6787P271': 'SRI VINAYAKA TRANSPORT',
    };

    const invoiceDateIds = [' Invoice Date +', 'Invoice Date :'];
    const invoiceNumberIds = ['invoiceno | '];

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
            if (InvoiceDateItem) {
                extractedData.invoiceDate = InvoiceDateItem.content.split(invoiceDateId)[1].trim();
                break;
            }
        }
        for (const invoiceNumberId of invoiceNumberIds) {
            const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
            if (InvoiceNumberItem) {
                extractedData.invoiceNumber = InvoiceNumberItem.content.split(invoiceNumberId)[1].trim();
                break;
            }
        }


        return extractedData;
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GST NO : ([\dA-Z]{15})/;
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractNipponInvoiceDataFromScanned = async (allLines: any[]) => {
    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            let description = line.content.slice(0, hsnMatch.index).trim();
            const pipeIndex = description.indexOf('|');
            if (pipeIndex !== -1) {
                description = description.slice(pipeIndex + 1).trim();
            }

            currentHSN = {
                HSN: hsnMatch[0],
                description: description,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '33AACCN5026E1ZY': 'Nippon Express (India) Private Limited',
        '33RACCN5026E1ZY': 'Nippon Express (India) Private Limited',
    };

    const invoiceDateId = 'ISSUE DATE:';
    const invoiceNumberId = 'INVOICE NO.';

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
        const InvoiceDateValue = InvoiceDateItem ? InvoiceDateItem.content.split(invoiceDateId)[1].trim() : '';

        const invoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
        const invoiceNumberValue = invoiceNumberItem ? invoiceNumberItem.content.split(invoiceNumberId)[1].trim() : '';
        const trimmedInvoiceNumberValue = invoiceNumberValue.replace(/(TAx\s*'NVO\|CE|TAX INVO\|CE)/gi, '').trim();

        return {
            invoiceDate: InvoiceDateValue,
            invoiceNumber: trimmedInvoiceNumberValue
        };
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GST IN NO.\s*([\dA-Z]{15})/;
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractLigiInvoiceDataFromScanned = async (allLines: any[]) => {
    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines')
    for (const line of allLines) {
        if (line.content.includes("996") || line.content.match(/^\d{6}$/)) {
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
                /(\d+(?:\.\d+)?)%/
            );
            if (taxAmountMatch) {
                currentHSN.taxAmount = {
                    taxPercentage: parseFloat(taxAmountMatch[1]),
                    taxAmount: parseFloat(taxAmountMatch[2]),
                };
            }
        } else if (line.content.includes("IGST|CGST|SGST|GST")) {
            currentHSN.taxType = "IGST";
        }
        if (line.content.includes("charge")) {
            const chargeValueMatch = line.content.match(/\d{1,3}(?:,\d{3})*(?:\.\d{2})?/);
            if (chargeValueMatch) {
                const chargeValue = chargeValueMatch[0];
                console.log(`The charge value is: ${chargeValue}`);
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {

        '33AAEFL5118J12G': 'LIGI ENTERPRISES',
        "33AAEFLS118J1ZG": 'LIGI ENTERPRISES',
    };

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        const invoiceDateId = 'Date :';
        const invoiceNumberId = 'Invoice No. :';

        const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
        const InvoiceDateValue = InvoiceDateItem ? InvoiceDateItem.content.split(invoiceDateId)[1].trim() : '';
        const trimmedInvoiceDateValue = InvoiceDateValue.match(/\d{1,}-[A-Za-z]{3}-\d{2}/);


        const invoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
        const InvoiceNumberValue = invoiceNumberItem ? invoiceNumberItem.content.split(invoiceNumberId)[1].trim() : '';

        const trimmedInvoiceNumberValue = InvoiceNumberValue.match(/\d{1,}-[A-Za-z]{3}-\d{2}/);

        extractedData.invoiceDate = trimmedInvoiceDateValue;
        extractedData.invoiceNumber = trimmedInvoiceNumberValue ? trimmedInvoiceNumberValue[0] : '';

        return extractedData;
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GST[ ]*IN[\/]*UIN:[ ]*([\dA-Z]{15})/i;
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractNikkouInvoiceDataFromScanned = async (allLines: any[]) => {
    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            let description = line.content.slice(0, hsnMatch.index).trim();
            const pipeIndex = description.indexOf('|');
            if (pipeIndex !== -1) {
                description = description.slice(pipeIndex + 1).trim();
            }

            currentHSN = {
                HSN: hsnMatch[0],
                description: description,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {

        '29AAJCS1175L1ZU': 'Nikkou Logistics Private Limited',
        "29AAICSH175L1ZU": 'Nikkou Logistics Private Limited',
    };

    const invoiceDateIds = [' Invoice Date +', 'Invoice Date :'];
    const invoiceNumberIds = ['# : '];

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
            if (InvoiceDateItem) {
                const match = InvoiceDateItem.content.match(/\d{2}\/\d{2}\/\d{4}/);
                extractedData.invoiceDate = match ? match[0] : '';
                break;
            }
        }
        for (const invoiceNumberId of invoiceNumberIds) {
            const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
            if (InvoiceNumberItem) {
                const contentParts = InvoiceNumberItem.content.split(invoiceNumberId);
                if (contentParts[1].includes('/')) {
                    extractedData.invoiceNumber = contentParts[1].trim().split('/')[0];
                } else {
                    extractedData.invoiceNumber = contentParts[1].trim().split(' ')[0];
                }
                break;
            }
        }



        return extractedData;
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN\s*([0-9A-Za-z]{15})/;
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

export const extractRingoCargoInvoiceDataFromScanned = async (allLines: any[]) => {

    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            let description = line.content.slice(0, hsnMatch.index).trim();
            const pipeIndex = description.indexOf('|');
            if (pipeIndex !== -1) {
                description = description.slice(pipeIndex + 1).trim();
            }

            currentHSN = {
                HSN: hsnMatch[0],
                description: description,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '33ACQPR8556G2Z2': 'RINGO CARGO CARE',
        '33ACQPR8556G27Z': 'RINGO CARGO CARE',
    };

    const invoiceDateIds = ['Invoice Date ', 'Invoice Date  '];
    const invoiceNumberIds = ['Invoice No. ', 'Invoice No. _ '];

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
            if (InvoiceDateItem) {
                extractedData.invoiceDate = InvoiceDateItem.content.split(invoiceDateId)[1].trim();
                break;
            }
        }
        for (const invoiceNumberId of invoiceNumberIds) {
            const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
            if (InvoiceNumberItem) {
                extractedData.invoiceNumber = InvoiceNumberItem.content.split(invoiceNumberId)[1].trim();
                break;
            }
        }
        return extractedData;
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GST Reg\. No\. - ([A-Z0-9]{15})/;
            const regex1 = /GST Reg\. No\.\s(\d\s)?([A-Z0-9]{15})/
            //  /GSTIN\.NO: ([\dA-Z]{15})/; //
            // /GST NO\.\s*([\dA-Z]{15})/
            // /GST NO:\s*([\dA-Z]{15})/
            const match = regex.exec(line.content);
            const match1 = regex1.exec(line.content);
            if ((match && !gstNumberExtracted) || (match1 && !gstNumberExtracted)) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match?.[1] ? match[1] : match1?.[2];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );

    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    };

}

// export const extractAplInvoiceDataFromScanned = async (allLines: any[]) => {
//     const structuredHSNLines = [];
//     let currentHSN = null;

//     for (const line of allLines) {
//         const hsnMatch = line.content.match(/\b996\d{3}\b/);

//         if (hsnMatch) {
//             if (currentHSN) {
//                 structuredHSNLines.push(currentHSN);
//             }
//             currentHSN = {
//                 HSN: hsnMatch[0],
//                 description: null,
//                 taxType: null,
//                 taxAmount: null,
//                 charge: null,
//                 quotation: null,
//                 unitPrice: null,
//             };

//             const descriptionStart = line.content.indexOf("996");
//             if (descriptionStart !== -1) {
//                 currentHSN.description = line.content.slice(0, descriptionStart).trim();
//             }

//             const descriptionAfterHSN = line.content.slice(descriptionStart + 3);
//             const taxAmountMatch = descriptionAfterHSN.match(/(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/);
//             if (taxAmountMatch) {
//                 currentHSN.taxAmount = {
//                     taxPercentage: parseFloat(taxAmountMatch[1]),
//                     taxAmount: parseFloat(taxAmountMatch[3]),
//                 };
//             }
//         } else {
//             if (line.content.includes("IGST|CGST|SGST|GST")) {
//                 currentHSN.taxType = "IGST";
//             }

//             if (line.content.includes("charge")) {
//                 const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
//                 if (chargeValueMatch) {
//                     currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
//                 }
//             }

//             if (line.content.includes("quotation")) {
//                 const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
//                 if (quotationValueMatch) {
//                     currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
//                 }

//                 if (!currentHSN.description) {
//                     currentHSN.description = line.content.trim();
//                 }
//             }
//         }
//     }

//     if (currentHSN) {
//         structuredHSNLines.push(currentHSN);
//     }

//     structuredHSNLines.forEach((line) => {
//         if (line.taxAmount) {
//             line.taxPercentage = line.taxAmount.taxPercentage;
//             line.taxAmount = line.taxAmount.taxAmount;
//         }
//     });


//     const InvoiceLines = [];
//     let currentInvoice = null;
//     let gstNumberExtracted = false;
//     const invoiceCurrency = 'INR';
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     const gstVendorMapping = {
//         '27ARCCA9694B1ZK': 'APL Logistics (India) Private Ltd',
//         '33AACCA9694B1ZR': 'APL Logistics (India) Private Ltd'
//     };

//     const invoiceDateIds = ['Invoice date '];
//     const invoiceNumberIds = ['Invoice No :'];
//     const invoiceAmountIds = ['TOTAL AMOUNT (INR)'];
//     const igstPattern = /IGST 18 [%$] OF ([\d.]+) ([\d.]+)/;

//     const extractInvoiceData = (data) => {
//         const extractedData = {
//             invoiceDate: '',
//             invoiceNumber: '',
//             invoiceAmount: '',
//             igst: '0.00'
//         };

//         for (const invoiceDateId of invoiceDateIds) {
//             const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
//             if (InvoiceDateItem) {
//                 let invoiceDate = InvoiceDateItem.content.split(invoiceDateId)[1].trim();
//                 invoiceDate = invoiceDate.replace(/:/, '');
//                 const cleanedOcrDate = cleanOcrDate(invoiceDate)
//                 extractedData.invoiceDate = cleanedOcrDate ? cleanedOcrDate : invoiceDate;
//                 break;
//             }
//         }

//         for (const invoiceNumberId of invoiceNumberIds) {
//             const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
//             if (InvoiceNumberItem) {
//                 extractedData.invoiceNumber = InvoiceNumberItem.content.split(invoiceNumberId)[1].trim();
//                 break;
//             }
//         }

//         for (const invoiceAmountId of invoiceAmountIds) {
//             const InvoiceAmountItem = data.find(item => item.content.includes(invoiceAmountId));
//             if (InvoiceAmountItem) {
//                 let invoiceAmount = InvoiceAmountItem.content.split(invoiceAmountId)[1].trim();
//                 invoiceAmount = invoiceAmount.replace(/[^0-9.]/g, '');
//                 extractedData.invoiceAmount = invoiceAmount;
//                 break;
//             }
//         }

//         for (let i = data.length - 1; i >= 0; i--) {
//             const line = data[i];
//             const igstMatch = igstPattern.exec(line.content);
//             if (igstMatch) {
//                 extractedData.igst = igstMatch[2];
//                 break;
//             }
//         }

//         return extractedData;
//     };

//     if (allLines && Array.isArray(allLines)) {
//         const invoiceData = extractInvoiceData(allLines);

//         for (const line of allLines) {
//             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//             const regex = /GST REG No:\s([A-Z0-9]{15})/;
//             const match = regex.exec(line.content);
//             if (match && !gstNumberExtracted) {
//                 const gstNumber = match[1];
//                 const vendorName = gstVendorMapping[gstNumber] ? gstVendorMapping[gstNumber] : gstVendorMapping['27ARCCA9694B1ZK'];

//                 currentInvoice = {
//                     "venName": vendorName || '',
//                     "gstNumber": gstNumber,
//                     "invoiceDate": invoiceData.invoiceDate,
//                     "invoiceNumber": invoiceData.invoiceNumber,
//                     "invoiceCurrency": invoiceCurrency,
//                     "financialYear": financialYear,
//                     "invoiceAmount": invoiceData.invoiceAmount,
//                     "cgst": "0.00",
//                     "sgst": "0.00",
//                     "igst": invoiceData.igst,
//                 };

//                 InvoiceLines.push(currentInvoice);
//                 gstNumberExtracted = true;
//             }
//         }
//     }

//     console.log(
//         "IMAGE HSN DATA",
//         JSON.stringify(structuredHSNLines, null, 2)
//     );

//     console.log(
//         "IMAGE Invoice DATA",
//         JSON.stringify(InvoiceLines, null, 2)
//     );

//     return {
//         extractedData: InvoiceLines[0],
//         extractedHsnData: structuredHSNLines
//     };
// }

export const extractTriwayInvoiceDataFromScanned = async (allLines: any[]): Promise<any> => {
    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }
            currentHSN = {
                HSN: hsnMatch[0],
                description: null,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };

            const descriptionStart = line.content.indexOf("996");
            if (descriptionStart !== -1) {
                currentHSN.description = line.content.slice(0, descriptionStart).trim();
            }

            const descriptionAfterHSN = line.content.slice(descriptionStart + 3);
            const taxAmountMatch = descriptionAfterHSN.match(/(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/);
            if (taxAmountMatch) {
                currentHSN.taxAmount = {
                    taxPercentage: parseFloat(taxAmountMatch[1]),
                    taxAmount: parseFloat(taxAmountMatch[3]),
                };
            }
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }

                if (!currentHSN.description) {
                    currentHSN.description = line.content.trim();
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
    }

    structuredHSNLines.forEach((line) => {
        if (line.taxAmount) {
            line.taxPercentage = line.taxAmount.taxPercentage;
            line.taxAmount = line.taxAmount.taxAmount;
        }
    });


    // const InvoiceLines = [];
    // let currentInvoice = null;
    // let gstNumberExtracted = false;
    // const invoiceCurrency = 'INR';
    // const currentYear = new Date().getFullYear();
    // const nextYear = currentYear + 1;
    // const financialYear = `${currentYear}-${nextYear}`;

    // const gstVendorMapping = {
    //     '33AAACT2874)228': 'TRIWAY FORWARDERS PRIVATE LIMITED',
    //     '33AAACT2874J228': 'TRIWAY FORWARDERS PRIVATE LIMITED'
    // };

    // const invoiceDateIds = [' Dt. ', 'Invoice Date  '];
    // const invoiceNumberIds = ['Invoice No /Date ', 'Invoice No. _ '];

    // const extractInvoiceData = (data) => {
    //     const extractedData = {
    //         invoiceDate: '',
    //         invoiceNumber: ''
    //     };

    //     for (const invoiceDateId of invoiceDateIds) {
    //         const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
    //         if (InvoiceDateItem) {
    //             extractedData.invoiceDate = InvoiceDateItem.content.split(invoiceDateId)[1].trim();
    //             break;
    //         }
    //     }
    //     for (const invoiceNumberId of invoiceNumberIds) {
    //         const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
    //         if (InvoiceNumberItem) {
    //             extractedData.invoiceNumber = InvoiceNumberItem.content.split(invoiceNumberId)[1].trim();
    //             break;
    //         }
    //     }
    //     return extractedData;
    // };


    // if (allLines && Array.isArray(allLines)) {
    //     const invoiceData = extractInvoiceData(allLines);

    //     for (const line of allLines) {
    //         const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
    //         const regex = /GSTIN\.NQ:\s([A-Z0-9]{15})/;
    //         const regex1 = /GSTIN\.NO:\s([A-Z0-9]{15})/;
    //         // const regex1=/GSTIN\.NO:\s([A-Z0-9]{15})/;
    //         // /GST NO\.\s*([\dA-Z]{15})/
    //         // /GST NO:\s*([\dA-Z]{15})/
    //         const match = regex.exec(line.content);
    //         const match1 = regex1.exec(line.content);
    //         // const match1 = regex1.exec(line.content);
    //         if ((match1 && !gstNumberExtracted) || (match && !gstNumberExtracted)) {
    //             // const gstNumber = gstMatch[0];

    //             const gstNumber = match?.[0] ? match[0] : match1?.[1];
    //             const vendorName = gstVendorMapping[gstNumber];

    //             const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
    //                 const amount = parseFloat(hsnLine.amount) || 0;
    //                 const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
    //                 return add + amount + taxAmount * 2;
    //             }, 0).toFixed(2);

    //             let igst = "0.00";
    //             let cgst = "0.00";
    //             let sgst = "0.00";

    //             for (const hsnLine of structuredHSNLines) {
    //                 if (hsnLine.taxPercentage === 18) {
    //                     igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
    //                 } else if (hsnLine.taxPercentage === 9) {
    //                     cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
    //                     sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
    //                 }
    //             }

    //             currentInvoice = {
    //                 "venName": vendorName || '',
    //                 "gstNumber": gstNumber,
    //                 "invoiceDate": invoiceData.invoiceDate,
    //                 "invoiceNumber": invoiceData.invoiceNumber,
    //                 "invoiceCurrency": invoiceCurrency,
    //                 "financialYear": financialYear,
    //                 "invoiceAmount": invoiceAmount,
    //                 "cgst": cgst,
    //                 "sgst": sgst,
    //                 "igst": igst,
    //             };

    //             InvoiceLines.push(currentInvoice);
    //             gstNumberExtracted = true;
    //         }
    //     }
    // }

    // console.log(
    //     "IMAGE HSN DATA",
    //     JSON.stringify(structuredHSNLines, null, 2)
    // );

    // console.log(
    //     "IMAGE Invoice DATA",
    //     JSON.stringify(InvoiceLines, null, 2)
    // );

    // return {
    //     extractedData: InvoiceLines[0],
    //     extractedHsnData: structuredHSNLines
    // };
    const InvoiceLines = [];
    let currentInvoice = null;
    let gstNumberExtracted = false;
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
         '33AAACT2874)228': 'TRIWAY FORWARDERS PRIVATE LIMITED',
        '33AAACT2874J228': 'TRIWAY FORWARDERS PRIVATE LIMITED'
    };

    const invoiceNumberIds = [/TCSE\/\d{5}\/\d{4}/];
    const invoiceDateIds = [/^\d{2}\/\d{2}\/\d{4}$/];    

    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            for (const item of data) {
                const invoiceDateRegex = invoiceDateId;
                if (invoiceDateRegex.test(item.content)) {
                    const match = item.content.match(invoiceDateRegex);
                    if (match) {
                        extractedData.invoiceDate = match[0];
                    }
                }
            }
        }

        for (const invoiceNumberId of invoiceNumberIds) {
            for (const item of data) {
                const invoiceNumberRegex = invoiceNumberId;
                if (invoiceNumberRegex.test(item.content)) {
                    const match = item.content.match(invoiceNumberRegex);
                    if (match) {
                        extractedData.invoiceNumber = match[0];
                    }
                }
            }
        }

        return extractedData;
    };

    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN\.NQ:\s([A-Z0-9]{15})/;
             const regex1 = /GSTIN\.NO:\s([A-Z0-9]{15})/;

             const match = regex.exec(line.content);
            const match1 = regex1.exec(line.content);
            // const match1 = regex1.exec(line.content);
            if ((match1 && !gstNumberExtracted) || (match && !gstNumberExtracted)) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match?.[0] ? match[0] : match1?.[1];
                const vendorName = gstVendorMapping[gstNumber];
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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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

        console.log(
            "IMAGE HSN DATA",
            JSON.stringify(structuredHSNLines, null, 2)
        );

        console.log(
            "IMAGE Invoice DATA",
            JSON.stringify(InvoiceLines, null, 2)
        );

        return {
            extractedData: InvoiceLines[0],
            extractedHsnData: structuredHSNLines
        };
    }

}

// export const extractDartInvoiceDataFromScanned = async (allLines: any[]): Promise<any> => {

//     const structuredHSNLines = [];
//     let currentHSN = null;
//     console.log(allLines, 'allLines');

//     for (const line of allLines) {
//         const hsnMatch = line.content.match(/\b996\d{3}\b/);

//         if (hsnMatch) {
//             if (currentHSN) {
//                 structuredHSNLines.push(currentHSN);
//             }

//             let description = line.content.slice(0, hsnMatch.index).trim();
//             const pipeIndex = description.indexOf('|');
//             if (pipeIndex !== -1) {
//                 description = description.slice(pipeIndex + 1).trim();
//             }

//             currentHSN = {
//                 HSN: hsnMatch[0],
//                 description: description,
//                 taxType: null,
//                 taxAmount: null,
//                 charge: null,
//                 quotation: null,
//                 unitPrice: null,
//             };
//         } else {
//             if (line.content.includes("IGST|CGST|SGST|GST")) {
//                 currentHSN.taxType = "IGST";
//             }

//             if (line.content.includes("charge")) {
//                 const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
//                 if (chargeValueMatch) {
//                     currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
//                 }
//             }

//             if (line.content.includes("quotation")) {
//                 const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
//                 if (quotationValueMatch) {
//                     currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
//                 }
//             }
//         }
//     }

//     if (currentHSN) {
//         structuredHSNLines.push(currentHSN);
//     }

//     structuredHSNLines.forEach((line) => {
//         if (line.taxAmount) {
//             line.taxPercentage = line.taxAmount.taxPercentage;
//             line.taxAmount = line.taxAmount.taxAmount;
//         }
//     });

//     const InvoiceLines = [];
//     let currentInvoice = null;
//     let gstNumberExtracted = false;
//     const invoiceCurrency = 'INR';
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     const gstVendorMapping = {
//         '29AAACD3181G1ZR': 'DART GLOBAL LOGISTICS PVT LTD',
//     };

//     const invoiceNumberIds = ['BLR\\d{10}'];
//     const invoiceDateIds = ['\\d{1,2}-[A-Z][a-z]{2}-\\d{4}'];
//     const extractInvoiceData = (data) => {
//         const extractedData = {
//             invoiceDate: '',
//             invoiceNumber: ''
//         };

//         for (const invoiceDateId of invoiceDateIds) {
//             const invoiceDateRegex = new RegExp(invoiceDateId, 'i');
//             const InvoiceDateItem = data.find(item => invoiceDateRegex.test(item.content));
//             if (InvoiceDateItem) {
//                 const match = invoiceDateRegex.exec(InvoiceDateItem.content);
//                 if (match) {
//                     extractedData.invoiceDate = match[0];
//                 }
//                 break;
//             }
//         }

//         for (const invoiceNumberId of invoiceNumberIds) {
//             const invoiceNumberRegex = new RegExp(invoiceNumberId, 'i');
//             const InvoiceNumberItem = data.find(item => invoiceNumberRegex.test(item.content));
//             if (InvoiceNumberItem) {
//                 const match = invoiceNumberRegex.exec(InvoiceNumberItem.content);
//                 if (match) {
//                     extractedData.invoiceNumber = match[0];
//                 }
//                 break;
//             }
//         }

//         return extractedData;
//     };

//     if (allLines && Array.isArray(allLines)) {
//         const invoiceData = extractInvoiceData(allLines);

//         for (const line of allLines) {
//             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//             const regex = /GSTIN: ([A-Z\d]{15})/
//             const match = regex.exec(line.content);
//             if (match && !gstNumberExtracted) {
//                 const gstNumber = match[1];
//                 const vendorName = gstVendorMapping[gstNumber];

//                 const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
//                     const amount = parseFloat(hsnLine.amount) || 0;
//                     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
//                     return add + amount + taxAmount * 2;
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

//                 currentInvoice = {
//                     "venName": vendorName || '',
//                     "gstNumber": gstNumber,
//                     "invoiceDate": invoiceData.invoiceDate,
//                     "invoiceNumber": invoiceData.invoiceNumber,
//                     "invoiceCurrency": invoiceCurrency,
//                     "financialYear": financialYear,
//                     "invoiceAmount": invoiceAmount,
//                     "cgst": cgst,
//                     "sgst": sgst,
//                     "igst": igst,
//                 };

//                 InvoiceLines.push(currentInvoice);
//                 gstNumberExtracted = true;
//             }
//         }

//         console.log(
//             "IMAGE HSN DATA",
//             JSON.stringify(structuredHSNLines, null, 2)
//         );

//         console.log(
//             "IMAGE Invoice DATA",
//             JSON.stringify(InvoiceLines, null, 2)
//         );

//         return {
//             extractedData: InvoiceLines[0],
//             extractedHsnData: structuredHSNLines
//         };
//     }
// }

export const extractOoclInvoiceDataFromScanned = async (allLines: any[]): Promise<any> => {

    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            let description = line.content.slice(0, hsnMatch.index).trim();
            const pipeIndex = description.indexOf('|');
            if (pipeIndex !== -1) {
                description = description.slice(pipeIndex + 1).trim();
            }

            currentHSN = {
                HSN: hsnMatch[0],
                description: description,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '33AAACO7690K1Z4': 'OOCL Logistics (India) Private Limited',
        '33AAACO7690K124': 'OOCL Logistics (India) Private Limited'
    };

    const invoiceNumberIds = [/724515\d{4}/];
    const invoiceDateIds = ['\\d{1,2}-[A-Z][a-z]{2}-\\d{4}'];
    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            const invoiceDateRegex = new RegExp(invoiceDateId, 'i');
            const InvoiceDateItem = data.find(item => invoiceDateRegex.test(item.content));
            if (InvoiceDateItem) {
                const match = invoiceDateRegex.exec(InvoiceDateItem.content);
                if (match) {
                    extractedData.invoiceDate = match[0];
                }
                break;
            }
        }

        for (const invoiceNumberId of invoiceNumberIds) {
            const invoiceNumberRegex = new RegExp(invoiceNumberId, 'i');
            const InvoiceNumberItem = data.find(item => invoiceNumberRegex.test(item.content));
            if (InvoiceNumberItem) {
                const match = invoiceNumberRegex.exec(InvoiceNumberItem.content);
                if (match) {
                    extractedData.invoiceNumber = match[0];
                }
                break;
            }
        }

        return extractedData;
    };

    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN\s*:\s*([A-Z\d]{15})/;
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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

        console.log(
            "IMAGE HSN DATA",
            JSON.stringify(structuredHSNLines, null, 2)
        );

        console.log(
            "IMAGE Invoice DATA",
            JSON.stringify(InvoiceLines, null, 2)
        );

        return {
            extractedData: InvoiceLines[0],
            extractedHsnData: structuredHSNLines
        };
    }
}

// export const extractExpeditorsInvoiceDataFromScanned = async (allLines: any[]): Promise<any> => {

//     const structuredHSNLines = [];
//     let currentHSN = null;
//     console.log(allLines, 'allLines');

//     for (const line of allLines) {
//         const hsnMatch = line.content.match(/\b996\d{3}\b/);

//         if (hsnMatch) {
//             if (currentHSN) {
//                 structuredHSNLines.push(currentHSN);
//             }

//             let description = line.content.slice(0, hsnMatch.index).trim();
//             const pipeIndex = description.indexOf('|');
//             if (pipeIndex !== -1) {
//                 description = description.slice(pipeIndex + 1).trim();
//             }

//             currentHSN = {
//                 HSN: hsnMatch[0],
//                 description: description,
//                 taxType: null,
//                 taxAmount: null,
//                 charge: null,
//                 quotation: null,
//                 unitPrice: null,
//             };
//         } else {
//             if (line.content.includes("IGST|CGST|SGST|GST")) {
//                 currentHSN.taxType = "IGST";
//             }

//             if (line.content.includes("charge")) {
//                 const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
//                 if (chargeValueMatch) {
//                     currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
//                 }
//             }

//             if (line.content.includes("quotation")) {
//                 const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
//                 if (quotationValueMatch) {
//                     currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
//                 }
//             }
//         }
//     }

//     if (currentHSN) {
//         structuredHSNLines.push(currentHSN);
//     }

//     structuredHSNLines.forEach((line) => {
//         if (line.taxAmount) {
//             line.taxPercentage = line.taxAmount.taxPercentage;
//             line.taxAmount = line.taxAmount.taxAmount;
//         }
//     });

//     const InvoiceLines = [];
//     let currentInvoice = null;
//     let gstNumberExtracted = false;
//     const invoiceCurrency = 'INR';
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     const gstVendorMapping = {
//         '33AAACE1795K2ZJ': 'Expeditors International (India) Private Limited',
//         '29AAACE1795K2Z8':'Expeditors International (India) Private Limited',
//     };

//     const invoiceNumberIds = [/[A-Z]{2}\d{6}T\d{6}/];
//     const invoiceDateIds = [/(\d{2}\/\d{2}\/\d{4})/];
//     const extractInvoiceData = (data) => {
//         const extractedData = {
//             invoiceDate: '',
//             invoiceNumber: ''
//         };

//         for (const invoiceDateId of invoiceDateIds) {
//             const invoiceDateRegex = new RegExp(invoiceDateId, 'i');
//             const InvoiceDateItem = data.find(item => invoiceDateRegex.test(item.content));
//             if (InvoiceDateItem) {
//                 const match = invoiceDateRegex.exec(InvoiceDateItem.content);
//                 if (match) {
//                     extractedData.invoiceDate = match[0];
//                 }
//                 break;
//             }
//         }

//         for (const invoiceNumberId of invoiceNumberIds) {
//             const invoiceNumberRegex = new RegExp(invoiceNumberId, 'i');
//             const InvoiceNumberItem = data.find(item => invoiceNumberRegex.test(item.content));
//             if (InvoiceNumberItem) {
//                 const match = invoiceNumberRegex.exec(InvoiceNumberItem.content);
//                 if (match) {
//                     extractedData.invoiceNumber = match[0];
//                 }
//                 break;
//             }
//         }

//         return extractedData;
//     };

//     if (allLines && Array.isArray(allLines)) {
//         const invoiceData = extractInvoiceData(allLines);

//         for (const line of allLines) {
//             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//             if (gstMatch && !gstNumberExtracted) {
//                 const gstNumber = gstMatch[0];
//                 const vendorName = gstVendorMapping[gstNumber];

//             // const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//             // const regex = /GSTIN: ([A-Z\d]{15})/
//             // const match = regex.exec(line.content);
//             // if (match && !gstNumberExtracted) {
//             //     const gstNumber = match[1];

//             const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
//                 const amount = parseFloat(hsnLine.amount) || 0;
//                 const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
//                 const igst = parseFloat(hsnLine.igst) || 0;
//                 const cgst = parseFloat(hsnLine.cgst) || 0;
//                 const sgst = parseFloat(hsnLine.sgst) || 0;
//                 return add + amount;
//             }, 0).toFixed(2);

//             const igst = structuredHSNLines.reduce((acc, hsnLine) => {
//                 return acc + parseFloat(hsnLine.igst) || 0;
//             }, 0).toFixed(2);

//             const cgst = structuredHSNLines.reduce((add, hsnLine) => {
//                 return add + parseFloat(hsnLine.cgst) || 0;
//             }, 0).toFixed(2);

//             const sgst = structuredHSNLines.reduce((acc, hsnLine) => {
//                 return acc + parseFloat(hsnLine.sgst) || 0;
//             }, 0).toFixed(2);

//                 currentInvoice = {
//                     "venName": vendorName || '',
//                     "gstNumber": gstNumber,
//                     "invoiceDate": invoiceData.invoiceDate,
//                     "invoiceNumber": invoiceData.invoiceNumber,
//                     "invoiceCurrency": invoiceCurrency,
//                     "financialYear": financialYear,
//                     "invoiceAmount": invoiceAmount,
//                     "cgst": cgst,
//                     "sgst": sgst,
//                     "igst": igst,
//                 };

//                 InvoiceLines.push(currentInvoice);
//                 gstNumberExtracted = true;
//             }
//         }

//         console.log(
//             "IMAGE HSN DATA",
//             JSON.stringify(structuredHSNLines, null, 2)
//         );

//         console.log(
//             "IMAGE Invoice DATA",
//             JSON.stringify(InvoiceLines, null, 2)
//         );

//         return {
//             extractedData: InvoiceLines[0],
//             extractedHsnData: structuredHSNLines
//         };
//     }
// }

export const extractNagelInvoiceDataFromScanned = async (allLines: any[]): Promise<any> => {

    const structuredHSNLines = [];
    let currentHSN = null;
    console.log(allLines, 'allLines');

    for (const line of allLines) {
        const hsnMatch = line.content.match(/\b996\d{3}\b/);

        if (hsnMatch) {
            if (currentHSN) {
                structuredHSNLines.push(currentHSN);
            }

            let description = line.content.slice(0, hsnMatch.index).trim();
            const pipeIndex = description.indexOf('|');
            if (pipeIndex !== -1) {
                description = description.slice(pipeIndex + 1).trim();
            }

            currentHSN = {
                HSN: hsnMatch[0],
                description: description,
                taxType: null,
                taxAmount: null,
                charge: null,
                quotation: null,
                unitPrice: null,
            };
        } else {
            if (line.content.includes("IGST|CGST|SGST|GST")) {
                currentHSN.taxType = "IGST";
            }

            if (line.content.includes("charge")) {
                const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (chargeValueMatch) {
                    currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
                }
            }

            if (line.content.includes("quotation")) {
                const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
                if (quotationValueMatch) {
                    currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
                }
            }
        }
    }

    if (currentHSN) {
        structuredHSNLines.push(currentHSN);
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
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '33AAACK2676H7ZH': 'KUEHNE NAGEL PRIVATE LIMITED',
        '33AAACO7690K124': 'OOCL Logistics (India) Private Limited'
    };

    const invoiceNumberIds = [/MAA\d{7}/];
    const invoiceDateIds = [/(\d{2}\/\d{2}\/\d{4})/];
    const extractInvoiceData = (data) => {
        const extractedData = {
            invoiceDate: '',
            invoiceNumber: ''
        };

        for (const invoiceDateId of invoiceDateIds) {
            const invoiceDateRegex = new RegExp(invoiceDateId, 'i');
            const InvoiceDateItem = data.find(item => invoiceDateRegex.test(item.content));
            if (InvoiceDateItem) {
                const match = invoiceDateRegex.exec(InvoiceDateItem.content);
                if (match) {
                    extractedData.invoiceDate = match[0];
                }
                break;
            }
        }

        for (const invoiceNumberId of invoiceNumberIds) {
            const invoiceNumberRegex = new RegExp(invoiceNumberId, 'i');
            const InvoiceNumberItem = data.find(item => invoiceNumberRegex.test(item.content));
            if (InvoiceNumberItem) {
                const match = invoiceNumberRegex.exec(InvoiceNumberItem.content);
                if (match) {
                    extractedData.invoiceNumber = match[0];
                }
                break;
            }
        }

        return extractedData;
    };

    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN:\s*([A-Z\d]{15})/;
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                const gstNumber = match[1];
                const vendorName = gstVendorMapping[gstNumber];

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
                    "invoiceDate": invoiceData.invoiceDate,
                    "invoiceNumber": invoiceData.invoiceNumber,
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

        console.log(
            "IMAGE HSN DATA",
            JSON.stringify(structuredHSNLines, null, 2)
        );

        console.log(
            "IMAGE Invoice DATA",
            JSON.stringify(InvoiceLines, null, 2)
        );

        return {
            extractedData: InvoiceLines[0],
            extractedHsnData: structuredHSNLines
        };
    }
}

// export const extractDhlInvoiceDataFromScanned = async (allLines: any[]): Promise<any> => {

//     const structuredHSNLines = [];
//     let currentHSN = null;
//     console.log(allLines, 'allLines');

//     for (const line of allLines) {
//         const hsnMatch = line.content.match(/\b996\d{3}\b/);

//         if (hsnMatch) {
//             if (currentHSN) {
//                 structuredHSNLines.push(currentHSN);
//             }

//             let description = line.content.slice(0, hsnMatch.index).trim();
//             const pipeIndex = description.indexOf('|');
//             if (pipeIndex !== -1) {
//                 description = description.slice(pipeIndex + 1).trim();
//             }

//             currentHSN = {
//                 HSN: hsnMatch[0],
//                 description: description,
//                 taxType: null,
//                 taxAmount: null,
//                 charge: null,
//                 quotation: null,
//                 unitPrice: null,
//             };
//         } else {
//             if (line.content.includes("IGST|CGST|SGST|GST")) {
//                 currentHSN.taxType = "IGST";
//             }

//             if (line.content.includes("charge")) {
//                 const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
//                 if (chargeValueMatch) {
//                     currentHSN.charge = parseFloat(chargeValueMatch[0].replace(/,/g, ""));
//                 }
//             }

//             if (line.content.includes("quotation")) {
//                 const quotationValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?/);
//                 if (quotationValueMatch) {
//                     currentHSN.quotation = parseFloat(quotationValueMatch[0].replace(/,/g, ""));
//                 }
//             }
//         }
//     }

//     if (currentHSN) {
//         structuredHSNLines.push(currentHSN);
//     }

//     structuredHSNLines.forEach((line) => {
//         if (line.taxAmount) {
//             line.taxPercentage = line.taxAmount.taxPercentage;
//             line.taxAmount = line.taxAmount.taxAmount;
//         }
//     });


//     // const InvoiceLines = [];
//     // let currentInvoice = null;
//     // let gstNumberExtracted = false;
//     // const invoiceCurrency = 'INR';
//     // const currentYear = new Date().getFullYear();
//     // const nextYear = currentYear + 1;
//     // const financialYear = `${currentYear}-${nextYear}`;

//     // const gstVendorMapping = {
//     //     '33AAACME824HA4Z': 'DHL Logistics Pvt. Ltd.',
//     //     // '33AAACME824HA4Z': 'WAYMARK LOGISTICS INDIA PRIVATE LIMITED',
//     // };

//     // const invoiceDateIds = ['Dt.'];
//     // const invoiceNumberIds = [' Involce No /Date', ' Invoice No /Date '];

//     // const extractInvoiceData = (data) => {
//     //     const extractedData = {
//     //         invoiceDate: '',
//     //         invoiceNumber: ''
//     //     };

//     //     for (const invoiceDateId of invoiceDateIds) {
//     //         const InvoiceDateItem = data.find(item => item.content.includes(invoiceDateId));
//     //         if (InvoiceDateItem) {
//     //             extractedData.invoiceDate = InvoiceDateItem.content.split(invoiceDateId)[1].trim();
//     //             break;
//     //         }
//     //     }
//     //     for (const invoiceNumberId of invoiceNumberIds) {
//     //         const InvoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
//     //         if (InvoiceNumberItem) {
//     //             const invoiceNumberContent = InvoiceNumberItem.content;
//     //             const invoiceNumberSplit = invoiceNumberContent.split(invoiceNumberId);
//     //             if (invoiceNumberSplit[1].includes("Dt")) {
//     //                 extractedData.invoiceNumber = invoiceNumberSplit[1].split("Dt")[0].trim();
//     //             } else {
//     //                 extractedData.invoiceNumber = invoiceNumberSplit[1].trim();
//     //             }

//     //             break;
//     //         }
//     //     }

//     //     return extractedData;
//     // };


//     // if (allLines && Array.isArray(allLines)) {
//     //     const invoiceData = extractInvoiceData(allLines);

//     //     for (const line of allLines) {
//     //         const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//     //         const regex = /GSTIN No\. ([A-Z\d]{15})/;
//     //         // /GST NO\.\s*([\dA-Z]{15})/
//     //         // /GST NO:\s*([\dA-Z]{15})/
//     //         const match = regex.exec(line.content);
//     //         if (match && !gstNumberExtracted) {
//     //             // const gstNumber = gstMatch[0];

//     //             const gstNumber = match[1];
//     //             const vendorName = gstVendorMapping[gstNumber];

//     //             const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
//     //                 const amount = parseFloat(hsnLine.amount) || 0;
//     //                 const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
//     //                 return add + amount + taxAmount * 2;
//     //             }, 0).toFixed(2);

//     //             let igst = "0.00";
//     //             let cgst = "0.00";
//     //             let sgst = "0.00";

//     //             for (const hsnLine of structuredHSNLines) {
//     //                 if (hsnLine.taxPercentage === 18) {
//     //                     igst = (parseFloat(igst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//     //                 } else if (hsnLine.taxPercentage === 9) {
//     //                     cgst = (parseFloat(cgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//     //                     sgst = (parseFloat(sgst) + parseFloat(hsnLine.taxAmount || 0)).toFixed(2);
//     //                 }
//     //             }

//     //             currentInvoice = {
//     //                 "venName": vendorName || '',
//     //                 "gstNumber": gstNumber,
//     //                 "invoiceDate": invoiceData.invoiceDate,
//     //                 "invoiceNumber": invoiceData.invoiceNumber,
//     //                 "invoiceCurrency": invoiceCurrency,
//     //                 "financialYear": financialYear,
//     //                 "invoiceAmount": invoiceAmount,
//     //                 "cgst": cgst,
//     //                 "sgst": sgst,
//     //                 "igst": igst,
//     //             };

//     //             InvoiceLines.push(currentInvoice);
//     //             gstNumberExtracted = true;
//     //         }
//     //     }
//     // }

//     // console.log(
//     //     "IMAGE HSN DATA",
//     //     JSON.stringify(structuredHSNLines, null, 2)
//     // );

//     // console.log(
//     //     "IMAGE Invoice DATA",
//     //     JSON.stringify(InvoiceLines, null, 2)
//     // );

//     // return {
//     //     extractedData: InvoiceLines[0],
//     //     extractedHsnData: structuredHSNLines
//     // };
//     const InvoiceLines = [];
//     let currentInvoice = null;
//     let gstNumberExtracted = false;
//     const invoiceCurrency = 'INR';
//     const currentYear = new Date().getFullYear();
//     const nextYear = currentYear + 1;
//     const financialYear = `${currentYear}-${nextYear}`;

//     const gstVendorMapping = {
//         '33AAACME824HA4Z': 'DHL Logistics Pvt. Ltd.',
//         '33AAACMGE824HAZ': 'DHL Logistics Pvt. Ltd.',
//     };

//     const invoiceDateIds = ['[0-9]{2}-[A-Z][a-z]{2}-[0-9]{4}'];
//     const invoiceNumberIds = ['GTOH[A-Z0-9]{4}'];

//     const extractInvoiceData = (data) => {
//         const extractedData = {
//             invoiceDate: '',
//             invoiceNumber: ''
//         };

//         for (const invoiceDateId of invoiceDateIds) {
//             const invoiceDateRegex = new RegExp(invoiceDateId, 'i');
//             const InvoiceDateItem = data.find(item => invoiceDateRegex.test(item.content));
//             if (InvoiceDateItem) {
//                 const match = invoiceDateRegex.exec(InvoiceDateItem.content);
//                 if (match) {
//                     extractedData.invoiceDate = match[0];
//                 }
//                 break;
//             }
//         }

//         for (const invoiceNumberId of invoiceNumberIds) {
//             const invoiceNumberRegex = new RegExp(invoiceNumberId, 'i');
//             const InvoiceNumberItem = data.find(item => invoiceNumberRegex.test(item.content));
//             if (InvoiceNumberItem) {
//                 const match = invoiceNumberRegex.exec(InvoiceNumberItem.content);
//                 if (match) {
//                     extractedData.invoiceNumber = match[0];
//                 }
//                 break;
//             }
//         }

//         return extractedData;
//     };

//     if (allLines && Array.isArray(allLines)) {
//         const invoiceData = extractInvoiceData(allLines);

//         for (const line of allLines) {
//             const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
//             const regex = /GSTIN No\. ([A-Z\d]{15})/;
//             const match = regex.exec(line.content);
//             if (match && !gstNumberExtracted) {
//                 const gstNumber = match[1];
//                 const vendorName = gstVendorMapping[gstNumber];

//                 const invoiceAmount = structuredHSNLines.reduce((add, hsnLine) => {
//                     const amount = parseFloat(hsnLine.amount) || 0;
//                     const taxAmount = parseFloat(hsnLine.taxAmount) || 0;
//                     return add + amount + taxAmount * 2;
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

//                 currentInvoice = {
//                     "venName": vendorName || '',
//                     "gstNumber": gstNumber,
//                     "invoiceDate": invoiceData.invoiceDate,
//                     "invoiceNumber": invoiceData.invoiceNumber,
//                     "invoiceCurrency": invoiceCurrency,
//                     "financialYear": financialYear,
//                     "invoiceAmount": invoiceAmount,
//                     "cgst": cgst,
//                     "sgst": sgst,
//                     "igst": igst,
//                 };

//                 InvoiceLines.push(currentInvoice);
//                 gstNumberExtracted = true;
//             }
//         }

//         console.log(
//             "IMAGE HSN DATA",
//             JSON.stringify(structuredHSNLines, null, 2)
//         );

//         console.log(
//             "IMAGE Invoice DATA",
//             JSON.stringify(InvoiceLines, null, 2)
//         );

//         return {
//             extractedData: InvoiceLines[0],
//             extractedHsnData: structuredHSNLines
//         };
//     }
// }




