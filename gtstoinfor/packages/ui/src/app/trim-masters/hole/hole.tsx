import { HoleDTO } from "@project-management-system/shared-models";
import { HoleService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";


const { TextArea } = Input;

export interface HoleFormProps {
  data:HoleDTO;
  updateHole:(dto:HoleDTO)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function HoleForm(props: HoleFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Service = new HoleService()

  const createHole=(dto:HoleDTO)=>{
    dto.createdUser = 'admin'
    Service.createHole(dto).then(res => {
      if (res.status) {
        message.success('Finish Created Successfully',2);
        navigate("/masters/hole/hole-view");
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

  const saveData = (values: HoleDTO) => {
    if(props.isUpdate){
      props.updateHole(values);
    }else{
        createHole(values);
    }
  
  };

  return (
    <Card title={<span >Hole</span>} style={{textAlign:'center'}} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={props.isUpdate==true?"":<Link to='/masters/hole/hole-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
      <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}>   
      <Form.Item name="holeId" style={{display:"none"}} >
        <Input hidden/>
      </Form.Item>
    <Form.Item style={{display:"none"}} name="createdUser" >
      <Input hidden/>
    </Form.Item>
    <Row>
        <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}>
              <Form.Item
                  name="hole"
                  label="Hole"
                  rules={[
                    {
                      required: true,
                      message:"Hole is Required"
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}>
                  <Input placeholder='Enter Hole'/>
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

export default HoleForm;
