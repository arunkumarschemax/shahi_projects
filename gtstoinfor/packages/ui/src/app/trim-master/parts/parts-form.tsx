import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { PartsService } from "packages/libs/shared-services/src/common/parts.service";
import { PartsDto } from "packages/libs/shared-models/src/trim-masters/parts/parts.dto";


const { TextArea } = Input;

export interface PartsFormProps {
  data:PartsDto;
  updateParts:(dto:PartsDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function PartsForm(props: PartsFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new PartsService()

  const createParts=(dto:PartsDto)=>{
    dto.createdUser = 'admin'
    Service.createParts(dto).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2);
        navigate("/trim-master/parts/parts-view");
        onReset();
      } else {
        if (res.status) {
          message.error(res.internalMessage,2);
        } else {
          message.error(res.internalMessage,2);
        }
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const onReset=()=>{
    form.resetFields();
  }

  const saveData = (values: PartsDto) => {
    if(props.isUpdate){
      props.updateParts(values);
    }else{
        createParts(values);
    }
  
  };

  return (
    <Card title={<span >Parts</span>} 
    style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/trim-master/parts/parts-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}>   
      <Form.Item name="partsId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="parts"
                  label="Parts"
                  rules={[
                    {
                      required: true,
                      message:"Parts is Required"
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Parts'/>
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

export default PartsForm;
