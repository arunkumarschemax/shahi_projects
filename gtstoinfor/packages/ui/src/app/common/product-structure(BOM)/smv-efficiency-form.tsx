
import { UndoOutlined, UploadOutlined } from "@ant-design/icons";
import { DepartmentsDtos, OperationsDTO, SMVEfficiencyRequest } from "@project-management-system/shared-models";
import { DepartmentService, OperationsService, ProductStructureService } from "@project-management-system/shared-services";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import AlertMessages from "../common-functions/alert-messages";
import { Link } from "react-router-dom";

export interface SmvEfficiencyFormProps {}


export const SmvEfficiencyForm = () => {

  const [form] = Form.useForm();
  const [operationsData, setOperationsData] = useState<OperationsDTO[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentsDtos[]>([]);


  const operationsService = new OperationsService();
  const service =new DepartmentService();
  const productService = new ProductStructureService()






  const onFinish = (values:any) => {
    console.log(values,"values")
    const req = new SMVEfficiencyRequest(values.operationId,values.capacityType,values.validFromDate,values.validToDate,values.revisionNo,values.workCenter,values.operationDescription,values.departmentId,values.planingArea,values.runTime,values.priceTimeQty,values.setupTime,values.externalSetup,values.fixedTime,values.plnnoMachine,values.plnnoWorkers,values.plnnoSetup,values.phantom,values.leadtmOffset,values.pdays,values.optionsPercent,values.scrapPct,values.setupScrap,values.documentId,values.toolNo,values.subcontrCtrl,values.finite,values.qtyPerHour,values.critResource,values.addMtrlOffset,values.shippingBuffer)
    console.log(req,"req")
     
    productService.createSMVEfficency(req).then((res)=>{
      if (res.status){
       onReset();
       message.success(res.internalMessage);
      
   } else{

     AlertMessages.getErrorMessage(res.internalMessage);
      }
 }).catch(err => {

    AlertMessages.getErrorMessage(err.message);
  })
      
   }


   useEffect(() => {
    getAllOperationsData();
    getAllDepartment();
  },[]);
  


  const onReset = () => {
    form.resetFields();
   };
  
   const getAllOperationsData = () => {
    
    operationsService.getAllActiveOperations().then(res => {
      if(res.status) {
        setOperationsData(res.data);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const getAllDepartment=()=>{
    service.getAllDepartments().then(res=>{
        if(res.status){
            setDepartmentData(res.data)
            console.log(res,'dataaaaaaaaaaaaa')
        }else{
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
        setDepartmentData([]);
      })
  }

  
  return (
    <Card
      size="small"
      title="SMV Efficiency "
      smv-efficiency-view
      extra={<Link to='/product-structure/smv-efficiency-view' >
      <span style={{color:'white'}} ><Button type={'primary'} >View</Button> </span>
      </Link>}

    >
      <Form
        form={form}
        style={{ fontSize: "10px" }}
        layout="vertical"
        onFinish={onFinish}
      >
        
          <Row gutter={12}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Operation"
                name="operationId"
                rules={[{ required: true, message:  "Select Operation" }]}
              >
                <Select placeholder="Select Operation"> 
                {operationsData.map((rec) => (
                        <option key={rec.operationId} value={rec.operationId}>
                          {rec.operationName}
                        </option>
                      ))}
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item label="Capacity Type" name="capacityType"
              rules={[{ required: true, message: "Select Capacity Type" }]}
              >
              <Select placeholder="Select Capacity Type" allowClear>
              <option value="test">test</option>
  
              </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
               <Form.Item label='Valid From Date' name='validFromDate'
               rules={[{ required: true, message: "Valid From Date" }]}
                >
                 <DatePicker style={{width:'100%'}}/>
               </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
               <Form.Item label='Valid To Date' name='validToDate'
               rules={[{ required: true, message: "Valid To Date" }]}
                >
                 <DatePicker style={{width:'100%'}} />
               </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Revision No"
                name="revisionNo"
                rules={[{ required: true, message: "Enter Revision No" }]}
              >
                <Input  placeholder="Revision No" allowClear />
             
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span:  4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Work Center"
                name="workCenter"
                rules={[{ required: true, message: "Enter Work Center" }]}

              >
                <Input placeholder="Enter Work Center" />
               
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4}}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Operation Description"
                name="operationDescription"
                rules={[{ required: true, message: "Enter Operation Description" }]}

              >
                  <Input  placeholder="Enter Operation Description"/>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4}}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Department"
                name="departmentId"
                rules={[{ required: true, message: "Select Department" }]}

              >
                <Select placeholder="Select Deparment" allowClear>
                {departmentData.map((rec) => (
                        <option key={rec.deptId} value={rec.deptId}>
                          {rec.deptName}
                        </option>
                      ))}
                
                </Select>
              </Form.Item>
            </Col>

             
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Planing Area"
                name="planingArea"
                rules={[{ required: true, message: "Enter Planing Area" }]}
              >
                
                <Input  placeholder="Enter Planing Area"/>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Run Time (Mins)"
                name="runTime"
                rules={[{ required: true, message: "Enter Run Time" }]}
              >
                <Input placeholder="Enter Run Time" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Price/time Qty"
                name="priceTimeQty"
                rules={[{ required: true, message: "Enter Price/time Qty" }]}
              >
                <Input placeholder="Enter Price/time Qty" allowClear />
            
              </Form.Item>

            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Setup Time "
                name="setupTime"
                rules={[{ required: true, message: "Enter Setup Time" }]}
              >
                <Input placeholder="Enter Setup Time" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="External Setup"
                name="externalSetup"
                rules={[{ required: true, message: "Enter External Setup" }]}
              >
                <Input placeholder="Enter Setup Time" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Fixed Time"
                name="fixedTime"
                rules={[{ required: true, message: "Enter Fixed Time" }]}
              >
                <Input placeholder="Enter Fixed Time" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Pln no. Machine"
                name="plnnoMachine"
                rules={[{ required: true, message: "Enter Pln no. machine" }]}
              >
                <Input placeholder="Enter Pln no Machine" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Pln no. Workers"
                name="plnnoWorkers"
                rules={[{ required: true, message: "Enter Pln no. Workers" }]}
              >
                <Input placeholder="Enter Pln no Workers" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Pln no. setup"
                name="plnnoSetup"
                rules={[{ required: true, message: "Enter Pln no. Setup" }]}
              >
                <Input placeholder="Enter Pln no Setup" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4}}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Phantom Op Mtd"
                name="phantom"
                rules={[{ required: true, message: "Select Phantom Op Mtd" }]}

              >
                <Select placeholder="Select Phantom Op Mtd" allowClear>
              <option value="test">test</option>
                
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Lead tm offset"
                name="leadtmOffset"
                rules={[{ required: true, message: "Enter lead tm Offset" }]}
              >
                <Input placeholder="Enter Lead tm offset " allowClear />
            
              </Form.Item>
            </Col>

            
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="P day"
                name="pdays"
                rules={[{ required: true, message: "Enter P days" }]}
              >
                <Input placeholder="Enter P days" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Options Percent"
                name="optionsPercent"
                rules={[{ required: true, message: "Enter Options Percent" }]}
              >
                <Input placeholder="Enter  Options Percent" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Scrap pct"
                name="scrapPct"
                rules={[{ required: true, message: "Enter Scrap pct" }]}
              >
                <Input placeholder="Enter  Scrap pct" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Setup Scrap"
                name="setupScrap"
                rules={[{ required: true, message: "Enter Setup Scrap" }]}
              >
                <Input placeholder="Enter  Setup Scrap" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Document ID"
                name="documentId"
                rules={[{ required: true, message: "Enter Document ID" }]}
              >
                <Input placeholder="Enter  Document ID" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Tool no"
                name="toolNo"
                rules={[{ required: true, message: "Enter Tool no" }]}
              >
                <Input placeholder="Enter  Tool no" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4}}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Subcontr ctrl"
                name="subcontrCtrl"
                rules={[{ required: true, message: "Select Subcontr ctrl" }]}

              >
                <Select placeholder="Select Subcontr ctrl" allowClear>
              <option value="test">test</option>
                   
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Finite"
                name="finite"
                rules={[{ required: true, message: "Enter Finite" }]}
              >
                <Input placeholder="Enter  Finite" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Qty per Hour"
                name="qtyPerHour"
                rules={[{ required: true, message: "Enter Qty per Hour" }]}
              >
                <Input placeholder="Enter  Qty per Hour" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4}}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Crit Resource"
                name="critResource"
                rules={[{ required: true, message: "Select Crit Resource" }]}

              >
                <Select placeholder="Select Crit Resource" allowClear>
              <option value="test">test</option>
                   
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Add mtrl Offset"
                name="addMtrlOffset"
                rules={[{ required: true, message: "Enter Add mtrl Offset" }]}
              >
                <Input placeholder="Enter  Add mtrl Offset" allowClear />
            
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Shipping Buffer"
                name="shippingBuffer"
                rules={[{ required: true, message: "Enter Shipping Buffer" }]}
              >
                <Input placeholder="Enter  Shipping Buffer" allowClear />
            
              </Form.Item>
            </Col>
  
            

          </Row>
         
        
        

        <Row justify="end" style={{marginTop:30}}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <Form.Item>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="ant-submit-btn"
                  style={{ marginLeft: 70}}
                >
                  Submit
                </Button>
                <Button
                  type="default"
                  danger
                  icon={<UndoOutlined />}
                  onClick={onReset}
                  style={{ marginLeft: 20 }}
                >
                  Reset
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SmvEfficiencyForm;
