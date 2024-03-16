
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'antd';
import { BomProposalReq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

type Props = {
  itemId: any,
  poLines: string[]
}

const NeckTape = (props: Props) => {
  const [bomInfo, setBomInfo] = useState([]);
  const service = new BomService();
  const [tablesGenerated, setTablesGenerated] = useState(false);
  const tableCellStyle = {
    padding: '8px',
  };

  const tableRef = useRef(null);

  useEffect(() => {
    handleNeckTapeTrim()
  }, []);

  useEffect(() => {
    if (!tablesGenerated) {
      generateTables();
    }
  }, [tablesGenerated]); 

  function handleNeckTapeTrim() {
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [props.itemId]
    bomProposalReq.poLine = props.poLines
    service.generateProposalForNeckTape(bomProposalReq).then((v) => {
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
    // Grouping data by item number
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
              buttonText="Export to Excel"
            />
          </div>
          {/* Table */}
          <table id={`bom-table-${index}`} style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding="0">
            {/* Table header */}
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
            {/* Table body */}
            <tbody>{generateRows(groupedData[itemNo])}</tbody>
            {/* Table footer */}
            <tfoot>
              <tr>
                <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
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
  
  // const generateTables = () => {
  //   const groupedData = groupDataByItemNo();
  //   if (groupedData) {

  //     return Object.keys(groupedData).map((itemNo, index) => (
  //       <div key={index} style={{ marginBottom: '20px' }}>
  //         {/* <h3>Item No: {itemNo}</h3> */}
  //         <table
  //           style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }}
  //           border={1}
  //           cellSpacing="0"
  //           cellPadding="0"
  //         >
  //           <thead>
  //             <tr>
  //               <th style={tableCellStyle}>ITEM</th>
  //               <th style={tableCellStyle}>STYLE</th>
  //               <th style={tableCellStyle}>SEASON</th>
  //               <th style={tableCellStyle}>IM#</th>
  //               <th style={tableCellStyle}>MATERIAL DESCRIPTION</th>
  //               <th style={tableCellStyle}>GARMENT COLOR CODE</th>
  //               <th style={tableCellStyle}>TAPE COLOR</th>
  //               <th style={tableCellStyle}>QTY IN YARDS</th>
  //             </tr>
  //           </thead>
  //           <tbody>{generateRows(groupedData[itemNo])}</tbody>
  //           <tfoot>
  //             <tr>
  //               <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
  //               <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
  //                 {calculateTotalBomQty(groupedData[itemNo])}
  //               </td>
  //             </tr>
  //           </tfoot>
  //         </table>
  //       </div>
  //     ));
  //   }
  //   return null;
  // };
  const calculateTotalBomQty = (data) => {

    return data.reduce((total, item) => {
      const bomQtys = item?.colors.map(color => Number(color?.bomQty)) || [];
      const validQtys = bomQtys.filter(bomQty => !isNaN(bomQty));
      return total + validQtys.reduce((sum, qty) => sum + qty, 0);
    }, 0);
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
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0].color}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0] && item.colors[0].itemColor ? item.colors[0].itemColor : '-'}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0].bomQty}</td>
          </tr>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Card title={'Neck Tape'} extra={<Button onClick={handlePrint}>Print</Button>}>

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

export default NeckTape;

