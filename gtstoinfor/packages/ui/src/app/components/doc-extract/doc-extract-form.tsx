import React, { useState } from "react";
import { Steps, Divider, Select, Spin, message, Button, Input } from "antd";
import Tesseract from "tesseract.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;
const { Option } = Select;

const Form: React.FC = () => {
    const navigate = useNavigate();

    const [imageScale, setImageScale] = useState(1);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [cursorStyle, setCursorStyle] = useState('auto');
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [current, setCurrent] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const [imageText, setImageText] = useState("");
    const [originalImageText, setOriginalImageText] = useState("");
    const [showText, setShowText] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [gstNumbers, setGstNumbers] = useState("any");
    const [ifscCodes, setIfscCodes] = useState("any");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [packages, setPackages] = useState("any");
    const [customerID, setCustomerID] = useState("any");
    const [weight, setWeight] = useState("");
    const [volume, setVolume] = useState("");
    const [chargeable, setChargeable] = useState("");
    const [console, setConsole] = useState("");
    const [cartons, setCartons] = useState("");
    const [po, setPO] = useState("");
    const [dt, setDt] = useState("");
    const [payref, setpayref] = useState("");

    const [quantity, setQuantity] = useState("any");
    const [innNumber, setInnnumber] = useState("");
    const [currency, setCurrency] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const [customerno, setCustomerNo] = useState("");
    const [ackdata, setAckdata] = useState("");
    const [pannumber, setPannumber] = useState("");
    const [amountdue, setAmountdue] = useState("");

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedImage = event.target.files && event.target.files[0];
        if (uploadedImage) {
            setFileSelected(true);
            const {
                data: { text },
            } = await Tesseract.recognize(uploadedImage);

            setImage(uploadedImage);
            setImageText(text);
            setOriginalImageText(text);
            setCurrent(1);

            const extractedGstNumbers = extractGstNumbers(text);
            const extractedIfscCodes = extractIfscCodes(text);
            const extractedInvoiceDate = extractInvoiceDate(text);
            const extractedCustomerID = extractCustomerID(text);
            const extractedWeight = extractWeight(text);
            const extractedVolume = extractVolume(text);
            const extractedChargeable = extractChargeable(text);
            const extractedPackages = extractPackages(text);
            const extractedConsole = extractConsole(text);
            const extractedCartons = extractCartons(text);
            const extractedPO = extractPO(text);
            const extractedDt = extractDt(text);
            const extractedPayref = extractPayref(text);

            const extractedQuantity = extractQuantity(text);
            const extractedInnNumber = extractInnNumber(text);
            const extractedCurrency = extractCurrency(text);
            const extractedOrigin = extractOrigin(text);
            const extractedDestination = extractDestination(text);

            const extractedCustomerNo = extractCustomerNo(text);
            const extractedAckdata = extractAckdata(text);
            const extractedPannumber = extractPannumber(text);
            const extractedAmountdue = extractAmountdue(text);

            setGstNumbers(extractedGstNumbers);
            setIfscCodes(extractedIfscCodes);
            setInvoiceDate(extractedInvoiceDate);
            setCustomerID(extractedCustomerID);
            setWeight(extractedWeight);
            setVolume(extractedVolume);
            setChargeable(extractedChargeable);
            setPackages(extractedPackages);
            setPO(extractedPO);
            setDt(extractedDt);
            setpayref(extractedPayref);
            setConsole(extractedConsole);
            setCartons(extractedCartons);

            setQuantity(extractedQuantity);
            setInnnumber(extractedInnNumber);
            setCurrency(extractedCurrency);
            setOrigin(extractedOrigin);
            setDestination(extractedDestination);

            setCustomerNo(extractedCustomerNo);
            setAckdata(extractedAckdata);
            setPannumber(extractedPannumber);
            setAmountdue(extractedAmountdue);
        }
    };

    //* Type 1*//
    const extractGstNumbers = (text) => {
        const gstNumberRegex =
            /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[A-Z0-9]{1}/g;
        const matches = text.match(gstNumberRegex);
        const extractedGstNumbers = matches || [];
        setGstNumbers(extractedGstNumbers);
        return extractedGstNumbers;
    };

    const extractIfscCodes = (text) => {
        const ifscCodeRegex = /[A-Z]{4}0[A-Z0-9]{6}/g;
        const matches = text.match(ifscCodeRegex);
        const extractedIfscCodes = matches || [];
        setIfscCodes(extractedIfscCodes);
        return extractedIfscCodes;
    };

    const extractInvoiceDate = (text) => {
        const invoiceDateRegex =
            /\b(?:\d{1,2}-[A-Za-z]{3}-\d{2}|\d{4} [A-Za-z]{3} \d{1,2}|\d{1,2}\/\d{1,2}\/(?:\d{2}|\d{4}))\b/g;
        const match = text.match(invoiceDateRegex);
        const extractedInvoiceDate = match ? match[0] : "";
        return extractedInvoiceDate;
    };




    const extractWeight = (text) => {
        const weightRegex = /((\d*\.?\d+)\s*(lbs?|KG))/i;
        const match = text.match(weightRegex);
        const extractedWeight = match ? match[1] : "";
        return extractedWeight;
    };

    const extractVolume = (text) => {
        const volumeRegex = /((\d*\.?\d+)([A-Za-z\s])\s*(lbs?|M3))/i;
        const match = text.match(volumeRegex);
        const extractedVolume = match ? match[1] : "";
        return extractedVolume.trim();
    };

    const extractChargeable = (text) => {
        const chargeableRegex = /((\d*\.?\d+)([A-Za-z\s])+\s*(lbs?|M3))/i;
        const match = text.match(chargeableRegex);
        const extractedChargeable = match ? match[1] : "";
        return extractedChargeable.trim();
    };

    const extractCustomerID = (text) => {
        const customerIDRegex = /\bCUSTOMER ID:\s*([A-Za-z\s]+)\b/i;
        const match = text.match(customerIDRegex);
        const extractedCustomerID = match ? match[1] : "";
        return extractedCustomerID.trim();
    };

    const extractPackages = (text) => {
        const packagesRegex = /((\d*\.?\d+)\s*(?:CTN|CTNS))\b/i;
        const match = text.match(packagesRegex);
        const extractedPackages = match ? match[1] : "";
        setPackages(extractedPackages);
        return extractedPackages.trim();
    };

    const extractConsole = (text) => {
        const ConsoleRegex = /\b[A-Za-z]\d{11}\b/g;
        const match = text.match(ConsoleRegex);
        const extractedConsole = match ? match[1] : "";
        return extractedConsole.trim();
    };

    const extractCartons = (text) => {
        const cartonsRegex = /((\d+)\s*(\d+\s*%))/;
        const match = text.match(cartonsRegex);
        const extractedCartons = match ? match[1] : "";
        return extractedCartons.trim();
    };

    const extractPO = (text) => {
        const poRegex = /([A-Z]{1}[0-9]{4})-/;
        const match = text.match(poRegex);
        const extractedPO = match ? match[1] : "";
        return extractedPO.trim();
    };

    const extractDt = (text) => {
        const dtRegex = /((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[1,2])\/(19|20)\d{2})/;
        const match = text.match(dtRegex);
        const extractedDt = match ? match[1] : "";
        return extractedDt.trim();
    };

    const extractPayref = (text) => {
        const payrefRegex = /\b[A-Za-z]\d{11}\b/g;
        const match = text.match(payrefRegex);
        const extractedPayref = match ? match[0] : "";
        return extractedPayref;
    };

    //*Type 2*//

    const extractQuantity = (text) => {
        const quantityRegex = /(\d+)\s*(PCS)/;
        const match = text.match(quantityRegex);
        const extractedQuantity = match ? match[0] : "";
        setQuantity(extractedQuantity);
        return extractedQuantity;
    };

    const extractInnNumber = (text) => {
        const innnumberRegex = /TN\d{6}T\d{6}/;
        const match = text.match(innnumberRegex);
        const extractedInnNumber = match ? match[0] : "";
        return extractedInnNumber;
    };

    const extractCurrency = (text) => {
        const currencyRegex = /(INR|DOLLARS|DINARS)/g;
        const match = text.match(currencyRegex);
        const extractedCurrency = match ? match[0] : "";
        return extractedCurrency;
    };

    const extractOrigin = (text) => {
        const originRegex = /TCR/g;
        const match = text.match(originRegex);
        const extractedOrigin = match ? match[0] : "";
        return extractedOrigin;
    };

    const extractDestination = (text) => {
        const destinationRegex = /JAL/g;
        const match = text.match(destinationRegex);
        const extractedDestination = match ? match[0] : "";
        return extractedDestination;
    };

    //* Type 3*//

    const extractCustomerNo = (text) => {
        const customerNoRegex = /IN\d{8}/g;
        const match = text.match(customerNoRegex);
        const extractedCustomerNo = match ? match[0] : "";
        return extractedCustomerNo;
    };

    const extractAckdata = (text) => {
        const AckdataRegex = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/g;
        const match = text.match(AckdataRegex);
        const extractedAckdata = match ? match[0] : "";
        return extractedAckdata;
    };

    const extractPannumber = (text) => {
        const pannnumberRegex = /[A-Z]{5}[0-9]{4}[A-Z]/g;
        const match = text.match(pannnumberRegex);
        const extractedPannumber = match ? match[0] : "";
        return extractedPannumber;
    };

    const extractAmountdue = (text) => {
        const amountdueRegex = /\d{1,3}(?:,\d{3})*\.\d{2}/g;
        const match = text.match(amountdueRegex);
        const extractedAmountdue = match ? match[0] : "";
        return extractedAmountdue;
    };


    const handleZoomIn = () => {
        setImageScale(prevScale => prevScale + 0.2);
    };

    const handleZoomOut = () => {
        setImageScale(prevScale => Math.max(prevScale - 0.2));
    };

    const handleImageMouseDown = (e) => {
        isDragging = true;
        startPosition = { x: e.clientX, y: e.clientY };
        e.preventDefault();
      };
      
      const handleImageMouseMove = (e) => {
        if (!isDragging) return;
      
        const speedFactor = 15;
        const deltaX = (e.clientX - startPosition.x) * speedFactor;
        const deltaY = (e.clientY - startPosition.y) * speedFactor;
      
        setImagePosition((prevPosition) => ({
          x: prevPosition.x + deltaX,
          y: prevPosition.y + deltaY,
        }));
      
        startPosition = { x: e.clientX, y: e.clientY };
      };
      
      const handleImageMouseUp = () => {
        isDragging = false;
      };
      
      const handleImageZoom = (e) => {
        e.preventDefault(); 
        
        const zoomFactor = 0.3;
        const newScale = Math.min(3, Math.max(0.5, imageScale + (e.deltaY > 0 ? -zoomFactor : zoomFactor)));
      
        setImageScale(newScale);
      };
      
      let isDragging = false;
      let startPosition = { x: 0, y: 0 };
      



    const handleApplyClick = async () => {
        if (!fileSelected) {
            message.error("Select an Image File");
            return;
        } else {
            message.success('Applied Successfully');

        }

        setLoading(true);
        setShowText(true);
        setSelectedType(
            (document.querySelector(".ant-select-selection-item") as HTMLElement).innerText
        );
    };
    const handleCancelClick = () => {
        setShowText(false);
        setImageText(originalImageText);
        setCurrent(0);
        setLoading(false);
    };

    const handleBack = () => {
        navigate("/doc-extract/doc-extract-view");
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8003/typeo/postdata",
                {
                    typeId: selectedType,
                    GST: gstNumbers,
                    IFSC: ifscCodes,
                    Innvoice: invoiceDate,
                    Customer: customerID,
                    Packages: packages,
                    Volume: volume,
                    Weight: weight,
                    Chargeable: chargeable,
                    Date: dt,
                    Cartons: cartons,
                    Console: console,
                    PO: po,
                    Payref: payref,
                }
            );
            if (response.data.success) {
                message.success("Data submitted successfully");
                navigate("/doc-extract/doc-extract-view")
            } else {
                message.success("Data Submitted Succesfully");
                navigate("/doc-extract/doc-extract-view");
            }
        } catch (error) {
            message.error("Error occurred while submitting data");
        }
    };

    const handleSub = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8003/typetwo/postdata",
                {
                    typeId: selectedType,
                    Quantity: quantity,
                    InnvoiceNumber: innNumber,
                    Currency: currency,
                    Origin: origin,
                    Destination: destination,
                }
            );

            if (response.data.success) {
                message.success("Data submitted successfully");
                navigate("/doc-extract/doc-extract-view")
            } else {
                message.success("Data Submitted Succesfully");
                navigate("/doc-extract/doc-extract-view")

            }
        } catch (error) {
            message.error("Error occurred while submitting data");
        }
    };

    const handleSumbmitting = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8003/typethree/postdata",
                {
                    typeId: selectedType,
                    CustomerNo: customerno,
                    Acknumber: ackdata,
                    Pannumber: pannumber,
                    Amountdue: amountdue,
                }
            );

            if (response.data.success) {
                message.success("Data submitted successfully");
                navigate("/doc-extract/doc-extract-view")
            } else {
                message.success("Data Submitted Succesfully");
                navigate("/doc-extract/doc-extract-view")
            }
        } catch (error) {
            message.error("Error occurred while submitting data");
        }
    };

    return (
        <div>
            <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
                <Steps current={current} className="steps-container">
                    <Step key={0} title="Step 1" />
                    <Step key={1} title="Step 2" />
                </Steps>
            </div>

            <Divider />

            <div style={{ display: "flex", justifyContent: "center" }}>
  <div style={{ width: "50%", marginRight: "20px" }}>
    {current === 1 && image && (
      <div
        style={{
          maxHeight: "70vh",
          overflowX:"scroll",
          overflowY:"scroll",
          maxWidth: "100%",
        }}
      >
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          style={{
            maxWidth: "100%",
            position: "relative",
            transform: `scale(${imageScale}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
            transition: "transform 0.3s ease-in-out",
            cursor: cursorStyle,
          }}
          onMouseDown={handleImageMouseDown}
          onMouseMove={handleImageMouseMove}
          onMouseUp={handleImageMouseUp}
          onMouseEnter={() => setCursorStyle("grab")}
          onMouseLeave={() => setCursorStyle("auto")}
          onWheel={handleImageZoom}
        />
      </div>
    )}
  </div>
                <div style={{ width: "50%" }}>
                    {current === 0 && (
                        <>
                            <div>
                                <input
                                    disabled={loading}
                                    style={{ marginLeft: "-170px", marginTop: "100px" }}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div >
                                <Select
                                    disabled={loading}
                                    defaultValue="PO"
                                    style={{ width: 120, marginLeft: "-320px", top: "-25px" }}
                                    onChange={() => setSelectedType("")}
                                >
                                    <Option value="type1">PO</Option>
                                    <Option value="type2">NON-PO</Option>
                                    {/* <Option value="type3">Type 3</Option> */}
                                </Select>
                            </div>
                            <div >
                                <Button type="primary" style={{ left: "100px", top: "-60px", height: "40px", width: "80px" }} onClick={handleApplyClick} disabled={loading}>
                                    Apply
                                </Button>
                                &nbsp;
                                <Button type="primary" style={{ left: "105px", top: "-60px", height: "40px", width: "80px" }} onClick={handleBack} disabled={loading}>
                                    View
                                </Button>
                            </div>
                            <div>
                                {loading ? <Spin size="large" style={{ position: "relative", left: "-100px" }} /> : ""}
                            </div>

                        </>
                    )}
                    {current === 1 && showText && (
                        <div style={{ position: "relative", top: "380px" }}>
                            {selectedType === "PO" && (

                                <>
                                    <div>
                                       <Button
                    type="primary"
                    onClick={handleZoomIn}
                    onMouseEnter={() => setCursorStyle('zoom-in')}
                    onMouseLeave={() => setCursorStyle('auto')}
                    style={{
                        marginRight: '10px',
                        position: "relative",
                        right: "300px",
                        top: "130px",
                        cursor: cursorStyle,
                    }}
                    disabled={imageScale >= 3}
                >
                    Zoom In
                </Button>
                <Button
                    type="primary"
                    onClick={handleZoomOut}
                    onMouseEnter={() => setCursorStyle('zoom-out')}
                    onMouseLeave={() => setCursorStyle('auto')}
                    style={{
                        marginRight: '10px',
                        position: "relative",
                        right: "300px",
                        top: "130px",
                        cursor: cursorStyle,
                    }}
                    disabled={imageScale <= 1}
                >
                    Zoom Out
                </Button>
                                    </div>
                                    <div style={{ position: "relative", top: "470px", right: "600px" }}>
                                        <div style={{ position: "relative", bottom: "870px", left: "650px" }} >
                                            <h4 style={{ left: "30px", position: "relative" }}> GST Number </h4>
                                            <Input
                                                name="GST"
                                                style={{ width: "150px", height: "30px" }}
                                                value={gstNumbers}
                                                onChange={(e) => setGstNumbers(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "948px", left: "830px" }}>
                                            <h4 style={{ left: "30px", position: "relative" }}> IFSC Code </h4>
                                            <Input
                                                name="IFSC"
                                                style={{ width: "150px", height: "30px" }}
                                                value={ifscCodes}
                                                onChange={(e) => setIfscCodes(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "1027px", left: "1010px" }}>
                                            <h4 style={{ left: "30px", position: "relative" }}> Invoice Date</h4>
                                            <Input
                                                name="Innvoice"
                                                style={{ width: "150px", height: "30px" }}
                                                value={invoiceDate}
                                                onChange={(e) => setInvoiceDate(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "912px", left: "650px" }} >
                                            <h4 style={{ left: "30px", position: "relative" }}>Payref</h4>
                                            <Input
                                                name="Payref"
                                                style={{ width: "150px", height: "30px" }}
                                                value={payref}
                                                onChange={(e) => setpayref(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "990px", left: "830px" }} >
                                            <h4 style={{ left: "30px", position: "relative" }}> Customer ID</h4>
                                            <Input
                                                name="Customer"
                                                style={{ width: "150px", height: "30px" }}
                                                value={customerID}
                                                onChange={(e) => setCustomerID(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "1068px", left: "1010px" }} >
                                            <h4 style={{ left: "30px", position: "relative" }}> Volume</h4>
                                            <Input
                                                name="Volume"
                                                style={{ width: "150px", height: "30px" }}
                                                value={volume}
                                                onChange={(e) => setVolume(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "1240px", left: "650px" }}>
                                            <h4 style={{ left: "30px", position: "relative" }} > Weight</h4>
                                            <Input
                                                name="Weight"
                                                style={{ width: "150px", height: "30px" }}
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "1318px", left: "830px" }} >
                                            <h4 style={{ left: "30px", position: "relative" }} > Chargeable</h4>
                                            <Input
                                                name="Chargeable"
                                                style={{ width: "150px", height: "30px" }}
                                                value={chargeable}
                                                onChange={(e) => setChargeable(e.target.value)}
                                            />
                                        </div>
                                        <div style={{ position: "relative", bottom: "1396px", left: "1010px" }} >
                                            <h4 style={{ left: "30px", position: "relative" }}>Date</h4>
                                            <Input
                                                name="Date"
                                                style={{ width: "150px", height: "30px" }}
                                                value={dt}
                                                onChange={(e) => setDt(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "1290px", left: "650px" }} >
                                            <h4 style={{ left: "30px", position: "relative" }} > Cartons</h4>
                                            <Input
                                                name="Cartons"
                                                style={{ width: "150px", height: "30px" }}
                                                value={cartons}
                                                onChange={(e) => setCartons(e.target.value)}
                                            />
                                        </div>
                                        <div style={{ position: "relative", bottom: "1367px", left: "830px" }}>
                                            <h4 style={{ left: "30px", position: "relative" }} > Console</h4>
                                            <Input
                                                name="Console"
                                                style={{ width: "150px", height: "30px" }}
                                                value={console}
                                                onChange={(e) => setConsole(e.target.value)}
                                            />
                                        </div>
                                        <div style={{ position: "relative", bottom: "1444px", left: "1010px" }} >
                                            <h4 style={{ left: "45px", position: "relative" }}>PO</h4>
                                            <Input
                                                name="PO"
                                                style={{ width: "150px", height: "30px" }}
                                                value={po}
                                                onChange={(e) => setPO(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ position: "relative", bottom: "1430px", left: "650px" }}>
                                            <h4 style={{ left: "30px", position: "relative" }} > Packages</h4>
                                            <Input
                                                name="Packages"
                                                style={{ width: "150px", height: "30px" }}
                                                value={packages}
                                                onChange={(e) => setPackages(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div >
                                        <Button type="primary" onClick={handleSubmit} style={{ position: "relative", bottom: "930px", left: "55px" }}>
                                            Submit
                                        </Button>
                                        <Button type="primary"
                                            onClick={handleCancelClick} style={{ position: "relative", bottom: "930px", left: "65px" }}>
                                            Cancel
                                        </Button>
                                    </div>
                                </>
                            )}
                            
                            <div style={{ position: "relative", top: "10px", right: "600px" }}>
                                {selectedType === "NON-PO" && (
                                    <>
                                        <div>
                                            <Button
                                                type="primary"
                                                onClick={handleZoomIn}
                                                style={{ position: "relative", top: "100px", left: "290px", }}
                                                disabled={imageScale >= 3}
                                            >
                                                Zoom In
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={handleZoomOut}
                                                style={{ position: "relative", top: "100px", left: "300px", }}
                                                disabled={imageScale <= 1}
                                            >
                                                Zoom Out
                                            </Button>
                                        </div>
                                        <div >
                                            <div style={{ position: "relative", bottom: "400px", left: "700px" }}>
                                                <h4 style={{ left: "30px", position: "relative" }}> Quantity </h4>
                                                <Input
                                                    name="Quantity"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ position: "relative", bottom: "478px", left: "880px" }} >
                                                <h4 style={{ left: "30px", position: "relative" }}> Inn Number </h4>
                                                <Input
                                                    name="InnvoiceNumber"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={innNumber}
                                                    onChange={(e) => setInnnumber(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ position: "relative", bottom: "465px", left: "700px" }} >
                                                <h4 style={{ left: "30px", position: "relative" }}> Currency</h4>
                                                <Input
                                                    name="Currency"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={currency}
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div >
                                            <div style={{ position: "relative", bottom: "542px", left: "880px", }} >
                                                <h4 style={{ left: "30px", position: "relative" }}> Origin</h4>
                                                <Input
                                                    name="Origin"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={origin}
                                                    onChange={(e) => setOrigin(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ position: "relative", bottom: "542px", left: "700px", }} >
                                                <h4 style={{ left: "30px", position: "relative" }}> Destination</h4>
                                                <Input
                                                    name="Destination"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={destination}
                                                    onChange={(e) => setDestination(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div >
                                            <Button type="primary" onClick={handleSub} style={{ position: "relative", bottom: "510px", left: "699px" }} >
                                                Submit
                                            </Button>
                                            <Button type="primary"
                                                onClick={handleCancelClick}
                                                style={{ position: "relative", bottom: "510px", left: "710px" }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div style={{ position: "relative", top: "70px", right: "600px" }}>
                                {selectedType === "Type 3" && (
                                    <>
                                        <div>
                                            <Button
                                                type="primary"
                                                onClick={handleZoomIn}
                                                style={{ position: "relative", top: "40px", left: "290px", }}
                                                disabled={imageScale >= 3}
                                            >
                                                Zoom In
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={handleZoomOut}
                                                style={{ position: "relative", top: "40px", left: "300px", }}
                                                disabled={imageScale <= 1}
                                            >
                                                Zoom Out
                                            </Button>
                                        </div>
                                        <div >
                                            <div style={{ position: "relative", bottom: "450px", left: "700px" }}>
                                                <h4 style={{ left: "30px", position: "relative" }}> Customer No </h4>
                                                <Input
                                                    name="CustomerNo"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={customerno}
                                                    onChange={(e) => setCustomerNo(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ position: "relative", bottom: "528px", left: "880px" }} >
                                                <h4 style={{ left: "30px", position: "relative" }} >ACK No</h4>
                                                <Input
                                                    name="Acknumber"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={ackdata}
                                                    onChange={(e) => setAckdata(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ position: "relative", bottom: "515px", left: "700px" }} >
                                                <h4 style={{ left: "30px", position: "relative" }}> Pan Number</h4>
                                                <Input
                                                    name="Pannumber"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={pannumber}
                                                    onChange={(e) => setPannumber(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div >
                                            <div style={{ position: "relative", bottom: "592px", left: "880px" }} >
                                                <h4 style={{ left: "30px", position: "relative" }}> Amount Due</h4>
                                                <Input
                                                    name="Amountdue"
                                                    style={{ width: "150px", height: "30px" }}
                                                    value={amountdue}
                                                    onChange={(e) => setAmountdue(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div >
                                            <Button type="primary" onClick={handleSumbmitting} style={{ position: "relative", bottom: "560px", left: "699px" }} >
                                                Submit
                                            </Button>
                                            <Button type="primary" onClick={handleCancelClick} style={{ position: "relative", bottom: "560px", left: "710px" }} >
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Form;
