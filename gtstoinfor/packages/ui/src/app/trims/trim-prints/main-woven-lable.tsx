import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { BomProposalReq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';

const MainWovenLabel = (props) => {
  const [bomInfo, setBomInfo] = useState([]);
  const { itemId, poLines } = props
  const service = new BomService();

  const data = bomInfo
  const tableCellStyle = {
    padding: '8px',
  };

  useEffect(() => {
    handleMainWovenLable()
  }, []);



  function handleMainWovenLable(){
    // val.itemId
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = poLines
    // bomProposalReq.trimName = item
    service.getMainWovenLableData(bomProposalReq).then((res) =>{
      if(res.status){
        setBomInfo(res.data)
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
  

  const groupDataBySize = () => {
    if (bomInfo && bomInfo.length > 0) {
      const groupedData = {
        sizeWiseQty: [],
        TsizeWiseqty: [],
        SsizeWiseqty: [],
      };

      bomInfo.forEach((item) => {
        groupedData.sizeWiseQty.push(...item.sizeWiseQty);
        groupedData.TsizeWiseqty.push(...item.TsizeWiseqty);
        groupedData.SsizeWiseqty.push(...item.SsizeWiseqty);
      });

      return groupedData;
    }

    return null;
  };

  const removeDuplicateItems = (data) => {
    const uniqueItems = [];
    const uniqueItemSet = new Set();
  
    data.forEach((item) => {
      const itemKey = `${item.styleNumber}-${item.imCode}-${item.itemNo}`;
  
      if (!uniqueItemSet.has(itemKey)) {
        uniqueItemSet.add(itemKey);
        uniqueItems.push(item);
      }
    });
  
    return uniqueItems;
  };
  
  // Usage
  const uniqueData = removeDuplicateItems(data);

  const calculateTotalBomQty = (data) => {
    return data.reduce((total, item) => {
      const bomQty = Number(item?.bomQty) || 0;
      return total + bomQty;
    }, 0);
  };


  
  const generateTables = () => {
    const groupedData = groupDataBySize();
  
    const getUniqueSizes = (data) => {
      if (data && data.length > 0) {
        return Array.from(new Set(data.flatMap((item) => (item.sizeWiseQty || []).map((sizeItem) => sizeItem.size))));
      }
      return [];
    };
 
    const generateSizeHeaders = (sizes) => (
      sizes.map((size) => (
        <th key={size} style={tableCellStyle}>
          {size}
        </th>
      ))
    );
    
    
    if (groupedData) {
      
      const allSizes = Array.from(
        new Set(data.flatMap((item) => item.sizeWiseQty.map((sizeItem) => sizeItem.size)))
      ); 

      const calculateTotalQtyForSize = (size) => {
        return groupedData.sizeWiseQty.reduce((total, sizeItem) => {
          if (sizeItem.size === size) {
            return total + sizeItem.qty;
          }
          return total;
        }, 0);
      };
      return (
        <>
          {/* SizeWiseQty */}
          {groupedData.sizeWiseQty.length > 0 && (
  <div style={{ marginBottom: '20px' }}>
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
          <th style={tableCellStyle}>IM#/SIZE MATRIX</th>
          {allSizes.map((size, index) => (
            <th key={index} style={{ ...tableCellStyle, textAlign: 'center' }}>
              {size}
            </th>
          ))}
       
          <th style={tableCellStyle}>TOTAL</th>
        </tr>
      </thead>
      <tbody>{generateRows(groupedData.sizeWiseQty)}</tbody>
      <tfoot>
      <tr>
                <td colSpan={4} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Total</td>
                {allSizes.map((size, index) => (
                  <td key={index} style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
                    {calculateTotalQtyForSize(size)}
                  </td>
                ))}
          <td style={{ ...tableCellStyle, textAlign: 'center', fontWeight: 'bold' }}>
            {calculateTotalBomQty(data)}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
)}

          {/* TsizeWiseqty */}
          {groupedData.TsizeWiseqty.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3>TsizeWiseqty</h3>
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
                    <th style={tableCellStyle}>IM#/SIZE MATRIX</th>
                    {generateSizeHeaders(getUniqueSizes(groupedData.TsizeWiseqty))}
                    <th style={tableCellStyle}>Qty</th>
                    <th style={tableCellStyle}>TOTAL</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>{generateRows(groupedData.TsizeWiseqty)}</tbody>
              </table>
            </div>
          )}
  
          {/* SsizeWiseqty */}
          {groupedData.SsizeWiseqty.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
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
                    <th style={tableCellStyle}>IM#/SIZE MATRIX</th>
                    {generateSizeHeaders(getUniqueSizes(groupedData.SsizeWiseqty))}
                    <th style={tableCellStyle}>Qty</th>
                    <th style={tableCellStyle}>TOTAL</th>
                  </tr>
                </thead>
                <tbody>{generateRows(groupedData.SsizeWiseqty)}</tbody>
              </table>
            </div>
          )}
        </>
      );
    }
  
    return null;
  };
  // const generateRows = (bomInfo) => {
  //   if (!bomInfo || bomInfo.length === 0) {
  //     return null;
  //   }
  
  //   const allSizes = Array.from(
  //     new Set(data.flatMap((item) => item.sizeWiseQty.map((sizeItem) => sizeItem.size)))
  //   );
  
  //   return data.map((item, index) => {
  //     let rowTotal = 0; // Initialize row total
  
  //     const row = (
  //       <tr key={item.itemNo || index}>
  //         <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemNo}</td>
  //         <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
  //         <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
  //         <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
  //         {allSizes.map((size) => {
  //           const sizeItem = item.sizeWiseQty.find((s) => s.size === size);
  //           const qty = sizeItem ? sizeItem.qty : 0;
  //           rowTotal += qty; // Accumulate row total
  //           return (
  //             <td key={size || index} style={{ ...tableCellStyle, textAlign: 'center' }}>
  //               {qty}
  //             </td>
  //           );
  //         })}
  //         <td style={{ ...tableCellStyle, textAlign: 'center' }}>{rowTotal}</td> {/* Display row total */}
  //       </tr>
  //     );
  
  //     return row;
  //   });
  // };

  
  // rest of the generateRows function remains unchanged

const generateRows = (bomInfo) => {
    if (!bomInfo || bomInfo.length === 0) {
      return null;
    }
  
    const allSizes = Array.from(
      new Set(data.flatMap((item) => item.sizeWiseQty.map((sizeItem) => sizeItem.size)))
    );
  
    return data.map((item, index) => (
      <tr key={item.itemNo || index}>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.itemNo}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.styleNumber}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.season}</td>
        <td style={{ ...tableCellStyle, textAlign: 'center' }}>{item.imCode}</td>
        {allSizes.map((size) => {
          const sizeItem = item.sizeWiseQty.find((s) => s.size === size);
          console.log(sizeItem,"sizeItem++++++++++++++++++++++++++")
          return (
            <td key={size || index} style={{ ...tableCellStyle, textAlign: 'center' }}>
              {sizeItem ? sizeItem.qty : 0}
            </td>
          );
        })}
        <td style={{ ...tableCellStyle, textAlign: 'center',fontWeight:"bold" }}>{item.bomQty}</td>

      </tr>
    ));

  };
  

  return (
    <Card title={'Main Woven Label'} extra={<Button onClick={handlePrint}>Print</Button>}>
      <div id="print">
        {generateTables()}
      </div>
    </Card>
  );
};

export default MainWovenLabel;