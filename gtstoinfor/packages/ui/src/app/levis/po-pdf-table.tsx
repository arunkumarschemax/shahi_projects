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
                    {/* <th className='ta-b'>TRANSMODE</th> */}
                    <th className='ta-b'>DELIVERY ADDRESS</th>
                    <th className='ta-b'>CURRENCY</th>


                </tr>
                <tr className='ta-b'>
                    <td className='ta-b'>{pdfData?.poNumber}</td>
                    {/* <td className='ta-b'>{pdfData?.transMode}</td> */}
                    {/* <td className='ta-b' style={{ textAlign: 'center' }}>{pdfData?.transMode}</td> */}
                    <td className='ta-b'>{pdfData?.deliveryAddress}</td>
                    <td className='ta-b'>{pdfData?.currency}</td>
                </tr>
                {pdfData?.LevispoItemDetails?.map((i) => {
                    return <>
                        <tr className='ta-b'>
                            <th></th>
                            <th className='ta-b'>PO LINE</th>
                            <th className='ta-b'>MATERIAL</th>
                            {/* <th className='ta-b'>TOTAL UNIT PRICE</th> */}
                            {/* <th className='ta-b'>ORIGINAL DATE</th> */}
                            <th className='ta-b'>TRANS MODE</th>
                            <th className='ta-b'>EX FACTORY DATE</th>

                        </tr>
                        <tr className='ta-b'>
                            <td></td>
                            <td className='ta-b'>{i.poLine}</td>
                            <td className='ta-b'>{i.material}</td>
                            {/* <td className='ta-b'>{i.totalUnitPrice}</td> */}
                            {/* <td className='ta-b'>{i.originalDate}</td> */}
                            <td className='ta-b'>{i.transMode}</td>
                            <td className='ta-b'>{i.exFactoryDate}</td>

                        </tr>
                        <tr className='ta-b'>
                            <th></th>
                            <th></th>

                            <th className='ta-b'>ITEM NO</th>
                            {/* <th className='ta-b'>PRODUCT</th> */}
                            <th className='ta-b'>SIZE</th>
                            {/* <th className='ta-b'>UPC</th> */}
                            {/* <th className='ta-b'>PLANNED EX FACTORY DATE</th> */}
                            {/* <th className='ta-b'>EX FACTORY DATE</th> */}
                            <th className='ta-b'>QUANTITY</th>
                            <th className='ta-b'>UNIT PRICE</th>
         
                        </tr>
                        {
                            i.LevispoItemVariantDetails.map((j) => {
                                return <tr>
                                    <td></td>
                                    <td></td>

                                    <td className='ta-b'>{j.itemNo}</td>
                                    {/* <td className='ta-b'>{j.product}</td> */}
                                    <td className='ta-b'>{j.size}</td>
                                    {/* <td className='ta-b'>{j.upc}</td> */}
                                    {/* <td className='ta-b'>{j.plannedExFactoryDate}</td> */}
                                    {/* <td className='ta-b'>{j.exFactoryDate}</td> */}
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
