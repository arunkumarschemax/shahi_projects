import React, { useState, useEffect, useRef } from 'react';
import {Table, Card, Button, Row, Col, Form, Select, Tabs, Modal } from 'antd';
import {DownloadOutlined, FilePdfOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { CoBomService, StyleOrderService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import { StyleOrderIdReq, StyleOrderid } from '@project-management-system/shared-models';
import Mopprint from './mop-print';
import { Excel } from 'antd-table-saveas-excel';
import moment from 'moment';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';


const MOPReport = () => {
  const styleorderService = new StyleOrderService()

  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  const {Option} = Select;
  const [page, setPage] = React.useState(1);
  const [codata, setCOData] = useState<any[]>([]);
  const [mopData, setMOPData] = useState<any[]>([]);
  const [mopDataYes, setMOPDataYes] = useState([]);
  const [mopDataNo, setMOPDataNo] = useState([]);
  const [key, setKey] = useState();





  const service = new CoBomService()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    getCoData();
    getMOPData();
   
  }, []);

  const getCoData = () => {

    styleorderService.getCoNumber().then((res) => {
      if (res.status) {
        setCOData(res.data);
       }
    });
}

const getMOPData= () => {
  const req = new StyleOrderid();
  
        if (form.getFieldValue('styleOrderId') !== undefined) {
            req.styleOrderId = form.getFieldValue('styleOrderId');
        }
     

        service.getDataForMOPById(req).then(res => {
      if (res.status) {
        setMOPData(res.data);
        const importedYesData = res.data.filter((item) => item.isImpItem === 'YES');
        const importedNoData = res.data.filter((item) => item.isImpItem === 'NO');
  
        setMOPDataYes(importedYesData);
        setMOPDataNo(importedNoData);
      } else
      {
        setMOPData([])
        setMOPDataYes([]); 
        setMOPDataNo([]); 
          AlertMessages.getErrorMessage(res.internalMessage);
      }
      }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setMOPData([]);
      })
      }


    
   console.log(mopData,"mopdata")

   
  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: "CO Number",
      dataIndex: "coNumber",
      align:'center',
      sorter: (a, b) => a.coNumber.localeCompare(b.coNumber),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "CO Line",
      dataIndex: "coLineNumber",
      align:'center',
      sorter: (a, b) => a.coLineNumber.localeCompare(b.coLineNumber),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "FG item Code",
      dataIndex: "fgItemCode",
      align:'center',
    
      sorter: (a, b) => a.fgSkuItemCode.localeCompare(b.fgSkuItemCode),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "FG Sku Code",
      dataIndex: "fgSkuCode",
      align:'center',
    
      sorter: (a, b) => a.fgSkuCode.localeCompare(b.fgSkuCode),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Color",
      dataIndex: "color",
      align:'center',
      sorter: (a, b) => a.color.localeCompare(b.color),
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: "Size",
        dataIndex: "size",
        align:'center',
        sorter: (a, b) => a.size.localeCompare(b.size),
            sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Destination",
        dataIndex: "destination",
        align:'center',
        sorter: (a, b) => a.destination.localeCompare(b.destination),
            sortDirections: ['descend', 'ascend'],
      },

      {
        title: "Quantity",
        dataIndex: "quantity",
        align:'center',
        sorter: (a, b) => a.quantity.localeCompare(b.quantity),
        sortDirections: ['descend', 'ascend'],
      }, 

      {
        title: "Consumption",
        dataIndex: "consumption",
        align:'center',
        sorter: (a, b) => a.consumption.localeCompare(b.consumption),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "RM item Code",
        dataIndex: "rmitemCode",
        align:'center',
        sorter: (a, b) => a.rmitemCode.localeCompare(b.rmitemCode),
        sortDirections: ['descend', 'ascend'],
      },

      {
        title: "RM Sku Code",
        dataIndex: "rmSkuCode",
        align:'center',
        sorter: (a, b) => a.rmSkuCode.localeCompare(b.rmSkuCode),
        sortDirections: ['descend', 'ascend'],
      },
    
  ];

  // const columnsSkelton1: any = [
  //   {
  //     title: 'S No',
  //     key: 'sno',
  //     render: (text, object, index) => (page - 1) * 10 + (index + 1)
   
  //   },
  //   {
  //     title: "CO Number",
  //     dataIndex: "coNumber",
     
  //   },
  //   {
  //     title: "CO Line",
  //     dataIndex: "coLineNumber",
  
  //   },
  //   {
  //     title: "FG item Code",
  //     dataIndex: "fgItemCode",
     
  //   },
  //   {
  //     title: "FG Sku Code",
  //     dataIndex: "fgSkuCode",
   
  //   },
  //   {
  //     title: "Color",
  //     dataIndex: "color",
   
  //   },
  //   {
  //       title: "Size",
  //       dataIndex: "size",
      
  //     },
  //     {
  //       title: "Destination",
  //       dataIndex: "destination",
     
  //     },

  //     {
  //       title: "Quantity",
  //       dataIndex: "quantity",
      
        
  //     }, 

  //     {
  //       title: "Consumption",
  //       dataIndex: "consumption",
    
        
  //     },
  //     {
  //       title: "RM item Code",
  //       dataIndex: "rmitemCode",
   
        
  //     },

  //     {
  //       title: "RM Sku Code",
  //       dataIndex: "rmSkuCode",
    
        
  //     },
    
  // ];


  const  onReset =() =>{
    form.resetFields();
    getMOPData();
  }

  const onChange =(key)=>{
    setKey(key)
    
  }
 console.log(key,"key")

 const excelData :any= [
  { title: "S.No", dataIndex: "sno", render: (text, object, index) => (page - 1) + (index + 1) },
  {
    title: "CO Number",
    dataIndex: "coNumber",
   
  },
  {
    title: "CO Line",
    dataIndex: "coLineNumber",
   
  },
  {
    title: "FG item Code",
    dataIndex: "fgItemCode",
    align:'center',
  
  },
  {
    title: "FG Sku Code",
    dataIndex: "fgSkuCode",
  
  },
  {
    title: "Color",
    dataIndex: "color",

  },
  {
      title: "Size",
      dataIndex: "size",

    },
    {
      title: "Destination",
      dataIndex: "destination",
      
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
     
    }, 

    {
      title: "Consumption",
      dataIndex: "consumption",
   
    },
    {
      title: "RM item Code",
      dataIndex: "rmitemCode",
 
    },

    {
      title: "RM Sku Code",
      dataIndex: "rmSkuCode",
   
    }
  
]


 const exportExcel = () => {
      const currentDate = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("/");

  if (key === 'pop'){
    const excel = new Excel();
  excel
    .addSheet('Stock-report')
    .addColumns(excelData)
    .addDataSource(mopDataNo, { str2num: true })
    .saveAs(`Mop-report-${currentDate}.xlsx`);
  } else {
    const excel = new Excel();
    excel
      .addSheet('Stock-report')
      .addColumns(excelData)
      .addDataSource(mopDataYes, { str2num: true })
      .saveAs(`Mop-report-${currentDate}.xlsx`);
  }
  
}

const handleExportPDF = async () => {
  const currentDate = new Date()
  .toISOString()
  .slice(0, 10)
  .split("-")
  .join("/");

  const tableId = (key === 'pop' ? 'popTable' : 'mopTable');
 console.log(key,"key")
  const element = document.getElementById(tableId);
  const canvas = await html2canvas(element, { scale: 2 });
  const data = canvas.toDataURL('image/png');
  const imgWidth = 210;
  const pageHeight = 297;
  const pdf = new jsPDF('p', 'mm', 'a4');const addHeading = () => {
    pdf.setFontSize(14);
    pdf.text("Material Order Proposal", imgWidth / 2, 15, { align: "center" });
  };

  addHeading(); 
  let position = 25;

  const imgProperties = pdf.getImageProperties(data);
  const pdfHeight = (imgProperties.height * imgWidth) / imgProperties.width;
  let heightLeft = pdfHeight;
  

  pdf.addImage(data, 'PNG', 0, position, imgWidth, pdfHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(data, 'PNG', 0, position, imgWidth, pdfHeight);
      heightLeft -= pageHeight;
  }

  pdf.save(`Mop-report-${currentDate}.pdf`);
};




  return (
       <Card title={<span >Material Order Proposal Report</span>} headStyle={{ border: 0 }}   extra={
        <div>
          <Button icon={<DownloadOutlined />} onClick={() => { exportExcel(); }} style={{marginRight:30}}>
            GET EXCEL
          </Button>
          <Button icon={<FilePdfOutlined  />} onClick={() => { handleExportPDF(); }}>
            Download PDF
          </Button>
        </div>
      } >
        <Form  form={form} layout="horizontal" onFinish={getMOPData}>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }}
                      sm={{ span: 8 }}
                      md={{ span: 8 }}
                      lg={{ span: 8 }}
                      xl={{ span: 6}} >
                        <Form.Item name='styleOrderId' label='Customer Order' >
                            <Select showSearch placeholder="Select Customer Order" optionFilterProp="children" allowClear >
                            {
                           codata.map((e) => {
                                    return(
                                        <Option key={e.coId} value={e.coId}>{e.orderNumber}</Option>
                                    )
                                })
                            } 
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='itemGroup' label='Item Group'>
                            <Select showSearch placeholder="Select Item Group" optionFilterProp="children" allowClear>
                               
                            </Select>
                        </Form.Item>
                    </Col> */}
                      <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 3 }} >
                    <Form.Item>
                        <Button  icon={<SearchOutlined />} htmlType="submit" type="primary">Get Report</Button>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 2 }}>
                    <Form.Item>
                        <Button danger icon={<UndoOutlined />} onClick={onReset}>Reset</Button>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 2 }}>
                    {/* <Form.Item>
                        <Button  onClick={showModal}>Print</Button>
                    </Form.Item> */}
                    </Col>
                  
                </Row>
                <Tabs type={'card'} tabPosition={'top'} onChange={(key)=>{onChange(key)}}>
                   <TabPane key="mop" tab={<span style={{fontSize:'15px'}}><b>{`MOP`}</b></span>} >
                      <Table
                      id="mopTable" 
                      size="small"
                      columns={columnsSkelton}
                      dataSource={mopDataYes}
                      scroll={{ x: true }}
                      bordered
                      pagination ={false}
                      
                    />
                  </TabPane>
                      <TabPane key="pop" tab={<span style={{fontSize:'15px'}}><b>{`POP`}</b></span>}>
                      <Table
                      id="popTable"
                      size="small"
                      columns={columnsSkelton}
                      dataSource={mopDataNo}
                      scroll={{ x: true }}
                      bordered
                      pagination ={false}
                  />
                </TabPane>
            </Tabs>
          
             <Modal className='print-docket-modal'
                //  key={'modal'}
                 width={'60%'}
                 style={{ top: 30, alignContent: 'right' }}
                visible={isModalOpen}
                title={<React.Fragment>
               </React.Fragment>}
                onCancel={handleCancel}
                
                >
            < Mopprint mop={mopDataYes} pop={mopDataNo} key={key}/>        
            </Modal>
        </Form>
     
      </Card> 
      
  );
}


export default MOPReport