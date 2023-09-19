import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { Descriptions, Tag, Button, Modal } from 'antd';
import ReactDOM from 'react-dom';
import { BarcodeCoulmnsDto, BarcodeHeadersDto } from '@project-management-system/shared-models';


export const getCssFromComponent = (fromDoc, toDoc) => {
    Array.from(fromDoc.styleSheets).forEach((styleSheet: any) => {
      if (styleSheet.cssRules) { // true for inline styles
        const newStyleElement = toDoc.createElement('style');
        Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
          newStyleElement.appendChild(toDoc.createTextNode(cssRule.cssText));
        });
        toDoc.head.appendChild(newStyleElement);
      }
    });
  }


export interface IBarcodePrintProps {
  barcodeInfo: BarcodeHeadersDto[];
  columns: BarcodeCoulmnsDto[];
  barcodeWidth?: number;
  barcodeHeight?: number;
  newWindow: boolean;
  
  className?: string;
  closeBarcodePopUp?: () => void;
  printBarcodes?: () => void;
  withOutModal?: boolean;
}

export const BarcodePrint = (
  props: IBarcodePrintProps,
) => {
    console.log(props);
  const [showBarcodePopUp, setShowBarcodePopUp] = useState<boolean>(true);
  let externalWindow: any;
  let containerEl: any;

  // Open in new Window
  if (props.newWindow) {
    externalWindow = window.open('', '', 'width=600,height=700,left=200,top=50');
    containerEl = externalWindow.document.createElement('div');
    externalWindow.document.body.appendChild(containerEl);
    externalWindow.document.title = 'Barcodes';
    getCssFromComponent(document, externalWindow.document);
  }

  const printBarcodes = () => {
    const pageContent = document.getElementById('printArea');
    console.log(pageContent);
    if (pageContent) {
      const divContents = pageContent.innerHTML;
      const element = window.open('', '', 'height=700, width=1024');
      if (element) {
        element.document.write(divContents);
        getCssFromComponent(document, element.document);
        element.document.close();
        element.print();
        element.close()
      }
      setShowBarcodePopUp(false);
      if (props.printBarcodes) {
        props.printBarcodes();      
      }
    }
  };
  const hideModal = () => {
    setShowBarcodePopUp(false);
    if (props.closeBarcodePopUp)
      props.closeBarcodePopUp();
  };

  function compareLineNumber(a, b) {
    return (a.lineNumber < b.lineNumber) ? -1 : 1;
  }

  const renderContent = () => {
    try {
      const barcodeInfo = props.barcodeInfo;
      // Set Acsending order of columns by position
      const acsOrderCoulmns = props.columns.sort(compareLineNumber);

      const barcodeWidthHandler = (barcodeWidth?: any) => {
        if (barcodeWidth){
          return  `${props.barcodeWidth}px`
        }
        return '384px'
      }
      const barcodeHeightHandler = (barcodeWidth?: any) => {
        if (barcodeWidth){
          return  `${props.barcodeWidth}px`
        }
        return '115px'
      }


      let keyCounter = 0;
      console.log(barcodeInfo);
      return barcodeInfo.map((record, index) => {        
        return (
          <React.Fragment key={'main' + keyCounter++}>
            <Descriptions key={'desc' + keyCounter++} column={4} style={{ width: barcodeWidthHandler(props.barcodeWidth), height: barcodeHeightHandler(props.barcodeHeight) , overflow: 'hidden',border:'1px solid' }} className={`barcode-label ${props.className ? props.className : ''}`} size='small'>
            {
              record['showSingleHr'] &&( 
              <Descriptions.Item key={'descitemLine' + keyCounter++} span={12} className={'top-hr-lines'}>
                  <div style={{backgroundColor: "black", color: "black", height: "6px", width: "400px"}}/>
              </Descriptions.Item>
                )
            } 
            {
              record['showDoubleHr'] &&( 
              <Descriptions.Item key={'descitemLine' + keyCounter++} span={12} className={'top-hr-lines'}>
                  <div style={{backgroundColor: "black", color: "black", height: "6px", width: "400px", marginBottom: "2px"}}/>
                  <div style={{backgroundColor: "black", color: "black", height: "6px", width: "400px"}}/>
              </Descriptions.Item>
                )
            } 
              {acsOrderCoulmns.map((barcodeDetails,_ix) => {
                const className = barcodeDetails.className ? barcodeDetails.className : '';
                // Set columns width
                const width = ((barcodeDetails.span / 4) * 100);
                // Set Barcode
                if (barcodeDetails.showBarcode) {
                  return <Descriptions.Item key={'descitembar' + keyCounter++} className={`barcode-lines barcode-column-width-${width}  ${className}`} span={barcodeDetails.span} >
                    {<Barcode value={record[barcodeDetails.dataIndex]}
                      displayValue={true} width={1} height={20} format='CODE128' />}</Descriptions.Item>;
                } else if (barcodeDetails.dataIndex === 'cartonNo') {
                  return <Descriptions.Item key={'descitemcarton' + keyCounter++} className={className} label={barcodeDetails.title}>{index + 1}/{barcodeInfo.length}</Descriptions.Item>;
                } else if (barcodeDetails.dataIndex === 'seqNoWithBorder') {
                  return <Descriptions.Item key={'descitemcarton' + keyCounter++} className={`border-font-20 ${className}`} label={barcodeDetails.showLabel ? barcodeDetails.title : null}>{index + 1}</Descriptions.Item>;
                } else {
                  return <Descriptions.Item key={'descitem' + keyCounter++} className={`barcode-column-width-${width} ${className}`}
                    label={barcodeDetails.showLabel ? barcodeDetails.title : null}
                    span={barcodeDetails.span}
                  >
                    {record[barcodeDetails.dataIndex]}
                  </Descriptions.Item>;
                }

              })}
            </Descriptions>
          </React.Fragment>
        );
      });
    } catch (err) {
      return <Tag color='red' key={'error'}>Error in Barcode Genarations</Tag>;
    }
  };
  if(props.withOutModal){
    return (<React.Fragment><div id='printArea'>{renderContent()}</div></React.Fragment>);
  }else{    
    // Open in new window
    if (props.newWindow) {
      return (ReactDOM.createPortal(<React.Fragment>
        <div id='printArea'>{renderContent()}</div></React.Fragment>, containerEl));
    } else {
      return (<React.Fragment>
        <Modal
          key={Date.now()}
          style={{ top: 10 }}
          width={(props.barcodeWidth) ? props.barcodeWidth + 48 : 432}
          title={<React.Fragment>Print Barcodes  <Button type='primary' onClick={printBarcodes}>Print</Button> </React.Fragment>}
          visible={showBarcodePopUp}
          onCancel={_e => hideModal()}
          onOk={hideModal}
          footer={[]}
        >

          <div id='printArea'>{renderContent()}</div></Modal></React.Fragment>);
    }
  }
};

export default BarcodePrint;