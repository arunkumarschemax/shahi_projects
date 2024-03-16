import { BomProposalReq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import { Button, Card, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



export const getCssFromComponent = (fromDoc, toDoc) => {

  Array.from(fromDoc.styleSheets).forEach((styleSheet: any) => {
    if (styleSheet.cssRules) {
      const newStyleElement = toDoc.createElement("style");
      Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
        newStyleElement.appendChild(toDoc.createTextNode(cssRule.cssText));
      });
      toDoc.head.appendChild(newStyleElement);
    }
  });
};
export interface DrawcordProps {
  itemId: any,
  poLines: string[]
}
export const Drawcord = (props: DrawcordProps) => {
  // console.log(props.bomInfo)
  const service = new BomService();
  const { itemId, poLines } = props
  const [bomInfo, setBomInfo] = useState([]);
  const [tablesGenerated, setTablesGenerated] = useState(false);


  useEffect(() => {
    handleDrawcord()
  }, []);

  useEffect(() => {
    if (!tablesGenerated) {
      generateTables();
    }
  }, [tablesGenerated]); 


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



  

  function handleDrawcord() {
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    service.generateProposalForNeckTape(bomProposalReq).then((v) => {
      if (v.status) {
        setBomInfo(v.data)
        setTablesGenerated(true)
      }
    })
  }


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
        <div key={index} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            {/* <h3>Item No: {itemNo}</h3> */}
            <ReactHTMLTableToExcel
              id={`excel-button-${index}`}
              className={`excel-button-${index}`}
              table={`bom-table-${index}`}
              filename={`BOM-Item-${itemNo}`}
              sheet="Sheet 1"
              buttonText={`${itemNo}-Export to Excel`}
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
  const calculateTotalBomQty = (data) => {

    return data.reduce((total, item) => {
      const bomQtys = item?.colors.map(color => Number(color?.bomQty)) || [];
      const validQtys = bomQtys.filter(bomQty => !isNaN(bomQty));
      return total + validQtys.reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  const tableCellStyle = {
    padding: '8px',
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
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0].itemColor}</td>
            <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.colors[0].bomQty}</td>
          </tr>
        ))}
      </React.Fragment>
    ));
  };

  return (

    <div id="print">
      {bomInfo && bomInfo.length > 0 ? (
        <Card title={'DRAWCORD'} extra={<Button onClick={handlePrint}>Print</Button>}>
          {generateTables()}
        </Card>
      ) : (
        <div>No data available</div>
      )}
    </div>

    // <Card title={'DrawCord'}
    //             extra={<Button onClick={handlePrint}>Print</Button>}>
    //  <table style={{ borderCollapse: 'collapse', borderBlockColor: 'black', width: '100%' }} border={1} cellSpacing="0" cellPadding='0'>
    //             <tr>
    //                 <th style={{ width: '3%' }}>ITEM</th>
    //                 <th style={{ width: '3%' }}>STYLE</th>
    //                 <th style={{ width: '3%' }}>SEASON</th>
    //                 <th style={{ width: '3%' }}>IM#</th>
    //                 <th style={{ width: '3%' }}>MATERIAL DESCRIPTION</th>
    //                 <th style={{ width: '3%' }}>GARMENT COLOUR + CODE</th>
    //                 <th style={{ width: '3%' }}>TAPE COLOUR</th>
    //                 <th style={{ width: '3%' }}>QTY IN YDS</th>

    //                 </tr>
    //                 {data.map((rec,index) =>{
    //                     return(
    //                         <tr>
    //                         <td style={{ textAlign: 'center' }} >{rec.itemNo !== null ? rec.itemNo:''}</td>
    //                         <td style={{ textAlign: 'center' }} >{rec.styleNumber !== null ? rec.styleNumber:''}</td>
    //                         <td style={{ textAlign: 'center' }} >{rec.season !== null ? rec.season:''}</td>
    //                         <td style={{ textAlign: 'center' }} >{rec.imCode !== null ? rec.imCode:''}</td>
    //                         <td style={{ textAlign: 'center' }} >{rec.description !== null ? rec.description:''}</td>
    //                         <td style={{ textAlign: 'center' }} >{rec.itemColor !== null ? rec.itemColor:''}</td>
    //                         <td style={{ textAlign: 'center' }} >{rec.color !== null ? rec.color:''}</td>
    //                         <td style={{ textAlign: 'center' }} >{rec.bomQty !== null ? rec.bomQty:''}</td>
    //                      </tr>
    //                     )

    //                 })}

    //         </table>


    // </Card>
  );
};





export default Drawcord;
