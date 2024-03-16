import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { GaugeDTO } from "@project-management-system/shared-models";
import { GaugeService } from "@project-management-system/shared-services";


const { TextArea } = Input;

export interface GaugeFormProps {
  data:GaugeDTO;
  updateGauge:(dto:GaugeDTO)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function GaugeForm(props: GaugeFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new GaugeService()

  const createGauge=(dto:GaugeDTO)=>{
    dto.createdUser = 'admin'
    Service.createGauge(dto).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2);
        navigate("/trim-master/gauge/gauge-view");
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

  const saveData = (values: GaugeDTO) => {
    if(props.isUpdate){
      props.updateGauge(values);
    }else{
        createGauge(values);
    }
  
  };

  return (
    <Card title={<span >Gauge</span>} 
    style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/trim-master/gauge/gauge-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}>   
      <Form.Item name="gaugeId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="gauge"
                  label="Gauge"
                  rules={[
                    {
                      required: true,
                      message:"Gauge Is Required"
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Function'/>
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

export default GaugeForm;
