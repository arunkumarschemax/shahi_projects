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

    const setMoreData = () => {
        navigate('/ralph-lauren/pdf-upload')

    }

    return (
        <Card>
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
                    {/* <th className='ta-b'>COMPT MATERIAL</th> */}


                </tr>
                <tr className='ta-b'>
                    <td className='ta-b'>{pdfData?.poNumber}</td>
                    <td className='ta-b'>{pdfData?.poDate}</td>
                    <td className='ta-b'>{pdfData?.shipment}</td>
                    <td className='ta-b'>{pdfData?.season}</td>
                    <td className='ta-b'>{pdfData?.portOfExport}</td>
                    <td className='ta-b'>{pdfData?.portOfEntry}</td>
                    <td className='ta-b'>{pdfData?.Refrence}</td>
                    <td className='ta-b'>{pdfData?.paymentTermDescription}</td>
                    <td className='ta-b'>{pdfData?.specialInstructions}</td>
                    <td className='ta-b'>{pdfData?.division}</td>
                    <td className='ta-b'>{pdfData?.incoterm}</td>
                    <td className='ta-b'>{pdfData?.shipToAdd}</td>
                    <td className='ta-b'>{pdfData?.manufacture}</td>
                    {/* <td className='ta-b'>{pdfData?.comptMaterial}</td> */}
                    

                </tr>
                {pdfData?.CentricpoItemDetails?.map((i) => {
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

                        </tr>
                        <tr className='ta-b'>
                            <td></td>
                            <td className='ta-b'>{i.poLine}</td>
                            <td className='ta-b'>{i.material}</td>

                            <td className='ta-b'>{i.ppkupc}</td>

                            <td className='ta-b'>{i.color}</td>
                            <td className='ta-b'>{i.gender}</td>
                            <td className='ta-b'>{i.shortDescription}</td>
                            <td className='ta-b'>{i.packMethod}</td>
                            <td className='ta-b'>{i.vendorBookingFlag}</td>
                            <td className='ta-b'>{i.currency}</td>

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
                                    <td className='ta-b'>{j.comptMaterial}</td>
                                    <td className='ta-b'>{j.ratio}</td>


                                    <td className='ta-b'>{j.size}</td>
                                    <td className='ta-b'>{j.upc}</td>
                                    <td className='ta-b'>{j.label}</td>
                                    <td className='ta-b'>{j.quantity}</td>
                                    <td className='ta-b'>{j.unitPrice}</td>
                                    <td className='ta-b'>{j.exFactory}</td>
                                    <td className='ta-b'>{j.exPort}</td>
                                    <td className='ta-b'>{j.deliveryDate}</td>
                                    <td className='ta-b'>{j.retialPrice}</td>
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
