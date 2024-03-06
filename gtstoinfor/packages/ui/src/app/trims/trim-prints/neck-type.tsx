
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'antd';

const NeckType = (props) => {
  const [bomInfo, setBomInfo] = useState([]);

  const tableCellStyle = {
     padding: '8px',
  };

  const tableRef = useRef(null);

  useEffect(() => {
    console.log(props.bomInfo);
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
  

  const groupDataByItemNo = () => {
    if (bomInfo && bomInfo.length > 0) {
      const groupedData = {};
      bomInfo.forEach((item) => {
        if (!groupedData[item.itemNo]) {
          groupedData[item.itemNo] = [];
        }
        groupedData[item.itemNo].push(item);
      });
      return groupedData;
    }
    return null;
  };

  const generateTables = () => {
    const groupedData = groupDataByItemNo();
    if (groupedData) {
      
      return Object.keys(groupedData).map((itemNo, index) => (
        <div key={index} style={{ marginBottom: '20px'}}>
          <h3>Item No: {itemNo}</h3>
          <table
            style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
            border={1}
            cellSpacing="0"
            cellPadding="0"
          >
            <thead>
              <tr>
                <th style={tableCellStyle}>ITEM</th>
                <th style={tableCellStyle}>STYLE</th>
                <th style={tableCellStyle}>SEASON</th>
                <th style={tableCellStyle}>IM#</th>
                <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
                <th style={tableCellStyle}>GARMENT COLOR CODE</th>
                <th style={tableCellStyle}>TAPE COLOR</th>
                <th style={tableCellStyle}>QTY IN YARDS</th>
              </tr>
            </thead>
            <tbody>{generateRows(groupedData[itemNo])}</tbody>
            <tfoot>
              <tr>
              <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>Total</td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>
                  {calculateTotalBomQty(groupedData[itemNo])}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ));
    }
    return null;
  };
  const calculateTotalBomQty = (data) => {

    return data.reduce((total, item) => {
      const bomQtys = item?.colors.map(color => Number(color?.bomQty)) || [];
      const validQtys = bomQtys.filter(bomQty => !isNaN(bomQty));
      return total + validQtys.reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  
  const generateRows = (data) => {
    return data.map((item, index) => (
      <React.Fragment key={index}>
        {item.colors.map((color, colorIndex) => (
          <tr key={`${index}-${colorIndex}`}>
            {colorIndex === 0 && (
              <>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.itemNo}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.styleNumber}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {`${item.season}${item.year.slice(2)}`}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.imCode}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
                  {item.description}
                </td>
              </>
            )}
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.color}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.itemColor}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.bomQty}</td>
          </tr>
        ))}
      </React.Fragment>
    ));
  };
  
  
  // const generateRows = (data) => {
    
  //   return data.map((item, index) => (
  //     <React.Fragment key={index}>
  //       {index === 0 && (
  //         <tr>
  //           <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
  //             {item.itemNo}
  //           </td>
  //           <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
  //             {item.styleNumber}
  //           </td>
  //           <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
  // {`${item.season}${item.year.slice(2)}`}</td>
  //           <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
  //             {item.imCode}
  //           </td>
  //           <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
  //             {item.description}
  //           </td>
  //           <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0]?.color}</td>
  //           <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0]?.itemColor}</td>
  //           <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0]?.bomQty}</td>
  //         </tr>
  //       )}
     
  //       {item.colors.slice(1).map((color, colorIndex) => (
  //           <tr key={`${index}-${colorIndex}`}>
  //           {index !== 0 && colorIndex === 0 && (
  //             <>
  //               <td style={{ ...tableCellStyle, textAlign: 'center'}} >
  //                 {item.itemNo}
  //               </td>
  //               <td  style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
  //               <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
  //               <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
  //               <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.description}</td>
  //             </>
  //           )}
  //           <td  style={{ ...tableCellStyle, textAlign: 'center' }}>{color.color}</td>
  //           <td  style={{ ...tableCellStyle, textAlign: 'center' }}>{color.itemColor}</td>
  //           <td  style={{ ...tableCellStyle, textAlign: 'center' }}>{color.bomQty}</td>
  //         </tr>
  //       ))}
  //     </React.Fragment>
  //   ));
  // };
  
 
  return (
    <div id="print">
      {bomInfo && bomInfo.length > 0 ? (
        <Card title={'Neck Tape'} extra={<Button onClick={handlePrint}>Print</Button>}>
          {generateTables()}
        </Card>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default NeckType;

// import React, { useEffect, useRef, useState } from 'react';
// import { Button, Card } from 'antd';

// const NeckType = (props) => {
//   const [bomInfo, setBomInfo] = useState([]);

//   const tableCellStyle = {
//      padding: '8px',
//   };

//   const tableRef = useRef(null);

//   useEffect(() => {
//     console.log(props.bomInfo);
//     if (props.bomInfo) {
//       setBomInfo(props.bomInfo);
//     }
//   }, [props.bomInfo]);

//   const handlePrint = () => {
//     const invoiceContent = document.getElementById('print');
//     if (invoiceContent) {
//       const devContent = invoiceContent.innerHTML;
//       const printWindow = window.open('', 'PRINT', 'height=900,width=1600');
  
//       printWindow.document.write(`
//         <html>
//           <head>
//             <style>
//               @page {
//                 size: legal;
//                 margin: 20;
//               }
//               body {
//                 margin: 0;
//                 transform: scale(1);
//                 transform-origin: top center;
//                 width: 100%;
//               }
//               /* Additional styles for your content */
  
//               /* Add a counter to track the page number */
//               @page {
//                 counter-increment: page;
//               }
  
//               /* Apply styles only to the last page */
//               body:after {
//                 content: counter(page);
//                 position: absolute;
//                 top: 0;
//                 right: 0;
//                 padding: 10px;
//                 background-color: white;
//                 color: black;
//               }
  
//               body:last-of-type:after {
//                 content: 'Last Page';
//                 /* Additional styles for the last page marker */
//               }
//             </style>
//           </head>
//           <body>${devContent}</body>
//         </html>
//       `);
  
//       printWindow.document.close();
//       setTimeout(function () {
//         printWindow.print();
//         printWindow.close();
//       }, 1000);
//     }
//   };
  

//   const groupDataByItemNo = () => {
//     if (bomInfo && bomInfo.length > 0) {
//       const groupedData = {};
//       bomInfo.forEach((item) => {
//         if (!groupedData[item.itemNo]) {
//           groupedData[item.itemNo] = [];
//         }
//         groupedData[item.itemNo].push(item);
//       });
//       return groupedData;
//     }
//     return null;
//   };

//   const generateTables = () => {
//     const groupedData = groupDataByItemNo();
//     if (groupedData) {
      
//       return Object.keys(groupedData).map((itemNo, index) => (
//         <div key={index} style={{ marginBottom: '20%'}}>
//           <h3>Item No: {itemNo}</h3>
//           <table
//             style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
//             border={1}
//             cellSpacing="0"
//             cellPadding="0"
//           >
//             <thead>
//               <tr>
//                 <th style={tableCellStyle}>ITEM</th>
//                 <th style={tableCellStyle}>STYLE</th>
//                 <th style={tableCellStyle}>SEASON</th>
//                 <th style={tableCellStyle}>IM#</th>
//                 <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
//                 <th style={tableCellStyle}>GARMENT COLOR CODE</th>
//                 <th style={tableCellStyle}>TAPE COLOR</th>
//                 <th style={tableCellStyle}>QTY IN YARDS</th>
//               </tr>
//             </thead>
//             <tbody>{generateRows(groupedData[itemNo])}</tbody>
//             <tfoot>
//               <tr>
//               <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>Total</td>
//                 <td style={{ ...tableCellStyle, textAlign: 'center' }}>
//                   {calculateTotalBomQty(groupedData[itemNo])}
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       ));
//     }
//     return null;
//   };
//   const calculateTotalBomQty = (data) => {

//     return data.reduce((total, item) => {
//       const bomQtys = item?.colors.map(color => Number(color?.bomQty)) || [];
//       console.log(bomQtys,"bomQtys")
//       const validQtys = bomQtys.filter(bomQty => !isNaN(bomQty));
//       return total + validQtys.reduce((sum, qty) => sum + qty, 0);
//     }, 0);
//   };

  
  
  
//   const generateRows = (data) => {
    
//     return data.map((item, index) => (
//       <React.Fragment key={index}>
//         {index === 0 && (
//           <tr>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
//               {item.itemNo}
//             </td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
//               {item.styleNumber}
//             </td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
//   {`${item.season}${item.year.slice(2)}`}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
//               {item.imCode}
//             </td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={item.colors.length}>
//               {item.description}
//             </td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors.color}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors?.itemColor}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors?.bomQty}</td>
     
//           </tr>
//         )}
     
//         {item.colors.slice(1).map((color, colorIndex) => (
//           //  <tr key={`${index}-${colorIndex}`}>
//             <tr key={`${index}`}> 

//             {index !== 0 && colorIndex === 0 && (
//               <>
//                 <td style={{ ...tableCellStyle, textAlign: 'center'}} >
//                   {item.itemNo}
//                 </td>
//                 <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
//                 <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
//                 <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
//                 <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.description}</td>
//               </>
//             )}
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.color}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.itemColor}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{color.bomQty}</td>
//           </tr>
//         ))}
//       </React.Fragment>
//     ));
//   };
  
 
//   return (
//     <div id="print">
//       {bomInfo && bomInfo.length > 0 ? (
//         <Card title={'Neck Tape'} extra={<Button onClick={handlePrint}>Print</Button>}>
//    <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
//                 <tr>
//                     <th style={{ width: '3%' }}>ITEM#</th>
//                     <th style={{ width: '3%' }}>STYLE#</th>
//                     <th style={{ width: '3%' }}>SEASON</th>
//                     <th style={{ width: '3%' }}>IM#</th>
//                     <th style={{ width: '5%' }}>MATERIAL DESCRIPTION</th>
//                     <th style={{ width: '3%' }}>GARMENT COLOR CODE</th>
//                     <th style={{ width: '3%' }}>TAPE COLOR</th>
//                     <th style={{ width: '3%' }}>QTY IN PCS</th>
//                     </tr>
//                     {bomInfo.map((rec,index) =>{
//                         return(
//                             <tr>
//                             <td style={{ textAlign: 'center' }} >{rec.itemNo !== null ? rec.itemNo:''}</td>
//                             <td style={{ textAlign: 'center' }} >{rec.styleNumber !== null ? rec.styleNumber:''}</td>
//                             <td style={{ textAlign: 'center' }} >{rec.season !== null ? rec.season:''}</td>
//                             <td style={{ textAlign: 'center' }} >{rec.imCode !== null ? rec.imCode:''}</td>
//                             <td style={{ textAlign: 'center' }} >{rec.description !== null ? rec.description:''}</td>
//                             <td style={{ textAlign: 'center' }} >{rec.color !== null ? rec.color:''}</td>
//                             <td style={{ textAlign: 'center' }} >{rec.itemColor !== null ? rec.itemColor:''}</td>
//                             <td style={{ textAlign: 'center' }} >{rec.bomQty !== null ? rec.bomQty:''}</td>
//                          </tr>
//                         )
                      
//                     })}
               
//             </table>
//         </Card>
//       ) : (
//         <div>No data available</div>
//       )}
//     </div>
//   );
// };

// export default NeckType;
