import React from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const PdfMergeDownload = () => {
  const mergeAndDownloadPDFs = async () => {
    try {
      // Load the initial PDF file (you need to provide a valid URL)
      const initialPdfUrl = 'http://165.22.220.143/document-management/gtstoinfor/dist/packages/services/document-management/upload-files/PO-388157-6565/Material%20preparation-e816.pdf';
      const initialPdfBytes = await fetch(initialPdfUrl,{mode:'no-cors'}).then((res) => res.arrayBuffer());

      // Load additional PDFs from URLs (you need to provide valid PDF URLs)
      const pdfUrls = [
        'http://165.22.220.143/document-management/gtstoinfor/dist/packages/services/document-management/upload-files/PO-388157-6565/Material%20preparation-e816.pdf',
      ];
      const pdfBytesArray = await Promise.all(pdfUrls.map(async (url) => {
        const response = await fetch(url,{mode:'no-cors'});
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}`);
        }
        return response.arrayBuffer();
      }));

      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      // Add the pages from the initial PDF
      const initialPdfDoc = await PDFDocument.load(initialPdfBytes);
      const initialPages = await mergedPdf.copyPages(initialPdfDoc, initialPdfDoc.getPageIndices());
      initialPages.forEach((page) => mergedPdf.addPage(page));

      // Loop through each PDF and add its pages to the merged PDF
      for (const pdfBytes of pdfBytesArray) {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save the merged PDF as a blob
      const mergedPdfBytes = await mergedPdf.save();

      // Create a Blob and trigger a download
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'merged.pdf');
    } catch (error) {
      console.error('Error merging and downloading PDFs:', error);
    }
  };

  return (
    <div>
      <button onClick={mergeAndDownloadPDFs}>Merge and Download PDFs</button>
    </div>
  );
};

export default PdfMergeDownload;