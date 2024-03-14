import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { AirHoleService } from "packages/libs/shared-services/src/trim-masters/air-hole.service";
import { AirHoleDTO } from "packages/libs/shared-models/src/trim-masters/air-hole/air-hole.dto";


const { TextArea } = Input;

export interface AirHoleFormProps {
  data:AirHoleDTO;
  updateAirHole:(dto:AirHoleDTO)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function AirHoleForm(props: AirHoleFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new AirHoleService()

  const createAirHole=(dto:AirHoleDTO)=>{
    dto.createdUser = 'admin'
    Service.createAirHole(dto).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2);
        navigate("/trim-master/air-hole/air-hole-view");
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

  const saveData = (values: AirHoleDTO) => {
    if(props.isUpdate){
      props.updateAirHole(values);
    }else{
        createAirHole(values);
    }
  
  };

  return (
    <Card title={<span >AirHole</span>} 
    style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/trim-master/air-hole/air-hole-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}>   
      <Form.Item name="airHoleId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="airHole"
                  label="AirHole"
                  rules={[
                    {
                      required: true,
                      message:"AirHole is Required"
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter AirHole'/>
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

export default AirHoleForm;
