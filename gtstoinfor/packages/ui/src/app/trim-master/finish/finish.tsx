import { FinishDTO } from "@project-management-system/shared-models";
import { FinishService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";


const { TextArea } = Input;

export interface FinishFormProps {
  data:FinishDTO;
  updateFinish:(dto:FinishDTO)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function FinishForm(props: FinishFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new FinishService()

  const createFinish=(dto:FinishDTO)=>{
    dto.createdUser = 'admin'
    Service.createFinish(dto).then(res => {
      if (res.status) {
        message.success('Finish Created Successfully',2);
        navigate("/trim-master/finish/finish-view");
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

  const saveData = (values: FinishDTO) => {
    if(props.isUpdate){
      props.updateFinish(values);
    }else{
        createFinish(values);
    }
  
  };

  return (
    <Card title={<span >Finish</span>} style={{textAlign:'left'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/trim-master/finish/finish-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}  >   
      <Form.Item name="finishId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row gutter={12}>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="finish"
                  label="Finish"
                  rules={[
                    {
                      required: true,
                      message:"Finish Is Required"
                    },
                    {
                        pattern: /^[A-Za-z]+$/,
                        message: `Should contain only alphabets.`
                    }
                  ]}>
                  <Input placeholder='Enter Finish Group'/>
                </Form.Item>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="finishCode"
                  label="Finish Code"
                  rules={[
                    {
                      required: true,
                      message:"Finish Code is Required"
                    },
                    {
                        pattern: /^[A-Za-z0-9]+$/,
                        message: "Should contain only alphabets and numbers.",
                    },
                  ]}>
                  <Input placeholder='Enter Finish Code' disabled={props.isUpdate}/>
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

export default FinishForm;
