
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Card, Row, Col, Space, message, Upload, Typography, UploadProps } from 'antd';
import { LoadingOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import { StyleDto } from '@project-management-system/shared-models';
import { BuyersService, ProfitControlHeadService, StyleService } from '@project-management-system/shared-services';
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';


const { Option } = Select;

export interface StyleFormProps {
  styleData: StyleDto;
  updateDetails: (customers: StyleDto,filelist:any) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function StyleForm(props: StyleFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdateimg, setisUpdateImg]=useState('')
  const buyerService = new BuyersService();
  const [buyer, setBuyer] = useState<any[]>([]);
  const [pch, setPch] = useState<any[]>([]);
  const pchService = new ProfitControlHeadService();

  const [filelist, setfilelist] = useState<any>(props.isUpdate?[{
    name: props.styleData.styleFileName,
    status: 'done',
    url:props.styleData.styleFileName,

  }]:[]);

  useEffect(() => {
   if(props.styleData){
    console.log(props.styleData.styleFileName)
    const updateImage ='http://165.22.220.143/crm/gtstoinfor/dist/packages/services/common/upload-files/'+props.styleData.styleFileName
    // const updateImage ='http://165.22.220.143/crm/gtstoinfor/upload-files/'+props.styleData.styleFileName
    setisUpdateImg(updateImage)
   }
   getBuyers()
   getPCHData()
  }, [])

const service = new StyleService()
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Style</div>
    </div>
  );

  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyer(res.data);
      }
    });
  };

  const getPCHData = () => {
    pchService.getAllActiveProfitControlHead().then((res) => {
      if (res.status) {
        setPch(res.data);
      }
    });
  };

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
        props.updateDetails(values,filelist);
      } else {
        saveEmployee(values);
      }
    
  };

  
  return (
    
    <Card title={props.isUpdate ? 'Update Style' : 'Style'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/style-management/style/style-grid')} type={'primary'}>View</Button></span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
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
                  <Form.Item name='buyerId' label='Buyer'
                    rules={[
                      {
                        required: true,
                        message:'Buyer Is Required'
                      }
                    ]}
                  >
                    <Select
                      allowClear
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Buyer"
                    >
                      {buyer.map((e) => {
                        return (
                          <Option key={e.buyerId} value={e.buyerId}>
                            {`${e.buyerCode} - ${e.buyerName}`}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:10 }}>
                        <Form.Item name='locationId' label='Location'
                          rules={[
                            {
                              required: true,
                              message:'Location Is Required'
                            }
                          ]}
                        >
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Location"
                          >
                            <Option key={300} value={300}>{'300'}</Option>
                          </Select>
                        </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:10 }}>
                        <Form.Item name='pch' label='PCH'
                         rules={[
                          {
                            required: true,
                            message:'pch Is Required'
                          }
                        ]}
                        >
                        <Select
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        placeholder="Select PCH"
                      >
                        {pch.map((e) => {
                          return (
                            <Option key={e.profitControlHeadId} value={e.profitControlHeadId}>
                              {e.profitControlHead}
                            </Option>
                          );
                        })}
                      </Select>
                        </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:10 }}>
                        <Form.Item name='style' label='Style'
                         rules={[
                          {
                            required: true,
                            message:'Location Is Required'
                          }
                        ]}
                        >
                            <Input placeholder="Select Style"/>
                        </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:12 }}>
                        <Form.Item name='description' label='Description'>
                            <Input.TextArea rows={1}  placeholder="Enter Description"/>
                        </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:12 }}>
                <Form.Item name="styleUpload" label='Style Upload'
                            rules={[
                                {required:true,message:'Upload Style'}
                            ]}  
                            initialValue={props.isUpdate ? props.styleData.styleFileName:''}
                        >
                           <Upload  {...uploadFieldProps} style={{  width:'100%' }} listType="picture-card">
                            
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
         {/* {imageUrl &&
         (  */}
         <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 10 }} >
            <Card style={{height:'331px'}}>
                    <Form.Item >
                    <img src={props.isUpdate ? isUpdateimg:imageUrl} alt="Preview"  
                     height={'300px'} 
                    width={'500px'}   
                    style={{ width: '100%', objectFit: 'contain', marginRight: '100px' }}
                    /> 
                    </Form.Item>        
            </Card>
         </Col>
        {/* //  )
        //  } */}
        
         </Row>
        </Form>
      </Card>
  );

}



export default StyleForm;

