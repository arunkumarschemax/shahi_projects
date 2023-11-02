import { AccountControlObjectDto, ProfitControlHeadDto } from "@project-management-system/shared-models";
import { AccountControlObjectservice, ProfitControlHeadService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useNavigate } from "react-router-dom";

export interface AccountControlobjectFormProps {
    accountControlData: AccountControlObjectDto;
    updateDetails: (accountControlData: AccountControlObjectDto) => void;
    isUpdate: boolean;
  //   saveItem:(varirantData:VariantDto) => void;
    closeForm: () => void;
}

export const AccountControlObjectForm = (props:AccountControlobjectFormProps) => {
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    let navigate = useNavigate()
    const service = new AccountControlObjectservice();
    const servicess = new ProfitControlHeadService
    const [selectedAccount, setSelectedAccount] = useState<number>(null);
    const [accountData, setAccountData] = useState<ProfitControlHeadDto[]>([]);
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
      servicess.getAllActiveProfitControlHead().then(res=>{
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
    const saveOperationGroup = (accountControlData: AccountControlObjectDto) => {
        setDisable(true)
              service.createAccountControlObject(accountControlData).then((res) => {
            if (res.status) {
              AlertMessages.getSuccessMessage('AccountControlObject Created Successfully');
              navigate('/masters/accountcontrolobjects/accountcontrolobjects-view')
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
    const saveData = (values: AccountControlObjectDto) => {
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
        'Update account Control Object' : 'Add account Control Object'}
         extra={(props.isUpdate === false) && <span><Button  onClick={() => navigate('/masters/accountcontrolobject/accountcontrolobject-view')}   type={'primary'}>View</Button></span>}>
       <Form.Item name="accountControlObjectId" style={{ display: 'none' }}>
            <Input hidden />
          </Form.Item>
        <Form
          layout={'vertical'}
          form={form}
          initialValues={props.accountControlData}
          name="control-hooks"
          onFinish={saveData}
        >
          <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
            <Input hidden />
          </Form.Item>
<Row gutter={24}>

<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
<Form.Item
              name="profitControlHeadId"
              label="Profit Control Head"
              rules={[
                {
                  required: true,
                  message: 'Profit Control Head is required'
                },
              ]}>
              <Select
                placeholder="Select Profit Control Head"
                onSelect={handleItemCategory}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {accountData?.map(dropData => {
                  return <Option key={dropData.profitControlHeadId} value={dropData.profitControlHeadId}>{dropData.profitControlHead}</Option>
                })}
              </Select>
            </Form.Item>
          </Col>

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="accountControlObjectsName"
              label="Account Control Object"
              rules={[
                {
                  required: true, message: 'Account Control Object is required'

                },
                {
                  pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Should contain only alphabets.`
                }
              ]}>
              <Input placeholder='Enter Account Control Object'/>
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

export default AccountControlObjectForm