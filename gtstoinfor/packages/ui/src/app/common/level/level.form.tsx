import { LevelsDto } from "@project-management-system/shared-models";

import { LevelService, ProfitControlHeadService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";

export interface LevelFormProps {
    levelData: LevelsDto;
    updateDetails: (levelData: LevelsDto) => void;
    isUpdate: boolean;
  //   saveItem:(varirantData:VariantDto) => void;
    closeForm: () => void;
}

export const LevelForm = (props:LevelFormProps) => {
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    let navigate = useNavigate()
    const service = new LevelService();
    const [selectedAccount, setSelectedAccount] = useState<number>(null);
    const [accountData, setAccountData] = useState<LevelsDto[]>([]);
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
        service.getAllLevel().then(res=>{
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
    const saveOperationGroup = (leveldata: LevelsDto) => {
        setDisable(true)
              service.createLevel(leveldata).then((res) => {
            if (res.status) {
              AlertMessages.getSuccessMessage('Level Created Successfully');
              navigate('/masters/Level/Level-view')
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
    const saveData = (values: LevelsDto) => {
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
        'Update Level' : 'Add Level'}
         extra={(props.isUpdate === false) && <span><Button 
          onClick={() => navigate('/masters/Level/Level-view')} 
      type={'primary'}>View</Button></span>}>
       <Form.Item name="levelId" style={{ display: 'none' }}>
            <Input hidden />
          </Form.Item>
        <Form
          layout={'vertical'}
          form={form}
          initialValues={props.levelData}
          name="control-hooks"
          onFinish={saveData}
        >
          <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
            

          </Form.Item>
          <Form.Item name="levelId" style={{display:'none'}}>
    <Input hidden/>
</Form.Item>
<Row gutter={24}>

{/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>

          </Col> */}

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="levelName"
              label="Level Name"
              rules={[
                {
                  required: true, message: 'Level Name is required'

                },
                {
                //   pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Should contain only alphabets.`
                }
              ]}>
              <Input placeholder='Enter Level Name'/>
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

export default LevelForm