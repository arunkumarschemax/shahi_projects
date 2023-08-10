import { Button, Card, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";
import { SampleTypesDto } from "@project-management-system/shared-models";
import { SampleTypesService } from "@project-management-system/shared-services";

export interface SampleTypesFormProps {
    sampleTypeData: SampleTypesDto;
    updateDetails: (sampleTypeData: SampleTypesDto) => void;
    isUpdate: boolean;
  //   saveItem:(varirantData:VariantDto) => void;
    closeForm: () => void;
}

export const SampleTypeForm = (props:SampleTypesFormProps) => {
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    let navigate = useNavigate()
    const service = new SampleTypesService();
  
    let createdUser="";
    if(!props.isUpdate){
      // createdUser= localStorage.getItem("createdUser");
      createdUser= 'admin';
    }

    const saveSampleType = (sampleTypeData: SampleTypesDto) => {
        setDisable(true)
        sampleTypeData.sampleTypeId = 0;
        service.createSampleType(sampleTypeData).then((res) => {
          setDisable(false)
            if (res.status) {
              AlertMessages.getSuccessMessage('Sample Type Created Successfully');
              navigate('/masters/sampleTypes/sampleTypes-grid')
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

    const saveData = (values: SampleTypesDto) => {
        setDisable(false)
          if (props.isUpdate) {
            props.updateDetails(values);
          } else {
            setDisable(false)
            saveSampleType(values);
          }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
      <Card title={props.isUpdate ? 'Update Sample Type' : 'Add Sample Type'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/sampleTypes/sampleTypes-grid')} type={'primary'}>View</Button></span>}>

        <Form
          layout={'vertical'}
          form={form}
          initialValues={props.sampleTypeData}
          name="control-hooks"
          onFinish={saveData}
        >
          <Form.Item name="sampleTypeId" style={{ display: 'none' }}>
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
          <Row gutter={24}>
          
          <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> 
            <Form.Item
            name="sampleType"
            label="Sample Type"
            rules={[
              {
                required: true,
                message:'Sample Type Is Required'
              },
              {
                pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                message: `Should contain only alphabets.`
              }
            ]}
          >
            <Input placeholder="Enter Sample Type"/>
          </Form.Item>
          </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" disabled={disable} htmlType="submit">
                Submit
              </Button>
              {(props.isUpdate===false) &&
           <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
              Reset
            </Button>
             } 
            </Col>
          </Row>
        </Form>
      </Card>

    )


    
}

export default SampleTypeForm