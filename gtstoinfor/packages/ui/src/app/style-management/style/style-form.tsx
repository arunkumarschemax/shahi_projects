
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Card, Row, Col, Space, message, Upload, Typography, UploadProps } from 'antd';
import { LoadingOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import { BuyerACcountTypes, BuyersDto, CountryDto, CurrencyDto, StyleDto } from '@project-management-system/shared-models';
import { BuyersService, CountryService, CurrencyService, StyleService } from '@project-management-system/shared-services';
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';


const { Option } = Select;

export interface StyleFormProps {
  styleData: BuyersDto;
  updateDetails: (customers: BuyersDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function StyleForm(props: StyleFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [filelist, setfilelist] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

const service = new StyleService()
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Style</div>
    </div>
  );

  const uploadFieldProps: UploadProps = {
    // alert();
    multiple: false,
    onRemove: file => {
      setfilelist([]);
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
        if (filelist.length == 1) {
          AlertMessages.getErrorMessage("You Cannot Upload More Than One File At A Time");
          return true;
        } else {
          setfilelist([file]);
          getBase64(file, imageUrl =>
            setImageUrl(imageUrl)
          );
          return false;
        }
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: filelist,
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
   const onReset = () =>{
    form.resetFields()
    setImageUrl('');
    setfilelist([]);

   }

  const saveEmployee = (data: StyleDto) => {
    service.creteStyle(data).then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage('Style Created Successfully');
          if(filelist.length >0){
            console.log(res.data[0].styleId)
            const formData = new FormData();
            filelist.forEach((file: any) => {
                formData.append('file', file);
            });

            formData.append('styleId', `${res.data[0].styleId}`)
            service.fileUpload(formData).then(fileres => {
                res.data[0].styleFilePath = fileres.data
            })
          }
          navigate("/style-management/style/style-grid")
          onReset();
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        // setDisable(false)
        AlertMessages.getErrorMessage(err.message);
      });
   
  };
  const saveData = (values: StyleDto) => {
    console.log(values)
      if (props.isUpdate) {
        console.log(props.isUpdate)
        // props.updateItem(values);
      } else {
        saveEmployee(values);
      }
    
  };

  
  return (
    <>
    <Card title={props.isUpdate ? 'Update Stle' : 'Add Stle'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/style-management/style/style-grid')} type={'primary'}>View</Button></span>}>
        <Form form={form}
         onFinish={saveData}
          initialValues={props.styleData} layout="vertical">
          <Form.Item name="styleId" style={{ display: "none" }} >
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
                        <Form.Item name='locationId' label='Location'>
                            <Input/>
                        </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:10 }}>
                        <Form.Item name='pch' label='PCH'>
                            <Input/>
                        </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:10 }}>
                        <Form.Item name='style' label='Style'>
                            <Input/>
                        </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:12 }}>
                        <Form.Item name='description' label='Description'>
                            <Input.TextArea rows={1}/>
                        </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:12 }}>
                <Form.Item name="styleUpload" label='Style Upload'
                            rules={[
                                {required:true,message:'Upload Style'}
                            ]}  
                        >
                           <Upload {...uploadFieldProps} style={{  width:'100%' }} listType="picture-card">
                            
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
            {/* {(props.isUpdate===false) && */}
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          {/* } */}
          </Col>
        </Row>
            </Card>  
         </Col>
         {imageUrl &&
         ( <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 10 }} >
            <Card style={{height:'314px'}}>
                    <Form.Item label='Style'>
                    <img src={imageUrl} alt="Default Preview"  style={{ width: '50%',objectFit: 'cover',marginRight:'100px' }} height={'260px'} width={'2000px'}/> 
                    </Form.Item>        
            </Card>
         </Col>)
         }
        
         </Row>
        </Form>
      </Card>
    </>
  );

}



export default StyleForm;

