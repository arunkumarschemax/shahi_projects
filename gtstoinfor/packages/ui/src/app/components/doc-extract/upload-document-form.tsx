/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import {
  Select,
  Spin,
  message,
  Button,
  Input,
  Row,
  Form,
  Col,
  Typography,
  UploadProps,
  Upload,
  Radio,
  Table,
  Divider,
  Popconfirm,
  DatePicker,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Tesseract from "tesseract.js";
// import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import DocExtractForm from "./doc-extract-form";
// import DocumentForm from "./document-form";
// import DocumentItemForm from "./document-item-form";
import Card from "antd/es/card/Card";
import { CalendarOutlined, UploadOutlined } from "@ant-design/icons";
import {
  BuyersService,
  SharedService,
  VendorService,
} from "@project-management-system/shared-services";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
import { useNavigate } from "react-router-dom";
// const { Title, Text } = Typography;

// const { Option } = Select;

// export interface UploadDocumentFormProps { }

export function UploadDocumentForm() {
  const [GstForm] = Form.useForm();
  const [itemform] = Form.useForm();
  const [uploadForm] = Form.useForm();
  const [submitVisible, setSubmitVisible] = useState<boolean>(false);
  const [file, setFile] = useState<any | null>(null);

  const navigate = useNavigate();
  const service = new SharedService();
  const [extractedData, setExtractedData] = useState<any>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [buttonText, setButtonText] = useState("Add");
  const [formed, setFormed] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [HSN, setHSN] = useState("");
  const [description, setDescription] = useState("");
  const [Taxtype, setTaxtype] = useState("");
  const [Taxamount, setTaxamount] = useState("");
  const [Taxpercentage, setTaxPercentage] = useState("");
  const [Charge, setCharge] = useState("");
  // const [unitprice, setUnitprice] = useState("");
  const [variance, setVariance] = useState("");
  const [unitquantity, setUnitquantity] = useState("");
  const [quotation, setQuotation] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);

  interface Item {
    HSN: string;
    description: string;
    Taxtype: string;
    Taxamount: string;
    Charge: string;
  }

  const [imageURL, setImageURL] = useState<string | null>(null);
  const [gstNumbers, setGstNumbers] = useState("");
  const [ifscCodes, setIfscCodes] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [Innvoicenum, setInnvoicenum] = useState("");
  const [Cgst, setCgst] = useState("");
  const [Igst, setIgst] = useState("");
  const [Sgst, setSgst] = useState("");
  const [Innvoiceamount, setInnvoiceamount] = useState("");
  const [vendor, setVendor] = useState("");
  const [buyerName, setBuyer] = useState("");
  const [routing, setRouting] = useState("");
  const [comment, setComment] = useState("");
  const [financialyear, setFinancialyear] = useState("");
  const [timecreated, setTimecreated] = useState("");
  const [consoles, setConsoles] = useState("");
  const [cartons, setCartons] = useState("");
  const [po, setPO] = useState("");
  const [dt, setDt] = useState("");
  const [Innvoicecurrency, setInnvoicecurrency] = useState("");

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [data1, setData1] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);

  const servicess = new VendorService();

  const buyerss = new BuyersService();

  useEffect(() => {
    getdata1();
  }, []);

  console.log(extractedData, "extracted data");

  const getdata1 = () => {
    servicess
      .getAllVendors()
      .then((res) => {
        if (res.status) {
          setData1(res.data);
        } else {
          setData1([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getdata2();
  }, []);

  const getdata2 = () => {
    buyerss
      .getAllBuyersInfo()
      .then((res) => {
        if (res.status) {
          setData2(res.data);
        } else {
          setData2([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;
      const newTranslateX = deltaX;
      const newTranslateY = deltaY;
      const image = document.getElementById("imageToDrag");
      if (image) {
        image.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px) scale(${zoomFactor})`;
      }
    }
  };
  const handleTimecreatedChange = (date) => {
    const formattedDate = date ? date.format("YYYY-MM-DD HH:mm:ss") : null;
    setTimecreated(formattedDate);
    setIsDatePickerVisible(false);
  };
  const handleInputChange = (e) => {
    setTimecreated(e.target.value);
  };

  const extractGstNumbers = (text) => {
    const gstNumberRegex =
      /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g;
    const matches = text.match(gstNumberRegex);

    // Return the first match if it exists, otherwise return an empty string
    const extractedGstNumber = matches ? matches[0] : "";

    setGstNumbers(extractedGstNumber); // Set the extracted GST number
    return extractedGstNumber;
  };

  const extractIgst = (text) => {
    const IgstRegex = /(\d,\d{3}\.\d{2})/g;
    const match = text.match(IgstRegex);
    const extractedIgst = match ? match[0] : "";
    return extractedIgst;
  };

  const extractInnvoiceamount = (text) => {
    const InnvoiceamountRegex = /(\d{1,3}(?:,\d{3})*\.\d{2})/g;
    const match = text.match(InnvoiceamountRegex);
    const extractedInvoiceamount = match ? match[0] : "";
    return extractedInvoiceamount;
  };
  const extractCgst = (text) => {
    const CgstRegex = /^\d+\.\d{2}$/;
    const match = text.match(CgstRegex);
    const extractedCgst = match ? match[0] : "0.00";
    return extractedCgst;
  };

  const extractSgst = (text) => {
    const SgstRegex = /^\d+\.\d{2}$/;
    const match = text.match(SgstRegex);
    const extractedSgst = match ? match[0] : "0.00";
    return extractedSgst;
  };

  const extractVendor = (text) => {
    const vendorregex = /EXPO\sFREIGHT\sPVT\sLTD/i;
    const matches = text.match(vendorregex);
    const extractedvendor = matches || [];
    setIfscCodes(extractedvendor);
    return extractedvendor;
  };

  const extractInvoiceDate = (text) => {
    const invoiceDateRegex =
      /\b(?:\d{1,2}-[A-Za-z]{3}-\d{2}|\d{4} [A-Za-z]{3} \d{1,2})\b/g;
    const match = text.match(invoiceDateRegex);

    if (match) {
      const extractedDate = match[0];
      const parts = extractedDate.split(/-| /);

      if (parts.length === 3) {
        const day = parts[0];
        const month = getMonthNumber(parts[1]);
        const year = formatYear(parts[2]);

        return `${year}-${month}-${day}`;
      }
    }

    return "";
  };

  const getMonthNumber = (monthStr) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return String(monthNames.indexOf(monthStr) + 1).padStart(2, "0");
  };

  const formatYear = (yearStr) => {
    if (yearStr.length === 2) {
      return `20${yearStr}`;
    } else {
      return yearStr;
    }
  };
  const textWithDate = "Invoice Date: 21-Sep-08";
  const formattedDate = extractInvoiceDate(textWithDate);
  console.log("Formatted Date:", formattedDate);

  const extractInnvoicecurrency = (text) => {
    const InvoicecuurencyRegex = /(INR|DOLLARS|DINARS)/g;
    const match = text.match(InvoicecuurencyRegex);
    const extractedInnvoicecurrency = match ? match[0] : "";
    return extractedInnvoicecurrency;
  };

  const extractInnvoiceNum = (text) => {
    const InnvoicenumRegex = /EFL-MAA-\d+/g;
    const match = text.match(InnvoicenumRegex);
    const extractedInnvoicenum = match ? match[0].trim() : "";
    return extractedInnvoicenum;
  };

  const extractFinancialyear = (text) => {
    const FinancialyearRegex = /\b\d{4}-\d{4}\b/g;
    const match = text.match(FinancialyearRegex);
    const extractedFinancialyear = match ? match[0].trim() : "";
    return extractedFinancialyear;
  };

  const getCurrentFinancialYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isAprilOrLater = currentDate.getMonth() >= 3;
    const startYear = isAprilOrLater ? currentYear : currentYear - 1;
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  };

  const handleDateChange = (date) => {
    setInvoiceDate(date);
  };

  const handleAddToTable = () => {
    if (
      !HSN &&
      !Taxtype &&
      !Taxamount &&
      !Taxpercentage &&
      !Charge &&
      !variance &&
      !unitquantity &&
      !quotation
    ) {
      return;
    }

    const newItem = {
      HSN,
      description,
      Taxtype,
      Taxamount,
      Charge,
      variance,
      unitquantity,
      quotation,
      Taxpercentage,
    };

    if (isEditing) {
      const updatedTableData = extractedData.map((item) =>
        item === editingItem ? { ...newItem } : item
      );
      setExtractedData(updatedTableData);
      setIsEditing(false);
      setEditingItem(null);
      setButtonText("Add");
    } else {
      setExtractedData([...extractedData, newItem]);
    }

    setHSN("");
    setDescription("");
    setTaxtype("");
    setTaxamount("");
    setCharge("");
    setTaxPercentage("");
    setVariance("");
    setUnitquantity("");
    setQuotation("");
  };

  const handleEdit = (item) => {
    setHSN(item.HSN);
    setDescription(item.description);
    setTaxtype(item.Taxtype);
    setTaxamount(item.Taxamount);
    setTaxPercentage(item.Taxpercentage);
    let editedCharge = "";
    if (item.Taxamount !== null && item.Taxpercentage !== null) {
      const Taxpercentage = item.Taxpercentage;
      const Taxamount = item.Taxamount;
      const equivalentFor100Percent = (Taxamount * 100) / Taxpercentage;
      editedCharge = `${equivalentFor100Percent.toFixed(2)}`;
    } else if (item.Taxamount !== null) {
      editedCharge = `${item.Taxamount}`;
    }
    setCharge(editedCharge);
    setVariance(item.unitprice);
    setUnitquantity(item.unitquantity);
    setQuotation(item.quotation);

    setIsEditing(true);
    setEditingItem(item);
    setButtonText("Update");
  };

  const handleDelete = (item) => {
    const updatedTableData = extractedData.filter((data) => data !== item);
    setExtractedData(updatedTableData);
  };
  const handleReset = () => {
    setHSN("");
    setDescription("");
    setTaxtype("");
    setTaxamount("");
    setCharge("");
    setTaxPercentage("");
    setVariance("");
    setUnitquantity("");
    setQuotation("");
    setIsEditing(false);
    setEditingItem(null);
    setButtonText("Add");
  };
  const columns = [
    {
      title: "HSN",
      dataIndex: "HSN",
      key: "HSN",
      render: (HSN) => ` ${HSN}`,
    },
    {
      title: "Tax Type",
      dataIndex: "Taxtype",
      key: "Taxtype",
      render: (Taxtype) => ` ${Taxtype}`,
    },
    {
      title: "Tax Amount",
      dataIndex: "Taxamount",
      key: "Taxamount",
      render: (Taxamount) => (Taxamount !== null ? `${Taxamount}` : "0"),
    },
    {
      title: "Tax Percentage",
      dataIndex: "Taxpercentage",
      key: "Taxpercentage",
      render: (Taxpercentage, record) => {
        if (Taxpercentage !== null) {
          return `${Taxpercentage}`;
        } else if (record.Taxpercentage !== null) {
          return `${record.Taxpercentage}`;
        }
        return "0";
      },
    },

    {
      title: "Unit Quantity",
      dataIndex: "unitquantity",
      key: "unitquantity",
    },
    {
      title: "Charge",
      dataIndex: "Charge",
      key: "Charge",
      render: (Charge, record) => {
        if (record.Taxamount !== null && record.Taxpercentage !== null) {
          const Taxpercentage = record.Taxpercentage;
          const Taxamount = record.Taxamount;
          const equivalentFor100Percent = (Taxamount * 100) / Taxpercentage;
          return `${equivalentFor100Percent.toFixed(2)}`;
        } else if (record.Taxamount !== null) {
          return `${record.Taxamount}`;
        }

        return `${Charge || "0"}`;
      },
    },
    // {
    //   title: "Quotation",
    //   dataIndex: "quotation",
    //   key: "quotation",
    // },
    // {
    //   title: "Variance",
    //   dataIndex: "variance",
    //   key: "variance",
    //   hide:true,
    //   render: (variance, record) => {
    //     const Charge = parseFloat(record.Charge) || 0;
    //     const Quotation = parseFloat(record.quotation) || 0;
    //     const varianceValue = Quotation - Charge;
    //     return `${varianceValue.toFixed(2)}`;
    //   },
    // },
    // {
    //   title: "Status",
    //   dataIndex: "variance_status",
    //   key: "variance_status",
    // },
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
            title="Are you sure you want to delete this item?"
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

  const handleZoomIn = () => {
    if (zoomFactor < 2) {
      setZoomFactor(zoomFactor + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomFactor > 0.2) {
      setZoomFactor(zoomFactor - 0.1);
    }
  };

  const handleIconClick = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleUploadDocument = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setIsLoading(true);

      console.log("Uploading file:", file);

      Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) }).then(
        ({ data: { text } }) => {
          setIsLoading(false);
          const extractedGstNumbers = extractGstNumbers(text);
          const extractedvendor = extractVendor(text);
          const extractedInvoiceDate = extractInvoiceDate(text);
          const extractedInnvoicenum = extractInnvoiceNum(text);
          const extractedInnvoiceamount = extractInnvoiceamount(text);
          const extractedInnvoicecurrency = extractInnvoicecurrency(text);
          const extractedIgst = extractIgst(text);
          const extractedFinancialyear = extractFinancialyear(text);
          const extractedCgst = extractCgst(text);
          const extractedSgst = extractSgst(text);

          setGstNumbers(extractedGstNumbers);
          setInnvoiceamount(extractedInnvoiceamount);
          setInnvoicecurrency(extractedInnvoicecurrency);
          setInvoiceDate(extractedInvoiceDate);
          setVendor(extractedvendor);
          setInnvoicenum(extractedInnvoicenum);
          setIgst(extractedIgst);
          setCgst(extractedCgst);
          setSgst(extractedSgst);
          setFinancialyear(extractedFinancialyear);

          const lines = text.split("\n");

          const allLines = lines.map((line, index) => ({
            id: index + 1,
            content: line.trim(),
          }));

          const structuredHSNLines = [];
          let currentHSN = null;

          for (const line of allLines) {
            if (line.content.includes("HSN") || line.content.match(/^\d{6}$/)) {
              if (currentHSN) {
                structuredHSNLines.push(currentHSN);
              }
              currentHSN = {
                HSN: line.content.includes("HSN")
                  ? line.content.match(/\d+/)[0]
                  : line.content.trim(),
                Taxtype: line.content.match(/IGST|CGST|SGST|GST/),
                Taxamount: null,
                description: null,
                chargeINR: null,
              };

              const taxAmountMatch = line.content.match(
                /(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/
              );
              if (taxAmountMatch) {
                currentHSN.Taxamount = {
                  Taxpercentage: parseFloat(taxAmountMatch[1]),
                  Taxamount: parseFloat(taxAmountMatch[3]),
                };
              }
            } else if (line.content.includes("IGST|CGST|GSTS|GST")) {
              currentHSN.Taxtype = "IGST";
            }
            if (line.content.includes("chargeINR")) {
              const chargeValueMatch = line.content.match(
                /^\d{1,3}(,\d{3})*(\.\d{2})?$/
              );
              if (chargeValueMatch) {
                currentHSN.chargeINR = parseFloat(
                  chargeValueMatch[1].replace(/,/g, "")
                );
              }
            }

            if (currentHSN && !currentHSN.description) {
              currentHSN.description = line.content.trim();
            }
          }

          if (currentHSN) {
            structuredHSNLines.push(currentHSN);
          }

          structuredHSNLines.forEach((line) => {
            if (line.Taxamount) {
              line.Taxpercentage = line.Taxamount.Taxpercentage;
              line.Taxamount = line.Taxamount.Taxamount;
            }
          });

          console.log(
            "Structured HSN Lines (JSON):",
            JSON.stringify(structuredHSNLines, null, 2)
          );

          setExtractedData(structuredHSNLines);

          const result = {
            "Entire Data": allLines,
          };

          const currentFinancialYear = getCurrentFinancialYear();
          setFinancialyear(currentFinancialYear);

          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleString();
          setTimecreated(formattedDate);

          console.log("Result (JSON):", JSON.stringify(result, null, 2));
        }
      );
    } else {
      message.error("Please select a file to upload.");
    }
  };

  console.log(extractedData, "eeeee");

  const gstUploadFieldProps: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: async (file: any) => {
      if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
        message.error("Only pdf and image files are allowed!");
        return false;
      }

      Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) }).then(
        ({ data: { text } }) => {
          console.log(text);
        }
      );

      setFile(file);

      return false;
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const onFinish = (values) => {
    console.log(values);
    // service
    //   .postdata(values)
    //   .then((res) => {
    //     if (res.status) {
    //       message.success("Success");
    //     } else {
    //     message.error("failed");
    //     }
    //   })
    //   .catch((err: { message: any }) => {
    //     console.log(err.message, 'err message');
    //   });
  };

  const onSumbit = () => {
    const req = new AllScanDto(
      gstNumbers,
      vendor,
      invoiceDate,
      Cgst,
      Igst,
      Sgst,
      Innvoicenum,
      Innvoiceamount,
      Innvoicecurrency,
      routing,
      comment,
      timecreated,
      buyerName,
      financialyear,
      JSON.parse(localStorage.getItem("currentUser")).user.userName,
      extractedData
    );

    console.log(req, "submit");
    service
      .postdata(req)
      .then((res) => {
        if (res.status) {
          message.success("Success");
          navigate("/scan-document");
        } else {
          message.error("failed");
        }
      })
      .catch((err: { message: any }) => {
        console.log(err.message, "err message");
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Card
        title={<div style={{ textAlign: "center" }}>Upload Document</div>}
        bordered={true}
        style={{ flex: 1, width: "600px", height: "100px" }}
        headStyle={{ backgroundColor: "#00FFFF", border: 0 }}
      >
        {/* <Card title="Upload Document" bordered={true} style={{ flex: 1, width: "600px", height: "100px" }} headStyle={{ backgroundColor: '#00FFFF', border: 0 }}> */}
        <Form
          layout="vertical"
          form={uploadForm}
          onFinish={handleUploadDocument}
        >
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name={"poType"}>
                <Radio.Group name="radiogroup" defaultValue={"po"}>
                  <Radio value={"po"}>PO</Radio>
                  <Radio value={"non_po"}>NON PO</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Document is required",
                  },
                ]}
                label="Upload Document"
                name="file"
              >
                <Upload
                  key="file"
                  name="file"
                  {...gstUploadFieldProps}
                  accept=".jpeg,.png,.jpg"
                  showUploadList={false}
                >
                  <Button
                    key="file"
                    style={{ color: "black", backgroundColor: "#7ec1ff" }}
                    // icon={<UploadOutlined />}
                  >
                    Choose File
                  </Button>
                  <br />
                  <Typography.Text type="secondary">
                    (Supported formats jpeg, jpg, png)
                  </Typography.Text>
                </Upload>
                <br />

                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  style={{
                    position: "relative",
                    bottom: "78px",
                    left: "220px",
                  }}
                  onClick={handleUploadDocument}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div
                      style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                        background: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <Spin size="large" />
                      <div style={{ marginTop: "10px", color: "white" }}>
                        Please wait...
                      </div>
                    </div>
                  ) : (
                    "Upload"
                  )}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title={<div style={{ textAlign: "center" }}>Image Form</div>}
        bordered={true}
        headStyle={{ backgroundColor: "#00FFFF", border: 0 }}
        style={{
          flex: 1,
          width: "600px",
          position: "relative",
          top: "10px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          background: "#fff",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "300px",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            style={{
              overflow: "auto",
              overflowX: "scroll",
              overflowY: "scroll",
              height: "100%",
            }}
          >
            <img
              id="imageToDrag"
              src={selectedImage}
              style={{
                maxWidth: "100%",
                transform: `scale(${zoomFactor})`,
                transition: "transform 0.2s",
              }}
            />
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button onClick={handleZoomIn}>Zoom In</Button>
          <Button onClick={handleZoomOut}>Zoom Out</Button>
        </div>
      </Card>

      <Form form={GstForm}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Card
            title={<div style={{ textAlign: "center" }}>Document Details</div>}
            headStyle={{ backgroundColor: "#00FFFF", border: 0 }}
            bordered={true}
            style={{
              flex: 1,
              width: "865px",
              position: "relative",
              left: "601px",
              bottom: "715px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              background: "#fff",
              borderTop: "1px solid #e8e8e8",
            }}
          >
            <Card style={{ position: "relative", bottom: "5px" }}>
              <Form.Item>
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Vendor"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Vendor Name
                    </label>
                    <Select
                      id="Vendor"
                      style={{ width: "190px" }}
                      value={vendor}
                      onChange={(value) => setVendor(value)}
                      defaultValue="option1"
                    >
                      {data1.map((option) => (
                        <option value={option.businessName}>
                          {option.businessName}
                        </option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="GST"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        position: "relative",
                        left: "10px",
                      }}
                    >
                      GST
                    </label>
                    <Input
                      title="GST"
                      name="GST"
                      style={{ width: "190px", height: "30px" }}
                      value={gstNumbers}
                      onChange={(e) => setGstNumbers(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Financialyear"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Financial year
                    </label>
                    <Input
                      id="Financialyear"
                      name="Financialyear"
                      style={{ width: "180px", height: "30px" }}
                      value={financialyear}
                      onChange={(e) => setFinancialyear(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="invoiceDate"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Invoice Date
                    </label>
                    <Input
                      id="invoiceDate"
                      name="invoiceDate"
                      style={{ width: "190px", height: "30px" }}
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="InnvoiceNumber"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Innvoice Number
                    </label>
                    <Input
                      id="InnvoiceNumber"
                      name="InnvoiceNumber"
                      style={{ width: "190px", height: "30px" }}
                      value={Innvoicenum}
                      onChange={(e) => setInnvoicenum(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="InnvoiceAmount"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Innvoice Amount
                    </label>
                    <Input
                      id="InnvoiceAmount"
                      name="InnvoiceAmount"
                      style={{ width: "180px", height: "30px" }}
                      value={Innvoiceamount}
                      onChange={(e) => setInnvoiceamount(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="IGST"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      IGST
                    </label>
                    <Input
                      id="IGST"
                      name="IGST"
                      style={{ width: "190px", height: "30px" }}
                      value={Igst}
                      onChange={(e) => setIgst(e.target.value)}
                    />
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Cgst"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      CSGT
                    </label>
                    <Input
                      id="Cgst"
                      name="Cgst"
                      style={{ width: "190px", height: "30px" }}
                      value={Cgst}
                      onChange={(e) => setCgst(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Sgst"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      SGST
                    </label>
                    <Input
                      id="Sgst"
                      name="Sgst"
                      style={{ width: "180px", height: "30px" }}
                      value={Sgst}
                      onChange={(e) => setSgst(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Innvoice Currency"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Innvoice Currency
                    </label>
                    <Input
                      id="Innvoice Currency"
                      name="Innvoice Currency"
                      style={{ width: "190px", height: "30px" }}
                      value={Innvoicecurrency}
                      onChange={(e) => setInnvoicecurrency(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Routing"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Routing
                    </label>
                    <Select
                      title="Routing"
                      id="Routing"
                      className="center-options"
                      style={{ width: "190px" }}
                      value={routing}
                      onChange={(value) => setRouting(value)}
                    >
                      <Select.Option value="">Accept</Select.Option>
                      {/* <Select.Option value="Accept">Accept</Select.Option> */}
                    </Select>
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Comment"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Comment
                    </label>
                    <Input
                      id="Comment"
                      name="Comment"
                      style={{ width: "180px", height: "30px" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: "20px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Timecreated"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Time Created
                    </label>
                    <Input
                      id="Timecreated"
                      name="Timecreated"
                      style={{
                        width: "200px",
                        height: "30px",
                        paddingRight: "30px",
                      }}
                      value={timecreated || ""}
                      onChange={(e) => setTimecreated(e.target.value)}
                    />
                    <CalendarOutlined
                      style={{
                        position: "absolute",
                        top: "30px",
                        right: "-3px",
                        cursor: "pointer",
                      }}
                      onClick={handleIconClick}
                    />
                    {isDatePickerVisible && (
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{
                          position: "absolute",
                          zIndex: 1,
                          top: "21px",
                          left: "8px",
                          width: "200px",
                        }}
                        onChange={handleTimecreatedChange}
                        onBlur={() => setIsDatePickerVisible(false)}
                      />
                    )}
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="buyerName"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Buyer Name
                    </label>
                    <Select
                      id="buyerName"
                      style={{ width: "190px" }}
                      value={buyerName}
                      onChange={(value) => setBuyer(value)}
                      defaultValue="option1"
                    >
                      {data2.map((option) => (
                        <option value={option.buyerName}>
                          {option.buyerName}
                        </option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Form.Item>
            </Card>

            <Card>
              <Form layout="vertical">
                <Row gutter={12}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="HSN"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      HSN Code
                    </label>
                    <Input
                      id="HSN"
                      name="HSN"
                      style={{ width: "150px", height: "30px" }}
                      value={HSN}
                      onChange={(e) => setHSN(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Taxtype"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Tax Type
                    </label>
                    <Input
                      id="Taxtype"
                      name="Taxtype"
                      style={{ width: "150px", height: "30px" }}
                      value={Taxtype}
                      onChange={(e) => setTaxtype(e.target.value)}
                    />
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Taxamount"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Tax Amount
                    </label>
                    <Input
                      id="Taxamount"
                      name="Taxamount"
                      style={{ width: "150px", height: "30px" }}
                      value={Taxamount}
                      onChange={(e) => setTaxamount(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={12} style={{ marginTop: "10px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Taxpercentage"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Tax Percentage
                    </label>
                    <Input
                      id="Taxpercentage"
                      name="Taxpercentage"
                      style={{ width: "150px", height: "30px" }}
                      value={Taxpercentage}
                      onChange={(e) => setTaxPercentage(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="unitquantity"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Unit Quantity
                    </label>
                    <Input
                      id="unitquantity"
                      name="unitquantity"
                      style={{ width: "150px", height: "30px" }}
                      value={unitquantity}
                      onChange={(e) => setUnitquantity(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="Charge"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Charge
                    </label>
                    <Input
                      id="Charge"
                      name="Charge"
                      style={{ width: "150px", height: "30px" }}
                      value={Charge}
                      onChange={(e) => setCharge(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={12} style={{ marginTop: "10px" }}>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="quotation"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Quotation
                    </label>
                    <Input
                      id="quotation"
                      name="quotation"
                      style={{ width: "150px", height: "30px" }}
                      value={quotation}
                      onChange={(e) => setQuotation(e.target.value)}
                    />
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 6 }} offset={1}>
                    <label
                      htmlFor="variance"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Variance
                    </label>
                    <Input
                      id="variance"
                      name="variance"
                      style={{ width: "150px", height: "30px" }}
                      value={variance}
                      onChange={(e) => setVariance(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row gutter={12} style={{ marginTop: "10px" }}></Row>
              </Form>
            </Card>
            <Row justify="end">
              <Button
                style={{
                  position: "relative",
                  top: "10px",
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
                  position: "relative",
                  top: "10px",
                  marginLeft: "10px",
                }}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ position: "relative", top: "10px", left: "10PX" }}
                onClick={onSumbit}
              >
                Submit
              </Button>
            </Row>
            <br></br>
            <br></br>
            <br></br>

            <Card>
            {extractedData && extractedData.length > 0 ? (
                <Table dataSource={extractedData} columns={columns} />
              ) : (
                ""
              )}
            </Card>
          </Card>
        </div>
      </Form>
    </div>
  );
}

export default UploadDocumentForm;