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

export const parseExtractedText = (text) => {
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


export const extractSrivaruInvoiceDataFromScanned = async (pageImages: any[], invoicePageNos: number[]) => {
    const worker = createWorker({
        logger: (m) => console.log(m), // Optional: Enable logging
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    for (let i = 0; i < pageImages.length; i++) {
        if (!invoicePageNos.includes(i))
            continue;
        const imageBase64 = pageImages[i];
        const { data: { text } } = await worker.recognize(imageBase64);
        console.log(`Page ${i + 1} Text:`, text);
    }
    await worker.terminate();
    return {
        extractedData: {},
        extractedHsnData: {}
    }
}