import { Card } from "antd";
import React from "react";

export const Malaysia = () => {
    const handlePrint = () => {
        const invoiceContent = document.getElementById("print");
        if (invoiceContent) {
            const devContent = invoiceContent.innerHTML;
            const printWindow = window.open("", "PRINT", "height=900,width=1600");
    
            printWindow.document.write(`
                <html>
                    <head>
                        <style>
                            @page {
                                size: legal;
                                margin: 0;
                            }
                            body {
                                margin: 0;
                                transform: scale(1);
                                transform-origin: top center;
                                width:100%;
                                font-family: Arial, sans-serif; /* Ensure consistent font */
                            }
                            /* Additional styles for your content */
                            td {
                                padding: 10px; /* Add padding to ensure content fits properly */
                            }
                            /* Adjust styles as needed for the content */
                        </style>
                    </head>
                    <body>${devContent}</body>
                </html>
            `);
    
            // Since you're using Ant Design components, you may need to include Ant Design's CSS in the print window.
            // const antdLink = document.createElement("link");
            // antdLink.setAttribute("rel", "stylesheet");
            // antdLink.setAttribute("type", "text/css");
            // antdLink.setAttribute("href", "https://cdn.jsdelivr.net/npm/antd/dist/antd.css");
            // printWindow.document.head.appendChild(antdLink);
    
            // printWindow.document.close();
            // setTimeout(function () {
            //     printWindow.print();
            //     printWindow.close();
            // }, 1000); // Add a delay to ensure all content is loaded
        }
    };

    return (
        <>
            <Card style={{ width: '50%', border: 'none', marginRight: '0' }}>
                <div style={{ marginLeft: '150px' }} id="print">
                    <div style={{marginBottom:'20px'}}>
                    <h3 style={{ marginLeft: '300px',  fontFamily: 'sans-serif' }}>35mm</h3>
                    <h3 style={{ marginLeft: '300px',fontFamily: 'sans-serif' }}>(1.275")</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <div style={{ marginLeft: '30px', marginBottom: '-100px' }}>
        <h3 style={{ fontFamily: 'sans-serif' }}>19mm</h3>
        <h3 style={{ fontFamily: 'sans-serif' }}>(0.75")</h3>
    </div>
</div>

                    <div style={{ marginTop: '40px',paddingTop:'3px', marginLeft: '140px', height: '180px', borderLeft: '2px solid black', paddingLeft: '20px' }}>
                        <div style={{ borderTop: '2px solid black', width: '360px', paddingTop: '20px' }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ height: '150px', width: '370px', borderTop: '3px solid #bde0fe', borderLeft: '3px solid #bde0fe', borderRight: '3px solid #bde0fe', borderBottom: '3px solid #bde0fe', padding: '10px' }}>
                                            <div>
                                                <span style={{ fontSize: '', verticalAlign: 'top' }}>Diimport & Diedarkan oleh</span>
                                            </div>
                                            <div style={{ verticalAlign: 'top' }}>
                                                <span style={{ fontFamily: 'Arial Narrow' }}><h3>NIKE SALES (MALAYSIA) SDN BHD</h3></span>
                                            </div>
                                            <div>199001007138(198708-M)</div>
                                            <div>Unit 10-1 & 10-2,Level 10, Menara OBYU No. 4 Jalan PJU 8/8A, Damansara Perdana 47820 Petaling Jaya, Selangor D.E Malaysia</div>
                                            <div>Tel:03-7711 6888 Fax03-7711 6999</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>
            {/* <button onClick={handlePrint}>Print</button> */}
        </>
    );
};

export default Malaysia;
