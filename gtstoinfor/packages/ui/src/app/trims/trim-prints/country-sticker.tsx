// import { Button, Card } from "antd"
// import { useEffect, useState } from "react"
// import { Malaysia } from "./malasia-sticker"
// import Indonesia, { Philippines } from "./philippines"
// import React from "react"

//   export interface CountrystickerPrintProps{
//     bomInfo: any[]
    
// }



// export const CountryStickerPrint=(props:CountrystickerPrintProps)=>{
    
//     const [bomInfo,setBomInfo] = useState<any>([])
    
//     useEffect(() => {
//         if(props.bomInfo){
//             setBomInfo(props.bomInfo)
//         }
//     },[props.bomInfo])
//     const handlePrint = () => {
//       const invoiceContent = document.getElementById("print");
  
//       if (invoiceContent) {
//         const devContent = invoiceContent.innerHTML;
//         const printWindow = window.open("", "PRINT", "height=900,width=1600");
  
//         printWindow.document.write(`
//             <html>
//                 <head>
//                     <style>
//                         @page {
//                             size: legal;
//                             margin: 0;
//                         }
//                         body {
//                             margin: 0;
//                             transform: scale(1);
//                             transform-origin: top center;
//                             width:100%;
//                         }
//                         /* Additional styles for your content */
//                     </style>
//                 </head>
//                 <body>${devContent}</body>
//             </html>
//         `);
//         printWindow.document.close();
//         setTimeout(function () {
//           printWindow.print();
//           printWindow.close();
//         }, 1000); // Add a delay to ensure all content is loaded
//       }
//     };
//     let tablesRendered = false;

//     return (
//       <>
//         <div id="print">
//           <Card title={"Country Sticker"} extra={<span><Button onClick={handlePrint}>Print</Button></span>}>
//             {bomInfo && bomInfo.length > 0 && (
//               <>
//                 <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1}>
//                   <thead>
//                     <tr>
//                       <th>COUNTRY#</th>
//                       <th>IM#</th>
//                       <th>ITEM#</th>
//                       <th>STYLE#</th>
//                       <th>QTY IN PCS#</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bomInfo.map((e, index) => (
//                       <tr key={index}>
//                         <td>{e.destination}</td>
//                         <td>{e.imCode}</td>
//                         <td>{e.itemNo}</td>
//                         <td>{e.styleNumber}</td>
//                         <td style={{ textAlign: 'right' }}>{e.bomQty}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div>
//                   {bomInfo[bomInfo.length - 1]?.destination === 'Malaysia' && <Malaysia />}
//                   {bomInfo[bomInfo.length - 1]?.destination === 'Philippines' && <Philippines />}
//                 </div>
//               </>
//             )}
//           </Card>
//         </div>
//       </>
//     );
//   };
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'antd';
import Malaysia from './malasia-sticker';
import Philippines from './philippines';

const CountryStickerPrint = (props) => {
  const [bomInfo, setBomInfo] = useState([]);

  const tableCellStyle = {
    padding: '8px',
  };

  const tableRef = useRef(null);

  useEffect(() => {
    if (props.bomInfo) {
      setBomInfo(props.bomInfo);
    }
  }, [props.bomInfo]);

  const handlePrint = () => {
    const invoiceContent = document.getElementById('print');
    if (invoiceContent) {
      const devContent = invoiceContent.innerHTML;
      const printWindow = window.open('', 'PRINT', 'height=900,width=1600');

      printWindow.document.write(`
      <html>
        <head>
          <style>
            @page {
              size: legal;
              margin: 20;
            }
            body {
              margin: 0;
              transform: scale(1);
              transform-origin: top center;
              width: 100%;
            }
    
            /* Additional styles for your content */
            /* Add a counter to track the page number */
            @page {
              counter-increment: page;
            }
    
            /* Apply styles only to the last page */
            body:after {
              content: counter(page);
              position: absolute;
              top: 0;
              right: 0;
              padding: 10px;
              background-color: white;
              color: black;
            }
    
            body:last-of-type:after {
              content: 'Last Page';
              /* Additional styles for the last page marker */
            }
    
            /* Hide elements in print mode */
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>${devContent}</body>
      </html>
    `);
    

      printWindow.document.close();
      setTimeout(function () {
        printWindow.print();
        printWindow.close();
      }, 1000);
    }
  };

  const groupDataByCountry = () => {
    if (bomInfo && bomInfo.length > 0) {
      const groupedData = {};
      bomInfo.forEach((item) => {
        if (!groupedData[item.destination]) {
          groupedData[item.destination] = [];
        }
        groupedData[item.destination].push(item);
      });
      return groupedData;
    }
    return null;
  };

 const generateTables = () => {
  const groupedData = groupDataByCountry();
  if (groupedData) {
    return (
      <>
        {groupedData['Philippines'] && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Country: Philippines</h3>
            <table
              style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
              border={1}
              cellSpacing="0"
              cellPadding="0"
            >
              <thead>
                <tr>
                  <th style={tableCellStyle}>COUNTRY#</th>
                  <th style={tableCellStyle}>IM#</th>
                  <th style={tableCellStyle}>ITEM#</th>
                  <th style={tableCellStyle}>STYLE#</th>
                  <th style={tableCellStyle}>QTY IN PCS#</th>
                </tr>
              </thead>
              <tbody>{generateRows(groupedData['Philippines'])}</tbody>
            </table>
            {bomInfo[bomInfo.length - 1]?.destination === 'Philippines' && <Philippines />}
          </div>
        )}

        {groupedData['Malaysia'] && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Country: Malaysia</h3>
            <table
              style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
              border={1}
              cellSpacing="0"
              cellPadding="0"
            >
              <thead>
                <tr>
                  <th style={tableCellStyle}>COUNTRY#</th>
                  <th style={tableCellStyle}>IM#</th>
                  <th style={tableCellStyle}>ITEM#</th>
                  <th style={tableCellStyle}>STYLE#</th>
                  <th style={tableCellStyle}>QTY IN PCS#</th>
                </tr>
              </thead>
              <tbody>{generateRows(groupedData['Malaysia'])}</tbody>
            </table>
            {bomInfo[bomInfo.length - 1]?.destination === 'Malaysia' && <Malaysia />}
          </div>
        )}
      </>
    );
  }
  return null;
};

  const generateRows = (data) => {
    return data.map((item, index) => (
      <tr key={index}>
        {index === 0 && (
          <>
            <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={data.length}>
              {item.destination}
            </td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemNo}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
            <td style={{ ...tableCellStyle, textAlign: 'right' }}>{item.bomQty}</td>
          </>
        )}
        {index !== 0 && (
          <>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemNo}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
            <td style={{ ...tableCellStyle, textAlign: 'right' }}>{item.bomQty}</td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <Card title={'Country Sticker'} extra={<Button className="no-print" onClick={handlePrint}>Print</Button>}>

    <div id="print">
      {bomInfo && bomInfo.length > 0 ? (
        <>
          {generateTables()}
          </>
      ) : (
        <div>No data available</div>
      )}
    </div>
    </Card>

  );
};

export default CountryStickerPrint;


  


