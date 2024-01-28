    import { LegalPoDetails } from '@project-management-system/shared-models'
    import { Button, Card, Table } from 'antd'
    import React, { useEffect, useState } from 'react'
    import './pdf-reader.css'
    import { useLocation, useNavigate } from 'react-router-dom'
    import { ArrowLeftOutlined } from '@ant-design/icons'



    const BomPdfInfoDetailView = (
    
        ) =>{

        // const [pdfData, setPdfData] = useState<any>();
        // const navigate = useNavigate();
        //  const location = useLocation()
        // // console.log(location?.state?.data?.fileData,"ooooooooo")
        // const parsedData = JSON.parse(location?.state?.data?.file_data || '{}');
        // console.log(parsedData,"kkkkkkkkkkk")

        const [pdfData, setPdfData] = useState<any>();
        const navigate = useNavigate();
        const location = useLocation()
        console.log(location?.state?.data,"ooooooooo")
        const parsedData = JSON.parse(location?.state?.data?.fileData)
        console.log(parsedData,"kkkkkkkkkkk")


        const setMoreData = () => {
            navigate('/bom/bom-view')

        }

        return (
            <Card >
                
                <div><Button style={{ backgroundColor: '#29397d', color: 'white' }} onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div>
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
                        <td className='ta-b'>{parsedData?.style ? parsedData?.style :"-" }</td>
                        <td className='ta-b'>{parsedData?.styleName ? parsedData?.styleName :"-"}</td>
                        <td className='ta-b'>{parsedData?.msc ?  parsedData?.msc :"-"}</td>
                        <td className='ta-b'>{parsedData?.season ? parsedData?.season :"-" }</td>
                        <td className='ta-b'>{parsedData?.factoryLo ? parsedData?.factoryLo :"-" }</td>
                        <td className='ta-b'>{parsedData?.status ? parsedData?.status :"-" }</td>
                        <td className='ta-b'>{parsedData?.exp ? parsedData?.exp :"-"}</td>
                        

                    </tr>
                    {parsedData?.BomPoItemDetails?.map((i) => {
                        return <>
                            {/* <tr className='ta-b'>
                                <th></th>
                                <th className='ta-b'>#</th>
                                <th className='ta-b'>IS</th>
                                <th className='ta-b'>N</th>
                                <th className='ta-b'>VENDOR/DESCRPTION</th>
                                <th className='ta-b'>USE</th>
                                <th className='ta-b'>QTY</th>
                                <th className='ta-b'>UOM</th>
                                <th className='ta-b'>COMBO1</th>
                                <th className='ta-b'>COMBO2</th>
                                <th className='ta-b'>COMBO3</th>
                                <th className='ta-b'>COMBO4</th>

                            </tr>
                            <tr className='ta-b'>
                                <td></td>
                                <td className='ta-b'>{i.poLine ? i.poLine:"-"   }</td>
                                <td className='ta-b'>{i.material ? i.material:"-"} </td>
                                <td className='ta-b'>{i.ppkupc ? i.ppkupc :"-"}</td>
                                <td className='ta-b'>{i.color ?i.color :"-"}</td>
                                <td className='ta-b'>{i.gender?i.gender :"-"}</td>
                                <td className='ta-b'>{i.shortDescription ? i.shortDescription  :"-"}</td>
                                <td className='ta-b'>{i.packMethod ? i.packMethod :"-"}</td>
                                <td className='ta-b'>{i.vendorBookingFlag ? i.vendorBookingFlag :"-"}</td>
                                <td className='ta-b'>{i.currency ? i.currency :"-"}</td>
                                <td className='ta-b'>{i.totalQuantity ? i.totalQuantity :"-"}</td>
                                <td className='ta-b'>{i.totalQuantity ? i.totalQuantity :"-"}</td>
                                <td className='ta-b'>{i.totalQuantity ? i.totalQuantity :"-"}</td> */}

                            {/* </tr> */}
                            <tr className='ta-b'>
                                <th></th>
                                <th></th>
                                <th className='ta-b'>#</th>
                                <th className='ta-b'>IS</th>
                                <th className='ta-b'>N</th>
                                <th className='ta-b'>VENDOR/DESCRPTION</th>
                                <th className='ta-b'>USE</th>
                                <th className='ta-b'>QTY</th>
                                <th className='ta-b'>UOM</th>
                                <th className='ta-b'>{parsedData.style === "BV2662" || parsedData.style === "BV2671" ? "@010" : "@010"}</th>
                                <th className='ta-b'>{parsedData.style === "BV2662" || parsedData.style === "BV2671" ? "@063" : "@077"}</th>
                                <th className='ta-b'>{parsedData.style === "BV2662" || parsedData.style === "BV2671" ? "@071" : "113"}</th>
                                <th className='ta-b'>{parsedData.style === "BV2662" || parsedData.style === "BV2671" ? "@100" : "@410"}</th>

                            </tr>
                            {
                                i.BompoItemVariantDetails.map((j) => {
                                    return <tr>
                                        <td></td>
                                        <td></td>

                                        {/* <td className='ta-b'>{j.uom}</td> */}
                                        <td className='ta-b'><strong> {j.hasTag ? j.hasTag:"-"}</strong></td>
                                        <td className='ta-b'>{j.is ? j.is: "-"}</td>
                                        <td className='ta-b'>{j.n ? j.n: "-"}</td>
                                        <td className='ta-b'>{j.vendorDescription ? j.vendorDescription : "-"}</td>
                                        <td className='ta-b'>{j.use ? j.use:"-"}</td>
                                        <td className='ta-b'>{j.qty ? j.qty:"-"}</td>
                                        <td className='ta-b'>{j.uom ? j.uom:"-"}</td>
                                        <td className='ta-b'>{j.combo1 ? j.combo1:"-"}</td>
                                        <td className='ta-b'>{j.combo2 ? j.combo2 : "-"}</td>
                                        <td className='ta-b'>{j.combo3 ? j.combo3:"-"}</td>
                                        <td className='ta-b'>{j.combo4 ? j.combo4 : "-"}</td>
                                        {/* <td className='ta-b'>{j.amount}</td> */}
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

    export default BomPdfInfoDetailView;