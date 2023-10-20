import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, Row, Col, message, Typography, Upload, UploadProps } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FabricWeaveDto } from "@project-management-system/shared-models";
import { FabricWeaveService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export interface FabricWeaveFormProps {
  data: FabricWeaveDto;
  updateFabricWeave: (dto: FabricWeaveDto, fileList:any) => void;
  isUpdate: boolean;
  closeForm: () => void;
}


export function FabricWeaveForm(props: FabricWeaveFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fabricWeaveList,setFabricWeaveList] = useState<any[]>([]);
  const [imageUrl,setImageUrl] = useState('')
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdateImg, setIsUpdateImg]=useState('')

  const Service = new FabricWeaveService();

  const [fileList, setFileList] = useState<any>(props.isUpdate?[{
    name: props.data.fabricWeaveImageName,
    status: 'done',
    url:props.data.fabricWeaveImageName,

  }]:[]);

  useEffect(() => {
    if(props.data){
     console.log(props.data.fabricWeaveImageName)
     const updateImage ='http://165.22.220.143/crm/gtstoinfor/dist/packages/services/common/upload-files/'+props.data.fabricWeaveImageName
     // const updateImage ='http://165.22.220.143/crm/gtstoinfor/upload-files/'+props.styleData.styleFileName
     setIsUpdateImg(updateImage)
    }
   }, [])


   const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Style</div>
    </div>
  );

  const onReset = () => {
    form.resetFields();
    setImageUrl('');
    setFileList([]);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const saveFabricWeave = (data: FabricWeaveDto) => {
    Service.createFabricWeave(data).then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage('Fabric Weave Created Successfully');
          if(fileList.length > 0){
            const formData = new FormData();
            fileList.forEach((file: any) => {
                formData.append('file', file);
            });

            formData.append('fabricWeaveId', `${res.data[0].fabricWeaveId}`)
            Service.fabricWeaveImageUpload(formData).then(fileRes => {
                res.data[0].fabricWeaveImageName = fileRes.data
            })
          }
          navigate("/masters/fabric-weave/fabric-weave-view")
          onReset();
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        // setDisable(false)
        message.success(err.message,2);
      });
   
  };

  const saveData = (values: FabricWeaveDto) => {
    if (props.isUpdate) {
      props.updateFabricWeave(values, fileList);
    } else {
      saveFabricWeave(values);
      console.log(values,'ooooooooooooooooooooooooo')
    }
  };



  const weaveUploadFieldProps: UploadProps = {
    multiple: false,
    onRemove: file => {
      setFileList([]);
      setImageUrl('');
    },
    beforeUpload: (file: any) => {
      if (!file.name.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
        AlertMessages.getErrorMessage("Only png,jpeg,jpg files are allowed!");
        // return true;
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = data => {
        if (fileList.length == 1) {
          AlertMessages.getErrorMessage("You Cannot Upload More Than One File At A Time");
          return true;
        } else {
          setFileList([file]);
          getBase64(file, imageUrl =>
            setImageUrl(imageUrl)
          );
          return false;
        }
      }
    },
    accept: 'image/jpeg,image/jpg,image/png,image/gif,image/tiff,image/x-tiff,image/x-png',
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: fileList,
  };
  const showImagePreview = props.isUpdate && props.data.fabricWeaveImageName;

return (
    
  <Card title={props.isUpdate ? 'Update Fabric' : 'Fabric Weave'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/fabric-weave/fabric-weave-view')} type={'primary'}>View</Button></span>}>
    <Form form={form}
    onFinish={saveData}
    initialValues={props.data} layout="vertical">
      <Form.Item name="fabricWeaveId" style={{ display: "none" }} >
        <Input hidden />
      </Form.Item>
      <Form.Item style={{ display: "none" }} name="createdUser" initialValue={''}>
        <Input hidden />
      </Form.Item>
      <Row gutter={24}>
       <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 14 }}>
        <Card>
          <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:10 }}>
              <Form.Item name='fabricWeaveName' label='Fabric Weave'
              rules={[{
                required: true,
                message:'Fabric Weave Is Required'
              }]}>
                <Input placeholder="Enter Fabric Weave"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:10 }}>
              <Form.Item name='fabricWeaveCode' label='Fabric Weave Code'
              rules={[{
                required: true,
                message:'Fabric Weave Code Is Required'
              }]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:12 }}>
              <Form.Item name="fabricWeaveImageName" label='Fabric Weave Image'
              rules={[{required:true,message:'Upload Fabric Weave'}]}  
              initialValue={props.isUpdate ? props.data.fabricWeaveImageName:''}
              >
                <Upload  {...weaveUploadFieldProps} style={{  width:'100%' }} listType="picture-card">
                  {uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row> 
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Card>  
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 10 }} >
        <Card style={{height:'331px'}}>
          <Form.Item >
            <img src={props.isUpdate ? isUpdateImg:imageUrl} alt="Preview"  
            height={'300px'} 
            width={'500px'}   
            style={{ width: '100%', objectFit: 'contain', marginRight: '100px' }}
            /> 
          </Form.Item>        
        </Card>
      </Col>
    </Row>
    </Form>
  </Card>
);
}

export default FabricWeaveForm;
