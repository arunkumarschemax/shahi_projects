import { LegalPoDetails } from '@project-management-system/shared-models'
import { Button, Card, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import './sanmar-pdf-reader.css'
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
                        <th className='ta-b'>BUYER PO</th>
                        <th className='ta-b'>PO DATE</th>
                        <th className='ta-b'>BUYER ADDRESS</th>
                        <th className='ta-b'>SHIP TO ADDRESS</th>
                    </tr>

                    <tr className='ta-b'>
                        <td className='ta-b'>{pdfData?.buyerPo}</td>
                        <td className='ta-b'>{pdfData?.poDate}</td>
                        <td className='ta-b'>
                            <Tooltip title={pdfData?.buyerAddress} placement="topLeft">
                                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {pdfData?.buyerAddress}
                                </div>
                            </Tooltip>
                        </td>
                        <Tooltip title={pdfData?.shipToAdd} placement="topLeft">
                            <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {pdfData?.shipToAdd}
                            </div>
                        </Tooltip>
                        {/* <td className='ta-b'>{pdfData?.buyerAddress}</td> */}
                        {/* <td className='ta-b'>{pdfData?.shipToAdd}</td> */}
                        <td className='ta-b'>
                            <Tooltip title={pdfData?.shipToAdd} placement="topLeft">
                                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {pdfData?.shipToAdd}
                                </div>
                            </Tooltip>
                        </td>
                    </tr>

                    {pdfData?.SanmarpoItemDetails?.map((i) => {
                        return <>
                            <tr className='ta-b'>
                                <th></th>
                                <th className='ta-b'>PO STYLE</th>
                                <th className='ta-b'>DELIVERY DATE</th>

                            </tr>
                            <tr className='ta-b'>
                                <td></td>
                                <td className='ta-b'>{i.poStyle}</td>
                                <td className='ta-b'>{i.deliveryDate}</td>

                            </tr>
                            <tr className='ta-b'>
                                <th></th>
                                <th></th>

                                <th className='ta-b'>SIZE</th>
                                <th className='ta-b'>COLOR</th>
                                <th className='ta-b'>QTY</th>
                                <th className='ta-b'>UNIT PRICE</th>
                            </tr>
                            {
                                i.SanmarpoItemVariantDetails.map((j) => {
                                    return <tr>
                                        <td></td>
                                        <td></td>
                                        <td className='ta-b'>{j.size}</td>
                                        <td className='ta-b'>{j.color}</td>
                                        <td className='ta-b'>{j.quantity}</td>
                                        <td className='ta-b'>{j.unitPrice}</td>
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
