import React from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import axios, { AxiosRequestConfig } from 'axios';

const PdfMergeDownload = () => {
  const fetchPdfBytesArrayWithAxios = async (pdfUrls) => {
    try {
      const pdfPromises = pdfUrls.map(async (url) => {
        const response = await axios.get(url, {
          responseType: 'arraybuffer',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });

        return response.data;
      });

      const pdfBytesArray = await Promise.all(pdfPromises);
      return pdfBytesArray;
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      throw error; // Rethrow the error to handle it further
    }
  };
  const mergeAndDownloadPDFs = async () => {
    try {
      // Load the initial PDF file (you need to provide a valid URL)
      const initialPdfUrl = 'http://localhost:8002/PO-428278-6555/sample-c2dc.pdf';

      const initialPdfResponse = await axios.request({
        url: initialPdfUrl,
        method: 'get',
        responseType: 'arraybuffer',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      const initialPdfBytes = initialPdfResponse.data;
      console.log('*&*&*&', initialPdfBytes)

      // Load additional PDFs from URLs (you need to provide valid PDF URLs)
      const pdfUrls = [
        'http://localhost:8002/PO-428278-6555/sample-c2d.pdf',
      ];
      // const pdfBytesArray = await Promise.all(pdfUrls.map(async (url) => {
      //   const response = await fetch(url, { mode: 'no-cors' });
      //   if (!response.ok) {
      //     throw new Error(`Failed to fetch ${url}`);
      //   }
      //   return response.arrayBuffer();
      // }));
      const pdfBytesArray = await fetchPdfBytesArrayWithAxios(pdfUrls)


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