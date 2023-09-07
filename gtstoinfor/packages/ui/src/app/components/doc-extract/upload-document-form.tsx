/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form, Col, Typography, UploadProps, Upload, Radio, Table, Divider, DatePicker } from "antd";
import Tesseract from "tesseract.js";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";
// import { ScanService } from "@project-management-system/shared-services";
// import DocExtractForm from "./doc-extract-form";
// import DocumentForm from "./document-form";
// import DocumentItemForm from "./document-item-form";
import Card from "antd/es/card/Card";
import { UploadOutlined } from "@ant-design/icons";
// const { Title, Text } = Typography;

// const { Option } = Select;

// export interface UploadDocumentFormProps { }



export function UploadDocumentForm() {
  const [mainForm] = Form.useForm();
  const [itemform] = Form.useForm();
  const [uploadForm] = Form.useForm();
  const [submitVisible, setSubmitVisible] = useState<boolean>(false);
  const [file, setFile] = useState<any | null>(null);

  const [extractedData, setExtractedData] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [buttonText, setButtonText] = useState("Add");


  const [formed, setFormed] = useState<Item[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [HSN, setHSN] = useState("");
  const [description, setDescription] = useState("");
  const [Taxtype, setTaxtype] = useState("");
  const [Taxamount, setTaxamount] = useState("");
  const [Charge, setCharge] = useState("");

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
  // const [packages, setPackages] = useState("");
  // const [customerID, setCustomerID] = useState("");
  // const [weight, setWeight] = useState("");
  // const [volume, setVolume] = useState("");
  // const [chargeable, setChargeable] = useState("");
  const [Innvoicenum, setInnvoicenum] = useState("");
  const [Cgst, setCgst] = useState("");
  const [Igst, setIgst] = useState("");
  const [Sgst, setSgst] = useState("");
  const [Innvoiceamount, setInnvoiceamount] = useState("");



  const [vendor, setVendor] = useState("");
  const [consoles, setConsoles] = useState("");
  const [cartons, setCartons] = useState("");
  const [po, setPO] = useState("");
  const [dt, setDt] = useState("");
  // const [payref, setpayref] = useState("");
  // const [house, setHouse] = useState("");
  const [Innvoicecurrency, setInnvoicecurrency] = useState("");

  // const [goods, setGoods] = useState("");
  // const [containers, setContainers] = useState("");

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

      // Calculate the new position of the image
      const newTranslateX = deltaX;
      const newTranslateY = deltaY;

      // Apply the new position to the image
      const image = document.getElementById('imageToDrag');
      if (image) {
        image.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px) scale(${zoomFactor})`;
      }
    }
  };


  const extractGstNumbers = (text) => {
    const gstNumberRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g;
    const matches = text.match(gstNumberRegex);
    const extractedGstNumbers = matches || [];
    setGstNumbers(extractedGstNumbers.join(', '));
    return extractedGstNumbers;
  };

  // const extractIfscCodes = (text) => {
  //   const ifscCodeRegex = /[A-Z]{4}0[A-Z0-9]{6}/g;
  //   const matches = text.match(ifscCodeRegex);
  //   const extractedIfscCodes = matches || [];
  //   setIfscCodes(extractedIfscCodes);
  //   return extractedIfscCodes;
  // };

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
    const extractedInvoiceDate = match ? match[0] : "";
    return extractedInvoiceDate;
  };


  // const extractWeight = (text) => {
  //   const weightRegex = /((\d*\.?\d+)\s*(lbs?|KG))/i;
  //   const match = text.match(weightRegex);
  //   const extractedWeight = match ? match[1] : "";
  //   return extractedWeight;
  // };

  // const extractVolume = (text) => {
  //   const volumeRegex = /((\d*\.?\d+)([A-Za-z\s])\s*(lbs?|M3))/i;
  //   const match = text.match(volumeRegex);
  //   const extractedVolume = match ? match[1] : "";
  //   return extractedVolume.trim();
  // };

  // const extractChargeable = (text) => {
  //   const chargeableRegex = /((\d*\.?\d+)([A-Za-z\s])+\s*(lbs?|M3))/i;
  //   const match = text.match(chargeableRegex);
  //   const extractedChargeable = match ? match[1] : "";
  //   return extractedChargeable.trim();
  // };

  const extractInnvoiceNum = (text) => {
    const InnvoicenumRegex = /EFL-MAA-\d+/g;
    const match = text.match(InnvoicenumRegex);
    const extractedInnvoicenum = match ? match[0].trim() : "";
    return extractedInnvoicenum;
  };



  // const extractCustomerID = (text) => {
  //   const customerIDRegex = /\bCUSTOMER ID:\s*([A-Za-z\s]+)\b/i;
  //   const match = text.match(customerIDRegex);
  //   const extractedCustomerID = match ? match[1] : "";
  //   return extractedCustomerID.trim();
  // };

  // const extractPackages = (text) => {
  //   const packagesRegex = /((\d*\.?\d+)\s*(?:CTN|CTNS))\b/i;
  //   const match = text.match(packagesRegex);
  //   const extractedPackages = match ? match[1] : "";
  //   setPackages(extractedPackages);
  //   return extractedPackages.trim();
  // };

  // const extractConsole = (text) => {
  //   const ConsoleRegex = /\b[A-Za-z]\d{11}\b/g;
  //   const match = text.match(ConsoleRegex);
  //   const extractedConsole = match ? match[1] : "";
  //   return extractedConsole.trim();
  // };

  // const extractCartons = (text) => {
  //   const cartonsRegex = /((\d+)\s*(\d+\s*%))/;
  //   const match = text.match(cartonsRegex);
  //   const extractedCartons = match ? match[1] : "";
  //   return extractedCartons.trim();
  // };

  // const extractPO = (text) => {
  //   const poRegex = /([A-Z]{1}[0-9]{4})-/;
  //   const match = text.match(poRegex);
  //   const extractedPO = match ? match[1] : "";
  //   return extractedPO.trim();
  // };

  // const extractDt = (text) => {
  //   const dtRegex = /((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[1,2])\/(19|20)\d{2})/;
  //   const match = text.match(dtRegex);
  //   const extractedDt = match ? match[1] : "";
  //   return extractedDt.trim();
  // };

  // const extractPayref = (text) => {
  //   const payrefRegex = /\b[A-Za-z]\d{11}\b/g;
  //   const match = text.match(payrefRegex);
  //   const extractedPayref = match ? match[0] : "";
  //   return extractedPayref;
  // };

  // const extractHouse = (text) => {
  //   const houseRegex = /(\d{11})/;
  //   const match = text.match(houseRegex);
  //   const extractedHouse = match ? match[0] : "";
  //   return extractedHouse;
  // };
  // const extractContainers = (text) => {
  //   const containersRegex = /([A-Z0-9]+)\s+([0-9]+)/;
  //   const match = text.match(containersRegex);
  //   const extractedContainers = match ? match[0] : "";
  //   return extractedContainers;
  // };

  // const extractOcean = (text) => {
  //   const oceanRegex = /[A-Z]+\/[A-Z]+\/\d+/;
  //   const match = text.match(oceanRegex);
  //   const extractedOcean = match ? match[0] : "";
  //   return extractedOcean;
  // };

  // const extractGoods = (text) => {
  //   const goodsRegex = /s*\s*(\d+)\s*(\d+%)\s*(COTTON)\s*(\d+%)\s*(POLYESTER)\s*(\d+%)\s*(ELASTANE)\s*(\w+)\s*(MENS SHORTS)/;
  //   const match = text.match(goodsRegex);
  //   const extractedGoods = match ? match[0] : "";
  //   return extractedGoods;
  // };

  const handleDateChange = (date) => {
    setInvoiceDate(date);
  };

  const handleAddToTable = () => {
    if (!HSN || !Taxtype || !Taxamount || !Charge) {
      message.error("Please fill all fields.");
      return;
    }
  
    const newItem: Item = {
      HSN,
      description,
      Taxtype,
      Taxamount,
      Charge,
    };
  
    if (isEditing) {
      const updatedTableData = extractedData.map((item) =>
        item === editingItem ? newItem : item
      );
      setExtractedData(updatedTableData);
      setIsEditing(false);
      setEditingItem(null);
      setButtonText("Add"); // Change button text back to "Add" after updating
    } else {
      setExtractedData([...extractedData, newItem]);
    }
  
    setHSN("");
    setDescription("");
    setTaxtype("");
    setTaxamount("");
    setCharge("");
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
      render: (Taxamount) => {
        if (Taxamount && Taxamount.percentage !== undefined && Taxamount.amount !== undefined) {
          return `${Taxamount.percentage}% = ₹${Taxamount.amount}`;
        }
        return Taxamount;
      },
    },
    {
      title: 'Charge Amount',
      dataIndex: 'Charge',
      key: 'Charge',
      render: (Charge) => (Charge || Charge === 0 ? ` ${Charge}` : '0'),
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

  const handleEdit = (item) => {
    setHSN(item.HSN);
    setDescription(item.description);
    setTaxtype(item.Taxtype);
    setTaxamount(`${item.Taxamount.percentage}% = ₹${item.Taxamount.amount}`);
    setCharge(item.Charge);
    setIsEditing(true);
    setEditingItem(item);
    setButtonText("Update"); // Change button text to "Update" when editing
  };
  


  const handleDelete = (item) => {
    const updatedTableData = extractedData.filter((i) => i !== item);
    setExtractedData(updatedTableData);
  };

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


  const handleUploadDocument = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set the selected image in the state
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setIsLoading(true);

      console.log("Uploading file:", file);

      Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) })
        .then(({ data: { text } }) => {

          setIsLoading(false);

          // setIgst(extractedIgst);
          // setCharges(extractedCharges);

          // setOcean(extractedOcean);
          // setVessel(extractedVessel);
          // setVoyage(extractedVoyage);
          // setRcm(extractedRcm);
          // setCosign(extractedCosign);
          // setEta(extractedEta);

          const extractedGstNumbers = extractGstNumbers(text);
          // const extractedIfscCodes = extractIfscCodes(text);
          const extractedvendor = extractVendor(text);
          const extractedInvoiceDate = extractInvoiceDate(text);
          // const extractedCustomerID = extractCustomerID(text);
          // const extractedWeight = extractWeight(text);
          // const extractedVolume = extractVolume(text);
          // const extractedChargeable = extractChargeable(text);
          const extractedInnvoicenum = extractInnvoiceNum(text);
          // const extractedCgst = extractCgst(text);
          // const extractedIgst = extractIgst(text);
          // const extractedSgst = extractSgst(text);

          // const extractedPackages = extractPackages(text);
          // const extractedInnvoicecurrency = extractInnvoicecurrency(text);

          // const extractedConsole = extractConsole(text);
          // const extractedCartons = extractCartons(text);
          // const extractedGoods = extractGoods(text);
          // const extractedPO = extractPO(text);
          // const extractedDt = extractDt(text);
          // const extractedPayref = extractPayref(text);
          // const extractedHouse = extractHouse(text);
          // const extractedContainers = extractContainers(text);
          // const extractedOcean = extractOcean(text);



          setGstNumbers(extractedGstNumbers);
          // setIfscCodes(extractedIfscCodes);
          setInvoiceDate(extractedInvoiceDate);
          setVendor(extractedvendor);
          // setCustomerID(extractedCustomerID);
          // setWeight(extractedWeight);
          // setVolume(extractedVolume);
          setInnvoicenum(extractedInnvoicenum);
          // setextractedInnvoiceamount(extractedInnvoiceamount);
          // setCgst(extractedCgst);
          // setIgst(extractedIgst);
          // setSgst(extractedSgst);

          // setChargeable(extractedChargeable);
          // setPackages(extractedPackages);
          // setInnvoicecurrency(extractedcurrency);
          // setPO(extractedPO);
          // setDt(extractedDt);
          // setpayref(extractedPayref);
          // setConsoles(extractedConsole);
          // setCartons(extractedCartons);
          // setGoods(extractedGoods);
          // setHouse(extractedHouse);
          // setContainers(extractedContainers);


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
                  percentage: parseFloat(taxAmountMatch[1]),
                  amount: parseFloat(taxAmountMatch[3]),
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

          console.log("Structured HSN Lines (JSON):", JSON.stringify(structuredHSNLines, null, 2));

          setExtractedData(structuredHSNLines);

          const result = {
            "Entire Data": allLines,
          };

          console.log("Result (JSON):", JSON.stringify(result, null, 2));
        });



    } else {
      message.error("Please select a file to upload.");
    }
  };


  const gstUploadFieldProps: UploadProps = {
    // Remove 'multiple' property
    onRemove: () => {
      setFile(null); // Clear the selected file when removed
      //   setBtnDisable(true); // Disable the "Upload" button
    },
    beforeUpload: async (file: any) => {
      if (!file.name.match(/\.(pdf|jpg|jpeg|png)$/)) {
        message.error("Only pdf and image files are allowed!");
        return false;
      }

      Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) }).then(({ data: { text } }) => {
        console.log(text);
      });

      setFile(file); // Set the selected file
      //   setBtnDisable(false); // Enable the "Upload" button
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

  return (

    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'stretch' }}>
      <Card title="Upload Document" bordered={true} style={{ flex: 1 }} headStyle={{ backgroundColor: '#77dfec', border: 0 }}>
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
                  showUploadList={false} // Add this prop to hide the file name display
                >
                  <Button
                    key="file"
                    style={{ color: 'black', backgroundColor: '#7ec1ff' }}
                    icon={<UploadOutlined />}

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
                  style={{ position: 'relative', top: '10px' }}
                  onClick={handleUploadDocument}
                  disabled={isLoading} // Disable the button when isLoading is true.
                >
                  {isLoading ? 'Uploading...' : 'Upload'}
                  {isLoading && (
                    <div
                      style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999, // Ensure it appears above other elements
                        background: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
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
      style={{ flex: 1, position: 'relative' }}
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


      <Form>
      <div style={{ display: 'flex', flexDirection: 'column', height: '-10px', }}>
        <Card
          title={"Document"}
          headStyle={{ backgroundColor: '#77dfec', border: 0 }}
          bordered={true}
          style={{
            flex: 1,
            width: '720px',
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

              <Col span={6}>
                <label htmlFor="GST" style={{ color: 'black', fontWeight: 'bold' }}>
                  GST
                </label>
                <Input
                  title="GST"
                  name="GST"
                  style={{ width: '150px', height: '30px' }}
                  value={gstNumbers}
                  onChange={(e) => setGstNumbers(e.target.value)}
                />
              </Col>
              <Col span={6}>
                <label htmlFor="Vendor" style={{ color: 'black', fontWeight: 'bold' }}>Vendor</label>
                <Select
                  id="Vendor"
                  style={{ width: "150px" }}
                  value={vendor}
                  onChange={(value) => setVendor(value)}
                  defaultValue="option1"

                >
                  <Select.Option value="option1">EXPO FREIGHT PVT LTD</Select.Option>
                  <Select.Option value="option2">API LOGISTICS PVT LTD</Select.Option>
                  <Select.Option value="option3">Option 3</Select.Option>
                </Select>
              </Col>

              <Col span={6}>
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
                    // value={invoiceDate}
                    onChange={handleDateChange}
                  />
                </div>
              </Col>
              <Col span={6}>
                <label htmlFor="InnvoiceNumber" style={{ color: 'black', fontWeight: 'bold' }}>InnvoiceNumber</label>
                <Input
                  id="InnvoiceNumber"
                  name="InnvoiceNumber"
                  style={{ width: "150px", height: "30px" }}
                  value={Innvoicenum}
                  onChange={(e) => setInnvoicenum(e.target.value)}
                />
              </Col>

              {/* 
              <Col span={6}>
                <label htmlFor="Packages" style={{ color: 'black', fontWeight: 'bold' }}>Packages</label>
                <Input
                  id="Packages"
                  name="Packages"
                  style={{ width: "150px", height: "30px" }}
                  value={packages}
                  onChange={(e) => setPackages(e.target.value)}
                />
              </Col> */}
            </Row>

            <Row gutter={24} style={{ marginTop: '20px' }}>
              {/* <Col span={6}>
                <label htmlFor="Cgst" style={{ color: 'black', fontWeight: 'bold' }}>CSGT</label>
                <Input
                  id="Cgst"
                  name="Cgst"
                  style={{ width: "150px", height: "30px" }}
                  value={Cgst}
                  onChange={(e) => setCgst(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="IGST" style={{ color: 'black', fontWeight: 'bold' }}>IGST</label>
                <Input
                  id="IGST"
                  name="IGST"
                  style={{ width: "150px", height: "30px" }}
                  value={Igst}
                  onChange={(e) => setIgst(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="Sgst" style={{ color: 'black', fontWeight: 'bold' }}>SGST</label>
                <Input
                  id="Sgst"
                  name="Sgst"
                  style={{ width: "150px", height: "30px" }}
                  value={Sgst}
                  onChange={(e) => setSgst(e.target.value)}
                />
              </Col> */}
              <Col span={6}>
                <label htmlFor="Cgst" style={{ color: 'black', fontWeight: 'bold' }}>CSGT</label>
                <Input
                  id="Cgst"
                  name="Cgst"
                  style={{ width: "150px", height: "30px" }}
                  value={Cgst}
                  onChange={(e) => setCgst(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="IGST" style={{ color: 'black', fontWeight: 'bold' }}>IGST</label>
                <Input
                  id="IGST"
                  name="IGST"
                  style={{ width: "150px", height: "30px" }}
                  value={Igst}
                  onChange={(e) => setIgst(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="Sgst" style={{ color: 'black', fontWeight: 'bold' }}>SGST</label>
                <Input
                  id="Sgst"
                  name="Sgst"
                  style={{ width: "150px", height: "30px" }}
                  value={Sgst}
                  onChange={(e) => setSgst(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="InnvoiceAmount" style={{ color: 'black', fontWeight: 'bold' }}>InnvoiceAmount</label>
                <Input
                  id="InnvoiceAmount"
                  name="InnvoiceAmount"
                  style={{ width: "150px", height: "30px" }}
                  value={Innvoiceamount}
                  onChange={(e) => setInnvoiceamount(e.target.value)}
                />
              </Col>

            </Row>
            {/* 
            <Row gutter={24} style={{ marginTop: '20px' }}>
              <Col span={6}>
                <label htmlFor="Consoles" style={{ color: 'black', fontWeight: 'bold' }}>Consoles</label>
                <Input
                  id="Consoles"
                  name="Consoles"
                  style={{ width: "150px", height: "30px" }}
                  value={consoles}
                  onChange={(e) => setConsoles(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="Cartons" style={{ color: 'black', fontWeight: 'bold' }}>Cartons</label>
                <Input
                  id="Cartons"
                  name="Cartons"
                  style={{ width: "150px", height: "30px" }}
                  value={cartons}
                  onChange={(e) => setCartons(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="Po" style={{ color: 'black', fontWeight: 'bold' }}>PO</label>
                <Input
                  id="Po"
                  name="Po"
                  style={{ width: "150px", height: "30px" }}
                  value={po}
                  onChange={(e) => setPO(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="Date" style={{ color: 'black', fontWeight: 'bold' }}>Date</label>
                <Input
                  id="Date"
                  name="Date"
                  style={{ width: "150px", height: "30px" }}
                  value={dt}
                  onChange={(e) => setDt(e.target.value)}
                />
              </Col>

            </Row> */}

            <Row gutter={24} style={{ marginTop: '20px' }}>
              {/* <Col span={6}>
                <label htmlFor="Payref" style={{ color: 'black', fontWeight: 'bold' }}>Payref</label>
                <Input
                  id="Payref"
                  name="Payref"
                  style={{ width: "150px", height: "30px" }}
                  value={payref}
                  onChange={(e) => setpayref(e.target.value)}
                />
              </Col> */}

              {/* <Col span={6}>
                <label htmlFor="House" style={{ color: 'black', fontWeight: 'bold' }}>House</label>
                <Input
                  id="House"
                  name="House"
                  style={{ width: "150px", height: "30px" }}
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                />
              </Col> */}

              <Col span={6}>
                <label htmlFor="Innvoice Currency" style={{ color: 'black', fontWeight: 'bold' }}>Innvoice Currency</label>
                <Input
                  id="Innvoice Currency"
                  name="Innvoice Currency"
                  style={{ width: "150px", height: "30px" }}
                  value={Innvoicecurrency}
                  onChange={(e) => setInnvoicecurrency(e.target.value)}
                />
              </Col>

              {/* <Col span={6}>
                <label htmlFor="Goods" style={{ color: 'black', fontWeight: 'bold' }}>Goods</label>
                <Input
                  id="Goods"
                  name="Goods"
                  style={{ width: "150px", height: "30px" }}
                  value={goods}
                  onChange={(e) => setGoods(e.target.value)}
                />
              </Col>

              <Col span={6}>
                <label htmlFor="Containers" style={{ color: 'black', fontWeight: 'bold' }}>Containers</label>
                <Input
                  id="Containers"
                  name="Containers"
                  style={{ width: "150px", height: "30px" }}
                  value={containers}
                  onChange={(e) => setContainers(e.target.value)}
                />
              </Col> */}
            </Row>
          </Form.Item>
        </Card>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <Card title="HSN Details"
          headStyle={{ backgroundColor: '#77dfec', border: 0 }}
          bordered={true} style={{ flex: 1, position: "relative", left: "735px", bottom: "810px" }} >
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
              {/* <Col span={6}>
                <label htmlFor="Percentage" style={{ color: 'black', fontWeight: 'bold' }}>Percentage</label>
                <Input
                  id="Percentage"
                  name="Percentage"
                  style={{ width: '150px', height: '30px' }}
                  value={Percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </Col> */}
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
            </Row>
          </Form>
          {/* <Button style={{ position: "relative", top: "10px" }} type="primary" onClick={handleAddToTable}> */}
          <Button style={{ position: "relative", top: "10px" }} type="primary" onClick={handleAddToTable}>{isEditing ? buttonText : "Add"}
          </Button>
          <Table style={{ position: "relative", top: "20px" }} dataSource={extractedData} columns={columns} />
        </Card>
      </div>
    </Form>
    </div>

  );
}

export default UploadDocumentForm;
