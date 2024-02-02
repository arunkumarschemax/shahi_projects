import { LegalPoDetails } from '@project-management-system/shared-models'
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './pdf-reader.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

export interface IPoPdfTableProps {
    data: LegalPoDetails
}

export default function PoPdfTable(props: IPoPdfTableProps) {
    const { state } = useLocation();
    const [pdfData, setPdfData] = useState<any>();
    const navigate = useNavigate();


    useEffect(() => {
        if (props.data) {
            setPdfData(props.data)
        }
    }, [props.data])

    useEffect(() => {
        if (state?.data) {
            const parsedData = JSON.parse(state.data)
            // console.log(parsedData)
            setPdfData(parsedData)
            // setUpdateKey(prevState => prevState+1)
        }
    }, [state?.data])

    // const setMoreData = () => {
    //     navigate('/ralph-lauren/pdf-upload')

    // }

    return (
        <Card>
            {/* <div><Button style={{ backgroundColor: '#29397d', color: 'white' }} onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div> */}
            <br />
            <div className="table-container">
                <table className='ta-b' style={{ width: '100%' }} >
                    <tr className='ta-b'>
                        <th className='ta-b'>PO NUMBER</th> 
                        <th className='ta-b'>PO DATE</th>
                        <th className='ta-b'>DELIVERY DATE</th>
                        <th className='ta-b'>EX FACTORY DATE</th>
                        {/* <th className='ta-b'>INCOTERM</th>
                        <th className='ta-b'>SHIPMENT MODE</th>
                        <th className='ta-b'>PAYMENT TERMS</th>
                        <th className='ta-b'>SHIP TO ADDRESS</th>
                        <th className='ta-b'>MANUFACTURE</th> */}
                        <th className='ta-b'>BUYER ADDRESS</th>
                        <th className='ta-b'>DELIVERY ADDRESS</th>
                    </tr>
                    
                    <tr className='ta-b'>
                        <td className='ta-b'>{pdfData?.poNumber}</td>
                        <td className='ta-b'>{pdfData?.poDate}</td>
                        <td className='ta-b'>{pdfData?.deliveryDate}</td>
                        <td className='ta-b'>{pdfData?.exFactoryDate}</td>
                        {/* <td className='ta-b'>{pdfData?.incoterm}</td>
                        <td className='ta-b'>{pdfData?.shipmentMode}</td>
                        <td className='ta-b'>{pdfData?.paymentTerms}</td>
                        <td className='ta-b'>{pdfData?.shipToAdd}</td>
                        <td className='ta-b'>{pdfData?.manufacture}</td> */}
                        <td className='ta-b'>{pdfData?.buyerAddress}</td>
                        <td className='ta-b'>{pdfData?.deliveryAddress}</td>

                    </tr>
                    {pdfData?.EddiepoItemDetails?.map((i) => {
                        return <>
                            <tr className='ta-b'>
                                <th></th>
                                <th className='ta-b'>PO LINE</th>
                                <th className='ta-b'>BUYER ITEM</th>
                                {/* <th className='ta-b'>SHORT DESCRIPTION</th> */}
                                <th className='ta-b'>COLOR</th>
                                <th className='ta-b'>CURRENCY</th>

                            </tr>
                            <tr className='ta-b'>
                                <td></td>
                                <td className='ta-b'>{i.poLine}</td>
                                <td className='ta-b'>{i.buyerItem}</td>
                                {/* <td className='ta-b'>{i.shortDescription}</td> */}
                                <td className='ta-b'>{i.color}</td>
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