import { LegalPoDetails } from '@project-management-system/shared-models'
import { Button, Card, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import './pdf-reader.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'



export default function EddiePdfTable() {
    const { state } = useLocation();
    const [pdfData, setPdfData] = useState<any>();
    const navigate = useNavigate();

    const location = useLocation()
    console.log(location?.state?.data,"ooooooooo")
    const parsedData = JSON.parse(location?.state?.data?.file_data)
    console.log(parsedData,"kkkkkkkkkkk")



 
    // useEffect(() => {
    //     if (state?.data) {
    //         const parsedData = JSON.parse(state.data)
    //         // console.log(parsedData)
    //         setPdfData(parsedData)
    //         // setUpdateKey(prevState => prevState+1)
    //     }
    // }, [state?.data])

  

    return (
        <Card
        extra ={<Link to='/eddiebauer/pdf-info' ><Button className='panel_button' type="primary" >View </Button></Link>}
        >
            {/* <div><Button style={{ backgroundColor: '#29397d', color: 'white' }} onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div> */}
            <br />
            <div className="table-container">
                <table className='ta-b' style={{ width: '100%' }} >
                    <tr className='ta-b'>
                        <th className='ta-b'>PO NUMBER</th> 
                        <th className='ta-b'>PO DATE</th>
                        <th className='ta-b'>INCOTERM</th>
                        <th className='ta-b'>SHIPMENT MODE</th>
                        <th className='ta-b'>PAYMENT TERMS</th>
                        <th className='ta-b'>SHIP TO ADDRESS</th>
                        <th className='ta-b'>MANUFACTURE</th>
                        <th className='ta-b'>CONSIGNEE</th>
                    </tr>
                    
                    <tr className='ta-b'>
                        <td className='ta-b'>{parsedData?.poNumber}</td>
                        <td className='ta-b'>{parsedData?.poDate}</td>
                        <td className='ta-b'>{parsedData?.incoterm}</td>
                        <td className='ta-b'>{parsedData?.shipmentMode}</td>
                        <td className='ta-b'>{parsedData?.paymentTerms}</td>
                        <td className='ta-b'>{parsedData?.shipToAdd}</td>
                        <td className='ta-b'>{parsedData?.manufacture}</td>
                        <td className='ta-b'>{parsedData?.buyerAddress}</td>

                    </tr>
                    {parsedData?.EddiepoItemDetails?.map((i) => {
                        return <>
                            <tr className='ta-b'>
                                <th></th>
                                <th className='ta-b'>PO LINE</th>
                                <th className='ta-b'>BUYER ITEM</th>
                                <th className='ta-b'>SHORT DESCRIPTION</th>
                                <th className='ta-b'>CURRENCY</th>

                            </tr>
                            <tr className='ta-b'>
                                <td></td>
                                <td className='ta-b'>{i.poLine}</td>
                                <td className='ta-b'>{i.buyerItem}</td>
                                <td className='ta-b'>{i.shortDescription}</td>
                                <td className='ta-b'>{i.currency}</td>

                            </tr>
                            <tr className='ta-b'>
                                <th></th>
                                <th></th>
                                <th className='ta-b'>SIZE CODE</th>
                                <th className='ta-b'>SIZE</th>
                                <th className='ta-b'>UPC</th>
                                <th className='ta-b'>SKU</th>
                                <th className='ta-b'>QUANTITY PER INNER PACK</th>
                                <th className='ta-b'>RETAIL PRICE</th>
                                <th className='ta-b'>QUANTITY</th>
                                {/* <th className='ta-b'>UNIT</th> */}
                                <th className='ta-b'>UNIT COST</th>
                                <th className='ta-b'>COST</th>
                            </tr>
                            {
                                i.EddiepoItemVariantDetails.map((j) => {
                                    return <tr>
                                        <td></td>
                                        <td></td>
                                        
                                        <td className='ta-b'>{j.sizeCode}</td>
                                        <td className='ta-b'>{j.size}</td>
                                        <td className='ta-b'>{j.upc}</td>
                                        <td className='ta-b'>{j.sku}</td>
                                        <td className='ta-b'>{j.quantityPerInnerPack}</td>
                                        <td className='ta-b'>{j.retailPrice}</td>
                                        <td className='ta-b'>{j.quantity}</td>
                                        {/* <td className='ta-b'>{j.unit}</td> */}
                                        <td className='ta-b'>{j.unitCost}</td>
                                        <td className='ta-b'>{j.cost}</td>
                                    </tr>
                                })
                            }
                        </>
                    })
                    }
                </table>
            </div>

        </Card>
    )
}
