import React, { useState } from "react";
import { Select, Spin, message, Button, Input, Row, Form } from "antd";
import Tesseract from "tesseract.js";
import { useNavigate,useLocation } from "react-router-dom";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {SharedService} from "../../../../../libs/shared-services/src/scan/scan-service";
import axios from "axios";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AllScanDto } from "packages/libs/shared-models/src/shared-model/scan.dto";

const { Option } = Select;

const  DocForm = () => {
    const navigate = useNavigate();

    const service = new SharedService();

    const [form] =Form.useForm();
  const { state }: any = useLocation();
  const { data } = state ? state : { data: null };



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
    const [consoles, setConsoles] = useState("");
    const [cartons, setCartons] = useState("");
    const [po, setPO] = useState("");
    const [dt, setDt] = useState("");
    const [payref, setpayref] = useState("");
    const [igst, setIgst] = useState("");
    const [charges, setCharges] = useState("");

    const [goods, setGoods] =useState("");


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
            console.log("imageText");
            console.log(imageText);


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
            const extractedIgst = extractIgst(text);
            const extractedCharges = extractCharges(text);
            const extractedGoods=extractGoods(text);



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
            setConsoles(extractedConsole);
            setCartons(extractedCartons);
            setIgst(extractedIgst);
            setCharges(extractedCharges);
            setGoods(extractedGoods);

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


    const extractIgst = (text) => {
        const igstRegex = /\[HSN:\s*(\d+)\]\s*([^0-9]+)\s*(\d+GST\s+18%=[\d,.]+)\s*([\d,.]+)/g;
        const match = text.match(igstRegex);
        const extractedIgst = match ? match[0] : "";
        return extractedIgst;
    };


    const extractCharges = (text) => {
        const chargesRegex = /\[HSN:\s*(\d+)\]\s*([\w\s-]+?)\s*(\d+GST\s+18%=[\d,.]+)\s*([\d,.]+)/g;
        const match = text.match(chargesRegex);
        const extractedCharges = match ? match[0] : "";
        return extractedCharges;
    };

    
    const extractGoods = (text) => {
        const goodsRegex =/CARTONS\s*:\s*(\d+)\s*(\d+%)\s*(COTTON)\s*(\d+%)\s*(POLYESTER)\s*(\d+%)\s*(ELASTANE)\s*(\w+)\s*(MENS SHORTS)/;
        const match = text.match(goodsRegex);
        const extractedGoods = match ? match[0] : "";
        return extractedGoods;
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


    const handleSaveAsClick = () => {
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(image);
        anchor.download = 'image.jpg';
        anchor.click();
   
    };

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
        navigate("/scan-document/doc-extract-view");
    }

    const  onFinish = (values:AllScanDto) => {
        
        values.Gst=gstNumbers
        values.Ifsc=ifscCodes
        values.Innvoice=invoiceDate
        values.Volume=volume
        values.Customer=customerID
        values.Weight=weight
        values.Chargeable=chargeable
        values.Packages=packages
        values.Date=dt
        values.Cartons=cartons
        values.Console=consoles
        values.PO=po
        values.Payref=payref

        values.Quantity=quantity
        values.InnvoiceNumber=innNumber
        values.Currency=currency
        values.Origin=origin
        values.Destination=destination


        console.log(gstNumbers[0], "gst####################")
        console.log(values,"*****")
        service.postdata(values).then(res => {
            if (res.status) {
                message.success("Created Successfully");
                setTimeout(() => {
                    navigate("/scan-document/doc-extract-view");
                }, 500);
            } else {
                message.error("Error")
            }
        }).catch(err => {
            console.log(err.message)
        })
    };


    return (
        <div >
        
      
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "50%"}}>
                    {current === 1 && image && (
                        <Row
                            style={{
                                maxHeight: "59vh",
                                overflowX: "scroll",
                                overflowY: "scroll",
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
                        </Row>
                    )}
                </div>
                <div style={{ width: "50%" }}>
                    {current === 0 && (
                        <>
                            <input
                                disabled={loading}
                                style={{ position:"relative",top:"110px",right:"50px" }}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                            />
                            <Select
                                disabled={loading}
                                defaultValue="PO"
                                style={{ width: 120, position:"relative", right:"450px",top:"110px" }}
                                onChange={() => setSelectedType("")}
                            >
                                <Option value="type1">PO</Option>
                                <Option value="type2">NON-PO</Option>
                                {/* <Option value="type3">Type 3</Option> */}
                            </Select>
                            <Row style={{position:"relative", top:"130px", left:"50px"}}>
                            <Button type="primary" style={{ left: "100px", top: "-60px", height: "40px", width: "80px" }} onClick={handleApplyClick} disabled={loading}>
                                Apply
                            </Button>
                            &nbsp;
                            <Button type="primary" style={{ left: "105px", top: "-60px", height: "40px", width: "80px" }} onClick={handleBack} disabled={loading}>
                                View
                            </Button>
                          
                            {loading ? <Spin size="large" style={{ position: "relative",right:"170px" }} /> : ""}
                            </Row>

                        </>
                    )}
                    {current === 1 && showText && (
                        <div style={{ position: "relative", top: "380px" }}>
                            {selectedType === "PO" && (

                                <>
                                    <Row style={{position:"relative", right:"220px",top:"50px"}}>
                                        <Button
                                            type="primary"
                                            onClick={handleZoomIn}
                                            onMouseEnter={() => setCursorStyle('zoom-in')}
                                            onMouseLeave={() => setCursorStyle('auto')}
                                            style={{
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
                                                marginLeft:"10px",
                                                cursor: cursorStyle,
                                           }}
                                            disabled={imageScale <= 1}
                                        >
                                             Zoom Out
                                        </Button>
                                    </Row>
                                    <Form onFinish={onFinish} form={form} initialValues={data}>
                                    <Row style={{ position: "relative", bottom: "60px" }}>
                                        <Row style={{ position: "relative", bottom: "300px" }}>
                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}> GST Number </h4>
                                            <Input
                                                name="GST"
                                                style={{ width: "150px", height: "30px" }}
                                                value={gstNumbers}
                                                onChange={(e) => setGstNumbers(e.target.value)}
                                            />


                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}> IFSC Code </h4>
                                            <Input
                                                name="IFSC"
                                                style={{ width: "150px", height: "30px" }}
                                                value={ifscCodes}
                                                onChange={(e) => setIfscCodes(e.target.value)}
                                            />


                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}> Invoice Date</h4>
                                            <Input
                                                name="Innvoice"
                                                style={{ width: "150px", height: "30px",position:"relative",right:"12px"  }}
                                                value={invoiceDate}
                                                onChange={(e) => setInvoiceDate(e.target.value)}
                                            />
                                        </Row>

                                        <Row style={{ position: "relative", bottom: "270px", left: "43px" }}>
                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}>Payref</h4>
                                            <Input
                                                name="Payref"
                                                style={{ width: "150px", height: "30px" }}
                                                value={payref}
                                                onChange={(e) => setpayref(e.target.value)}
                                            />

                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}> Customer ID</h4>
                                            <Input
                                                name="Customer"
                                                style={{ width: "150px", height: "30px",position:"relative",right:"20px" }}
                                                value={customerID}
                                                onChange={(e) => setCustomerID(e.target.value)}
                                            />



                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}> Volume</h4>
                                            <Input
                                                name="Volume"
                                                style={{ width: "150px", height: "30px",position:"relative",left:"2px" }}
                                                value={volume}
                                                onChange={(e) => setVolume(e.target.value)}
                                            />

                                        </Row>

                                        <Row style={{ position: "relative", bottom: "240px", left: "43px" }}>
                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }} > Weight</h4>
                                            <Input
                                                name="Weight"
                                                style={{ width: "150px", height: "30px",position:"relative",right:"5px"  }}
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                            />

                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}> Chargeable</h4>
                                            <Input
                                                name="Chargeable"
                                                style={{ width: "150px", height: "30px",position:"relative",right:"15px"  }}
                                                value={chargeable}
                                                onChange={(e) => setChargeable(e.target.value)}
                                            />

                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}>Date</h4>
                                            <Input
                                                name="Date"
                                                style={{ width: "150px", height: "30px",position:"relative",left:"25px"  }}
                                                value={dt}
                                                onChange={(e) => setDt(e.target.value)}
                                            />

                                        </Row>

                                        <Row style={{ position: "relative", bottom: "220px", left: "43px" }}>
                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }} > Cartons</h4>
                                            <Input
                                                name="Cartons"
                                                style={{ width: "150px", height: "30px",position:"relative",right:"10px"   }}
                                                value={cartons}
                                                onChange={(e) => setCartons(e.target.value)}
                                            />

                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }} > Console</h4>
                                            <Input
                                                name="Consoles"
                                                style={{ width: "150px", height: "30px",position:"relative",left:"5px"   }}
                                                value={consoles}
                                                onChange={(e) => setConsoles(e.target.value)}
                                            />

                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }}>PO</h4>
                                            <Input
                                                name="PO"
                                                style={{ width: "150px", height: "30px",position:"relative",left:"60px"   }}
                                                value={po}
                                                onChange={(e) => setPO(e.target.value)}
                                            />

                                        </Row>

                                        <Row style={{ position: "relative", bottom: "200px", left: "43px" }}>
                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }} > Packages</h4>
                                            <Input
                                                name="Packages"
                                                style={{ width: "150px", height: "30px",position:"relative",right:"20px"   }}
                                                value={packages}
                                                onChange={(e) => setPackages(e.target.value)}
                                            />

                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }} > IGST</h4>
                                            <Input
                                                name="Igst"
                                                style={{ width: "150px", height: "30px",position:"relative",left:"15px"   }}
                                                value={igst}
                                                onChange={(e) => setIgst(e.target.value)}
                                            />

                                            <h4 style={{ left: "100px", position: "relative", bottom: "50px" }} > CHARGES</h4>
                                            <textarea
                                                name="Charges"
                                                style={{ width: "150px", height: "30px",position:"relative",left:"25px"   }}
                                                value={charges}
                                                onChange={(e) => setCharges(e.target.value)}
                                            />
                                        </Row>

                                        <Row>
                                        <h4 style={{ left: "100px", position: "relative", bottom: "100px" }} > CHARGES</h4>
                                            <textarea
                                                name="Goods Description"
                                                style={{ width: "150px", height: "30px",position:"relative",left:"25px",bottom:"50px"   }}
                                                value={goods}
                                                onChange={(e) => setGoods(e.target.value)}
                                            />
                                        </Row>

                                        {/* <Row style={{ position: "relative", bottom: "215px", left: "43px" }}>
                                            <Button type="primary" htmlType="submit"  style={{ position: "relative", left: "50px" }} >
                                                Submit
                                            </Button>
                                            <Button type="primary"
                                                style={{ position: "relative", left: "70px" }}
                                                onClick={handleCancelClick} >
                                                Cancel
                                            </Button>
                                            <Button
                                            type="primary"
                                                style={{ position: "relative", left: "90px" }}
                                                onClick={handleSaveAsClick}
                                            >
                                                Save As
                                            </Button>

                                        </Row> */}
                                    </Row>
                                    </Form>
                                </>
                            )}

                            <div >
                                {selectedType === "NON-PO" && (
                                    <>
                                        <Row style={{position:'relative',right:"230px",top:"50px"}}>
                                            <Button
                                                type="primary"
                                                onClick={handleZoomIn}
                                                disabled={imageScale >= 3}
                                            >
                                                Zoom In
                                            </Button>
                                            <Button
                                            style={{position:"relative",left:"10px"}}
                                                type="primary"
                                                onClick={handleZoomOut}
                                                disabled={imageScale <= 1}
                                            >
                                                Zoom Out
                                            </Button>
                                            </Row>
                                    <Form onFinish={onFinish} form={form} initialValues={data}>
                                            <Row>
                                                <h4 style={{ left: "85px", position: "relative",bottom:"400px" }}> Quantity </h4>
                                                <Input
                                                    name="Quantity"
                                                    style={{ width: "150px", height: "30px" ,position:"relative",bottom:"350px"}}
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                                <h4 style={{ left: "75px", position: "relative",bottom:"400px"  }}> Inn Number </h4>
                                                <Input
                                                    name="InnvoiceNumber"
                                                    style={{ width: "150px", height: "30px",position:"relative",bottom:"350px",right:"40px" }}
                                                    value={innNumber}
                                                    onChange={(e) => setInnnumber(e.target.value)}
                                                />
                                                <h4 style={{ left: "50px", position: "relative",bottom:"400px", }}> Currency</h4>
                                                <Input
                                                    name="Currency"
                                                    style={{ width: "150px", height: "30px",bottom:"350px",right:"45px"}}
                                                    value={currency}
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                />
                                                </Row>
                                                <Row>
                                                <h4 style={{ left: "85px", position: "relative",bottom:"370px" }}> Origin</h4>
                                                <Input
                                                    name="Origin"
                                                    style={{ width: "150px", height: "30px",bottom:"320px",left:"15px" }}
                                                    value={origin}
                                                    onChange={(e) => setOrigin(e.target.value)}
                                                />
                                   
                                                <h4 style={{ left: "85px", position: "relative",bottom:"370px"  }}> Destination</h4>
                                                <Input
                                                    name="Destination"
                                                    style={{ width: "150px", height: "30px",bottom:"320px",left:"-17px" }}
                                                    value={destination}
                                                    onChange={(e) => setDestination(e.target.value)}
                                                />
                                           </Row >
                                           <Row style={{position:"relative",bottom:"95px",left:"40px"}}>
                                            <Button type="primary" htmlType="submit" >
                                                Submit
                                            </Button>
                                            <Button type="primary"
                                            style={{position:"relative",left:"15px"}}
                                                onClick={handleCancelClick}
                                            >
                                                Cancel
                                            </Button>

                                            <Button
                                            type="primary"
                                                style={{ position: "relative", left: "30px" }}
                                                onClick={handleSaveAsClick}
                                            >
                                                Save As
                                            </Button>
                                            
                                            </Row>
                                           </Form>

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
                                        {/* <div >
                                            <Button type="primary" onClick={handleSumbmitting} style={{ position: "relative", bottom: "560px", left: "699px" }} >
                                                Submit
                                            </Button>
                                            <Button type="primary" onClick={handleCancelClick} style={{ position: "relative", bottom: "560px", left: "710px" }} >
                                                Cancel
                                            </Button>
                                        </div> */}
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


export default DocForm;
