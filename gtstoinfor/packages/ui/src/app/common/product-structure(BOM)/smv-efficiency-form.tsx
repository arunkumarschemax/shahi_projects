
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
                rules={[{ required: true, message:  "Operation  is required" }]}
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
              rules={[{ required: true, message: "Capacity Type  is required" }]}
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
               rules={[{ required: true, message: "Valid From Date  is required" }]}
                >
                 <DatePicker style={{width:'100%'}} placeholder="Select  Valid From Date"/>
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
               rules={[{ required: true, message: "Valid To Date  is required" }]}
                >
                 <DatePicker style={{width:'100%'}} placeholder="Select Valid To Date " />
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
                rules={[{ required: true, message: "Revision No  is required" }]}
              >
                <Input  placeholder="Enter Revision No" allowClear />
             
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
                rules={[{ required: true, message: "Work Center  is required" }]}

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
                rules={[{ required: true, message: "Operation Description  is required" }]}

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
                rules={[{ required: true, message: "Department  is required" }]}

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
                rules={[{ required: true, message: "Planing Area  is required" }]}
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
                rules={[{ required: true, message: "Run Time  is required" }]}
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
                rules={[{ required: true, message: "Price/time Qty  is required" }]}
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
                rules={[{ required: true, message: "Setup Time  is required" }]}
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
                rules={[{ required: true, message: "External Setup  is required" }]}
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
                rules={[{ required: true, message: "Fixed Time  is required" }]}
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
                rules={[{ required: true, message: "Pln no. machine  is required" }]}
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
                rules={[{ required: true, message: "Pln no. Workers  is required" }]}
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
                rules={[{ required: true, message: "Pln no. Setup  is required" }]}
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
                rules={[{ required: true, message: "Phantom Op Mtd  is required" }]}

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
                rules={[{ required: true, message: "Lead tm Offset  is required" }]}
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
                rules={[{ required: true, message: "P days  is required" }]}
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
                rules={[{ required: true, message: "Options Percent  is required" }]}
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
                rules={[{ required: true, message: "Scrap pct  is required" }]}
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
                rules={[{ required: true, message: "Setup Scrap  is required" }]}
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
                rules={[{ required: true, message: "Document ID  is required" }]}
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
                rules={[{ required: true, message: "Tool no  is required" }]}
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
                rules={[{ required: true, message: "Subcontr ctrl  is required" }]}

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
                rules={[{ required: true, message: "Finite  is required" }]}
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
                rules={[{ required: true, message: "Qty per Hour  is required" }]}
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
                rules={[{ required: true, message: "Crit Resource  is required" }]}

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
                rules={[{ required: true, message: "Add mtrl Offset  is required"  }]}
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
                rules={[{ required: true, message: "Shipping Buffer  is required" }]}
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
