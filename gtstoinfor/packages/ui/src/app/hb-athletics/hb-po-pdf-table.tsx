import { LegalPoDetails } from '@project-management-system/shared-models'
import { Button, Card, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import './hb-pdf-reader.css'
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
                        <th className='ta-b'>CUST PO</th>
                        <th className='ta-b'>EXIT FACTORY DATE</th>
                        <th className='ta-b'>SHIP TO ADDRESS</th>
                        <th className='ta-b'>CURRENCY</th>
                    </tr>

                    <tr className='ta-b'>
                        <td className='ta-b'>{pdfData?.custPo}</td>
                        <td className='ta-b'>{pdfData?.exitFactoryDate}</td>
                        <td className='ta-b'>{pdfData?.shipToAdd}</td>
                        <td className='ta-b'>{pdfData?.currency}</td>
                        {/* <td className='ta-b'>
                            <Tooltip title={pdfData?.shipToAdd} placement="topLeft">
                                <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {pdfData?.shipToAdd}
                                </div>
                            </Tooltip>
                        </td> */}
                    </tr>

                    {pdfData?.HbpoItemDetails?.map((i) => {
                        return <>
                            <tr className='ta-b'>
                                <th></th>
                                <th className='ta-b'>STYLE</th>
                                <th className='ta-b'>COLOR</th>

                            </tr>
                            <tr className='ta-b'>
                                <td></td>
                                <td className='ta-b'>{i.style}</td>
                                <td className='ta-b'>{i.color}</td>

                            </tr>
                            <tr className='ta-b'>
                                <th></th>
                                <th></th>

                                <th className='ta-b'>SIZE</th>
                                <th className='ta-b'>QTY</th>
                                <th className='ta-b'>UNIT PRICE</th>
                            </tr>
                            {
                                i.HbpoItemVariantDetails.map((j) => {
                                    return <tr>
                                        <td></td>
                                        <td></td>
                                        <td className='ta-b'>{j.size}</td>
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
