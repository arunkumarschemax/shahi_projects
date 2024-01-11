import { LegalPoDetails } from '@project-management-system/shared-models'
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './pdf-reader.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'



const HbPdfInfoDetailView = (
   
    ) =>{

    const [pdfData, setPdfData] = useState<any>();
    const navigate = useNavigate();
     const location = useLocation()
    // console.log(location?.state?.data?.fileData,"ooooooooo")
    const parsedData = JSON.parse(location?.state?.data?.fileData)
    console.log(parsedData,"kkkkkkkkkkk")



    const setMoreData = () => {
        navigate('/hb-athletics/pdf-info')

    }

   
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
                </tr>

                <tr className='ta-b'>
                    <td className='ta-b'>{parsedData?.custPo}</td>
                    <td className='ta-b'>{parsedData?.exitFactoryDate}</td>
                    <td className='ta-b'>{parsedData?.shipToAdd}</td>
                </tr>

                {parsedData?.HbpoItemDetails?.map((i) => {
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

export default HbPdfInfoDetailView;