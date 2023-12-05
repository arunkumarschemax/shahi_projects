import { QualitysDTO } from "@project-management-system/shared-models";

import { LevelService, ProfitControlHeadService, QualitysService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";

export interface QualitysFormProps {
    qualitysData: QualitysDTO;
    updateDetails: (qualitysData: QualitysDTO) => void;
    isUpdate: boolean;
  //   saveItem:(varirantData:VariantDto) => void;
    closeForm: () => void;
}

export const QualitysForm = (props:QualitysFormProps) => {
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    let navigate = useNavigate()
    const service = new QualitysService();
    const [selectedAccount, setSelectedAccount] = useState<number>(null);
    const [accountData, setAccountData] = useState<QualitysDTO[]>([]);
    const { Option } = Select;

    let createdUser="";
    if(!props.isUpdate){
      // createdUser= localStorage.getItem("createdUser");
      createdUser= 'admin';
    }

    useEffect(() => {
      getAll();
    }, []);

    const getAll=()=>{
        service.getAllQualitys().then(res=>{
        if (res.status) {
          setAccountData(res.data);
        } else {
          if (res.status) {
            AlertMessages.getErrorMessage(res.internalMessage);
          } else {
            AlertMessages.getErrorMessage(res.internalMessage);
          }
        }
      }).catch(err => {
        AlertMessages.getErrorMessage(err.message);
      })
    }
    const saveOperationGroup = (qualit: QualitysDTO) => {
        setDisable(true)
              service.createQualitys(qualit).then((res) => {
            if (res.status) {
              AlertMessages.getSuccessMessage('qualitys Created Successfully');
              navigate('/trim-master/qualitys/qualitys-view')
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
    const handleItemCategory = (value, item) => {
      setSelectedAccount (value);
    }
    const saveData = (values: QualitysDTO) => {
        console.log(values,"lllllllllll");
        
          if (props.isUpdate) {
            props.updateDetails(values);
          } else {
            setDisable(false)
            saveOperationGroup(values)
          }
    };

    const onReset = () => {
        form.resetFields();

    };

    return (
      <Card title={props.isUpdate ? 
        'Update Quality' : 'Quality'}
        headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
         extra={(props.isUpdate === false) && <span><Button 
          onClick={() => navigate('/trim-master/qualitys/qualitys-view')} 
      type={'primary'}>View</Button></span>}>
   
   <Form form={form} layout="vertical" onFinish={saveData} initialValues={props.qualitysData}>
            <Form.Item name='qualityId' style={{display:'none'}}>
                        <Input disabled/>
                    </Form.Item>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Form.Item label='Quality Name' name='qualityName' rules={[{required:true}]}>
                        <Input placeholder="Enter Quality"/>
                    </Form.Item>
                </Col>
                </Row>
                <Row  gutter={24} justify={'end'}>
                <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit'>Submit</Button></Col>

            { props.isUpdate === false && 
            
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
            }
            </Row>
            </Form>
      </Card>

    )


    
}

export default QualitysForm