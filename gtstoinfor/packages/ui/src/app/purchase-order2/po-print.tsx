import { PrinterOutlined } from "@ant-design/icons";
import { PurchaseViewDto } from "@project-management-system/shared-models";
import { PurchaseOrderservice } from "@project-management-system/shared-services";
import { Button, Card, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import numberToWords from 'number-to-words';
import './po-print.css';
import html2pdf from 'html2pdf.js';
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { TermsAndConditions } from "./terms & conditions ";

export interface PoPrintProps {
    poId: number
    printOrder: () => void
}
export function PoPrint(props: PoPrintProps) {

    const [poData, setData] = useState<any[]>([])
    const location = useLocation()
    let totalQty = 0
    let totalValue = 0
    let totalNetValue = 0

    const Service = new PurchaseOrderservice();

    useEffect(() => {
        getPo();
    }, [])

    const getPo = () => {
        const req = new PurchaseViewDto(location.state)
        console.log(req, '-----------');
        Service.getPodetailsById(req).then(res => {
            if (res.status) {
                console.log(res.data)
                console.log(res.data.fabricInfo)
                setData(res.data)
            }
        })
    }

    // const printOrder = () => {
    //     const printableElements = document.getElementById('printme').innerHTML;
    //     const orderHTML = 
    //     '<html><head><title></title><style>@media print { @page { size: B5 landscape; } }</style></head><body> ${printableElements}  </body></html>';
    //     const oldPage = document.body.innerHTML;
    //     document.body.innerHTML = orderHTML;
    //     window.print();
    //     document.body.innerHTML = oldPage;
        
    // }

    const printOrder = () => {
      const printableElements = document.getElementById('printme').innerHTML;
      const orderHTML = `
      <html>
        <head>
          <title></title>
          <style>
            @media print {
              @page {
                size: landscape;
              }
              body {
                width: 100%;
              }
              
            }
          </style>
        </head>
        <body class="page">${printableElements}</body>
      </html>`;
    
      const oldPage = document.body.innerHTML;
      document.body.innerHTML = orderHTML;
    
      // Use window.print() after setting the style
      window.print();
    
      document.body.innerHTML = oldPage;
    };
    
    
    
    const totalAmount = poData.reduce((sum, item) => sum + parseFloat(item.total_amount || 0), 0);
    const totalAmountInWords = numberToWords.toWords(totalAmount).toUpperCase();
    
    
    
    // const downloadAsPDF = () => {
    
    //   const element = document.getElementById('printme');
    //   const options = {
    //    margin:6,
    //     width: '100%',
    //     filename: 'PO.pdf',
    //     image: { type: 'jpeg', quality: 1.0 },
    //     html2canvas: { scale: 2 }, // Experiment with different scale values
    //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    //   };
      
    
    //   html2pdf(element, options);
    // };
    
    const downloadAsPDF = () => {
      const element = document.getElementById('printme');
      const options = {
        margin: 6,
        width: '100%',
        filename: 'PO.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };
  
      html2pdf(element, options);
    };
  
    


    return (
        <Card title='PO Print'
            style={{ textAlign: 'center' }}
            headStyle={{ backgroundColor: '#69c0ff', border: 0 }}extra={<span style={{ color: 'white' }} ><Button onClick={printOrder} className='panel_button'><PrinterOutlined /> Print</Button> <Button className='panel_button' onClick={downloadAsPDF}>Download PDF</Button></span> }>
            <html>
                <body id='printme'>
                  <div>
              <Row>
                 <div style={{  padding: '20px',height:'300px', width: '300px' }}>
             <h1 style={{ textAlign: 'start', fontSize:'17px',fontFamily: 'Fancy', marginRight:'30px',lineHeight: '2', marginBottom: '20px' }}>{'"Say flat NO to Wrong Practices"'}</h1>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Last Updated By :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Vendor Name : {`${poData[0]?.vendor_name}`}</h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Address : {`${poData[0]?.address}`}</h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Pin Code : {`${poData[0]?.postal_code}`}</h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Vendor State :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' ,}}>
             Vendor GSTIN : <span style={{ fontFamily: 'Segoe Ui Light',color:'blue' }}>{`${poData[0]?.gst_number}`}</span>
               </h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Phone No :  {`${poData[0]?.contact_number}`}</h2>
             <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Fax No :</h2>
             <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Source Type :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Quotation No :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Your Reference No :</h2>
             <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Our Reference No :</h2>
             <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'18px', marginTop: '0', marginBottom: '0' }}>Agreement No :</h2>

            </div>
                    
                    
                    <div style={{  padding: '20px',height:'300px', width: '300px' }}>
                    <h1 style={{ textAlign: 'center',marginTop:'-10px', padding: "20px" ,fontSize:"17px",fontFamily:'Century Schoolbook'}}>{'Shahi Exports Pvt.Ltd. Sy.No.13,14 AND 15 Sarjapura Main Road, Bellandur Gate Bengaluru Urban, KARNATAKA (KA) Pin Code:560103'}</h1>
                    <h1 style={{ textAlign: 'center' ,marginTop:'-30px',fontSize:"12px",fontFamily:'Century Schoolbook',color: 'blue'}}>{'GSTIN : 29AAJCS1175L1ZU'}</h1>
                    <h1 style={{ textAlign: 'center' ,marginTop:'-10px',fontSize:"12px",fontFamily:'Century Schoolbook',color: 'blue', textDecoration: 'underline' }}>{'Inter State'}</h1>
                    <h1 style={{ textAlign: 'center' ,marginTop:'-10px',fontSize:"14px",fontFamily:'Century Schoolbook',color: 'blue', textDecoration: 'underline' }}>{'Purchase Order'}</h1>
                    <h1 style={{ textAlign: 'center' ,marginTop:'-10px',fontSize:"12px",fontFamily:'Century Schoolbook',color: 'blue', textDecoration: 'underline' }}>{'Good Only'}</h1>

             <table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <tr>
    <th colSpan={2} style={{ textAlign: 'center', border: '1px solid #000' }}>Chargers Summary</th>
  </tr>
  <tr>
    <td style={{ border: '1px solid #000', textAlign: 'left', borderRight: '1px solid #000' }}>Integrated GST</td>
    <td style={{ border: '1px solid #000' }}>{2389}</td>
  </tr>
  <tr>
    <td style={{ border: '1px solid #000', textAlign: 'left', borderRight: '1px solid #000' }}>Total</td>
    <td style={{ border: '1px solid #000' }}>{900000}</td>
  </tr>
</table>


                    </div>


                    <div style={{  padding: '20px',height:'300px', width: '300px',marginLeft:'50px' }}>
                    <h1  style={{ textAlign: 'end',fontSize:'17px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'"Say a big NO to Child Labour"'}</h1>
                    <h1  style={{ textAlign: 'end', fontSize:'10pX',fontFamily: 'Candra', marginRight:'-18px',lineHeight: '1', marginBottom: '10px',marginTop:'-10px'  }}>{'DISPATCH  INSTRUCTION  TO  BE  STRICTLY FOLLOWED'}</h1>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>
                    <h2 style={{ textAlign: 'start', fontSize: '12px', fontFamily: 'Un Shinmun', marginLeft: '20px', marginTop: '0', marginBottom: '0' }}> Printed On: {new Date().toLocaleString()}</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>
                    <h2 style={{ textAlign: 'start',fontSize:'13pX', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>NON-TUF</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>PO Number : {`${poData[0]?.po_number}`}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start', fontSize:'12px',fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>PO Type :  {`${poData[0]?.po_material_type}`}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Project  No :</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Account : {`${poData[0]?.bank_acc_no}`}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Delivery Address : {`${poData[0]?.address}`}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Delivery State :</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Delivery Method :</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Delivery Terms :</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Packing Terms :</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Fright Terms :</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Payment Terms :</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: '50px' }}>

                    <h2 style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Un Shinmun',marginLeft:'20px', marginTop: '0', marginBottom: '0' }}>Currency : {`${poData[0]?.currencyName}`}</h2></div>
                    </div>
                    </Row>
                 <br></br>

                   <h4 style={{fontFamily:' Fancy',fontSize:'12px'}}>This is in reference to your above mention quotaion. We are pleased to place an order with you for following items as per terms and conditions mentioned herewith</h4>
                  
                        {/* To add border to html table
                        // <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'> */}

                        <table style={{borderCollapse:'collapse',borderBlockColor:'black',width:'100%'}} border={1} cellSpacing="0" cellPadding='0'>
                          <tr >
                            <th style={{width:'3%'}}>Ln</th>
                            <th>HSN/SAC</th>
                            <th style={{width:'50px'}}>Item Code</th>
                            <th>Supplier Item</th>
                            <th>Item Name</th>
                            <th  style={{width:'50px'}}>Item Description</th>
                            <th>GRM</th>
                            <th>Mx.Del.Date</th>
                            <th>Unit C.Fact</th>
                            <th>Qnty </th>
                            <th>Rate</th>
                            <th>Value</th>
                            <th style={{width:'7%'}}>Discount</th>
                            <th>Net Value</th>
                           

                          </tr>
                          {poData.map((e,index)=>{
                            totalQty += e.po_quantity ? Number(e.po_quantity) : 0
                            totalValue += e.unit_price ? Number(e.po_quantity*e.unit_price): 0 
                            totalNetValue += e.unit_price? Number((e.po_quantity*e.unit_price)-((e.po_quantity*e.unit_price)*(e.discount/100))): 0
                            const sno = index + 1;
                            return(

                          <tr key={index}>
                            <td>{sno}</td>
                            <td >{e.hsnCode? e.hsnCode:'-'}</td>
                            <td style={{ minWidth: '100px', maxWidth: '300px', overflow: 'hidden' }}>
                                    <div style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                                  {e.item_code ? e.item_code : '-'}
                                          </div>
                                       </td>

                            <td >{e.name? e.name:'-'}</td>
                            <td >{e.po_material_type? e.po_material_type:'-'}</td>
                       
                                <td style={{ minWidth: '100px', maxWidth: '300px', overflow: 'hidden' }}>
                                    <div style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                                  {e.description ? e.description : '-'}
                                          </div>
                                       </td>

                        <td >{e.name? e.name:'-'}</td>
                        <td >{e.expected_delivery_date ? new Date(e.expected_delivery_date).toLocaleDateString() : '-'}</td>
                        <td >{e.uom?e.uom:'-'}</td>
                        <td >
                          {typeof e.po_quantity === 'number'
                          ? e.po_quantity.toFixed(2)
                          : typeof e.po_quantity === 'string'
                           ? parseFloat(e.po_quantity).toFixed(2)
                                       : '-'}
                                 </td>
                        <td >{typeof e.unit_price === 'number' ? e.unit_price.toFixed(2) : '-'}</td>
                        <td >{e.unit_price ? (e.po_quantity * e.unit_price).toFixed(2): '-'} </td>                                
                          <td style={{width:'7%'}}>{e.discount? `${((e.po_quantity * e.unit_price * e.discount) / 100).toFixed(2)} (${e.discount}%)`: '-'}</td>
                          <td >{e.unit_price? ((e.po_quantity * e.unit_price) - ((e.po_quantity * e.unit_price) * (e.discount / 100))).toFixed(2): '-'}</td>
                            

                          </tr>
                            )
                            })}
                            
                          <tr>
                          <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td ></td>
                            <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{fontFamily:'Bold',fontWeight: 'bold',textAlign:'right'}}>{totalQty.toFixed(2)}</td>
                        <td></td>
                        <td style={{fontFamily:'Bold',fontWeight: 'bold',textAlign:'right'}}>{totalValue.toFixed(2)}</td>
                        <td></td>
                        <td style={{fontFamily:'Bold',fontWeight: 'bold',textAlign:'right'}}>{totalNetValue.toFixed(2)}</td>
                          </tr>
                        </table>
                       
                          <h3  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>PO No : {`${poData[0]?.po_number}`}</h3>
                          <hr></hr>
                          <h3  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Remarks :'}</h3>
                          <hr></hr>
                          <h3  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Delivery Schedule :'}</h3>
                          <hr></hr>
                          <br></br>
                        <h1  style={{ textAlign: 'end',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Shahi exports Pvt.Ltd.'}</h1>
                       <h1  style={{ textAlign: 'end',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Authorised Signatory'}</h1>
                          <br></br>
                          <h4  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>{'Important! Please Read the Terms & Conditions Printed on the Following Pages'}</h4>

                       <br></br>
                       
                       <h3  style={{ textAlign: 'start',fontSize:'12px', fontFamily: 'Fancy', lineHeight: '2', marginBottom: '20px'  }}>Terms And Conditions : </h3>

                                <br></br>
                               
                                <TermsAndConditions/>
                                </div>
                </body>

            </html>

        </Card>
    )


} export default PoPrint;
