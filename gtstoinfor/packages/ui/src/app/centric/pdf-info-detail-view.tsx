import { LegalPoDetails } from '@project-management-system/shared-models'
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './pdf-reader.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'



const PdfInfoDetailView = (
   
    ) =>{

    const [pdfData, setPdfData] = useState<any>();
    const navigate = useNavigate();
     const location = useLocation()
    // console.log(location?.state?.data?.fileData,"ooooooooo")
    const parsedData = JSON.parse(location?.state?.data?.fileData)
    console.log(parsedData,"kkkkkkkkkkk")



    const setMoreData = () => {
        navigate('/centric/pdf-info')

    }

    return (
        <Card >
            <div><Button style={{ backgroundColor: '#29397d', color: 'white' }} onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div>
            <br />
            <table className='ta-b' style={{ width: '100%' }} >
                <tr className='ta-b'>
                    <th className='ta-b'>PO NUMBER</th>
                    <th className='ta-b'>PO DATE</th>
                    <th className='ta-b'>SHIPMENT METHOD</th>
                    <th className='ta-b'>SEASON</th>
                    <th className='ta-b'>PORT OF EXPORT</th>
                    <th className='ta-b'>PORT OF ENTRY</th>
                    <th className='ta-b'>REFERENCE #POW#</th>
                    <th className='ta-b'>PAYMENT TERM DESCRIPTION</th>
                    <th className='ta-b'>SPECIAL INSTRUCTIONS</th>
                    <th className='ta-b'>DIVISION</th>
                    <th className='ta-b'>INCOTERM</th>
                    <th className='ta-b'>SHIP TO ADDRESS</th>
                    <th className='ta-b'>MANUFACTURE</th>
                    <th className='ta-b'>BUYER ADDRESS</th>
                    {/* <th className='ta-b'>COMPT MATERIAL</th> */}


                </tr>
                <tr className='ta-b'>
                    <td className='ta-b'>{parsedData?.poNumber ? parsedData?.poNumber :"-" }</td>
                    <td className='ta-b'>{parsedData?.poDate ? parsedData?.poDate :"-"}</td>
                    <td className='ta-b'>{parsedData?.shipment ?  parsedData?.shipment :"-"}</td>
                    <td className='ta-b'>{parsedData?.season ? parsedData?.season :"-" }</td>
                    <td className='ta-b'>{parsedData?.portOfExport ? parsedData?.portOfExport :"-" }</td>
                    <td className='ta-b'>{parsedData?.portOfEntry ? parsedData?.portOfEntry :"-" }</td>
                    <td className='ta-b'>{parsedData?.Refrence ? parsedData?.Refrence :"-"}</td>
                    <td className='ta-b'>{parsedData?.paymentTermDescription ? parsedData?.paymentTermDescription:"-" }</td>
                    <td className='ta-b'>{parsedData?.specialInstructions ? parsedData?.specialInstructions :"-"}</td>
                    <td className='ta-b'>{parsedData?.division ? parsedData?.division :"-"}</td>
                    <td className='ta-b'>{parsedData?.incoterm ? parsedData?.incoterm :"-" }</td>
                    <td className='ta-b'>{parsedData?.shipToAdd ? parsedData?.shipToAdd :"-"}</td>
                    <td className='ta-b'>{parsedData?.manufacture ? parsedData?.manufacture :"-"}</td>
                    <td className='ta-b'>{parsedData?.buyerAddress ? parsedData?.buyerAddress :"-"}</td>
                    {/* <td className='ta-b'>{pdfData?.comptMaterial}</td> */}
                    

                </tr>
                {parsedData?.CentricpoItemDetails?.map((i) => {
                    return <>
                        <tr className='ta-b'>
                            <th></th>
                            <th className='ta-b'>PO LINE</th>
                            <th className='ta-b'>MATERIAL</th>

                            <th className='ta-b'>PPK UPC</th>

                            <th className='ta-b'>COLOR</th>
                            <th className='ta-b'>GENDER</th>
                            <th className='ta-b'>SHORT DESCRIPTION</th>
                            <th className='ta-b'>PACK METHOD</th>
                            <th className='ta-b'>VENDOR BOOKING FLAG</th>
                            <th className='ta-b'>CURRENCY</th>
                            <th className='ta-b'>TOTAL QUANTITY</th>

                        </tr>
                        <tr className='ta-b'>
                            <td></td>
                            <td className='ta-b'>{i.poLine ? i.poLine:"-"   }</td>
                            <td className='ta-b'>{i.material ? i.material:"-"} </td>

                            <td className='ta-b'>{i.ppkupc ? i.ppkupc :"-"}</td>

                            <td className='ta-b'>{i.color ?i.color :"-"}</td>
                            <td className='ta-b'>{i.gender?i.gender :"-"}</td>
                            <td className='ta-b'>{i.shortDescription ? i.shortDescription  :"-"}</td>
                            <td className='ta-b'>{i.packMethod ? i.packMethod :"-"}</td>
                            <td className='ta-b'>{i.vendorBookingFlag ? i.vendorBookingFlag :"-"}</td>
                            <td className='ta-b'>{i.currency ? i.currency :"-"}</td>
                            <td className='ta-b'>{i.totalQuantity ? i.totalQuantity :"-"}</td>

                        </tr>
                        <tr className='ta-b'>
                            <th></th>
                            <th></th>
                            {/* <th className='ta-b'>UOM</th> */}
                            {/* <th className='ta-b'>SIZE</th>
                            <th className='ta-b'>UPC</th>
                            <th className='ta-b'>UNIT PRICE</th>
                            <th className='ta-b'>QTY</th>
                            <th className='ta-b'>AMOUNT</th> */}
                            <th className='ta-b'>COMPT MATERIAL</th>
                            <th className='ta-b'>RATIO</th>


                            <th className='ta-b'>SIZE</th>
                            <th className='ta-b'>UPC</th>
                            <th className='ta-b'>LABEL</th>
                            <th className='ta-b'>QTY</th>
                            <th className='ta-b'>UNIT PRICE</th>
                            <th className='ta-b'>Ex FACTORY</th>
                            <th className='ta-b'>Ex PORT</th>
                            <th className='ta-b'>DELIVERY DATE</th>
                            <th className='ta-b'>RETAIL PRICE</th>
                        </tr>
                        {
                            i.CentricpoItemVariantDetails.map((j) => {
                                return <tr>
                                    <td></td>
                                    <td></td>

                                    {/* <td className='ta-b'>{j.uom}</td> */}
                                    <td className='ta-b'>{j.comptMaterial ? j.comptMaterial:"-"}</td>
                                    <td className='ta-b'>{j.ratio ? j.ratio: "-"}</td>


                                    <td className='ta-b'>{j.size ? j.size: "-"}</td>
                                    <td className='ta-b'>{j.upc ? j.upc : "-"}</td>
                                    <td className='ta-b'>{j.label ? j.label:"-"}</td>
                                    <td className='ta-b'>{j.quantity ? j.quantity:"-"}</td>
                                    <td className='ta-b'>{j.unitPrice ? j.unitPrice:"-"}</td>
                                    <td className='ta-b'>{j.exFactory ? j.exFactory:"-"}</td>
                                    <td className='ta-b'>{j.exPort ? j.exPort : "-"}</td>
                                    <td className='ta-b'>{j.deliveryDate ? j.deliveryDate:"-"}</td>
                                    <td className='ta-b'>{j.retialPrice ? j.retialPrice : "-"}</td>
                                    {/* <td className='ta-b'>{j.amount}</td> */}
                                </tr>
                            })
                        }
                    </>
                })
                }
            </table>
        </Card>
    )
}

export default PdfInfoDetailView;