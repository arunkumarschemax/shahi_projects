import {TrimUomDTO } from "@project-management-system/shared-models";
import {TrimUomService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";


const { TextArea } = Input;

export interface TrimUomFormProps {
  data:TrimUomDTO;
  updateTrimUom:(dto:TrimUomDTO)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function TrimUomForm(props: TrimUomFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new TrimUomService()

  const createTrimUom=(dto:TrimUomDTO)=>{
    dto.createdUser = 'admin'
    Service.createTrimUom(dto).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2);
        navigate("/trim-master/trim-uom/trim-uom-view");
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

  const saveData = (values: TrimUomDTO) => {
    if(props.isUpdate){
      props.updateTrimUom(values);
    }else{
        createTrimUom(values);
    }
  
  };

  return (
    <Card title={<span >UOM</span>} 
    style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/trim-master/trim-uom/trim-uom-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}>   
      <Form.Item name="uomId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="uom"
                  label="UOM"
                  rules={[
                    {
                      required: true,
                      message:"UOM IS Required"
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter UOM'/>
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

export default TrimUomForm;
