

import React, { useState, useEffect } from "react";
import "./mop-print.css";

import { Button, Card, Table, message } from "antd";



export const getCssFromComponent = (fromDoc, toDoc) => {
  Array.from(fromDoc.styleSheets).forEach((styleSheet: any) => {
    if (styleSheet.cssRules) {
      // true for inline styles
      const newStyleElement = toDoc.createElement("style");
      Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
        newStyleElement.appendChild(toDoc.createTextNode(cssRule.cssText));
      });
      toDoc.head.appendChild(newStyleElement);
    }
  });
};

export interface MopprintProps {
    mop:any
    pop:any
    key:any
}

export function Mopprint(props: MopprintProps) {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [transferInfo, setTransferInfo] = useState<any>([]);

  

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleDateString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // if (props.invoiceId > 0) {
    //   getPrint(props.invoiceId);
    // }
  }, []);

  const getPrint = (invoiceId: number) => {
    // const req = new InvoiceIdReq(invoiceId);
    // invoiceService.getInvoiceItemByInvoiceId(req).then((res) => {
    //   if (res.status) {
    //     setTransferInfo([res.data[0]]);
    //   } else {
    //     message.error(res.internalMessage);
    //   }
    // });
  };

  // const invoiceAmountSum = invoiceData.reduce((sum, item) => {
  //   const amount = parseFloat(item.invoiceAmount.replace("₹", ""));
  //   return sum + amount;
  // }, 0);

  // const taxAndSubtotalSum = taxAndSubtotalData.reduce((sum, item) => {
  //   return sum + item.value;
  // }, 0);

  // const grandTotal = invoiceAmountSum + taxAndSubtotalSum;

  const handlePrint = () => {
    const invoiceContent = document.getElementById("print");
    if (invoiceContent) {
      const devContent = invoiceContent.innerHTML;
      const printWindow = window.open("", "PRINT", "height=900,width=1600");
      printWindow.document.write(devContent);
      getCssFromComponent(document, printWindow.document);

      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  const formatIndianNumber = (amount) => {
    return  Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}
console.log(props.mop,"mop")

  return (
    <>
     
      <div className="invoice" id="print">
        <div >
          <div style={{marginLeft:250,color: 'var(--secondary-clr)',marginTop:20}}>
            <h2>Material Order Proposal</h2>
          </div>
          {/* {transferInfo.map((item, index) => ( */}
          <div className="i-row" style={{marginTop:"5px"}}>
            <div className="i-number" style={{justifyContent:"space-between"}}>
              {/* <p className="p-title">INVOICE NO: </p> */}
              <p className="p-title" style={{marginRight:10}}>Date: {currentDateTime}</p>
            </div>
          
          </div>
         
        </div>
        <div className="body">
          <div className="i-table" style={{fontSize:"13px"}}>
            <div className="i-table-head">
              <div className="i-row">
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title" >CO number</p>
                </div>
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title">CO Line No </p>
                </div>
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title"> RM Item Code</p>
                </div> 
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title"> RM tem Name</p>
                </div>
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title"> FG Item Code</p>
                </div>
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title"> FG item Name</p>
                </div>
                <div className="i-col" style={{width:"15%"}}>
                  <p className="p-title">Description</p>
                </div>
                <div className="i-col" style={{width:"15%"}}>
                  <p className="p-title">Quantity</p>
                </div>
               
                {/* <div className="i-col w-15">
                  <p className="p-title">Invoice Amount</p>
                </div> */}
              </div>
            </div>
            <div className="i-table-body">
              {props?.mop?.map((item, index) => (
                <div className="i-row" key={index}>
                  <div className="i-col w-20">
                    <p>{item.coNumber}</p>
                  </div>
                  <div className="i-col">
                    <p>{item.coLineNumber}</p>
                  </div>
                  <div className="i-col">
                  <p>{item.rmitemCode}</p>
                </div>
                  <div className="i-col w-15">
                    <p style={{ textAlign:"right"}}></p>
                  </div>
                  <div className="i-col">
                    <p> </p>
                  </div>
                  <div className="i-col w-15">
                    <p style={{textAlign:"right"}}> </p>
                  </div>
                  {/* <div className="i-col w-15">
                    <p>₹ {item.invAmount}</p>
                  </div> */}
                </div>
              ))}
            </div>
            <div className="i-table-foot">
              <div className="i-row">
                <div className="i-col w-75">
                  <p> </p>
                </div>
                <div className="i-col w-55">
                  <p></p>
                </div>
               
                <div>
                </div>
              
              </div>
              <div style={{ textAlign: "right", margin: "10px" }}>
                {/* <div style={{ backgroundColor: "#5265a7",color:"white", padding: "10px", display: "inline-block" }}>
                <p className="p-title">
                    GRAND TOTAL: <span>₹ </span>
                </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
        </div>
      </div>
  
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button type="primary" shape="round" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </>
  );
}

export default Mopprint;
