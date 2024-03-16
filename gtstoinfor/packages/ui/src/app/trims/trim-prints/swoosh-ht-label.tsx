import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { BomService } from '@project-management-system/shared-services';
import { BomProposalReq } from '@project-management-system/shared-models';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
export interface SwooshHtLableProps {
  itemId: any,
  poLines: string[]
}

const SwooshHtLable: React.FC<SwooshHtLableProps> = (props) => {
  const [bomInfo, setBomInfo] = useState<any[]>([]);
  const { itemId, poLines } = props
  const service = new BomService();
  const [tablesGenerated, setTablesGenerated] = useState(false);


   useEffect(() => {
    handleButtonTrim()
   }, []);


  function handleButtonTrim(){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    // console.log(bomProposalReq,"requesttttttttt");
    
    service.generateProposalForButton(bomProposalReq).then((v) => {
      if (v.status) {
        setBomInfo(v.data)
        setTablesGenerated(true)
      }
    })
  }

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

  const tableCellStyle: React.CSSProperties = {
    border: '1px solid #dddddd',
    textAlign: 'center',
    padding: '8px',
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

  useEffect(() => {
    if (!tablesGenerated) {
      generateTables();
    }
  }, [tablesGenerated]); 


  const generateTables = () => {
    const groupedData = groupDataByItemNo();
    if (groupedData) {
      return Object.keys(groupedData).map((itemNo, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            {/* <h3>Item No: {itemNo}</h3> */}
            <ReactHTMLTableToExcel
              id={`excel-button-${index}`}
              className={`excel-button-${index}`}
              table={`bom-table-${index}`}
              filename={`BOM-Item-${itemNo}`}
              sheet="Sheet 1"
              buttonText={`Excel`}
            />
          </div>
          <table
            style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
            border={1}
            cellSpacing="0"
            cellPadding="0"
          >
            <thead>
              <tr>
                <th style={tableCellStyle}>ITEM#</th>
                <th style={tableCellStyle}>STYLE#</th>
                <th style={tableCellStyle}>SEASON</th>
                <th style={tableCellStyle}>IM#</th>
                <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
                <th style={tableCellStyle}>GARMENT COLOR CODE</th>
                <th style={tableCellStyle}>GOLF #3 SWOOSH HT LABEL COLOUR</th>
                <th style={tableCellStyle}>Quantity in PCS</th>
              </tr>
            </thead>
            <tbody>{generateRows(groupedData[itemNo])}</tbody>
          </table>
        </div>
      ));
    }
    return null;
  };
const generateRows = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const key = `${item.itemNo}-${item.styleNumber}-${item.season}-${item.imCode}-${item.description}`;
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });

  // Generate rows based on grouped data
  return (Object.values(groupedData) as Array<Array<any>>).map((group, groupIndex) => (
    <React.Fragment key={groupIndex}>
      {group.map((item, index) => (
        <tr key={`${groupIndex}-${index}`}>
          {index === 0 && (
            <>
              <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={group.length}>
                {item.itemNo}
              </td>
              <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={group.length}>
                {item.styleNumber}
              </td>
              <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={group.length}>
                {`${item.season}${item.year.slice(2)}`}
              </td>
              <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={group.length}>
                {item.imCode}
              </td>
              <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={group.length}>
                {item.description}
              </td>
            </>
          )}
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.color}</td>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemColor}</td>
          <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.bomQty}</td>
          {/* <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.destination}</td> */}
          {/* Add more columns as needed */}
        </tr>
      ))}
    </React.Fragment>
  ));
};

  
//   const generateRows = (data) => {
//     const rows = [];
//     data.forEach((item, index) => {
//       if (index === 0 || item.itemNo !== data[index - 1].itemNo) {
//         rows.push(
//           <tr key={index}>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }} rowSpan={data.filter((i) => i.itemNo === item.itemNo).length}>
//               {item.itemNo}
//             </td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.description}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.color}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemColor}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.bomQty}</td>
//           </tr>
//         );
//       } else {
//         rows.push(
//           <tr key={index}>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.color}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemColor}</td>
//             <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.bomQty}</td>
//           </tr>
//         );
//       }
//     });
//     return rows;
//   };
  
 
  return (
    <Card title={'Swoosh HT Lable'} extra={<Button onClick={handlePrint}>Print</Button>}>
      <div id='print'>
        {bomInfo && bomInfo.length > 0 ? (
          generateTables()
        ) : (
          <div>No data available</div>
        )}
      </div>
    </Card>
  );
};

export default SwooshHtLable;
