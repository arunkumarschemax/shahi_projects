import { PlusOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Res } from "@nestjs/common";
import { DepartmentReq,SampleDevelopmentRequest } from "@project-management-system/shared-models";
import {BuyersService,CountryService,CurrencyService,EmployeeDetailsService,FabricSubtypeservice,FabricTypeService,LiscenceTypeService,LocationsService,MasterBrandsService,ProfitControlHeadService,SampleDevelopmentService,SampleSubTypesService,SampleTypesService,StyleService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Modal, Row, Select, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Upload, { RcFile } from "antd/es/upload";
import SampleDevTabs from "./sample-dev-tabs";
import { Console } from "console";
import TabPane from "rc-tabs/lib/TabPanelList/TabPane";
import SizeDetail from "./size-detail";
import FabricsForm from "./fabrics";
import TrimsForm from "./trims";
import ProcessForm from "./process";
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export const SampleDevForm = () => {
  const [form] = Form.useForm();
  const [pch, setPch] = useState<any[]>([]);
  const [fabricType, setFabricType] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [dmm,setDMM] = useState<any[]>([])
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [buyer, setBuyer] = useState<any[]>([]);
  const [sampleTypes, setSampleTypes] = useState<any[]>([]);
  const [subTypes, setSubTypes] = useState<any[]>([])
  const [styles, setStyles] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [currency, setCurrency] = useState<any[]>([]);
  const [country, setCountry] = useState <any[]>([]);
  const [licenceType, setLicenceType] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [tabsData,setTabsData] = useState<any>()
  const [selectedBuyerId, setSelectedBuyerId] = useState(null)
  const [m3StleCode, setM3StleCode] = useState<any[]>([])
  const [fabSubType, setFabSubType]=useState<any[]>([])
  const [sizeData, setSizeData] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [fabricsData, setFabricsData] = useState([]);
  const [trimsData, setTrimsData] = useState([]);
  const [data, setData] = useState<any>();
  const pchService = new ProfitControlHeadService();
  const styleService = new StyleService();
  const brandService = new MasterBrandsService();
  const currencyService = new CurrencyService();
  const licenceTypeService = new LiscenceTypeService();
  const employeeService = new EmployeeDetailsService();
  const locationService = new LocationsService();
  const countryService = new CountryService();
  const buyerService = new BuyersService();
  const sampleService = new SampleDevelopmentService()
  const sampleTypeService = new SampleTypesService()
  const subTypeService = new SampleSubTypesService()
  const fabricTypeService = new FabricTypeService()
  const fabSubTypeService = new FabricSubtypeservice()
  const navigate = useNavigate();

  useEffect(() => {
    getLocations();
    getPCHData();
    getBuyers();
    getStyles();
    getBrands();
    getTechnicians();
    getCurrency();
    getCountries();
    getSampleTypes();
    getSampleSubTypes();
    getDMM()
    getM3StyleCode()
    getfabricType()
  }, []);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || "Image");
  };

  const fabricTypeOnchange =(value) =>{
    getFabricSubType(value)
  }

  // Function to handle image change
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const getM3StyleCode = () =>{
    sampleService.getM3StyleCode().then(res =>{
      if(res.status){
        setM3StleCode(res.data)
      }
    })
  }

  const getFabricSubType = (value) =>{
    fabSubTypeService.getFabricSubTypeAginstType({fabricTypeId:value}).then(res =>{
      if(res.status){
        setFabSubType(res.data)
      }
    })
  }

  const getLocations = () => {
    locationService.getAll().then((res) => {
      if (res.status) {
        setLocations(res.data);
      }
    });
  };

  const getfabricType = () => {
    fabricTypeService.getAllActiveFabricType().then((res) => {
      if (res.status) {
        setFabricType(res.data);
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

  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyer(res.data);
      }
    });
  };

  const getSampleTypes = () => {
    sampleTypeService.getAllActiveSampleTypes().then((res) => {
      if (res.status) {
        setSampleTypes(res.data);
      }
    });
  };

  const getSampleSubTypes = () => {
    subTypeService.getAllActiveSampleSubType().then((res) => {
      if (res.status) {
        setSubTypes(res.data);
      }
    });
  };

  const getStyles = () => {
    styleService.getAllActiveStyle().then((res) => {
      if (res.status) {
        setStyles(res.data);
      }
    });
  };

  const getBrands = () => {
    brandService.getAllBrands().then((res) => {
      if (res.status) { 
        setBrands(res.data);
      }
    });
  };

  const getDMM = () => {
    const req = new DepartmentReq("DMM");
    employeeService.getAllActiveEmploeesByDepartment(req).then((res) => {
      if (res.status) {
        setDMM(res.data);
      }
    });
  };

  const getTechnicians = () => {
    employeeService.getAllActiveEmploee().then((res) => {
      if (res.status) {
        setTechnicians(res.data);
      }
    });
  };

  const getCountries = () => {
    countryService.getAllActiveCountries().then((res) => {
      if (res.status) {
        setCountry(res.data);
      }
    });
  };

  const getCurrency = () => {
    currencyService.getAllActiveCurrencys().then((res) => {
      if (res.status) {
        setCurrency(res.data);
      }
    });
  };

  const onReset = () => {
    form.resetFields();
  };


  const onFinish = (val) =>{
    if(data != undefined){
      console.log('hoii')
      if(data.sizeData != undefined && data.trimsData != undefined  && data.processData != undefined && data.trimsData != undefined){
        console.log('TTTTT')
        const req = new SampleDevelopmentRequest(val.sampleRequestId,val.locationId,val.requestNo,val.pchId,val.user,val.buyerId,val.sampleSubTypeId,val.sampleSubTypeId,val.styleId,val.description,val.brandId,val.costRef,val.m3Style,val.contact,val.extension,val.sam,val.dmmId,val.technicianId,1,'',val.conversion,val.madeIn,val.remarks,data.sizeData,data.fabricsData,data.trimsData,data.processData)
        console.log(req.sizeData)
       
          sampleService.createSampleDevelopmentRequest(req).then((res) => {
            if (res.status) {
              console.log(res.data);
              message.success(res.internalMessage, 2);
              if (fileList.length > 0) {    
                const formData = new FormData();
                fileList.forEach((file) => {
                  console.log(file.originFileObj)
                  formData.append('file', file.originFileObj);
                });
        
                formData.append('SampleRequestId', `${res.data[0].SampleRequestId}`);
                // console.log(res.data[0].SampleRequestId)
                console.log(formData);
                sampleService.fileUpload(formData).then((file) => {
                  console.log(file.data)
                  res.data[0].filepath = file.data;
                });
              }
              navigate("/sample-development/sample-requests")
            } else {
              message.success(res.internalMessage, 2);
            }
          });
          console.log(req.sizeData);
      }else{
        console.log('ddddddd')
        message.error('Please Fill The Size,Fabric, Trim And process Details')
      }
      
    }else{
      console.log('********')
      message.error('Please Fill The Below Details')
    }
   
  }

  const handleSubmit = (data) => {
    setTabsData(data)
  }
  const buyerOnchange =(value) =>{
    setSelectedBuyerId(value)
  }

    const handleSizeDataUpdate = (updatedData) => {
      console.log(updatedData)
      setData((prevData) => ({ ...prevData, sizeData: updatedData }));
      setSizeData(updatedData);
  };

  const handleProcessDataUpdate = (updatedData) => {
      setData((prevData) => ({ ...prevData, processData: updatedData }));
      setProcessData(updatedData);
  };

  const handleFabricsDataUpdate = (updatedData) => {
    console.log(updatedData)
      setData((prevData) => ({ ...prevData, fabricsData: updatedData }));
      setFabricsData(updatedData);
  };

  const handleTrimsDataUpdate = (updatedData) => {
      setData((prevData) => ({ ...prevData, trimsData: updatedData }));
      setTrimsData(updatedData);
  };

  return (
    <Card title='Sample Development Request' headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="sampleRequestId" style={{ display: "none" }}>
          <Input hidden />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="locationId"
              label="Location"
              rules={[{ required: true, message: "Location is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Location"
              >
                <Option key={300} value={300}>{'300'}</Option>
                {/* {locations.map((e) => {
                  return (
                    <Option key={e.locationId} value={e.locationId}>
                      {e.locationCode}
                    </Option>
                  );
                })} */}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }}sm={{ span: 24 }}md={{ span: 8 }}lg={{ span: 8 }}xl={{ span: 4 }} style={{display:'none'}}>
            <Form.Item
              name="requestNo"
              label="Request No"
              // rules={[
              //   {
              //    required:true
              //   },
              // ]}
            >
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="pchId"
              label="PCH"
              rules={[{ required: true, message: "PCH is required" }]}
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
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="user"
              label="User"
              rules={[
                {
                  pattern: /^[0-9a-zA-Z]*$/,
                  message: `Only numbers are accepted`,
                },
              ]}
            >
              <Input placeholder="Enter User" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="buyerId"
              label="Buyer"
              rules={[{ required: true, message: "Buyer is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Buyer"
                onChange={buyerOnchange}
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
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="sampleTypeId"
              label="fabric Type"
              rules={[{ required: true, message: "Type is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Type"
                onChange={fabricTypeOnchange}
              >
                {fabricType.map((e) => {
                  return (
                    <Option key={e.fabricTypeId} value={e.fabricTypeId}>
                      {e.fabricTypeName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} style={{ margin: 0 }} >
            <Form.Item
              name="sampleSubTypeId"
              label="Fabric Sub Type"
              rules={[
                {
                  required: true,
                  message: "Sub Type is required",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Sub Type"
              >
                {fabSubType.map((e) => {
                  return (
                    <Option key={e.fabricSubTypeId} value={e.fabricSubTypeId}>
                      {e.fabricSubTypeName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="styleId"
              label="Style"
              rules={[{ required: true, message: "Style is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Style"
              >
                {styles.map((e) => {
                  return (
                    <Option key={e.styleId} value={e.styleId}>
                      {e.style}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: false,
                },
                {
                  pattern: /^[^-\s][a-zA-Z0-9_\s-]*$/,
                  message: `Don't Allow Spaces`,
                },
              ]}
            >
              <TextArea rows={1} placeholder="Enter Description" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="brandId"
              label="Brand"
              rules={[{ required: true, message: "Brand is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Brand"
              >
                {brands.map((e) => {
                  return (
                    <Option key={e.brandId} value={e.brandId}>
                      {e.brandName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="costRef"
              label="Cost Ref"
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: `Only numbers are accepted`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}
          >
            <Form.Item name="image" label="Attach File">
              <Upload
                action="http://165.22.220.143/crm/gtstoinfor/upload-files/" // Use your upload URL
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept=".jpg, .jpeg, .png"
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    message.error("You can only upload JPG or PNG files!",2);
                  }
                  return isImage;
                }}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="m3Style"
              label="M3 Style No"
              rules={[{ required: true, message: "" }]}
            >
              {/* <Input placeholder="M3 Style No" /> */}
              <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Licence Type"
                >
                  {m3StleCode.map((e) => {
                    return (
                      <Option key={e.m3StyleId} value={e.m3StyleId}>
                        {e.m3StyleCode}
                      </Option>
                    );
                  })}
                </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="contact"
              label="Contact No"
              rules={[
                {
                  required: true,
                  message:'MobileNumber Is Required'
                },
                {
                  pattern: /^[0-9]{10}$/, 
                  message:'Invalid phone number'
                },
              ]}
            >
              <Input placeholder="Enter discount"/>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="extension"
              label="Extn"
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: `Only numbers are accepted`,
                },
              ]}
            >
              <Input placeholder="Enter Extn" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="sam"
              label="SAM"
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: `Only numbers are accepted`,
                },
              ]}
            >
              <Input placeholder="Enter SAM" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="dmmId"
              label="DMM"
              rules={[{ required: true, message: "" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select DMM"
              >
                {dmm.map((e) => {
                  return (
                    <Option key={e.employeeId} value={e.employeeId}>
                      {`${e.employeeCode} - ${e.lastName}`}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="technicianId"
              label="Technician"
              rules={[{ required: true, message: "" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Technician"
              >
                {technicians.map((e) => {
                  return (
                    <Option key={e.employeeId} value={e.employeeId}>
                      {`${e.employeeCode} - ${e.lastName}`}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="productId"
              label="Product"
              rules={[{ required: false, message: "" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Product"
              >
                {licenceType.map((e) => {
                  return (
                    <Option key={e.productId} value={e.productId}>
                      {e.product}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: false, message: "" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Type"
              >
                {licenceType.map((e) => {
                  return (
                    <Option key={e.typeId} value={e.typeId}>
                      {e.type}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="conversion"
              label="Conversion"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="Enter Conversion" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="madeIn"
              label="Made In"
              rules={[{ required: true, message: "" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Made In"
              >
                {country.map((e) => {
                  return (
                    <Option key={e.countryId} value={e.countryId}>
                      {e.countryName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
            <Form.Item
              name="remarks"
              label="Remarks"
            >
            <TextArea rows={1} placeholder="Enter Remarks"/>
            </Form.Item>
          </Col>
        </Row>
        {selectedBuyerId != null ?
         <Card size='small'>
         <Tabs type={'card'} tabPosition={'top'}>
             <TabPane key="1" tab={<span><b>{`Size Detail`}</b></span>}>
             <SizeDetail props = {handleSizeDataUpdate} buyerId={selectedBuyerId}/>
             </TabPane>
             <TabPane key="2" tab={<span><b>{`Fabric`}</b></span>}>
             <FabricsForm props = {handleFabricsDataUpdate}/>
             </TabPane>
             <TabPane key="3" tab={<span><b>{`Trims`}</b></span>}>
             <TrimsForm props = {handleTrimsDataUpdate}/>
             </TabPane>
             <TabPane key="4" tab={<span><b>{`Process`}</b></span>}>
             <ProcessForm props={handleProcessDataUpdate}/>
             </TabPane>
             {/* <TabPane key="5" tab={<span><b>{`Remarks`}</b></span>}>
                 
             </TabPane> */}
         </Tabs>
     </Card>:''

        // <SampleDevTabs handleSubmit={handleSubmit} buyerId={selectedBuyerId}/>:''
        }
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <div
              style={{
                display: "contents",
                height: "100%",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginBottom: "8px" }}
              >
                Submit
              </Button>
              <Button style={{ margin: "0 14px" }} onClick={onReset}>
                Reset
              </Button>
            </div>
          </Col>
        </Row>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form>
    </Card>
  );
};

export default SampleDevForm;