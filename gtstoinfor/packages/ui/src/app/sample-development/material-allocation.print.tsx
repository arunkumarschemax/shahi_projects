import React, { useEffect, useState } from 'react'
import "./print.css";
import { Button, Descriptions } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';

export interface Props {
    data:any
   
}

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

export const MaterialAllocationPrint = (props:Props) => {

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
  }, []);


 console.log(props.data,"lll")

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



  return (
    <>

       
     
      <div className="invoice" id="print">
        <div >
          <div style={{marginLeft:250,color: 'var(--secondary-clr)',marginTop:20}}>
            <h2>Material Allocation</h2>

           
          </div>
          {/* {transferInfo.map((item, index) => ( */}
          <div className="i-row" style={{marginTop:"5px"}}>
            <div className="i-number" style={{justifyContent:"space-between"}}>
              {/* <p className="p-title">INVOICE NO: </p> */}
              <p className="p-title" style={{marginRight:10}}>Date: {currentDateTime}</p>
            </div>
            <div>
            <Descriptions size='small'>
                <DescriptionsItem label='Sample Request No' style={{marginLeft:20}}>{props?.data[0]?.request_no}</DescriptionsItem>
                 <DescriptionsItem label='Buyer'  style={{marginRight:200}}>{props?.data[0]?.buyer_name}</DescriptionsItem>
                <DescriptionsItem label='Item Type'>{props?.data[0]?.item_type}</DescriptionsItem>
                {/* <DescriptionsItem label='Quantity'>{props?.data?.quantity}</DescriptionsItem>
                <DescriptionsItem label='Total Allocated Quantity'>{props?.data?.total_allocated_quantity}</DescriptionsItem> */}
               
            </Descriptions> 
            </div>
          
          </div>
         
        </div>
        <div className="body">
          <div className="i-table" style={{fontSize:"13px"}}>
            <div className="i-table-head">
              <div className="i-row">
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title" >Location</p>
                </div>
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title">Quantity </p>
                </div>
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title"> Allocate Quantity</p>
                </div> 
                {/* <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title"> RM Sku Code </p>
                </div>
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title"> FG Item Code</p>
                </div>
                <div className="i-col" style={{width:"25%"}}>
                  <p className="p-title"> FG Sku Code</p>
                </div>
                <div className="i-col" style={{width:"15%"}}>
                  <p className="p-title">Quantity</p>
                </div> */}
        
              </div>
            </div>
            
            <div className="i-table-body">
            
              { transferInfo.map((item, index) => (
                <div className="i-row" key={index}>
                  <div className="i-col w-20">
                    <p style={{textAlign:"center"}}>{item.coNumber}</p>
                  </div>
                  <div className="i-col">
                    <p style={{textAlign:"left",marginRight:60}}>{item.coLineNumber}</p>
                  </div>
                  <div className="i-col">
                  <p style={{marginRight:20,textAlign:'center'}}>{item.rmitemCode}</p>
                 </div>
                  <div className="i-col">
                    <p style={{textAlign:"right"}}>{item.rmSkuCode}</p>
                  </div>
                  <div className="i-col">
                    <p style={{textAlign:"right",marginLeft:60}}>{item.fgItemCode}</p>
                  </div>
                  <div className="i-col w-15" >
                    <p style={{textAlign:"right"}}>{item.fgSkuCode}</p>
                  </div>
                  <div className="i-col w-15">
                    <p>{item.quantity}</p>
                  </div>
                  {/* <div className="i-col w-15">
                    <p>₹ {item.invAmount}</p>
                  </div> */}
                </div>
              ))
            //   : transferInfo.map((item, index) => (
            //     <div className="i-row" key={index}>
            //     <div className="i-col w-20">
            //       <p style={{textAlign:"center"}}>{item.coNumber}</p>
            //     </div>
            //     <div className="i-col">
            //       <p style={{textAlign:"left",marginRight:60}}>{item.coLineNumber}</p>
            //     </div>
            //     <div className="i-col">
            //     <p style={{marginRight:20,textAlign:'center'}}>{item.rmitemCode}</p>
            //    </div>
            //     <div className="i-col">
            //       <p style={{textAlign:"right"}}>{item.rmSkuCode}</p>
            //     </div>
            //     <div className="i-col">
            //       <p style={{textAlign:"right",marginLeft:60}}>{item.fgItemCode}</p>
            //     </div>
            //     <div className="i-col w-15" >
            //       <p style={{textAlign:"right"}}>{item.fgSkuCode}</p>
            //     </div>
            //     <div className="i-col w-15">
            //       <p>{item.quantity}</p>
            //     </div>
            //     {/* <div className="i-col w-15">
            //       <p>₹ {item.invAmount}</p>
            //     </div> */}
            //   </div>
            //   ))
              }
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
        <Button type="primary"  onClick={handlePrint}>
          Print
        </Button>
      </div>
    </>
  );
  
}

export default MaterialAllocationPrint