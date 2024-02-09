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
                                {/* combo1 */}
                                <th className='ta-b'>
                                    {parsedData.style === "CJ4456" ? "@010" :
                                     parsedData.style === "DZ5366" ? "@010" :
                                     parsedData.style === "FN3894" ? "*@010" :
                                     parsedData.style === "FZ8078" ? "*010" :
                                     parsedData.style === "DC5094" ? "@010" :
                                     parsedData.style === "DQ5174" ? "@010  " :
                                     parsedData.style === "DH0857" ? "@010  " :
                                     parsedData.style === "DJ4167" ? "@010 " :
                                     parsedData.style === "DH0858" ? "@010 " :
                                     parsedData.style === "FD1322" ? "@010 " :

                                     null}
                                 </th>

                                 {/* combo2 */}
                                 <th className='ta-b'>
                                    {parsedData.style === "CJ4456" ? "@063" :
                                     parsedData.style === "DZ5366" ? "@077" :
                                     parsedData.style === "FN3894" ? "@063" :
                                     parsedData.style === "FZ8078" ? "*121" :
                                     parsedData.style === "DC5094" ? "@063 " :
                                     parsedData.style === "DQ5174" ? "051" :
                                     parsedData.style === "DH0857" ? "@100" :
                                     parsedData.style === "DJ4167" ? "@100 " :
                                     parsedData.style === "DH0858" ? "@100 " :
                                     parsedData.style === "FD1322" ? "@100 " :

                                     null}
                                 </th>

                                 {/* combo3 */}
                                 <th className='ta-b'>
                                    {parsedData.style === "CJ4456" ? "@072" :
                                     parsedData.style === "DZ5366" ? "@113" :
                                     parsedData.style === "FN3894" ? "@100" :
                                     parsedData.style === "FZ8078" ? "-" :
                                     parsedData.style === "DC5094" ? "@100" :
                                     parsedData.style === "DQ5174" ? "@063" :
                                     parsedData.style === "DH0857" ? "*370" :
                                     parsedData.style === "DJ4167" ? "*370 " :
                                     parsedData.style === "DH0858" ? "370" :
                                     parsedData.style === "FD1322" ? "@599 " :

                                     null}
                                 </th>

                                 {/* combo4 */}
                                 <th className='ta-b'>
                                    {parsedData.style === "CJ4456" ? "@100" :
                                     parsedData.style === "DZ5366" ? "@410" :
                                     parsedData.style === "FN3894" ? "*224" :
                                     parsedData.style === "FZ8078" ? "-" :
                                     parsedData.style === "DC5094" ? "@345" :
                                     parsedData.style === "DQ5174" ? "451" :
                                     parsedData.style === "DH0857" ? "@451" :
                                     parsedData.style === "DJ4167" ? "@451 " :
                                     parsedData.style === "DH0858" ? "@451 " :
                                     parsedData.style === "FD1322" ? "-" :

                                     null}
                                 </th>
                                
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