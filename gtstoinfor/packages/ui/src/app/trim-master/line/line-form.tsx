import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { LineDto } from "@project-management-system/shared-models";
import { LineService } from "packages/libs/shared-services/src/common/line.service";


const { TextArea } = Input;

export interface LineFormProps {
  data:LineDto;
  updateLine:(dto:LineDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function LineForm(props: LineFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new LineService()

  const createLine=(dto:LineDto)=>{
    dto.createdUser = 'admin'
    Service.createLine(dto).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2);
        navigate("/trim-master/line/line-view");
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

  const saveData = (values: LineDto) => {
    if(props.isUpdate){
      props.updateLine(values);
    }else{
        createLine(values);
    }
  
  };

  return (
    <Card title={<span >Line</span>} 
    style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/trim-master/line/line-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}>   
      <Form.Item name="lineId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="line"
                  label="Line"
                  rules={[
                    {
                      required: true,
                      message:"Line is Required"
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Line'/>
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

export default LineForm;
