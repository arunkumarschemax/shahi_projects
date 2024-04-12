import { LegalPoDetails } from '@project-management-system/shared-models'
import { Button, Card, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import './sanmar-pdf-reader.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'



export default function SanmarPdfTable() {
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
        extra ={<Link to='/sanmar/pdf-info' ><Button className='panel_button' type="primary" >View </Button></Link>}
        >
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
                        <td className='ta-b'>{parsedData?.buyerPo}</td>
                        <td className='ta-b'>{parsedData?.poDate}</td>
                        <td className='ta-b'>
            
                                <div style={{height:120,width:150}}>
                                    {parsedData?.buyerAddress}
                                </div>
                           
                        </td>
                        {/* <Tooltip title={parsedData?.shipToAdd} placement="topLeft"> */}
                            <div 
                            // style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            style={{height:80,width:150}}
                            >
                                {parsedData?.shipToAdd}
                            </div>
                        {/* </Tooltip> */}
                    </tr>

                    {parsedData?.SanmarpoItemDetails?.map((i) => {
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
                                <th className='ta-b'>LINE</th>
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
                                        <td className='ta-b'>{j.line}</td>
                                        <td className='ta-b'>{j.size}</td>
                                        <td className='ta-b'>{j.color}</td>
                                        <td className='ta-b'>{j.quantity} {j.unit}</td>
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
