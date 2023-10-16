import { createWorker } from "tesseract.js";
import { rgb } from 'pdf-lib';
import { SizeConverter } from "./helper/sizeConverter";

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
            const regex = /GST\s*No\.\s*([\dA-Z]{15})/;
            const match = regex.exec(line.content);
            if (match && !gstNumberExtracted) {
                // const gstNumber = gstMatch[0];

                const gstNumber = match[1];
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
        "IMAGE Invoice DATA",
        JSON.stringify(InvoiceLines, null, 2)
    );
    return {
        extractedData: InvoiceLines[0],
        extractedHsnData: structuredHSNLines
    }
}

export const extractKrsnaInvoiceDataFromScanned = async (allLines: any[]) => {
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
    const invoiceDateId = '13';
    const invoiceNumberId = '12';
    const invoiceCurrency = 'INR';
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const financialYear = `${currentYear}-${nextYear}`;

    const gstVendorMapping = {
        '33AAACK1360L1ZR': ' K.S.R Freight Forwarders Pvt. Ltd ',
        '29AAACK1360L1ZG': ' K.S.R Freight Forwarders Pvt. Ltd ',
        '290AAACK1360L12G':' K.S.R Freight Forwarders Pvt. Ltd ',


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
        const InvoiceDateValue = InvoiceDateItem ? InvoiceDateItem.content.replace(/.*?(\d{2}-[a-zA-Z]{3}-\d{4}).*/, '$1').trim() : '';
    
        const invoiceNumberItem = data.find(item => item.content.includes(invoiceNumberId));
        const invoiceNumberValue = invoiceNumberItem ? invoiceNumberItem.content.split(invoiceNumberId)[1].trim() : '';
    
        const trimmedInvoiceNumberValue = invoiceNumberValue.replace(/.*?(\d{2}-[a-zA-Z]{3}-\d{4}).*/, '$1').trim();
        return {
            invoiceDate: InvoiceDateValue,
            invoiceNumber: trimmedInvoiceNumberValue
        };
    };
    

    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex =  /GST NO:\s*([\dA-Z]{15})/;
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
        "33AAEFLS118J1ZG" : 'LIGI ENTERPRISES',
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
       
        '29AAJCS1175L1ZU': 'Nikkou Logistics Private Limited',
        "29AAICSH175L1ZU" : 'Nikkou Logistics Private Limited',
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
        '33AAACT2874J228': 'RIWAY FORWARDERS PRIVATE LIMITED',
    };

    const invoiceDateIds = [' Invoice Date +', 'Invoice Date :'];
    const invoiceNumberIds = ['Bill To | '];

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
        const regex = /TCSE\/\d+\/\d+ \//;

        for (const invoiceNumberId of invoiceNumberIds) {
            const InvoiceNumberItem = data.find(item => item.content.match(regex));
            if (InvoiceNumberItem) {
                const parts = InvoiceNumberItem.content.split(invoiceNumberId);
                if (parts.length > 1) {
                    extractedData.invoiceNumber = parts[1].trim();
                    break;
                }
            }
        }
        
        return extractedData;
    };


    if (allLines && Array.isArray(allLines)) {
        const invoiceData = extractInvoiceData(allLines);

        for (const line of allLines) {
            const gstMatch = line.content.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g);
            const regex = /GSTIN\.NO: ([\dA-Z]{15})/;



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


export const extractSrivaruInvoiceDataFromScanned = async (allLines: any[]) => {
    const structuredHSNLines = [];
    let currentHSN = null;

    const InvoiceLines = [];
    return {
        extractedData: InvoiceLines?.[0],
        extractedHsnData: structuredHSNLines
    }
}