import { OperationGroupsDto } from "@project-management-system/shared-models";
import { OperationGroupsService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";

export interface OperationGroupsFormProps {
    operationGroupData: OperationGroupsDto;
    updateDetails: (operationGroupsData: OperationGroupsDto) => void;
    isUpdate: boolean;
  //   saveItem:(varirantData:VariantDto) => void;
    closeForm: () => void;
}

export const OperationGroupForm = (props:OperationGroupsFormProps) => {
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    let navigate = useNavigate()
    const service = new OperationGroupsService();
  
    let createdUser="";
    if(!props.isUpdate){
      // createdUser= localStorage.getItem("createdUser");
      createdUser= 'admin';
    }

    const saveOperationGroup = (operationGroupData: OperationGroupsDto) => {
        setDisable(true)
        operationGroupData.operationGroupId = 0;
        service.createOperationGroup(operationGroupData).then((res) => {
          setDisable(false)
            if (res.status) {
              AlertMessages.getSuccessMessage('Currency Created Successfully');
              navigate('/masters/operationgroups/operationgroups-view')
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

    const saveData = (values: OperationGroupsDto) => {
        setDisable(false)
          if (props.isUpdate) {
            props.updateDetails(values);
          } else {
            setDisable(false)
            saveOperationGroup(values);
          }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
      <Card title={props.isUpdate ? 'Update Operation Group' : 'Add Operation Group'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/operationgroups/operationgroups-view')} type={'primary'}>View</Button></span>}>

        <Form
          layout={'vertical'}
          form={form}
          initialValues={props.operationGroupData}
          name="control-hooks"
          onFinish={saveData}
        >
          <Form.Item name="operationGroupId" style={{ display: 'none' }}>
            <Input hidden />
          </Form.Item>
          <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
          <Row gutter={24}>
            <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> 
            <Form.Item
            name="operationGroupCode"
            label="Operation Group Code"
            rules={[
              {
                required: true,
                message:'Operation Group Code Is Required'
              },
              {
                pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                message: `Should contain only alphabets.`
              }
            ]}
          >
            <Input placeholder="Enter Operation Group Code"/>
          </Form.Item>
          </Col>
          <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> 
            <Form.Item
            name="operationGroupName"
            label="Operation Group Name"
            rules={[
              {
                required: true,
                message:'Operation Group Name Is Required'
              },
              {
                pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                message: `Should contain only alphabets.`
              }
            ]}
          >
            <Input placeholder="Enter Operation Group Name"/>
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

export default OperationGroupForm