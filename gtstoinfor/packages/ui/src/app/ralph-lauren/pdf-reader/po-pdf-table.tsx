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
        navigate('/nike/pdf-file-info-grid')

    }

    return (
        <Card>
            <div><Button style={{ backgroundColor: '#29397d', color: 'white' }} onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div>
            <br />
            <table className='ta-b' style={{ width: '100%' }} >
                <tr className='ta-b'>
                    <th className='ta-b'>PO NUMBER</th>
                    <th className='ta-b'>PO DOC DATE</th>
                    {/* <th className='ta-b'>SEASON YEAR</th>
                    <th className='ta-b'>DIVISION BY GROUP</th>
                    <th className='ta-b'>CURR</th>
                    <th className='ta-b'>INCOTERMS</th> */}
                    <th className='ta-b'>FACTORY LOCATION</th>
                </tr>
                <tr className='ta-b'>
                    <td className='ta-b'>{pdfData?.poNumber}</td>
                    <td className='ta-b'>{pdfData?.poPrint}</td>
                    {/* <td className='ta-b'>{pdfData?.seasonYear}</td>
                    <td className='ta-b'>{pdfData?.divisionBuyGroup}</td>
                    <td className='ta-b'>{pdfData?.paymentCategory}</td>
                    <td className='ta-b'>{pdfData?.incoterms}</td> */}
                    <td className='ta-b'>{pdfData?.shipToAddress}</td>
                </tr>
                {pdfData?.poItemDetails?.map((i) => {
                    return <>
                        <tr className='ta-b'>
                            <th></th>
                            <th className='ta-b'>ITEM#</th>
                            <th className='ta-b'>MATERIAL</th>
                            <th className='ta-b'>DESCRIPTION</th>
                            <th className='ta-b'>DELIVERY DATE</th>
                            <th className='ta-b'>MODE</th>
                            <th className='ta-b'>ACCEPTANCE DATE</th>
                            <th className='ta-b'>SEASON YEAR</th>
                            <th className='ta-b'>INCOTERMS</th>

                        </tr>
                        <tr className='ta-b'>
                            <td></td>
                            <td className='ta-b'>{i.poItem}</td>
                            <td className='ta-b'>{i.materialNo}</td>
                            <td className='ta-b'>{i.class}</td>
                            <td className='ta-b'>{i.contractualDeliveryDate}</td>
                            <td className='ta-b'>{i.shipMode}</td>
                            <td className='ta-b'>{i.handoverDate}</td>
                            <td className='ta-b'>{i.season}</td>
                            <td className='ta-b'>{i.incoterms}</td>
                        </tr>
                        <tr className='ta-b'>
                            <th></th>
                            <th></th>
                            {/* <th className='ta-b'>UOM</th> */}
                            <th className='ta-b'>UNIT PRICE</th>
                            <th className='ta-b'>SIZE</th>
                            <th className='ta-b'>QTY</th>
                            <th className='ta-b'>AMOUNT</th>
                            <th className='ta-b'>CURRENCY</th>
                        </tr>
                        {
                            i.poItemVariantDetails.map((j) => {
                                return <tr>
                                    <td></td>
                                    <td></td>
                                    {/* <td className='ta-b'>{j.currency}</td> */}
                                    <td className='ta-b'>{j.unitPrice}</td>
                                    <td className='ta-b'>{j.size}</td>
                                    <td className='ta-b'>{j.quantity}</td>
                                    <td className='ta-b'>{j.amount}</td>
                                    <td className='ta-b'>{j.currency}</td>
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
