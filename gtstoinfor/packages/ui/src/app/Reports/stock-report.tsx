import { DownloadOutlined, FilePdfOutlined, UndoOutlined } from '@ant-design/icons';
import { ItemTypeEnumDisplay, SampleFilterRequest, StockFilterRequest, StocksDto } from '@project-management-system/shared-models';
import { StockService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select, Statistic, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Excel } from 'antd-table-saveas-excel';
import { useIAMClientState } from "../common/iam-client-react";


const StockReport = () => {

    const service = new StockService();
    const [data, setData] = useState<any>([]);
    const [form] = Form.useForm();
    const [itemCode, setItemCode] = useState<any>([]);
    const [itemType, setItemType] = useState<any>([]);
    const [location, setLocation] = useState<any>([]);
    const [plant, setPlant] = useState<any>([]);
    const [stockData, setStockData] = useState<any[]>([]);
    const [filterData, setFilterData] = useState<any[]>([]);
    const [key, setKey] = useState();
    const { IAMClientAuthContext } = useIAMClientState();
    const [isBuyer, setIsBuyer] = useState(false);
    const page = 1;



    

    useEffect(() => {
        getData();
        // getAllItemCode();
        getAllItemType();
        getAllLocation();
        // getAllPlant();
        getAllStockReportData();
        const userrefNo = IAMClientAuthContext.user?.externalRefNo
        if(userrefNo){
          setIsBuyer(true)
          // form.setFieldsValue()
        }
      }, []);

    const getData = () => {
      
        service.getStockReport().then(res => {
          
            if(res.status){
                setData(res.data);
        
            }
        })
      };

      const getAllItemCode= () => {
        service.getAllItemCode().then((res) => {
          if (res.status) {
            setItemCode(res.data)
          }
        });
      };

      const getAllItemType= () => {
        service.getAllItemType().then((res) => {
          if (res.status) {
            setItemType(res.data)
          }
        });
      };

      const getAllLocation= () => {
        service.getAllLocation().then((res) => {
          if (res.status) {
            setLocation(res.data)
          }
        });
      };

      const getAllPlant= () => {
        service.getAllPlant().then((res) => {
          if (res.status) {
            setPlant(res.data)
          }
        });
      };

      const getAllStockReportData = () => {
        const req = new StockFilterRequest()
        req.extRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
      
        if (form.getFieldValue('itemType') !== undefined) {
          req.itemType = form.getFieldValue('itemType')
        }
        if (form.getFieldValue('location') !== undefined) {
          req.location = form.getFieldValue('location')
        }
        
        service.getAllStockReportData(req).then((res) => {
          console.log(req,'77777777777777')
          if (res.data) {
            setStockData(res.data);
            setFilterData(res.data)
          }
        });
      };

      const onFinish = () => {
        getAllStockReportData();
      };

      const onReset = () => {
        form.resetFields();
        getAllStockReportData();
      };
   

    const Columns:any=[
      {
        title: 'S No',
        key: 'sno',
        width: '70px',
        style: { background: 'red' },
        responsive: ['sm'],
        render: (text, object, index) => (page - 1) * 10 + (index + 1),
        onCell: (record: any) => ({
          rowSpan: record.rowSpan,
        }),
        fixed: 'left',
      },
        {
            title:"Buyer",
            dataIndex:"buyerName"
            
        },
        {
          title:"Material Type",
          dataIndex:"itemType",
          render: (text) => {
            const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
            return EnumObj ? EnumObj.displayVal : text;
          },
          
      },
        {
            title:"M3 Item",
            dataIndex:"m3ItemCode",
            width:250
        },
        {
            title:"Location",
            dataIndex:"location"
            
        },
        {
          title:"Quantity",
          dataIndex:"quantity"
          
      },
        
    ]
    const onChange =(key)=>{
      setKey(key)
      
    }
  
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
    .addColumns(Columns)
    .addDataSource(filterData, { str2num: true })
    .saveAs(`Stock-report-${currentDate}.xlsx`);
  } else {
    const excel = new Excel();
    excel
      .addSheet('Stock-report')
      .addColumns(Columns)
      .addDataSource(filterData, { str2num: true })
      .saveAs(`Stock-report-${currentDate}.xlsx`);
  }
  
}

// const handleExportPDF = async () => {
//   const currentDate = new Date()
//   .toISOString()
//   .slice(0, 10)
//   .split("-")
//   .join("/");

//   const tableId = (key === 'pop' ? 'popTable' : 'mopTable');
//  console.log(key,"key")
//   const element = document.getElementById(tableId);
//   const canvas = await html2canvas(element, { scale: 2 });
//   const data = canvas.toDataURL('image/png');
//   const imgWidth = 210;
//   const pageHeight = 297;
//   const pdf = new jsPDF('p', 'mm', 'a4');const addHeading = () => {
//     pdf.setFontSize(14);
//     pdf.text("Material Order Proposal", imgWidth / 2, 15, { align: "center" });
//   };

//   addHeading(); 
//   let position = 25;

//   const imgProperties = pdf.getImageProperties(data);
//   const pdfHeight = (imgProperties.height * imgWidth) / imgProperties.width;
//   let heightLeft = pdfHeight;
  

//   pdf.addImage(data, 'PNG', 0, position, imgWidth, pdfHeight);
//   heightLeft -= pageHeight;

//   while (heightLeft >= 0) {
//       position = heightLeft - pdfHeight;
//       pdf.addPage();
//       pdf.addImage(data, 'PNG', 0, position, imgWidth, pdfHeight);
//       heightLeft -= pageHeight;
//   }

//   pdf.save(`Mop-report-${currentDate}.pdf`);
// };



  return (
    <div>
        <Card  title={<span>STOCK REPORT</span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={
          <div>
            <Button icon={<DownloadOutlined />} onClick={() => { exportExcel(); }} style={{marginRight:30}}>
              GET EXCEL
            </Button>
            {/* <Button icon={<FilePdfOutlined  />} onClick={() => { handleExportPDF(); }}>
              Download PDF
            </Button> */}
          </div>
        }
  
        >
      <Form form={form} 
        onFinish={onFinish}
        >
        <Row gutter={24}>
          {/* <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="m3ItemCode" label="Item Code">
              <Select
                showSearch
                placeholder="Select Item Code"
                optionFilterProp="children"
                allowClear
              >
                {itemCode.map((qc: any) => (
                  <Select.Option key={qc.m3ItemCode} value={qc.m3ItemCode}>
                    {qc.m3ItemCode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col> */}
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="itemType" label="Item Type">
              <Select
                showSearch
                placeholder="Select Item Type"
                optionFilterProp="children"
                allowClear
              >
                {/* {itemType.map((qc: any) => (
                  <Select.Option key={qc.item_type_id} value={qc.item_type_id}>
                    {qc.item_type_id}
                  </Select.Option>
                ))} */}

                {Object.values(ItemTypeEnumDisplay).map((val)=>(
                  <Select.Option key={val.name} value={val.name}>{val.displayVal}</Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="location" label="Location">
              <Select
                showSearch
                placeholder="Select Location"
                optionFilterProp="children"
                allowClear
              >
                {location.map((qc: any) => (
                  <Select.Option key={qc.location} value={qc.location}>
                    {qc.location}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col>
          {/* <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="plant" label="Plant">
              <Select
                showSearch
                placeholder="Select Plant"
                optionFilterProp="children"
                allowClear
              >
                {plant.map((qc: any) => (
                  <Select.Option key={qc.plant_id} value={qc.plant_id}>
                    {qc.plant_id}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>   
          </Col> */}
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "green", width: "100%" }}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Item>
              <Button
                danger
                icon={<UndoOutlined />}
                onClick={onReset}
                style={{ width: "100%" }}
              >
                Reset
              </Button>
            </Form.Item> 
          </Col>
          </Row>
          </Form> 
 <Row gutter={40} justify={'space-evenly'}>
            <Col span={4}><Card style={{textAlign: 'left', width: 200, height: 38, backgroundColor: '#A5F5D7'}}
             title={"Total Item Code:" +data.filter(el => el.m3ItemCode).length}>
              </Card> </Col>
              <Col span={4}><Card style={{textAlign: 'left', width: 200, height: 38,  backgroundColor: '#E6D2F0'}}
              title={"Item Type:"+data.filter(el => el.itemType).length}>
              </Card> </Col>
              <Col span={4}><Card style={{textAlign: 'left', width: 200, height: 38,  backgroundColor: '#E6DC7B'}}
              title={"Location:"+data.filter(el => el.location).length}>
              </Card> </Col>
              {/* <Col span={4}><Card style={{textAlign: 'left', width: 200, height: 38,  backgroundColor: '#A4A3A4'}}
              title={"Plant:"+data.filter(el => el.plant_id).length}>
              </Card> </Col> */}
          </Row><br></br>
        <Card >
        <Table columns={Columns}  pagination={{pageSize:50}}
        dataSource={stockData}
        className="custom-table-wrapper"
            /> 
        </Card>
        </Card>
    </div>
  )
}

export default StockReport