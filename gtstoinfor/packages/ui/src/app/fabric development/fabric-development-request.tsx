
import { UndoOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
  Upload,
  UploadProps,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import FabricDevelopmentTabs from "./fabric-development-tabs";
import { BuyersService, EmployeeDetailsService, FabricDevelopmentService, FabricTypeService, LocationsService, ProfitControlHeadService, StyleService } from "@project-management-system/shared-services";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link, useNavigate } from "react-router-dom";
import FabricDevelopmentRequestQuality from "./fabric-development-quality-request";
import { FabricDevelopmentRequestModel, StatusEnum } from "@project-management-system/shared-models";

export interface FabricDevelopmentRequestProps {
  placementForm:FormInstance<any>;
  dynamicForm:FormInstance<any>
  

}


export const FabricDevelopmentRequest = (props:FabricDevelopmentRequestProps) => {
  const [form] = Form.useForm();
  const [pchData,setPchData] = useState<any>([])
  const [BuyerData,setBuyerData] = useState<any>([])
  const [fabricTypeData,setFabricTypeData] = useState<any>([])
  const [empData,setEmpData] = useState<any>([])
  const [locationData,setLocationData] = useState<any>([])
  const [styleData,setstyleData] = useState<any>([])
  const [qualitieData,setqualitieData] = useState<any>()
  const [fabricFilelist,setFabricFilelist] = useState<any[]>([]);
  const [disable, setDisable] = useState<boolean>(false)
  const [resetData, setResetData] = useState<boolean>(false)

  let navigate = useNavigate();





    const Pchservice =new ProfitControlHeadService();
    const buyerService = new BuyersService()
    const fabrictypeservice = new FabricTypeService();
    const empDetailsservice = new EmployeeDetailsService();
    const locationservice = new LocationsService();
    const styleservice =  new StyleService()
    const service = new FabricDevelopmentService()



   const filefinal = []
   const filesArray = [];

// Loop through the qualities in the data object
for (const quality in qualitieData) {
    if (qualitieData.hasOwnProperty(quality)) {
        const qualitiesInfo = qualitieData[quality].qualitiesInfo;
        // Loop through the qualitiesInfo array for each quality
        for (const info of qualitiesInfo) {
            // Check if the "file" object exists in the info
            if (info.file) {
                // Push the "file" object into the filesArray
                filesArray.push(info.file,);
            }
        }
    }
}
filesArray.push(fabricFilelist)
console.log(fabricFilelist,"fab")
// Now, filesArray contains all the "file" objects
console.log(filesArray,"######");


  const onFinish = (values:any) => {
      const data =[]
      Object.values(qualitieData).forEach(val => { data.push(val)});

      const req = new FabricDevelopmentRequestModel (values.locationId,values.styleId,values.pchId,values.buyerId,values.type,1,values.remarks,values.fabricResponsible,1,values.lightSourcePrimary,values.lightSourceSecondary,values.lightSourceTertiary,fabricFilelist,"","",data,StatusEnum.OPEN,fabricFilelist[0]?.uid)

    
      service.createFabricDevelopmentRequest(req).then((res)=>{
        console.log(res,"res.........")
        setDisable(false)

         if (res.status){
           
          onReset()
          navigate("/fabricdevelopment/fabric-development-request/fabric-development-request-view");

          setFabricFilelist([])
          message.success(res.internalMessage);
         
      } else{
  
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    }).catch(err => {
  
       AlertMessages.getErrorMessage(err.message);
     })
    
    }

  // const onFinish = (values:any) => {
  //   const data =[]
  //   Object.values(qualitieData).forEach(val => { data.push(val)});

  //   const req = new FabricDevelopmentRequestModel (values.locationId,values.styleId,values.pchId,values.buyerId,values.type,1,values.remarks,values.fabricResponsible,1,values.lightSourcePrimary,values.lightSourceSecondary,values.lightSourceTertiary,"","",data,StatusEnum.OPEN,fabricFilelist[0]?.uid,)

  //   // service.createFabricDevelopmentRequest(req).then((res)=>{
  //   //   console.log(res,"res.........")
  //   //   setDisable(false)

  //   //    if (res.status){
  //       console.log(filesArray);

  //       const test = [ { fieldname: 'files[]',
  //       originalname: 'image1.png',
  //       encoding: '7bit',
  //       mimetype: 'image/png',
  //       buffer:
  //        "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 52 00 00 02 58 08 02 00 00 00 bf c4 f9 43 00 00 00 09 70 48 59 73 00 00 0b 13 00 00 0b 13 01 ... >",
  //       size: 109693 },
  //     { fieldname: 'files[]',
  //       originalname: 'image2.png',
  //       encoding: '7bit',
  //       mimetype: 'image/png',
  //       buffer:
  //        "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 2c 00 00 00 fa 08 02 00 00 00 94 0f ed a4 00 00 00 09 70 48 59 73 00 00 0b 13 00 00 0b 13 01 ... >",
  //       size: 20538 } ]


  //       service.fabricFileUpload(test).then((res) => {
  //         if(res.status){
  //           AlertMessages.getSuccessMessage("Uploaded Successfully. ")
  //         }
  //         else{
  //           AlertMessages.getErrorMessage("Something went wrong. ")
  //         }
  //       }).catch(err => {
  //         AlertMessages.getWarningMessage("file Not uploaded. ")
  //       })
  // //       onReset()
  // //       navigate("/fabricdevelopment/fabric-development-request/fabric-development-request-view");

  // //       setFabricFilelist([])
  // //       message.success(res.internalMessage);
       
  // //   } else{

  // //     AlertMessages.getErrorMessage(res.internalMessage);
  // //      }
  // // }).catch(err => {

  // //    AlertMessages.getErrorMessage(err.message);
  // //  })
  
  // }


  
    const itemsInfo = (data) => {
  }

  const qualities = (data) => {
    setqualitieData(data)
  }
  
  
   
    useEffect (()=>{
      getAllActiveProfitControlHead();
      getAllActiveBuyers();
      getAllActiveFabricType();
      getAllActiveEmploee();
      getAllActiveLocations();
      getAllstyle()

    },[])
  
  
    const getAllActiveProfitControlHead=() =>{
      Pchservice.getAllActiveProfitControlHead().then(res =>{
      if (res.status){
        setPchData(res.data);
         
      } else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    }).catch(err => {
      setPchData([]);
       AlertMessages.getErrorMessage(err.message);
     })
    
  }

  const getAllActiveBuyers=() =>{
    buyerService.getAllActiveBuyers().then(res =>{
    if (res.status){
      setBuyerData(res.data);
       
    } else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  }).catch(err => {
    setBuyerData([]);
     AlertMessages.getErrorMessage(err.message);
   })
  
}

const getAllActiveFabricType=() =>{
  fabrictypeservice.getAllActiveFabricType().then(res =>{
  if (res.status){
    setFabricTypeData(res.data);
     
  } else{
    AlertMessages.getErrorMessage(res.internalMessage);
     }
}).catch(err => {
  setFabricTypeData([]);
   AlertMessages.getErrorMessage(err.message);
 })

}

const getAllActiveEmploee=() =>{
  empDetailsservice.getAllActiveEmploee().then(res =>{
  if (res.status){
    setEmpData(res.data);
     
  } else{
    AlertMessages.getErrorMessage(res.internalMessage);
     }
}).catch(err => {
  setEmpData([]);
   AlertMessages.getErrorMessage(err.message);
 })

}

const getAllActiveLocations=() =>{
  locationservice.getAllActiveLocations().then(res =>{
  if (res.status){
    setLocationData(res.data);
     
  } else{
    AlertMessages.getErrorMessage(res.internalMessage);
     }
}).catch(err => {
  setLocationData([]);
   AlertMessages.getErrorMessage(err.message);
 })

}

const getAllstyle=() =>{
  styleservice.getAllActiveStyle().then(res =>{
  if (res.status){
    setstyleData(res.data);
     
  } else{
    AlertMessages.getErrorMessage(res.internalMessage);
     }
}).catch(err => {
  setstyleData([]);
   AlertMessages.getErrorMessage(err.message);
 })

}



 const fileuploadFieldProps: UploadProps = {
  multiple: false,
  onRemove: (file:any) => {
      setFabricFilelist([]);
  },
  beforeUpload: (file: any) => {
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      message.error("image files are allowed!");
      return true;
    }
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = data => {
      if (fabricFilelist.length === 1) {
        message.error("You Cannot Upload More Than One File At A Time");
        return true;
      } else {
          setFabricFilelist([...fabricFilelist, file]);

        return false;
      }
    };

    return false;
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent:any) => `${parseFloat(percent.toFixed(2))}%`,
  },
  fileList: fabricFilelist
};


  const onReset = () => {
    form.resetFields();
    setFabricFilelist([])
    setResetData(true)

  };

  const fileList = (val) =>{

     console.log(val,"FILEEEEEEEEEE")
    //  setFabricFilelist([...fabricFilelist,val])
  }
  
  console.log(fabricFilelist,"filellllllllllllllllll")

  const fileobt = (data) =>{
    console.log(data,"fileObt")

  }

  
  return (
    <Card
      size="small"
      title="Fabric Development "
      extra={
        <Link to="/fabricdevelopment/fabric-development-request/fabric-development-request-view">

        <span>
          <Button type={"primary"}>View </Button>
        </span>
        </Link>
      }
    >
      <Form
        form={form}
        style={{ fontSize: "10px" }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Card>
          <Row gutter={12}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Location"
                name="locationId"
                rules={[{ required: true, message: "Location" }]}
              >
                <Select placeholder="Location" allowClear>
                  
                  {locationData.map((rec) => (
                    <option key={rec.locationId} value={rec.locationId}>
                      {rec.locationName}
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
              <Form.Item label="Style" name="styleId"
              rules={[{ required: true, message: "Style" }]}
              >
              <Select placeholder="Style" allowClear>
              {styleData.map((rec) => (
                  <option key={rec.styleId} value={rec.styleId}>
                    {rec.style}
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
                label="PCH"
                name="pchId"
                rules={[{ required: true, message: "PCH" }]}
              >
                <Select placeholder="PCH" allowClear>
                  
                {pchData.map((rec) => (
                  <option key={rec.profitControlHeadId} value={rec.profitControlHeadId}>
                    {rec.profitControlHead}
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
                label="Buyer"
                name="buyerId"
                rules={[{ required: true, message: "Buyer" }]}
              >
                <Select placeholder="Buyer" allowClear>
                {BuyerData.map((rec) => (
                  <option key={rec.buyerId} value={rec.buyerId}>
                    {rec.buyerName}
                   </option>
                       ))}
                       

                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 2}}
              lg={{ span: 2}}
              xl={{ span: 2 }}
            >
              <Form.Item
                label="Primary"
                name="lightSourcePrimary"
              >
                <Select placeholder="lightSource" allowClear>
                <option value="Primary">Primary</option>
                       

                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 2}}
              lg={{ span: 2}}
              xl={{ span: 2 }}
            >
              <Form.Item
                label="Secondary"
                name="lightSourceSecondary"
              >
                <Select placeholder="lightSource" allowClear>
                <option value="Secondary">Secondary</option>
              
                       

                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 2}}
              lg={{ span: 2}}
              xl={{ span: 2 }}
            >
              <Form.Item
                label="Teritiary"
                name="lightSourceTertiary"
              >
                <Select placeholder="lightSource" allowClear>
                <option value="Teritiary">Teritiary</option>
               
                       

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
                label="Type"
                name="type"
                rules={[{ required: true, message: "Type" }]}
              >
                
                <Input  placeholder="type"/>
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
                label="Fabric Responsible"
                name="fabricResponsible"
                rules={[{ required: true, message: "Fabric Responsible" }]}
              >
                <Select placeholder="Fabric Responsible" allowClear>
                {empData.map((rec) => (
                  <option key={rec.employeeId} value={rec.employeeId}>
                    {rec.firstName} {rec.lastName}
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
              <Form.Item label="Remarks" name="remarks">
                <Input.TextArea placeholder="Remarks" rows={1} />
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            
            >
              <Form.Item
                label="Attached File"
                name="file"
              >
                
              <Upload {...fileuploadFieldProps}  accept='.jpeg,.png,.jpg' >
             <Button icon={<UploadOutlined />}>
              Choose File
             </Button>
             </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} justify="space-around" style={{ marginLeft: 350 }}>
           
          </Row>
          <div>
            <FabricDevelopmentTabs key="1"  qualities={qualities} fileList={fileList} fileobt={fileobt} />
          </div>
          {/* <Card>
          <div>
            <FabricDevelopmentRequestQuality itemsInfo = {itemsInfo} />
          </div>
          </Card> */}
        </Card>

        <Row justify="end">
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

export default FabricDevelopmentRequest;
