import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentService from './shared-modules-services/src/services/student.service';
import { Student } from './../../backend/src/student/student.entity/student-entity';

interface StudentFormprops{
}
export function StudentForm (
props:StudentFormprops
)  {
  const navigate = useNavigate();
  const pathToreDirect = '/navpage/Studentgrid'
  const service = new StudentService()
  const [form] = Form.useForm();
  const { state }: any = useLocation();
  const { data } = state ? state : { data: null };

  const onFinish = (values: any) => {
     console.log(values)
    form.resetFields();
    service.create(values).then(res => {
      if (res.status) {
        message.success("Created Successfully")
        setTimeout(() => {
          navigate(pathToreDirect);
        }, 500);
      } else {
        message.error("Not created")
      }
    }).catch(err => {
      console.log(err.message)
    })

  };
  const clearData = () => {
    form.resetFields();
  }
  return (
    <div>
      <Form autoComplete='off'
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={data}
      > 

        <Card title={<span style={{ color: 'white'}}> FORM</span>}
          style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#1ad1ff', border: 0, height: '10px'  }} extra={<span style={{ color: 'white', height:'10px' }}>
            <Button className='panel_button' onClick={() => navigate('/navpage/Studentgrid')}>VIEW</Button>
            {/* <Button className='panel_button'></Button>npm */}
          </span>}>
          <Row>
            {/* <Col xs={{ span: 24 }} lg={{ span: 10 }} offset={1}>
              <Form.Item label="Id"
                rules={[{
                  required: true, message: ' enter id',
                  pattern: /^[0-9 a-z]*$/,
                },
                {
                  max:6,
                  message:'max six',
                }
              ]}
                name="id">
                <Input
                  placeholder='Enter  Id' />
              </Form.Item>  
            </Col> */}

            <Col xs={{ span: 24 }} lg={{ span: 10 }} offset={1}>
              <Form.Item label="Name"
                rules={[{
                  required: true,
                  pattern: /^[a-z,A-Z]*$/,
                  message: 'enter name',
                },
                {
                  max:15,
                  message:'max fifteen letters'
                  
                }

                ]}
                name="name">
                <Input
                  placeholder='enter name' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 10 }} offset={1}>
              <Form.Item label="Age"
                rules={[{
                  required: true,
                  pattern: /^[0-9]*$/,
                  message: 'enter number',
                },
                {
                  max: 3,
                  message: 'max three number ',
                },
                ]}
                name="age">
                <Input
                  placeholder='enter age' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 10 }} offset={1}>
              <Form.Item label="Marks"
                rules={[{
                  required: true,
                  message: 'enter number',
                  pattern: /^[0-9]*$/,
                },
                {
                  max: 3,
                  message: 'age should three numbers'
                }
                ]}
                name="marks">
                <Input
                  placeholder='enter Marks' />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button htmlType="button" style={{ float: 'right' }}
                onClick={() => {
                  clearData()
                }}
              >
                Clear
              </Button>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  )
}

export default StudentForm;