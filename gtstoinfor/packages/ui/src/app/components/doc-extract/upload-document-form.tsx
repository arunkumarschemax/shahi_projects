/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col, Typography, UploadProps, Upload, Radio, Table, Divider, DatePicker } from "antd";
import Tesseract from "tesseract.js";
// import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import DocExtractForm from "./doc-extract-form";
// import DocumentForm from "./document-form";
// import DocumentItemForm from "./document-item-form";
import Card from "antd/es/card/Card";
import { CalendarOutlined, UploadOutlined } from "@ant-design/icons";
import { SharedService, VendorService } from "@project-management-system/shared-services";
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
  const [variance, setVariance] = useState("")
  const [unitquantity, setUnitquantity] = useState("");
  const [quotation, setQuotation] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);

  interface Item {
    HSN: string,
    description: string,
    Taxtype: string,
    Taxamount: string,
    Charge: string,
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
  const [routing, setRouting] = useState("");
  const [comment, setComment] = useState("");
  const [financialyear, setFinancialyear] = useState("");
  const [timecreated, setTimecreated] = useState("");
  const [consoles, setConsoles] = useState("");
  const [cartons, setCartons] = useState("");
  const [po, setPO] = useState("");
  const [dt, setDt] = useState("");
  const [Innvoicecurrency, setInnvoicecurrency] = useState("");


  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [data1, setData1] = useState<any[]>([]);

  const servicess = new VendorService();


  useEffect(() => {

    getdata1();
  }, []);
  
   console.log(extractedData,"extracted data")

  const getdata1 = () => {
    servicess.getAllVendors().then(res => {
      if (res.status) {
        setData1(res.data)
      } else {
        setData1([])
      }
    }).catch(err => {
      console.log(err.message)
    })
  }


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
      const image = document.getElementById('imageToDrag');
      if (image) {
        image.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px) scale(${zoomFactor})`;
      }
    }
  };
  const handleTimecreatedChange = (date) => {
    // Use moment to format the selected date and time
    const formattedDate = date ? date.format('YYYY-MM-DD HH:mm:ss') : null;
    setTimecreated(formattedDate);
    setIsDatePickerVisible(false); // Close the DatePicker when a date is selected
  };
  const handleInputChange = (e) => {
    // Update the state when the input field changes
    setTimecreated(e.target.value);
  };


  const extractGstNumbers = (text) => {
    const gstNumberRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g;
    const matches = text.match(gstNumberRegex);
    const extractedGstNumbers = matches || [];
    setGstNumbers(extractedGstNumbers.join(', '));
    return extractedGstNumbers;
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
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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
    const InvoicecuurencyRegex =
      /(INR|DOLLARS|DINARS)/g;
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
    if (!HSN || !Taxtype || !Taxamount || !Taxpercentage || !Charge || !variance || !unitquantity || !quotation) {
      message.error('Please fill all fields.');
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
        item === editingItem ? newItem : item
      );
      setExtractedData(updatedTableData);
      setIsEditing(false);
      setEditingItem(null);
      setButtonText('Add');
    } else {
      setExtractedData([...extractedData, newItem]);
    }
    setHSN('');
    setDescription('');
    setTaxtype('');
    setTaxamount('');
    setCharge('');
    setTaxPercentage('');
    setVariance('');
    setUnitquantity('');
    setQuotation('');
  };

  console.log(extractedData,"extracted data");
  
  const handleEdit = (item) => {
    setHSN(item.HSN);
    setDescription(item.description);
    setTaxtype(item.Taxtype);
    setTaxamount(item.Taxamount);
    setTaxPercentage(item.Taxpercentage); // Set TaxPercentage
    setCharge(item.Charge);
    setVariance(item.unitprice);
    setUnitquantity(item.unitquantity);
    setQuotation(item.quotation);

    setIsEditing(true);
    setEditingItem(item);
    setButtonText('Update');
  };

  const handleDelete = (item) => {
    const updatedTableData = extractedData.filter((data) => data !== item);
    setExtractedData(updatedTableData);
  };
  const handleReset = () => {
    // Reset all input fields and editing state
    setHSN('');
    setDescription('');
    setTaxtype('');
    setTaxamount('');
    setCharge('');
    setTaxPercentage('');
    setVariance('');
    setUnitquantity('');
    setQuotation('');
    setIsEditing(false);
    setEditingItem(null);
    setButtonText('Add');
  };
  const columns = [
    {
      title: 'HSN',
      dataIndex: 'HSN',
      key: 'HSN',
      render: (HSN) => ` ${HSN}`,
    },
    {
      title: 'Tax Type',
      dataIndex: 'Taxtype',
      key: 'Taxtype',
      render: (Taxtype) => ` ${Taxtype}`,
    },
    {
      title: 'Tax Amount',
      dataIndex: 'Taxamount',
      key: 'Taxamount',
      render: (Taxamount) => (Taxamount !== null ? `₹${Taxamount}` : ''),
    },
    {
      title: 'Tax Percentage',
      dataIndex: 'Taxpercentage',
      key: 'Taxpercentage',
      render: (Taxpercentage, record) => {
        if (Taxpercentage !== null) {
          return `${Taxpercentage}%`;
        } else if (record.Taxpercentage !== null) {
          return `${record.Taxpercentage}%`;
        }
        return '';
      },
    },
    {
      title: 'Unit Quantity',
      dataIndex: 'unitquantity',
      key: 'unitquantity',
    },
    {
      title: 'Charge',
      dataIndex: 'Charge',
      key: 'Charge',
      render: (Charge, record,index) => {
        if (record.Taxamount && record.Taxamount.Taxpercentage !== undefined && record.Taxamount.Taxamount !== undefined) {
          const Taxpercentage = record.Taxamount.Taxpercentage;
          const Taxamount = record.Taxamount.Taxamount;
          const equivalentFor100Percent = (Taxamount * 100) / Taxpercentage;
          // extractedData[index].Charge = String(equivalentFor100Percent)
          return `₹${equivalentFor100Percent.toFixed(2)}`;
        }
        return `${Charge || '0'}`;
      },
    },
    {
      title: 'Quotation',
      dataIndex: 'quotation',
      key: 'quotation',
      
    },
    {
      title: 'Variance',
      dataIndex: 'variance',
      key: 'variance',
      hidden: true,
      visible: false
    },
    {
      title: 'Status',
      dataIndex: 'variance_status',
      key: 'variance_status',
      
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <span>
          <Button onClick={() => handleEdit(item)}>Edit</Button>
          <Divider type="vertical" />
          <Button onClick={() => handleDelete(item)}>Delete</Button>
        </span>
      ),
    },
  ];

  

  // const handleEdit = (item) => {
  //   setHSN(item.HSN);
  //   setDescription(item.description);
  //   setTaxtype(item.Taxtype);

  //   const taxAmountObj = item.Taxamount;

  //   if (typeof taxAmountObj === 'object' && taxAmountObj.hasOwnProperty('Taxpercentage') && taxAmountObj.hasOwnProperty('amount')) {
  //     setTaxamount(`${taxAmountObj.Taxpercentage}% = ₹${taxAmountObj.amount}`);
  //   } else {
  //     setTaxamount(item.Taxamount);
  //   }

  //   setCharge(item.Charge);
  //   setIsEditing(true);
  //   setEditingItem(item);
  //   setButtonText("Update"); 
  // };

  // const handleEdit = (item) => {
  //   setHSN(item.HSN);
  //   setDescription(item.description);
  //   setTaxtype(item.Taxtype);

  //   const taxAmountObj = item.Taxamount;
  //   if (typeof taxAmountObj === 'object' && 'Taxpercentage' in taxAmountObj && 'amount' in taxAmountObj) {
  //     setTaxamount(`${taxAmountObj.Taxpercentage}% = ₹${taxAmountObj.amount}`);
  //   } else {
  //     setTaxamount(item.Taxamount);
  //   }

  //   setCharge(item.Charge);
  //   setIsEditing(true);
  //   setEditingItem(item);
  //   setButtonText("Update");
  // };

  // const handleDelete = (item) => {
  //   const updatedTableData = extractedData.filter((i) => i !== item);
  //   setExtractedData(updatedTableData);
  // };

  const handleZoomIn = () => {
    if (zoomFactor < 2) {
      setZoomFactor(zoomFactor + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomFactor > 0.2) {
      setZoomFactor(zoomFactor - 0.1);
    }
  }

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

      Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) })
        .then(({ data: { text } }) => {
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

          const lines = text.split('\n');

          const allLines = lines.map((line, index) => ({
            id: index + 1,
            content: line.trim(),
          }));

          const structuredHSNLines = [];
          let currentHSN = null;

          for (const line of allLines) {
            if (line.content.includes('HSN') || line.content.match(/^\d{6}$/)) {
              if (currentHSN) {
                structuredHSNLines.push(currentHSN);
              }
              currentHSN = {
                HSN: line.content.includes('HSN') ? line.content.match(/\d+/)[0] : line.content.trim(),
                Taxtype: line.content.match(/IGST|CGST|SGST|GST/),
                Taxamount: null,
                description: null,
                chargeINR: null,
              };

              const taxAmountMatch = line.content.match(/(\d+(\.\d{0,2})?)%=(\d+(\.\d{0,2})?)/);
              if (taxAmountMatch) {
                currentHSN.Taxamount = {
                  Taxpercentage: parseFloat(taxAmountMatch[1]),
                  Taxamount: parseFloat(taxAmountMatch[3]),
                };
              }
            } else if (line.content.includes('IGST|CGST|GSTS|GST')) {
              currentHSN.Taxtype = 'IGST';
            }
            if (line.content.includes('chargeINR')) {
              const chargeValueMatch = line.content.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/);
              if (chargeValueMatch) {
                currentHSN.chargeINR = parseFloat(chargeValueMatch[1].replace(/,/g, ''));
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

          console.log("Structured HSN Lines (JSON):", JSON.stringify(structuredHSNLines, null, 2));

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
        });
    } else {
      message.error("Please select a file to upload.");
    }
  };

  console.log(extractedData, "eeeee")


  const gstUploadFieldProps: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: async (file: any) => {
      if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
        message.error("Only pdf and image files are allowed!");
        return false;
      }

      Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) }).then(({ data: { text } }) => {
        console.log(text);
      });

      setFile(file);

      return false;
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
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
    const req = new AllScanDto(gstNumbers, vendor, invoiceDate, Cgst, Igst, Sgst, Innvoicenum, Innvoiceamount, Innvoicecurrency, routing, comment, timecreated, financialyear, JSON.parse(localStorage.getItem('currentUser')).user.userName,extractedData)

    // const req: any = {
    //   GST: gstNumbers,
    //   invoiceDate: invoiceDate,
    //   InnvoiceAmount: Innvoiceamount,
    //   InnvoiceCurrency: Innvoicecurrency,
    //   InnvoiceNumber: Innvoicenum,
    //   Cgst: Cgst,
    //   IGST: Igst,
    //   Sgst: Sgst,
    //   Vendor: vendor,
    //   Routing: routing,
    //   Comment: comment,
    //   Financialyear: financialyear,
    //   Timecreated: timecreated
    // }

    console.log(req, "submit")
    service
      .postdata(req)
      .then((res) => {
        if (res.status) {
          message.success("Success");
          navigate("/scan-document")
        } else {
          message.error("failed");
        }
      })
      .catch((err: { message: any }) => {
        console.log(err.message, 'err message');
      })
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', }}>
      <Card title="Upload Document" bordered={true} style={{ flex: 1, }} headStyle={{ backgroundColor: '#77dfec', border: 0 }}>
        <Form layout="vertical" form={uploadForm} onFinish={handleUploadDocument}>
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
                    message: 'Document is required',
                  },
                ]}
                label='Upload Document'
                name='file'
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
                    style={{ color: 'black', backgroundColor: '#7ec1ff' }}
                    // icon={<UploadOutlined />}

                  >
                    Choose File
                  </Button>
                  <br />
                  <Typography.Text type="secondary">
                    (Supported formats  jpeg, jpg, png)
                  </Typography.Text>
                </Upload>
                <br />

                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  style={{ position: 'relative', bottom: "78px", left: "220px" }}
                  onClick={handleUploadDocument}
                  disabled={isLoading}
                >
                  {isLoading ? 'Uploading...' : 'Upload'}
                  {isLoading && (
                    <div
                      style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                        background: 'rgba(255, 255, 255, 0.8)',
                        padding: '20px',
                        borderRadius: '5px',
                      }}
                    >
                      <Spin size="large" />
                      <p>Loading...</p>
                    </div>
                  )}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>


      <div style={{ display: 'flex' }}>
        <Card
          title="Image Form"
          bordered={true}
          headStyle={{ backgroundColor: '#77dfec', border: 0 }}
          style={{
            flex: 1, position: 'relative', top: "5px", boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            background: '#fff',
            borderTop: '1px solid #e8e8e8',
          }}
        >
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              height: '400px',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div
              style={{
                overflow: 'auto',
                overflowX: 'scroll',
                overflowY: 'scroll',
                height: '100%',
              }}
            >
              <img
                id="imageToDrag"
                src={selectedImage}
                style={{
                  maxWidth: '100%',
                  transform: `scale(${zoomFactor})`,
                  transition: 'transform 0.2s',
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Button onClick={handleZoomIn}>Zoom In</Button>
            <Button onClick={handleZoomOut}>Zoom Out</Button>
          </div>
        </Card>
      </div>


      <Form form={GstForm}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '-10px', }}>
          <Card
            title={"Document Details"}
            headStyle={{ backgroundColor: '#77dfec', border: 0 }}
            bordered={true}
            style={{
              flex: 1,
              width: '760px',
              position: "relative",
              left: "735px",
              bottom: "815px",
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              background: '#fff',
              borderTop: '1px solid #e8e8e8',
            }}
          >
            <Form.Item >
              <Row gutter={24} >
                <Col span={8}>
                  <label htmlFor="Vendor" style={{ color: 'black', fontWeight: 'bold' }}>Vendor Name</label>
                  <Select
                    id="Vendor"
                    style={{ width: "150px" }}
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
                <Col span={6}>
                  <label htmlFor="GST" style={{ color: 'black', fontWeight: 'bold', position: "relative", left: "10px" }}>
                    GST
                  </label>
                  <Input
                    title="GST"
                    name="GST"
                    style={{ width: '190px', height: '30px', position: "relative", left: "10px" }}
                    value={gstNumbers}
                    onChange={(e) => setGstNumbers(e.target.value)}
                  />
                </Col>

                <Col span={9}>
                  <label htmlFor="Financialyear" style={{ color: 'black', fontWeight: 'bold', position: "relative", left: "75px" }}>Financial year</label>
                  <Input
                    id="Financialyear"
                    name="Financialyear"
                    style={{ width: "180px", height: "30px", position: "relative", left: "75px" }}
                    value={financialyear}
                    onChange={(e) => setFinancialyear(e.target.value)}
                  />
                </Col>

                {/* <Col span={6}>
                  <label htmlFor="invoiceDate" style={{ color: 'black', fontWeight: 'bold' }}>
                    Invoice Date
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Input
                      id="invoiceDate"
                      name="invoiceDate"
                      style={{ width: '150px', height: '30px' }}
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                    <DatePicker
                      style={{ position: 'absolute', top: 0, right: 0 }}
                      onChange={handleDateChange}
                    />
                  </div>
                </Col> */}
              </Row>

              <Row gutter={24} style={{ marginTop: '20px' }}>
                <Col span={8}>
                  <label htmlFor="invoiceDate" style={{ color: 'black', fontWeight: 'bold' }}>
                    Invoice Date
                  </label>
                  <Input
                    id="invoiceDate"
                    name="invoiceDate"
                    style={{ width: '190px', height: '30px' }}
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </Col>

                <Col span={8}>
                  <label htmlFor="InnvoiceNumber" style={{ color: 'black', fontWeight: 'bold', position: "relative", left: "10px" }}>Innvoice Number</label>
                  <Input
                    id="InnvoiceNumber"
                    name="InnvoiceNumber"
                    style={{ width: "190px", height: "30px", position: "relative", left: "10px" }}
                    value={Innvoicenum}
                    onChange={(e) => setInnvoicenum(e.target.value)}
                  />
                </Col>

                <Col span={6}>
                  <label htmlFor="InnvoiceAmount" style={{ color: 'black', fontWeight: 'bold', position: "relative", left: "20px" }}>Innvoice Amount</label>
                  <Input
                    id="InnvoiceAmount"
                    name="InnvoiceAmount"
                    style={{ width: "180px", height: "30px", position: "relative", left: "20px" }}
                    value={Innvoiceamount}
                    onChange={(e) => setInnvoiceamount(e.target.value)}
                  />
                </Col>
              </Row>

              <Row gutter={24} style={{ marginTop: '20px' }}>
                <Col span={7}>
                  <label htmlFor="IGST" style={{ color: 'black', fontWeight: 'bold' }}>IGST</label>
                  <Input
                    id="IGST"
                    name="IGST"
                    style={{ width: "190px", height: "30px" }}
                    value={Igst}
                    onChange={(e) => setIgst(e.target.value)}
                  />
                </Col>
                <Col span={7}>
                  <label htmlFor="Cgst" style={{ color: 'black', fontWeight: 'bold', position: "relative", left: "40px" }}>CSGT</label>
                  <Input
                    id="Cgst"
                    name="Cgst"
                    style={{ width: "190px", height: "30px", position: "relative", left: "40px" }}
                    value={Cgst}
                    onChange={(e) => setCgst(e.target.value)}
                  />
                </Col>

                <Col span={6}>
                  <label htmlFor="Sgst" style={{ color: 'black', fontWeight: 'bold', position: "relative", left: "75px" }}>SGST</label>
                  <Input
                    id="Sgst"
                    name="Sgst"
                    style={{ width: "180px", height: "30px", position: "relative", left: "75px" }}
                    value={Sgst}
                    onChange={(e) => setSgst(e.target.value)}
                  />
                </Col>
              </Row>

              <Row gutter={24} style={{ marginTop: '20px' }}>
                <Col span={8}>
                  <label htmlFor="Innvoice Currency" style={{ color: 'black', fontWeight: 'bold' }}>Innvoice Currency</label>
                  <Input
                    id="Innvoice Currency"
                    name="Innvoice Currency"
                    style={{ width: "190px", height: "30px" }}
                    value={Innvoicecurrency}
                    onChange={(e) => setInnvoicecurrency(e.target.value)}
                  />
                </Col>

                <Col span={7}>
                  <label htmlFor="Routing" style={{ color: 'black', fontWeight: 'bold', position: "relative", left: "15px" }}>Routing</label>
                  <Select
                    title="Routing"
                    id="Routing"
                    className="center-options"
                    style={{ width: "190px", position: "relative", left: "10px" }}
                    value={routing}
                    onChange={(value) => setRouting(value)}
                  >
                    <Select.Option value="">Accept</Select.Option>
                    {/* <Select.Option value="Accept">Accept</Select.Option> */}
                  </Select>
                </Col>

                <Col span={8}>
                  <label htmlFor="Comment" style={{ color: 'black', fontWeight: 'bold', position: "relative", left: "45px" }}>Comment</label>
                  <Input
                    id="Comment"
                    name="Comment"
                    style={{ width: "180px", height: "30px", position: "relative", left: "45px" }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Col>
              </Row>

              <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={6}>
                  <label htmlFor="Timecreated" style={{ color: 'black', fontWeight: 'bold' }}>Time Created</label>
                  <Input
                    id="Timecreated"
                    name="Timecreated"
                    style={{ width: '200px', height: '30px', paddingRight: '30px' }}
                    value={timecreated || ''}
                    onChange={(e) => setTimecreated(e.target.value)}
                  />
                  <CalendarOutlined
                    style={{ position: 'absolute', top: '30px', right: '-30px', cursor: 'pointer' }}
                    onClick={handleIconClick}
                  />
                  {isDatePickerVisible && (
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      style={{ position: 'absolute', zIndex: 1, top: '21px', left: '8px', width: "200px" }}
                      onChange={handleTimecreatedChange}
                      onBlur={() => setIsDatePickerVisible(false)}
                    />
                  )}
                </Col>
              </Row>

              <Button type="primary" htmlType="submit" style={{ position: "relative", top: "10px" }} onClick={onSumbit}>
                Submit
              </Button>

            </Form.Item>


            {/* <div style={{ display: 'flex', flexDirection: 'column', }}> */}
            {/* <Card title="HSN Details"
            headStyle={{ backgroundColor: '#77dfec', border: 0 }}
            bordered={true} style={{ flex: 1, position: "relative", left: "733px", bottom: "812px" }} > */}
            <Form layout='vertical' >
              <Row gutter={12}>
                <Col span={6}>
                  <label htmlFor="HSN" style={{ color: 'black', fontWeight: 'bold' }}>HSN Code</label>
                  <Input
                    id="HSN"
                    name="HSN"
                    style={{ width: '150px', height: '30px' }}
                    value={HSN}
                    onChange={(e) => setHSN(e.target.value)}
                  />
                </Col>

                <Col span={6}>
                  <label htmlFor="Taxtype" style={{ color: 'black', fontWeight: 'bold' }}>Tax Type</label>
                  <Input
                    id="Taxtype"
                    name="Taxtype"
                    style={{ width: '150px', height: '30px' }}
                    value={Taxtype}
                    onChange={(e) => setTaxtype(e.target.value)}
                  />
                </Col>
                <Col span={6}>
                  <label htmlFor="Taxamount" style={{ color: 'black', fontWeight: 'bold' }}>Tax Amount</label>
                  <Input
                    id="Taxamount"
                    name="Taxamount"
                    style={{ width: '150px', height: '30px' }}
                    value={Taxamount}
                    onChange={(e) => setTaxamount(e.target.value)}
                  />
                </Col>

                <Col span={6}>
                  <label htmlFor="Taxpercentage" style={{ color: 'black', fontWeight: 'bold' }}>Taxpercentage</label>
                  <Input
                    id="Taxpercentage"
                    name="Taxpercentage"
                    style={{ width: '150px', height: '30px' }}
                    value={Taxpercentage}
                    onChange={(e) => setTaxPercentage(e.target.value)}
                  />
                </Col>

              </Row>
              <Row gutter={12}>

                <Col span={6}>
                  <label htmlFor="Charge" style={{ color: 'black', fontWeight: 'bold' }}>Charge Amount </label>
                  <Input
                    id="Charge"
                    name="Charge"
                    style={{ width: '150px', height: '30px' }}
                    value={Charge}
                    onChange={(e) => setCharge(e.target.value)}
                  />
                </Col>
                <Col span={6}>
                  <label htmlFor="unitquantity" style={{ color: 'black', fontWeight: 'bold' }}>Unit Quantity</label>
                  <Input
                    id="unitquantity"
                    name="unitquantity"
                    style={{ width: '150px', height: '30px' }}
                    value={unitquantity}
                    onChange={(e) => setUnitquantity(e.target.value)}
                  />
                </Col>


                <Col span={6}>
                  <label htmlFor="quotation" style={{ color: 'black', fontWeight: 'bold' }}>Quotation</label>
                  <Input
                    id="quotation"
                    name="quotation"
                    style={{ width: '150px', height: '30px' }}
                    value={quotation}
                    onChange={(e) => setQuotation(e.target.value)}
                  />
                </Col>
                <Col span={6}>
                  <label htmlFor="variance" style={{ color: 'black', fontWeight: 'bold' }}>Variance</label>
                  <Input
                    id="variance"
                    name="variance"
                    style={{ width: '150px', height: '30px' }}
                    value={variance}
                    onChange={(e) => setVariance(e.target.value)}
                  />
                </Col>

              </Row>
            </Form>
            <Button style={{ position: "relative", top: "10px" }} type="primary" onClick={handleAddToTable}>{isEditing ? buttonText : "Add"}
            </Button>
            <Button type="primary" danger style={{ position: "relative", top: "10px", marginLeft: '10px' }} onClick={handleReset}>Reset</Button>
            <Table style={{ position: "relative", top: "25px", right: "25px" }} dataSource={extractedData} columns={columns} />
            {/* <Button
              style={{ position: 'relative', top: '22px' }}
              type="primary"
            >
              Go to Database
            </Button> */}
            {/* </Card> */}
            {/* </div> */}

          </Card>
        </div>
      </Form>

    </div>

  );
}

export default UploadDocumentForm;
