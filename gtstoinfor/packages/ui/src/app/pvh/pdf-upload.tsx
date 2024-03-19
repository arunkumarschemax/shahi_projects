import React, { useState } from 'react';
import { Table, Upload, Button, Col, Row, UploadFile, Form, message, Card } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import xmljs from 'xml-js';
import Dragger from 'antd/es/upload/Dragger';
import { DiaPDFModel, PvhPoDetails, PvhPoItemDetails, PvhPoItemVariant } from '@project-management-system/shared-models';
import { LevisService, PvhService } from '@project-management-system/shared-services';
import { CURRENCY } from '../eddiebauer/popdf-regex-expressions';
import Item from 'antd/es/list/Item';

interface ColorSize {
    key: string;
    packSeqNo: string;
    SKU: string;
    UPCOrEAN: string;
    color: string;
    size: string;
    packingRatio: string;
    quantity: string;
}

const PvhPdfUpload: React.FC = () => {
    const [colorSizes, setColorSizes] = useState<ColorSize[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [poPdfData, setPoPdfData] = useState<any>()

    const [poNumber, setPoNumber] = useState<string>('');
    const [poLine, setPoLine] = useState<string>('');


    const [diaPDfForm] = Form.useForm()
    const pvhService = new PvhService();


    const uploadProps = {
        name: 'file',
        accept: '.xml',
        beforeUpload: (file) => {
            handleUpload(file);
            return false;
        },
        showUploadList: false
    };

    interface ParsedXML {
        DOC: {
            ePM_VerContent: {
                PMNo: any;
                ePMVerNo: any;
                VerDate: any;
                VerTime: any;
                VendorId: any;
                VendorName: any;
                BuyerName: any;
                Division: any;
                Department: any;
                Agent: any;
                CurrencyCode: any;
                Currency: any;
                ConditionsOfSalesCode: any;
                ConditionsOfSalesDesc: any;
                DestinationCode: any;
                Destination: any;
                PMShippingMark: any;
                PMBottomRemark: any;
                ShipmentUpdateNo: any;
                ShipmentUpdateDate: any;
                ShipmentUpdateTime: any;
                BuyerDept: any;
                POXMLVerNo: any;
                Attributes: {
                    Attribute: {
                        AttributeSeqNo: any;
                        AttributeLabel: any;
                        AttributeDataType: any;
                        AttributeCode: any;
                        AttributeValue: any;
                    };
                };
                Shipments: {
                    Shipment: {
                        ShipmentNo: any;
                        ShipmentRef: any;
                        ShipmentShipModeCode: any;
                        ShipmentShipMode: any;
                        ShipmentBuyerOrderNo: any;
                        ShipmentDeliveryDate: any;
                        ShipmentPortOfDischargeCode: any;
                        ShipmentPortOfDischarge: any;
                        ShipmentFinalDestinationCode: any;
                        ShipmentFinalDestination: any;
                        ShipmentPortOfLoadingCode: any;
                        ShipmentPortOfLoading: any;
                        DistributionCentreCode: any;
                        DistributionCentre: any;
                        DistributionCentreAddress1: any;
                        DistributionCentreAddress2: any;
                        DistributionCentreAddress3: any;
                        DistributionCentreAddress4: any;
                        ShipToAddress: any;
                        PrePacks: {
                            PrePack: {
                                PackSeqNo: any;
                                PackLineNo: any;
                                PackSKU: any;
                                PackEANOrUPC: any;
                                PackDesc: any;
                                NoOfInnerPackUnits: any;
                                NoOfUnitsPerInnerPack: any;
                                NoOfCartons: any;
                                GWPerInnerPack: any;
                                NWPerInnerPack: any;
                                InnerPackWeightUOM: any;
                                PackStyleNo: any;
                            };
                        };
                        Items: {
                            Item: {
                                ItemSeq: any;
                                ItemNo: any;
                                ItemDesc: any;
                                ItemQty: any;
                                ItemQtyUOM: any;
                                ItemBuyerOrderNo: any;
                                ItemLiFungFactoryCode: any;
                                ItemFactoryNameInEnglish: any;
                                ItemLongDesc: any;
                                ItemCountryOfOriginCode: any;
                                ItemCountryOfOrigin: any;
                                ItemProductionCountryCode: any;
                                ItemProductionCountry: any;
                                ItemEANNo: any;
                                ItemHSCode: any;
                                ItemHS: any;
                                ItemLabel: any;
                                ItemUnitPrice: any;
                                ItemSupplierNo: any;
                                RetailPrice: any;
                                ItemUnitPriceTotal: any;
                                Attributes: any;
                                ColorSizes: {
                                    ColorSize: {
                                        PackSeqNo: any;
                                        LineNo: any;
                                        SKU: any;
                                        UPCOrEAN: any;
                                        Color: any;
                                        Size: any;
                                        PackingRatio: any;
                                        Quantity: any;
                                    }[];
                                };
                            };
                        };
                    };
                };
                ItemBreakdowns: any;
            };
        };
    }

    const parseXML = (xmlString: string) => {
        try {
            const parsedXML = xmljs.xml2js(xmlString, { compact: true }) as ParsedXML;
            const regex = /<ItemFactoryNameInEnglish>.+\s+UNIT\s+-\s+12<\/ItemFactoryNameInEnglish>/;
            const unit12IndexFind = regex.test(xmlString);
            console.log("unit12IndexFind", unit12IndexFind);
            // if (unit12IndexFind) {
            const poNumber = parsedXML.DOC.ePM_VerContent.PMNo._text;
            const currency = parsedXML.DOC.ePM_VerContent.CurrencyCode._text;
            const buyerName = parsedXML.DOC.ePM_VerContent.BuyerName._text;
            const deliveryDate = parsedXML.DOC.ePM_VerContent.Shipments.Shipment.ShipmentDeliveryDate._text;
            const transMode = parsedXML.DOC.ePM_VerContent.Shipments.Shipment.ShipmentShipMode._text;
            const items = Array.isArray(parsedXML.DOC.ePM_VerContent.Shipments.Shipment.Items.Item)
                ? parsedXML.DOC.ePM_VerContent.Shipments.Shipment.Items.Item
                : [parsedXML.DOC.ePM_VerContent.Shipments.Shipment.Items.Item];

            const poPdfData = {
                poNumber: poNumber,
                currency: currency,
                buyerName: buyerName,
                deliveryDate: deliveryDate,
                transMode:transMode,
                PvhpoItemDetails: items.map((item: any) => {
                    return {
                        poLine: item.ItemSeq._text,
                        PvhpoItemVariantDetails: item.ColorSizes.ColorSize.map((colorSize: any) => {
                            return {
                                color: colorSize.Color._text,
                                size: colorSize.Size._text,
                                upc: colorSize.UPCOrEAN._text,
                                quantity: colorSize.Quantity._text
                            };
                        })
                    };
                })
            };

            console.log(poPdfData, "poPdfData")
            setPoPdfData(poPdfData);
        // }
        // else {
        //     message.error("Wrong Document Uploaded");
        // }
        } catch (error) {
            console.error('Error parsing XML:', error);
        }
    };



    const handleUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const xmlString = event.target?.result as string;
            console.log(xmlString, "xmlString")
            parseXML(xmlString);
        };
        reader.readAsText(file);
    };

    const savePdfFields = () => {
        pvhService.savePvhOrder(poPdfData).then((res) => {
            if (res.status) {
                onReset()
                if (fileList) {
                    const formData = new FormData();
                    fileList.forEach((file: any) => {
                        formData.append('file', file);
                        formData.append('poNumber', poPdfData?.poNumber);
                        formData.append('jsonData',JSON.stringify(poPdfData))
                    })
                    console.log(formData, "form")
                    pvhService.fileUpload(formData).then((res) => {
                        if (res.status) {
                            message.success(res.internalMessage)
                        }
                    })
                }
                message.success(res.internalMessage)
            } else {
                message.error(res.internalMessage)
            }
        })
    }

    console.log(poPdfData?.poNumber, "poNumber")

    function onReset() {
        setFileList([]);
        setPoPdfData(undefined)

    }
    

    const pvhBot = () => {
        pvhService.pvhBot().then(res => {
            if (res.status) {
                // setBuyer(res.data);
                // setPoPdfData(res.data)
                message.success("Button CLicked")
            }
        });
    };



    return (
        <Card title='Order Upload'>
            {!poPdfData && (
            <Row gutter={24}>
                <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 5 }}
                        lg={{ span: 5 }}
                        xl={{ span: 4 }}
                    >
                        <Form.Item>
                            <Button type='primary' onClick={pvhBot}>Auto Upload Bot</Button>
                        </Form.Item>
                    </Col> 
                <Col span={24}>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Please upload only valid documents.</p>
                    </Dragger>
                </Col>
            </Row>
        )}
            {/* <div><Button style={{ backgroundColor: '#29397d', color: 'white' }} onClick={() => setMoreData()}><b><ArrowLeftOutlined />  Back</b></Button></div> */}
            <br />
            {poPdfData && (
                <Card>
                    
                    <br />
                    <div className="table-container">
                        <table className='ta-b' style={{ width: '100%' }} >
                            <tr className='ta-b'>
                                <th className='ta-b'>PO NUMBER</th>
                                <th className='ta-b'>CURRENCY</th>
                                <th className='ta-b'>BUYER NAME</th>
                                <th className='ta-b'>DELIVERY DATE</th>
                                <th className='ta-b'>TRANS MODE</th>

                            </tr>
                            <tr className='ta-b'>
                                <td className='ta-b'>{poPdfData?.poNumber}</td>
                                <td className='ta-b'>{poPdfData?.currency}</td>
                                <td className='ta-b'>{poPdfData?.buyerName}</td>
                                <td className='ta-b'>{poPdfData?.deliveryDate}</td>
                                <td className='ta-b'>{poPdfData?.transMode}</td>
                            </tr>
                            {poPdfData?.PvhpoItemDetails?.map((i) => (
                                <>
                                    <tr className='ta-b'>
                                        <th></th>
                                        <th className='ta-b'>PO LINE</th>
                                    </tr>
                                    <tr className='ta-b'>
                                        <td></td>
                                        <td className='ta-b'>{i.poLine}</td>
                                    </tr>
                                    <tr className='ta-b'>
                                        <th></th>
                                        <th></th>
                                        <th className='ta-b'>SIZE</th>
                                        <th className='ta-b'>COLOR</th>
                                        <th className='ta-b'>UPC</th>
                                        <th className='ta-b'>QUANTITY</th>
                                    </tr>
                                    {i.PvhpoItemVariantDetails.map((j) => (
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td className='ta-b'>{j.size}</td>
                                            <td className='ta-b'>{j.color}</td>
                                            <td className='ta-b'>{j.upc}</td>
                                            <td className='ta-b'>{j.quantity}</td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </table>
                    </div>
                    <Row gutter={24} justify={'center'}>
                        <Col span={2}>
                            <Button onClick={savePdfFields} type={'primary'} >Submit</Button>
                        </Col>
                        <Col span={2}>
                            <Button onClick={onReset} >Reset</Button>
                        </Col>
                    </Row>
                </Card>
            )}

        </Card>
    )
};


export default PvhPdfUpload;
