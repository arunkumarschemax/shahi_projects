import { LegalPoDetails } from '@project-management-system/shared-models'
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './pdf-reader.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'



const LevisPdfInfoDetailView = (
   
    ) =>{

    const [pdfData, setPdfData] = useState<any>();
    const navigate = useNavigate();
     const location = useLocation()
    console.log(location?.state?.data,"ooooooooo")
    const parsedData = JSON.parse(location?.state?.data?.file_data)
    console.log(parsedData,"kkkkkkkkkkk")



    const setMoreData = () => {
        navigate('/levis/pdf-info')

    }

   
    return (
        <Card
        extra ={<Link to='/levis/pdf-info' ><Button className='panel_button' type="primary" >View </Button></Link>}
        >
            {/* <div><Button style={{ backgroundColor: '#29397d', color: 'white' }} onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div> */}
            
            <br />
             <div className="table-container">           
            <table className='ta-b' style={{ width: '100%' }} >
                <tr className='ta-b'>
                <th className='ta-b'>PO NUMBER</th>
                    <th className='ta-b'>TRANSMODE</th>
                    <th className='ta-b'>DELIVERY ADDRESS</th>
                    <th className='ta-b'>CURRENCY</th>
                </tr>

                <tr className='ta-b'>
                    <td className='ta-b'>{parsedData?.poNumber}</td>
                    <td className='ta-b'>{parsedData?.transMode}</td>
                    <td className='ta-b'>{parsedData?.deliveryAddress}</td>
                    <td className='ta-b'>{parsedData?.currency}</td>
                </tr>

                {parsedData?.LevispoItemDetails?.map((i) => {
                    return <>
                        <tr className='ta-b'>
                            <th></th>
                            <th className='ta-b'>PO LINE</th>
                            <th className='ta-b'>MATERIAL</th>
                            <th className='ta-b'>TOTAL UNIT PRICE</th>
                            <th className='ta-b'>ORIGINAL DATE</th>
                        </tr>
                        <tr className='ta-b'>
                            <td></td>
                            <td className='ta-b'>{i.poLine}</td>
                            <td className='ta-b'>{i.material}</td>
                            <td className='ta-b'>{i.totalUnitPrice}</td>
                            <td className='ta-b'>{i.originalDate}</td>
                        </tr>
                        <tr className='ta-b'>
                            <th></th>
                            <th></th>

                            <th className='ta-b'>PRODUCT</th>
                            <th className='ta-b'>SIZE</th>
                            <th className='ta-b'>UPC</th>
                            <th className='ta-b'>PLANNED EX FACTORY DATE</th>
                            <th className='ta-b'>EX FACTORY DATE</th>
                            <th className='ta-b'>QUANTITY</th>
                            <th className='ta-b'>UNIT PRICE</th>
         
                        </tr>
                        {
                            i.LevispoItemVariantDetails.map((j) => {
                                return <tr>
                                    <td></td>
                                    <td></td>
                                    <td className='ta-b'>{j.product}</td>
                                    <td className='ta-b'>{j.size}</td>
                                    <td className='ta-b'>{j.upc}</td>
                                    <td className='ta-b'>{j.plannedExFactoryDate}</td>
                                    <td className='ta-b'>{j.exFactoryDate}</td>
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

export default LevisPdfInfoDetailView;