import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Card, Row, Col, Upload, message, UploadProps, DatePicker, FormInstance, InputNumber, Button, Spin, Alert, notification, Grid } from 'antd';
import QrReader from 'react-qr-scanner';

/* eslint-disable-next-line */
export interface QrScannerProps {
    handleScan: (value: any) => void;
  }

export function QrScanner(
  props: QrScannerProps
) {

  const [data, setData] = useState('No result');
  const qrRef = useRef(null);
  const [scanResultWebCam, setScanResultWebCam] = useState('');

  const handleErrorWebCam = (error) => {
    console.log(error);
}
const handleScanWebCam = (result) => {
    if (result) {
        setScanResultWebCam(result);
        props.handleScan(result)
    }
}


  return (
  <>
                <Row>
                    <Col  span={24}>
                        <h3>Scan </h3><br /><br />
                        <QrReader
                            delay={300}
                            style={{ width: '100%',height:"50%" }}
                            onError={handleErrorWebCam}
                            onScan={handleScanWebCam}
                        />
                     </Col>
                
                </Row>
                
  </>
  );
}

export default QrScanner;