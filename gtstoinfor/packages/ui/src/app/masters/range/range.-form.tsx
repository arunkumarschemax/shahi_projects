import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link,  useNavigate } from "react-router-dom";
import { RangeDto} from '@project-management-system/shared-models';
import { RangeService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';

export interface FormProps {
  RangeData:RangeDto;
  updateData:(range:RangeDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}
export function  RangeForm (props: FormProps) {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const service = new RangeService()

  const createRange=(Dto:RangeDto)=>{
    service.createRange(Dto).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage('Range Created Successfully');
        navigate("/masters/range/range-grid");
        onReset();
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

  const onReset=()=>{
    form.resetFields();
  }

  const saveData = (values: RangeDto) => {
    if(props.isUpdate){
      props.updateData(values);
    }else{
      createRange(values);
    }
  
  };

  return (
    <Card title={<span >Range Master</span>} style={{textAlign:'center'}} headStyle={{ border: 0 }} extra={props.isUpdate==true?"":<Link to='/masters/range/range-grid' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.RangeData} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="id" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row gutter={12}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
              <Form.Item
                  name="rangeCode"
                  label="Range Code"
                  rules={[
                    {
                      required: true,
                      message:"Range Code Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Range Code'/>
                </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
              <Form.Item
                  name="rangeDescription"
                  label="Range Description"
                  rules={[
                    {
                      required: true,
                      message:"Range Description Is Required"
                      
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Range Description'/>
                </Form.Item>
        </Col>
      </Row>
        <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          
            <Button type="primary" htmlType="submit" >
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
  );
}

export default RangeForm;
