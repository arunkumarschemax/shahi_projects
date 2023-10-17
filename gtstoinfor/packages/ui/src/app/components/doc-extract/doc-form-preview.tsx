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

    const [extractionCompleted, setExtractionCompleted] = useState(false);


    const service = new SharedService();
    const venService = new PricesService();
    const services = new VendorService();
    const [price, setPrice] = useState<any[]>([]);
    const [vendorCod, setVendorCod] = useState<any[]>([]);

    useEffect(() => {
        console.log(props?.formData)
        console.log(props?.form)

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
        console.log(props?.hsnData)
        console.log(props?.form)
        if (props?.hsnData != undefined) {
            props?.form.setFieldsValue({
                HSN: props.hsnData.HSN, description: props.hsnData.description,
                unitQuantity: props.hsnData.unitQuantity, unitPrice: props.hsnData.unitPrice,
                taxType: props.hsnData.taxType, taxPercentage: props.hsnData.taxPercentage,
                charge: props.hsnData.charge, taxAmount: props.hsnData.taxAmount, quotation: props.hsnData.quotation,
                variance: props.hsnData.variance,
            })

            getVendorPrice(props.hsnData.venName)

        }
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
        if (
            !HSN &&
            !taxType &&
            !taxAmount &&
            !taxPercentage &&
            !charge &&
            !variance &&
            !unitQuantity &&
            !unitPrice &&
            // !status &&
            !amount
        ) {
            return;
        }

        const newItem = {
            HSN,
            description,
            taxType,
            taxAmount,
            charge,
            amount,
            quotation: isEditing ? originalQuotation : quotation,
            taxPercentage: taxPercentage,
            unitQuantity,
            unitPrice,
            variance,
        };
        if (isEditing) {
            const updatedTableData = props.hsnData.map((item) =>
                item === editingItem ? { ...newItem } : item
            );
            setExtractedData(updatedTableData);
            setIsEditing(false);
            setEditingItem(null);
            setButtonText('Add');
        } else {
            setExtractedData([...props.hsnData, newItem]);
        }

        setHSN("");
        setDescription("");
        setTaxType("");
        setTaxAmount("");
        setCharge("");
        setTaxPercentage("");
        setAmount("");
        setVariance("");
        setUnitQuantity("");
        setUnitPrice("");
        // setStatus("");
    };

    const handleEdit = (item) => {
        setHSN(item.HSN || "0");
        setDescription(item.description || "");
        setTaxType(item.taxType || "0");
        setTaxAmount(item.taxAmount || "0");

        let editedCharge = "";
        if (item.taxAmount !== null && item.taxPercentage !== null) {
            const taxPercentage = item.taxPercentage;
            const taxAmount = item.taxAmount;
            const equivalentFor100Percent = (taxAmount * 100) / taxPercentage;
            editedCharge = `${equivalentFor100Percent.toFixed(2)}`;
        } else if (item.taxAmount !== null) {
            editedCharge = `${item.taxAmount}`;
        }
        setCharge(editedCharge || "0");
        setTaxPercentage(item.taxPercentage || "0");
        const unitPrice = parseFloat(item.unitPrice) || 0;
        const quotation = parseFloat(item.quotation) || 0;
        setVariance((unitPrice - quotation).toFixed(2));
        setAmount(item.amount || "0");

        setUnitQuantity(item.unitQuantity || "0");
        setOriginalUnitPrice(item.unitPrice || "0");
        setOriginalQuotation(item.quotation || "0");
        setIsEditing(true);
        setEditingItem(item);
        setButtonText("Update");
    };

    const handleDelete = (item) => {
        const updatedTableData = props.hsnData.filter((data) => data !== item);
        setExtractedData(updatedTableData);
    };

    const handleReset = () => {
        setHSN('');
        setTaxType('');
        setTaxPercentage('');
        setTaxAmount('');
        setUnitQuantity('');
        setQuotation('');
        setDescription('');
        setVariance('');
        setStatus('');
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
            render: (_, item) => (
                <span>
                    <Button
                        onClick={() => handleEdit(item)}
                        icon={<EditOutlined />}
                        style={{ color: "blue" }}
                    />
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are You Sure to Delete ?"
                        onConfirm={() => handleDelete(item)}
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


    const onSumbit = () => {
        const req1 = new HsnDto(HSN, taxType, taxAmount, taxPercentage, charge, unitQuantity, description, quotation, unitPrice, variance)
        const req = new AllScanDto(gstNumber, venName, venCod, invoiceDate, invoiceNumber, invoiceAmount, igst, cgst, sgst, invoiceCurrency,
            financialYear, status, "", [req1],
            JSON.parse(localStorage.getItem("currentUser")).user.userName,);
        console.log(req, req1, "submit");
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
    };


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
                <Form layout="vertical">
                    <Row gutter={12}>
                        <Col
                            xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item label="HSN Code">
                                <Input placeholder="HSN Code"
                                    name="HSN"
                                    value={HSN}
                                    onChange={(e) => setHSN(e.target.value)} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item label="Tax Type">
                                <Select
                                    style={{ width: '100%' }}
                                    value={taxType}
                                    onChange={(value) => setTaxType(value)}
                                >
                                    <Option value="IGST">IGST</Option>
                                    <Option value="CGST & SGST">CGST & SGST</Option>
                                    <Option value="No Taxtype">No Taxtype</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col
                            xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item label="Tax Percentage">
                                <Input placeholder="Tax Percentage"
                                    name="taxPercentage"
                                    value={taxPercentage}
                                    onChange={handleTaxpercentageChange} />
                            </Form.Item>

                        </Col>
                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }} >
                            <Form.Item label="Tax Amount">
                                <Input placeholder="Tax Amount"
                                    name="taxAmount"
                                    value={taxAmount}
                                    onChange={handleTaxamountChange} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item label="Unit Quantity">
                                <Input placeholder="Unit Quantity"
                                    name="unitQuantity"
                                    value={unitQuantity}
                                    onChange={(e) => setUnitQuantity(e.target.value)} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Form.Item label="Description">
                                <Input placeholder="Description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
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
                    onClick={onSumbit}
                >
                    Submit
                </Button>
            </Row>

            <Row gutter={16}>
                <div style={{ overflowX: 'auto' }}>
                    <Table dataSource={props.hsnData} columns={columns} size="small" pagination={false} />
                </div>
            </Row>
        </>
    )
}

export default DocFormPreview;


