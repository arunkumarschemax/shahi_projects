// import { QualitysDTO } from "@project-management-system/shared-models";

// import { LevelService, ProfitControlHeadService, QualitysService } from "@project-management-system/shared-services";
// import { Button, Card, Col, Form, Input, Row, Select } from "antd";
// import { useEffect, useState } from "react";
// import AlertMessages from "../../common/common-functions/alert-messages";
// import { useNavigate } from "react-router-dom";

// export interface QualitysFormProps {
//     qualitysData: QualitysDTO;
//     updateDetails: (qualitysData: QualitysDTO) => void;
//     isUpdate: boolean;
//   //   saveItem:(varirantData:VariantDto) => void;
//     closeForm: () => void;
// }

// export const QualitysForm = (props:QualitysFormProps) => {
//     const [form] = Form.useForm();
//     const [disable, setDisable] = useState<boolean>(false)
//     let navigate = useNavigate()
//     const service = new QualitysService();
//     const [selectedAccount, setSelectedAccount] = useState<number>(null);
//     const [accountData, setAccountData] = useState<QualitysDTO[]>([]);
//     const { Option } = Select;

//     let createdUser="";
//     if(!props.isUpdate){
//       // createdUser= localStorage.getItem("createdUser");
//       createdUser= 'admin';
//     }

//     useEffect(() => {
//       getAll();
//     }, []);

//     const getAll=()=>{
//         service.getAllQualitys().then(res=>{
//         if (res.status) {
//           setAccountData(res.data);
//         } else {
//           if (res.status) {
//             AlertMessages.getErrorMessage(res.internalMessage);
//           } else {
//             AlertMessages.getErrorMessage(res.internalMessage);
//           }
//         }
//       }).catch(err => {
//         AlertMessages.getErrorMessage(err.message);
//       })
//     }
//     const saveOperationGroup = (qualit: QualitysDTO) => {
//         setDisable(true)
//         qualit.qualityId=0;
//               service.createQualitys(qualit).then((res) => {
//             if (res.status) {
//               AlertMessages.getSuccessMessage('qualitys Created Successfully');
//               navigate('/trim-master/qualitys/qualitys-view')
//               onReset();
//             } else {
//                 AlertMessages.getErrorMessage(res.internalMessage);
//             }
//           })
//           .catch((err) => {
//             setDisable(false)
//             AlertMessages.getErrorMessage(err.message);
//           });
//     };
//     const handleItemCategory = (value, item) => {
//       setSelectedAccount (value);
//     }
//     const saveData = (values: QualitysDTO) => {
//         console.log(values,"lllllllllll");
        
//           if (props.isUpdate) {
//             props.updateDetails(values);
//           } else {
//             setDisable(false)
//             saveOperationGroup(values)
//           }
//     };

//     const onReset = () => {
//         form.resetFields();

//     };

//     return (
//       <Card title={props.isUpdate ? 
//         'Update Quality' : 'Quality'}
//         headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
//          extra={(props.isUpdate === false) && <span><Button 
//           onClick={() => navigate('/trim-master/qualitys/qualitys-view')} 
//       type={'primary'}>View</Button></span>}>
   
//    <Form form={form} layout="vertical" onFinish={saveData} 
//     name="control-hooks" initialValues={props.qualitysData}>

//             <Form.Item name='qualityId' style={{display:'none'}}>
//                         <Input disabled/>
//                     </Form.Item>
//                     <Form.Item name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
//     <Input hidden/>
// </Form.Item>
//                 <Row gutter={24}>
//                 <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
//                     <Form.Item label='Quality Name' name='qualityName' rules={[{required:true}]}>
//                         <Input placeholder="Enter Quality"/>
//                     </Form.Item>
//                 </Col>
//                 </Row>
//                 <Row  gutter={24} justify={'end'}>
               
//             {/* { props.isUpdate === false &&  */} 
            
//             <Col span={24} style={{ textAlign: 'right' }}>
//             <Button type="primary" disabled={disable} htmlType="submit">
//               Submit
//             </Button>
//             {/* {(props.isUpdate===false) && */}
//          <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
//             Reset
//           </Button>
//           </Col>

//             </Row>
//             </Form>
//       </Card>

//     )


    
// }

// export default QualitysForm


import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { QualitysDTO } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { QualitysService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import FormItem from 'antd/es/form/FormItem';
export interface QualitysFormProps{
    qualitysData: QualitysDTO;
    updateItem:(qualitysData:QualitysDTO)=>void
        isUpdate:boolean;
        closeForm:()=>void;
    }
    

    export const QualityForm =(props:QualitysFormProps)=>{
        const [form] = Form.useForm();
        const [disable, setDisable] = useState<boolean>(false)
       
        const service = new QualitysService();
        let history =useLocation();

        let createdUser="";
        if(!props.isUpdate){
          createdUser= 'admin';
        }

        const savePayment = (Data:QualitysDTO ) => {
            // setDisable(true)
            Data.qualityId= 0;
            service.createQualitys(Data).then((res) => {
              setDisable(false)
                if (res.status) {
                  AlertMessages.getSuccessMessage('Quality Created Successfully');
                //   location.push("/Currencies-view");
                  onReset();
                } else {
                    AlertMessages.getErrorMessage(res.internalMessage);
                }
              })
              .catch((err) => {
                setDisable(false)
                AlertMessages.getErrorMessage(err.message);
              });
          };

          const saveData =(values:QualitysDTO)=>{
            setDisable(false)
            if (props.isUpdate) {
                props.updateItem(values);
              } else {
                setDisable(false)
                savePayment(values);
              }
          }
          const onReset = () => {
            form.resetFields();
          };

          return(
            <Card
      title={<span>Quality</span>}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/trim-master/qualitys/qualitys-view">
            <span style={{ color: "white" }}>
              <Button className="panel_button" type={"primary"}>
                View{" "}
              </Button>{" "}
            </span>
          </Link>
        )
      }
    >
    <Form 
    layout={'vertical'}
    form={form}
    initialValues={props.qualitysData}
    name="control-hooks"
    onFinish={saveData}>

<FormItem name="qualityId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="qualityName"
          label="Quality"
          rules={[
            {
              required: true,
              message:' Quality Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Quality Should contain only alphabets.`
            }
          ]}
        >
          <Input />
        </Form.Item>
        </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" disabled={disable} htmlType="submit">
              Submit
            </Button>
            {/* {(props.isUpdate===false) && */}
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          {/* } */}
          </Col>
        </Row>
    </Form>
</Card>

          )
    }
 export default QualityForm;