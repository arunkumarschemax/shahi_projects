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
            <div><Button style={{backgroundColor:'#29397d',color:'white'}}   onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div>
            <br />
            <table className='ta-b' style={{ width: '100%' }} >
                <tr className='ta-b'>
                    <th className='ta-b'>PO NUMBER</th>
                    <th className='ta-b'>PO DOC DATE</th>
                    <th className='ta-b'>SEASON YEAR</th>
                    <th className='ta-b'>DIVISION BY GROUP</th>
                    <th className='ta-b'>CURR</th>
                    <th className='ta-b'>INCOTERMS</th>
                    <th className='ta-b'>FACTORY LOCATION</th>
                </tr>
                <tr className='ta-b'>
                    <td className='ta-b'>{pdfData?.poNumber}</td>
                    <td className='ta-b'>{pdfData?.poDocDate}</td>
                    <td className='ta-b'>{pdfData?.seasonYear}</td>
                    <td className='ta-b'>{pdfData?.divisionBuyGroup}</td>
                    <td className='ta-b'>{pdfData?.currency}</td>
                    <td className='ta-b'>{pdfData?.incoterms}</td>
                    <td className='ta-b'>{pdfData?.factoryLocation}</td>
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
                        </tr>
                        <tr className='ta-b'>
                            <td></td>
                            <td className='ta-b'>{i.itemNo}</td>
                            <td className='ta-b'>{i.matrial}</td>
                            <td className='ta-b'>{i.description}</td>
                            <td className='ta-b'>{i.deliveryDate}</td>
                            <td className='ta-b'>{i.mode}</td>
                            <td className='ta-b'>{i.acceptanceDate}</td>
                        </tr>
                        <tr className='ta-b'>
                            <th></th>
                            <th></th>
                            <th className='ta-b'>UOM</th>
                            <th className='ta-b'>UNIT PRICE</th>
                            <th className='ta-b'>SIZE</th>
                            <th className='ta-b'>QTY</th>
                            <th className='ta-b'>AMOUNT</th>
                        </tr>
                        {
                            i.poItemVariantDetails.map((j) => {
                                return <tr>
                                    <td></td>
                                    <td></td>
                                    <td className='ta-b'>{j.uom}</td>
                                    <td className='ta-b'>{j.unitPrice}</td>
                                    <td className='ta-b'>{j.size}</td>
                                    <td className='ta-b'>{j.qunatity}</td>
                                    <td className='ta-b'>{j.amount}</td>
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
