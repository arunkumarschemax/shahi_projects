import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

export interface PDFMergerProps {
    fileList: any;
}

const DocPDFMerger = (props: PDFMergerProps) => {

  const mergePDFs = async () => {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of props.fileList) {
      // Load each PDF document
      const pdfBytes = await fetch(pdfFile.url).then((response) => response.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Add pages from the loaded PDF to the merged PDF
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    // Generate a new PDF blob
    const mergedPdfBytes = await mergedPdf.save();

    // Create a URL for downloading the merged PDF
    const mergedPdfUrl = URL.createObjectURL(new Blob([mergedPdfBytes]));

    // You can now use mergedPdfUrl to download or display the merged PDF
    console.log('Merged PDF URL:', mergedPdfUrl);
  };

  return (
    <div>
      <h1>PDF Merger</h1>
      <button onClick={mergePDFs}>Merge PDFs</button>
    </div>
  );
}

export default DocPDFMerger;
