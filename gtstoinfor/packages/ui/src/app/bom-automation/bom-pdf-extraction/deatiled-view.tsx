import { LegalPoDetails, StyleIdReq, StyleNumberReq } from '@project-management-system/shared-models'
import { Button, Card, Descriptions, Modal, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import './pdf-reader.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BomService } from '@project-management-system/shared-services'



const BomPdfInfoDetailView = () => {

    // const [pdfData, setPdfData] = useState<any>();
    // const navigate = useNavigate();
    //  const location = useLocation()
    // // console.log(location?.state?.data?.fileData,"ooooooooo")
    // const parsedData = JSON.parse(location?.state?.data?.file_data || '{}');
    // console.log(parsedData,"kkkkkkkkkkk")

    const service = new BomService();
    const [pdfData, setPdfData] = useState<any>();
    const [styleCombos, setStyleCombos] = useState<any>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const navigate = useNavigate();

    let { styleId } = useParams();

    const setMoreData = () => {
        navigate('/bom/bom-view')

    }

    useEffect(() => {
        getPdfFileInfo()
    }, [])

    const getPdfFileInfo = () => {
        const styleReq = new StyleIdReq(Number(styleId))
        service.getBomDataForStyle(styleReq).then(res => {
            if (res.status) {
                setPdfData(res.data)
            } else {
                message.info("No data found", 3)
            }
        })
    }

    function styleComboOnClick(styleComos: any) {
        setStyleCombos(styleComos)
        setShowModal(true)
    }

    const columns = [
        {
            title: 'Sno',
            render: (v, r, i) => i + 1
        },
        {
            title: 'Item name',
            dataIndex: 'itemName'
        },
        {
            title: 'IM Code',
            dataIndex: 'imCode'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        // {
        //     title: 'Use'
        // },
        {
            title: 'Action',
            render: (v, rec) => {
                return <Button type='primary' onClick={() => styleComboOnClick(rec.styleCombo)}>Style Combo</Button>
            }
        }
    ]

    const styleComboColumns = [
        {
            title: 'Combination',
            dataIndex: 'combination'
        },
        {
            title: 'Primary Color',
            dataIndex: 'primaryColor'
        },
        {
            title: 'Color Substitute',
            dataIndex: 'color'
        }
    ]

    return (
        <Card >
            <div><Button type='primary' onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div>
            {/* <Card>
                <Descriptions>

                </Descriptions>
            </Card> */}
            <Table bordered columns={columns} dataSource={pdfData} pagination={false} />
            <br />
            {/* <div className="table-container">
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
                        <td className='ta-b'>{parsedData?.style ? parsedData?.style : "-"}</td>
                        <td className='ta-b'>{parsedData?.styleName ? parsedData?.styleName : "-"}</td>
                        <td className='ta-b'>{parsedData?.msc ? parsedData?.msc : "-"}</td>
                        <td className='ta-b'>{parsedData?.season ? parsedData?.season : "-"}</td>
                        <td className='ta-b'>{parsedData?.factoryLo ? parsedData?.factoryLo : "-"}</td>
                        <td className='ta-b'>{parsedData?.status ? parsedData?.status : "-"}</td>
                        <td className='ta-b'>{parsedData?.exp ? parsedData?.exp : "-"}</td>


                    </tr>
                    {parsedData?.BomPoItemDetails?.map((i) => {
                        return <>
                          
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
                                <th className='ta-b'>{parsedData.style === "CJ4456" || parsedData.style === "FN3894" ? "@010" : "@010"}</th>
                                <th className='ta-b'>{parsedData.style === "CJ4456" || parsedData.style === "FN3894" ? "@063" : "@077"}</th>
                                <th className='ta-b'>{parsedData.style === "CJ4456" || parsedData.style === "FN3894" ? "@072" : "113"}</th>
                                <th className='ta-b'>{parsedData.style === "CJ4456" || parsedData.style === "FN3894" ? "@100" : "@410"}</th>

                            </tr>
                            {
                                i.BompoItemVariantDetails.map((j) => {
                                    return <tr>
                                        <td></td>
                                        <td></td>

                                        <td className='ta-b'><strong> {j.hasTag ? j.hasTag : "-"}</strong></td>
                                        <td className='ta-b'>{j.is ? j.is : "-"}</td>
                                        <td className='ta-b'>{j.n ? j.n : "-"}</td>
                                        <td className='ta-b'>{j.vendorDescription ? j.vendorDescription : "-"}</td>
                                        <td className='ta-b'>{j.use ? j.use : "-"}</td>
                                        <td className='ta-b'>{j.qty ? j.qty : "-"}</td>
                                        <td className='ta-b'>{j.uom ? j.uom : "-"}</td>
                                        <td className='ta-b'>{j.combo1 ? j.combo1 : "-"}</td>
                                        <td className='ta-b'>{j.combo2 ? j.combo2 : "-"}</td>
                                        <td className='ta-b'>{j.combo3 ? j.combo3 : "-"}</td>
                                        <td className='ta-b'>{j.combo4 ? j.combo4 : "-"}</td>
                                    </tr>
                                })
                            }
                        </>
                    })
                    }
                </table>
            </div> */}
            <Modal open={showModal} closable footer={false} onCancel={() => setShowModal(false)} >
                <Table columns={styleComboColumns} dataSource={styleCombos} pagination={false} />
            </Modal>
        </Card>
    )
}

export default BomPdfInfoDetailView;