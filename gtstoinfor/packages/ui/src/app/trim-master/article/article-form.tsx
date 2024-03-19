import { ArticleDto } from "@project-management-system/shared-models";
import { ArticleService, LengthService, VendorsService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useEffect, useState } from "react";


const { TextArea } = Input;
const {Option} = Select;


export interface ArticleFormProps {
  data:ArticleDto;
  updateData:(dto:ArticleDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}

export function ArticleForm(props: ArticleFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [ supplierData, setSupplierData ] = useState<any[]>([])
  const [ lengthData, setLengthData ] = useState<any[]>([])

  const Service = new ArticleService()
  const supplierService = new VendorsService()
  const lengthService = new LengthService()

  useEffect(()=>{
    getAllSuppliers()
    getAllActiveLengths()
  },[])

  useEffect(()=>{
    console.log(props.data,'.................................')
  },[props.data])
  
  const createArticles=(dto:ArticleDto)=>{
    dto.createdUser = 'admin'
    Service.createArticles(dto).then(res => {
      if (res.status) {
        message.success(res.internalMessage,2);
        navigate("/trim-master/article/article-view");
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

  const getAllSuppliers=()=>{
    supplierService.getAllActiveVendors().then((res)=>{
        if(res.status){
            setSupplierData(res.data)
        }
    })
  }

  const getAllActiveLengths=()=>{
    lengthService.getAllActiveLengths().then((res)=>{
        if(res.status){
            setLengthData(res.data)
        }
    })
  }

  const onReset=()=>{
    form.resetFields();
  }

  const saveData = (values: ArticleDto) => {
    if(props.isUpdate){
      props.updateData(values);
    }else{
        createArticles(values);
    }
  
  };

  return (
    <Card 
    title={<span >Article</span>} 
    style={{textAlign:'left'}} 
    headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
    extra={props.isUpdate==true?"":<Link to='/trim-master/article/article-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >
        <Form form={form } layout={'vertical'} initialValues={props.data} name="control-hooks" onFinish={saveData}  >   
        <Form.Item name="articleId" style={{display:"none"}} >
            <Input hidden/>
        </Form.Item>
        <Form.Item style={{display:"none"}} name="createdUser" >
            <Input hidden/>
        </Form.Item>
        <Row gutter={12}>
            <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:6}} xl={{span:6}}>
                <Form.Item
                  name="articleName"
                  label="Article"
                  rules={[
                    {
                      required: true,
                      message:"Article Is Required"
                    },
                    {
                        pattern: /^[A-Za-z]+$/,
                        message: `Should contain only alphabets.`
                    }
                  ]}>
                  <Input placeholder='Enter Article'/>
                </Form.Item>
            </Col>
            <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:6}} xl={{span:6}}>
              <Form.Item
                  name="text"
                  label="Text"
                  rules={[
                    {
                      required: true,
                      message:"Text is Required"
                    },
                    {
                        pattern: /^[A-Za-z0-9]+$/,
                        message: "Should contain only alphabets and numbers.",
                    },
                  ]}>
                  <Input placeholder='Enter Text'/>
                </Form.Item>
            </Col>
            <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:6}} xl={{span:6}}>
              <Form.Item name="supplierId" label="Supplier" rules={[{required: true,message:"Supplier is Required"}]}>
                <Select allowClear placeholder="Select Supplier">
                  {supplierData.map((res:any)=>{
                    return(
                    <Option key={res.vendorId} value={res.vendorId}>
                        {res.vendorName}
                    </Option>)
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:6}} xl={{span:6}}>
              <Form.Item name="lengthId" label="Length" rules={[{required: true,message:"Length is Required"}]}>
                <Select allowClear placeholder="Select Length">
                  {lengthData.map((res:any)=>{
                    return(
                    <Option key={res.lengthId} value={res.lengthId}>
                        {res.length}
                    </Option>)
                  })}
                </Select>
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

export default ArticleForm;
