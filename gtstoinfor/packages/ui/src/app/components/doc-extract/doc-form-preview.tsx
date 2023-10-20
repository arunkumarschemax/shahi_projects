import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AllScanDto, HsnDto, PriceListRequestModel } from '@xpparel/shared-models';
import { PricesService, SharedService, VendorNamereq, VendorService } from '@xpparel/shared-services';
import { Button, Card, Form, Col, Row, Select, Input, Divider, Popconfirm, Table, FormInstance, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface DocFormPreviewProps {
    form: FormInstance<any>;
    formData: any;
    hsnData: any;
}


interface Item {
    HSN: string;
    description: string;
    taxType: string;
    taxAmount: string;
    charge: string;
    variance: string;
    unitPrice: string;
    totalvalue: string;
    // status: string;
}

export const DocFormPreview = (props: DocFormPreviewProps) => {

    const [buttonText, setButtonText] = useState("Add");
    const { Option } = Select;
    const navigate = useNavigate();

    const [file, setFile] = useState<any | null>(null);
    const [pdfData, setPdfData] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const [extractedData, setExtractedData] = useState<any>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isQuotationDataSet, setIsQuotationDataSet] = useState(false);
    const [isVendorCodeDataSet, setIsVendorCodeDataSet] = useState(false);

    const [HSN, setHSN] = useState("");
    const [description, setDescription] = useState("");
    const [taxType, setTaxType] = useState("");
    const [taxAmount, setTaxAmount] = useState("");
    const [taxPercentage, setTaxPercentage] = useState("");
    const [charge, setCharge] = useState("");
    const [variance, setVariance] = useState("");
    const [unitQuantity, setUnitQuantity] = useState("");
    const [amount, setAmount] = useState("");
    const [quotation, setQuotation] = useState("");
    const [status, setStatus] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [originalUnitPrice, setOriginalUnitPrice] = useState("");
    const [originalQuotation, setOriginalQuotation] = useState("");

    const [venName, setVenName] = useState("");
    const [venCod, setVenCode] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [invoiceAmount, setInvoiceAmount] = useState("");
    const [igst, setIgst] = useState("");
    const [cgst, setCgst] = useState("");
    const [sgst, setSgst] = useState("");
    const [invoiceCurrency, setInvoiceCurrency] = useState("");
    const [financialYear, setFinancialyear] = useState("");
    const [hsnData, setHsnData] = useState<any[]>([]);

    const [extractionCompleted, setExtractionCompleted] = useState(false);


    const service = new SharedService();
    const venService = new PricesService();
    const services = new VendorService();
    const [price, setPrice] = useState<any[]>([]);
    const [vendorCod, setVendorCod] = useState<any[]>([]);

    useEffect(() => {
        if (props?.formData != undefined) {
            props?.form.setFieldsValue({
                venName: props.formData.venName, gstNumber: props.formData.gstNumber,
                invoiceDate: props.formData.invoiceDate, invoiceNumber: props.formData.invoiceNumber,
                invoiceCurrency: props.formData.invoiceCurrency, financialYear: props.formData.financialYear,
                invoiceAmount: props.formData.invoiceAmount, igst: props.formData.igst, sgst: props.formData.sgst,
                cgst: props.formData.cgst,
            })
            getVendorCode(props.formData.venName)
            // props.form.setFieldValue('vendorCode', props?.formData.vendorCode);

        }
    }, [props?.formData]);


    useEffect(() => {
        if (props?.hsnData != undefined) {
            props?.form.setFieldsValue({
                HSN: props.hsnData.HSN, description: props.hsnData.description,
                unitQuantity: props.hsnData.unitQuantity, unitPrice: props.hsnData.unitPrice,
                taxType: props.hsnData.taxType, taxPercentage: props.hsnData.taxPercentage,
                charge: props.hsnData.charge, taxAmount: props.hsnData.taxAmount, quotation: props.hsnData.quotation,
                variance: props.hsnData.variance,
            })

            getVendorPrice(props.hsnData.venName)

        };
        setHsnData(props.hsnData);
    }, [props?.hsnData]);


    useEffect(() => {
        if (venName)
            getVendorCode(venName);
    }, [venName]);

    const getVendorCode = (businessName: string) => {
        const req = new VendorNamereq(businessName);
        services.getVendorCodeByVendorName(req).then((res) => {
            if (res.status) {
                setVendorCod(res.data?.vendorCode
                );
                console.log(res.data?.vendorCode)
                props.form.setFieldsValue({ venCod: res.data?.vendorCode })
            } else {
                setVendorCod([]);
            }
        })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        if (extractedData.length && vendorCod && extractionCompleted) {
            const extractedDataCode = [];
            extractedData.forEach(element => {
                element.venCode = vendorCod;
                extractedDataCode.push(element);
            });
            if (!isVendorCodeDataSet) {
                setIsVendorCodeDataSet(true);
                setExtractedData(extractedDataCode);
            }
        }
    }, [vendorCod, extractedData, extractionCompleted])



    useEffect(() => {
        if (venName)
            getVendorPrice(venName);
    }, [venName]);

    const getVendorPrice = (vendorName: string) => {
        const req = new PriceListRequestModel(vendorName);
        venService.getPriceListByVendor(req).then((res) => {
            if (res.status) {
                setPrice(res.data);
                console.log(res.data?.unitPrice)
                props.form.setFieldsValue({ quotation: res.data?.unitPrice })
            } else {
                setPrice([]);
            }
        })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        if (extractedData.length && price.length && extractionCompleted) {
            console.log(extractedData)
            const extractedDataClone = [];
            extractedData.forEach(element => {
                const obj = price.find(pr => pr.hsnCode == element.HSN && pr.serviceDescription == element.description)
                element.quotation = obj?.unitPrice
                extractedDataClone.push(element)
            });
            if (!isQuotationDataSet) {
                setIsQuotationDataSet(true);
                setExtractedData(extractedDataClone);
            }
        }
    }, [price, extractedData, extractionCompleted])



    const handleAddToTable = () => {
        const indexValue = props.form.getFieldValue('index');
        const formKeys = ['HSN', 'taxType', 'description', 'charge', 'taxPercentage', 'taxAmount', 'variance', 'quotation', 'unitQuantity']
        if (indexValue >= 0) {
            for (const rec of formKeys) {
                hsnData[indexValue][rec] = props.form.getFieldValue(rec);
                props.form.resetFields([rec]);
            }
            setHsnData([...hsnData]);
        } else if (indexValue === undefined) {
            const initial = [...hsnData];
            const singleObject = {};
            for (const rec of formKeys) {
                    singleObject[rec] = props.form.getFieldValue(rec)
                props.form.resetFields([rec]);
            };
            initial.push(singleObject);
            console.log(initial, "initial")
            setHsnData(initial);
        }

        // setExtractedData(updatedTableData);
        setIsEditing(false);
        setEditingItem(null);
        setButtonText('Add');
    }





    const handleEdit = (item, index) => {
        setIsEditing(true);
        setEditingItem(item);
        setButtonText("Update");
        props?.form.setFieldValue('index', index);
        props.form.setFieldValue('taxType', item.taxType);
        props.form.setFieldValue('HSN', item.HSN);
        props.form.setFieldValue('description', item.description);
        props.form.setFieldValue('charge', item.charge);
        props.form.setFieldValue('taxPercentage', item.taxPercentage);
        props.form.setFieldValue('taxAmount', item.taxAmount);
        props.form.setFieldValue('variance', item.Variance);
        props.form.setFieldValue('quotation', item.quotation);
        props.form.setFieldValue('unitQuantity', item.unitQuantity);
    };

    const handleDelete = (index: number) => {
        hsnData?.splice(index, 1)
        setHsnData([...hsnData])
    };

    console.log(extractedData, "hsnData:s", hsnData)

    const handleReset = () => {
        props.form.resetFields(['index', 'HSN', 'taxType', 'description', 'charge', 'taxPercentage', 'taxAmount', 'variance', 'quotation', 'unitQuantity']);
        setIsEditing(false);
    };

    const columns = [
        // {
        //     title: "Service Description",
        //     dataIndex: "description",
        //     width: "30",
        //     key: "description",
        //     render: (description) => {
        //         if (description !== undefined && description !== null) {
        //             const descriptionString = description.toString().replace(/[^\w\s]/g, '');
        //             const trimmedDescription = descriptionString.split(/[^a-zA-Z\s]+/)[0];
        //             return trimmedDescription;
        //         } else {
        //             return "_";
        //         }
        //     }
        // },
        {
            title: "Service Description",
            dataIndex: "description",
            width: "30",
            key: "description",
            render: (HSN) => (HSN !== undefined && HSN !== null ? HSN : "0"),
        },

        {
            title: "HSN code",
            dataIndex: "HSN",
            width: "30",
            key: "HSN",
            render: (HSN) => (HSN !== undefined && HSN !== null ? HSN : "0"),
        },
        {
            title: "Unit Quantity",
            dataIndex: "unitQuantity",
            key: "unitQuantity",
            render: (unitQuantity) => (
                <div style={{ textAlign: "right" }}>
                    {typeof unitQuantity === 'undefined' || unitQuantity === null || unitQuantity === ''
                        ? "1"
                        : unitQuantity}
                </div>
            ),
        },
        {
            title: "Unit Price",
            dataIndex: "unitPrice",
            key: "unitPrice",
        },
        {
            title: "Tax Type",
            dataIndex: "taxType",
            key: "taxType",
            render: (taxType) => <div style={{ textAlign: "center" }}>
                {taxType !== undefined && taxType !== null ? taxType : "—"}
            </div>
        },
        {
            title: "Charge",
            dataIndex: "charge",
            key: "charge",
            render: (charge, record, index) => (
                <div style={{ textAlign: "right" }}>
                    {record.taxAmount !== null && record.taxPercentage !== null
                        ? `${(record.taxAmount * 100 / record.taxPercentage).toFixed(2)}`
                        : record.taxAmount !== null
                            ? `${record.taxAmount}`
                            : `${charge || "0"}`}
                </div>
            ),
        },
        {
            title: "Tax Percentage",
            dataIndex: "taxPercentage",
            key: "taxPercentage",
            render: (taxPercentage, record) => (
                <div style={{ textAlign: "right" }}>
                    {taxPercentage !== undefined && taxPercentage !== null
                        ? `${taxPercentage}`
                        : record.taxPercentage !== undefined && record.taxPercentage !== null
                            ? `${record.taxPercentage}`
                            : "0"}
                </div>
            ),
        },
        {
            title: "Tax Amount",
            dataIndex: "taxAmount",
            key: "taxAmount",
            render: (taxAmount) => (
                <div style={{ textAlign: "right" }}>
                    {taxAmount !== undefined && taxAmount !== null
                        ? parseFloat(taxAmount).toFixed(2)
                        : "0"}
                </div>
            ),
        },
        // {
        //     title: "Amount",
        //     dataIndex: "amount",
        //     key: "amount",
        //     render: (amount) => (
        //         <div style={{ textAlign: "right" }}>
        //             {amount !== undefined && amount !== null ? `${amount}` : "0"}
        //         </div>
        //     ),
        // },
        {
            title: "Quotation",
            dataIndex: "quotation",
            key: "quotation",
            render: (price) =>
                <div style={{ textAlign: "right" }}>
                    {price !== undefined && price !== null ? `${price}` : "0"}
                </div>
        },
        {
            title: "Variance",
            dataIndex: "variance",
            key: "variance",
            render: (text, record) => {
                const unitPrice = parseFloat(record.unitPrice) || 0;
                const quotation = parseFloat(record.quotation) || 0;
                const variance = (unitPrice - quotation).toFixed(2);

                const overallVariance = calculateOverallVariance(variance);
                setStatus(overallVariance);

                return (
                    <div style={{ textAlign: variance === "0.00" ? "center" : "right" }}>
                        {variance !== undefined && variance !== null ? `${variance}` : "-"}
                    </div>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, item, index) => (
                <span>
                    <Button
                        onClick={() => handleEdit(item, index)}
                        icon={<EditOutlined />}
                        style={{ color: "blue" }}
                    />
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are You Sure to Delete ?"
                        onConfirm={() => handleDelete(index)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} style={{ color: "red" }} />
                    </Popconfirm>
                </span>
            ),
        },
    ];


    const calculateOverallVariance = (variance) => {
        if (variance === 0) {
            return "No Variance";
        } else if (variance > 0) {
            return "Fully Variance";
        } else if (variance <= 0 || variance >= 0) {
            return "Partially Variance";
        }
        return "Unknown Variance";
    };


    const calculateCharge = () => {
        const taxAmountFloat = parseFloat(taxAmount);
        const taxPercentageFloat = parseFloat(taxPercentage);

        if (!isNaN(taxAmountFloat) && !isNaN(taxPercentageFloat) && taxPercentageFloat !== 0) {
            const equivalentFor100Percent = (taxAmountFloat * 100) / taxPercentageFloat;
            setCharge(equivalentFor100Percent.toFixed(2));
        } else {
            setCharge("0");
        }
    };

    const handleTaxamountChange = (e) => {
        setTaxAmount(e.target.value);
        calculateCharge();
    };

    const handleTaxpercentageChange = (e) => {
        setTaxPercentage(e.target.value);
        calculateCharge();
    };


    const onSubmit = () => {
        const dto1 = []
        for (const data of hsnData) {
            const dto = new HsnDto(data.HSN, data.taxType, data.taxAmount, data.description, data.taxPercentage, data.charge, data.unitQuantity, data.quotation, data.unitPrice, data.variance)
            dto1.push(dto)
        }

        const req = new AllScanDto(props.formData.gstNumber, props.formData.venName, props.form.getFieldValue("venCod"), props.formData.invoiceDate, props.formData.invoiceNumber, props.formData.invoiceAmount, props.formData.igst, props.formData.cgst, props.formData.sgst, props.formData.invoiceCurrency, props.formData.financialYear, status, "", dto1, JSON.parse(localStorage.getItem("currentUser")).user.userName,);
        console.log(req, dto1, "submit");
        service
            .postdata(req)
            .then((res) => {
                if (res.status) {
                    message.success("Success");
                    navigate("/scan-document");
                } else {
                    message.error("Fill All Fields");
                }
            })
            .catch((err: { message: any }) => {
                console.log(err.message, "err message");
            });


    }


    return (
        <>
            <Card>
                <Form layout="vertical" form={props.form} initialValues={props?.formData} name="control-hooks">
                    <Row gutter={16}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item
                                label="Vendor Name"
                                name="venName"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input
                                    placeholder="Vendor Name"
                                    onChange={(e) => setVenName(e.target.value)}
                                    style={{ borderColor: props.formData?.venName ? 'green' : 'red' }}
                                />
                            </Form.Item>
                        </Col>

                        <Col
                            xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item
                                label="Vendor Code"
                                name="venCod"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input placeholder="Vendor Code"
                                    onChange={(e) => setVenCode(e.target.value)}
                                    style={{ borderColor: props.formData?.venCod ? 'green' : 'blue' }} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item label="GST NUMBER" name="gstNumber" rules={[{ required: true, message: "Field Is Required" }]} >
                                <Input
                                    placeholder="GST NUMBER"
                                    onChange={(e) => setGstNumber(e.target.value)}
                                    style={{ borderColor: props.formData?.gstNumber ? 'green' : 'red' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item
                                label="Invoice Date"
                                name="invoiceDate"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input placeholder="Invoice Date"
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                    style={{ borderColor: props.formData?.invoiceDate ? 'green' : 'red' }} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item
                                label="Invoice Number"
                                name="invoiceNumber"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input placeholder="Invoice Number"
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                    style={{ borderColor: props.formData?.invoiceNumber ? 'green' : 'red' }} />
                            </Form.Item>
                        </Col>

                        <Col
                            xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}
                        >
                            <Form.Item
                                label="Invoice Amount"
                                name="invoiceAmount"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input placeholder="Invoice Amount"
                                    onChange={(e) => setInvoiceAmount(e.target.value)}
                                    style={{ borderColor: props.formData?.invoiceAmount ? 'green' : 'red' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item
                                label="IGST"
                                name="igst"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input placeholder="IGST"
                                    onChange={(e) => setIgst(e.target.value)}
                                    style={{ borderColor: props.formData?.igst ? 'green' : 'red' }} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item
                                label="CGST"
                                name="cgst"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input placeholder="CGST"
                                    onChange={(e) => setCgst(e.target.value)}
                                    style={{ borderColor: props.formData?.cgst ? 'green' : 'red' }} />
                            </Form.Item>
                        </Col>

                        <Col
                            xs={{ span: 8 }}
                            sm={{ span: 8 }}
                            md={{ span: 8 }}
                            lg={{ span: 8 }}
                            xl={{ span: 8 }}
                        >
                            <Form.Item
                                label="SGST"
                                name="sgst"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input placeholder="SGST"
                                    onChange={(e) => setSgst(e.target.value)}
                                    style={{ borderColor: props.formData?.sgst ? 'green' : 'red' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item
                                label="Invoice Currency"
                                name="invoiceCurrency"
                                rules={[{ required: true, message: "Field Is Required" }]}
                            >
                                <Input placeholder="Invoice Currency"
                                    onChange={(e) => setInvoiceCurrency(e.target.value)}
                                    style={{ borderColor: props.formData?.invoiceCurrency ? 'green' : 'red' }} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >                            <Form.Item
                            label="Financial Year"
                            name="financialYear"
                            rules={[{ required: true, message: "Field Is Required" }]}
                        >
                            <Input placeholder="Financial Year"
                                onChange={(e) => setFinancialyear(e.target.value)}
                                style={{ borderColor: props.formData?.financialYear ? 'green' : 'red' }} />
                        </Form.Item>
                        </Col>

                        {/* <Col
                            xs={{ span: 8 }}
                            sm={{ span: 8 }}
                            md={{ span: 8 }}
                            lg={{ span: 8 }}
                            xl={{ span: 8 }}
                        >
                            <Form.Item label="Status">
                            <Input
                                id="status"
                                name="status"
                                style={{
                                    width: "190px",
                                    height: "30px",
                                    borderColor: status ? "blue" : "red",
                                }}
                                className={status === "No Variance" ? "blue" : status === "Fully Variance" ? "red" : "black"}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            </Form.Item>
                        </Col> */}
                    </Row>
                </Form>

            </Card >

            <Card>
                <Form layout="vertical" form={props.form}>
                    <Row gutter={12}>
                        <Col
                            xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item
                                name="index"
                                hidden={true}
                            >
                                <Input placeholder="HSN Code"

                                />
                            </Form.Item>
                            <Form.Item label="HSN Code" name={'HSN'}>
                                <Input placeholder="HSN Code"
                                    name="HSN"
                                    value={HSN}
                                    onChange={(e) => setHSN(e.target.value)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item label="Tax Type" name={'taxType'}>
                                <Select
                                    style={{ width: '100%' }}
                                    value={taxType}
                                    onChange={(value) => setTaxType(value)}
                                >
                                    <Option value="IGST">IGST</Option>
                                    <Option value="CGST & SGST">CGST & SGST</Option>
                                    <Option value="No Tax">No Tax</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col
                            xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item label="Tax Percentage" name={"taxPercentage"}>
                                <Input placeholder="Tax Percentage"
                                    name="taxPercentage"
                                    value={taxPercentage}
                                    onChange={handleTaxpercentageChange} />
                            </Form.Item>

                        </Col>
                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item label="Tax Amount" name={"taxAmount"}>
                                <Input placeholder="Tax Amount"
                                    name="taxAmount"
                                    value={taxAmount}
                                    onChange={handleTaxamountChange} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item label="Unit Quantity" name={"unitQuantity"}>
                                <Input placeholder="Unit Quantity"
                                    name="unitQuantity"
                                    value={unitQuantity}
                                    onChange={(e) => setUnitQuantity(e.target.value)} />

                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item label="Description" name={"description"}>
                                <Input placeholder="Description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12} style={{ marginTop: "10px" }}>

                        {/* <Col
                            xs={{ span: 8 }}
                            sm={{ span: 8 }}
                            md={{ span: 8 }}
                            lg={{ span: 8 }}
                            xl={{ span: 8 }}
                        >
                         <Form.Item label="Quotation">
                            <Input placeholder="Quotation"
                                name="quotation"
                                value={quotation}
                                onChange={(e) => setQuotation(e.target.value)} />
                                </Form.Item>
                        </Col> */}

                        {/* <Col xs={{ span: 8 }}sm={{ span: 8 }}md={{ span: 8 }}lg={{ span: 8 }}xl={{ span: 8 }}>
                         <Form.Item label="Variance">
                            <Input placeholder="Variance"
                                name="variance"
                                value={variance}
                                onChange={(e) => setVariance(e.target.value)} />
                                </Form.Item>
                        </Col> */}

                        {/* <Col
                            xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                         <Form.Item label="Status">
                            <Input placeholder="Status"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)} />
                                </Form.Item>
                        </Col> */}
                    </Row>
                </Form>
            </Card>
            <Row justify="end">
                <Button
                    style={{

                        backgroundColor: "green",
                    }}
                    type="primary"
                    onClick={handleAddToTable}
                >
                    {isEditing ? buttonText : "Add"}
                </Button>
                <Button
                    type="primary"
                    danger
                    style={{

                        marginLeft: "10px",
                    }}
                    onClick={handleReset}
                >
                    Reset
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ position: "relative", left: "10pX" }}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Row>

            <Row gutter={16}>
                <div style={{ overflowX: 'auto' }}>
                    <Table dataSource={hsnData} columns={columns} size="small" pagination={false} />
                </div>

            </Row>
        </>
    )
}

export default DocFormPreview;


