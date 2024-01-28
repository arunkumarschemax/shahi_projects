
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './pdf-reader.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { LegalPoDetails } from '@project-management-system/shared-models'

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
                    <th className='ta-b'>STYLE</th>
                    <th className='ta-b'>STYLE NAME</th>
                    <th className='ta-b'>MSC</th>
                    <th className='ta-b'>SEASON</th>
                    <th className='ta-b'>FACTORY L.O</th>
                    <th className='ta-b'>STATUS</th>
                    <th className='ta-b'>EXP</th>
                </tr>
                <tr className='ta-b'>
                <td className='ta-b'>{pdfData?.style}</td>
                    <td className='ta-b'>{pdfData?.styleName}</td>
                    <td className='ta-b'>{pdfData?.msc}</td>
                    <td className='ta-b'>{pdfData?.season}</td>
                    <td className='ta-b'>{pdfData?.factoryLo}</td>
                    <td className='ta-b'>{pdfData?.status}</td>
                    <td className='ta-b'>{pdfData?.exp}</td>
                </tr>
                {pdfData?.BomPoItemDetails?.map((i) => {
                    return <>
                       <tr className='ta-b'>
                            <th></th>
                            <th className='ta-b'>#</th>
                            <th className='ta-b'>IS</th>
                            <th className='ta-b'>N</th>
                            <th className='ta-b'>VENDOR/DESCRIPTION</th>
                            <th className='ta-b'>USE</th>
                            <th className='ta-b'>QTY</th>
                            <th className='ta-b'>UOM</th> 
                            <th className='ta-b'>VENDOR BOOKING FLAG</th>
                            <th className='ta-b'>CURRENCY</th>
                            <th className='ta-b'>TOTAL QUANTITY</th> 

                         </tr> <tr className='ta-b'>
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
                            <td className='ta-b'>{i.totalQuantity}</td> 

                        </tr>
    {/* ------------------------------------------------------------------------ */}
                        {/* <tr className='ta-b'> */}
                            {/* <th></th>
                            <th></th> */}
                            {/* <th className='ta-b'>UOM</th> */}
                            {/* <th className='ta-b'>SIZE</th>
                            <th className='ta-b'>UPC</th>
                            <th className='ta-b'>UNIT PRICE</th>
                            <th className='ta-b'>QTY</th>
                            <th className='ta-b'>AMOUNT</th> */}
                            {/* <th className='ta-b'>COMPT MATERIAL</th> */}
                            {/* <th className='ta-b'>RATIO</th> */}


                            {/* <th className='ta-b'>SIZE</th>
                            <th className='ta-b'>UPC</th>
                            <th className='ta-b'>LABEL</th>
                            <th className='ta-b'>QTY</th>
                            <th className='ta-b'>UNIT PRICE</th>
                            <th className='ta-b'>Ex FACTORY</th>
                            <th className='ta-b'>Ex PORT</th>
                            <th className='ta-b'>DELIVERY DATE</th>
                            <th className='ta-b'>RETAIL PRICE</th> */}
                        {/* </tr> */}
                        {
                            i.BompoItemVariantDetails.map((j) => {
                                return <>
                       <tr className='ta-b'>
                            <th></th>
                            <th className='ta-b'>#</th>
                            <th className='ta-b'>IS</th>
                            <th className='ta-b'>N</th>
                            <th className='ta-b'>VENDOR/DESCRIPTION</th>
                            <th className='ta-b'>USE</th>
                            <th className='ta-b'>QTY</th>
                            <th className='ta-b'>UOM</th> 
                            <th className='ta-b'>COMBO 1</th>
                            <th className='ta-b'>COMBO 2</th>
                            <th className='ta-b'>COMBO 3</th> 
                            <th className='ta-b'>COMBO 4</th> 


                         </tr> <tr className='ta-b'>
                            <td></td>
                            <td className='ta-b'>{i.hasTag}</td>
                            <td className='ta-b'>{i.is}</td>
                            <td className='ta-b'>{i.n}</td>
                            <td className='ta-b'>{i.vendorDescription}</td>
                            <td className='ta-b'>{i.use}</td>
                            <td className='ta-b'>{i.qty}</td>
                            <td className='ta-b'>{i.uom}</td> 
                            <td className='ta-b'>{i.combo1}</td>
                            <td className='ta-b'>{i.combo2}</td>
                            <td className='ta-b'>{i.combo3}</td> 
                            <td className='ta-b'>{i.combo4}</td> 


                        </tr>
                        </>
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

