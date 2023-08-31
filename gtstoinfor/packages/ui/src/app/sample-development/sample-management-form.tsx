import { PlusOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Res } from "@nestjs/common";
import {
  DepartmentReq,
  SampleDevelopmentRequest,
  SettingsRequest,
} from "@project-management-system/shared-models";
import {
  BuyersService,
  CompanyService,
  CountryService,
  CurrencyService,
  DeliveryMethodService,
  DeliveryTermsService,
  DivisionService,
  EmployeeDetailsService,
  FactoryService,
  LiscenceTypeService,
  LocationsService,
  MasterBrandsService,
  PackageTermsService,
  PaymentMethodService,
  PaymentTermsService,
  ProfitControlHeadService,
  SampleDevelopmentService,
  SampleSubTypesService,
  SampleTypesService,
  SettingsService,
  StyleService,
  WarehouseService,
} from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import TextArea from "antd/es/input/TextArea";
import Upload, { RcFile } from "antd/es/upload";
import SampleDevTabs from "./sample-dev-tabs";

const { Option } = Select;

export const SampleDevForm = () => {
  const [form] = Form.useForm();
  const [pch, setPch] = useState<any[]>([]);
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
  const [fabricResponsible, setFabricResponsible] = useState<any[]>([]);
  const [itemResponsible, setItemResponsible] = useState<any[]>([]);
  const [trimResponsible, setTrimResponsible] = useState<any[]>([]);
  const [employee, setEmployee] = useState<any[]>([]);
  const [buyerAddress, setBuyerAddress] = useState<any[]>([]);
  const [packageTerms, setPackageTerms] = useState<any[]>([]);
  const [paymentMethos, setPaymentMethod] = useState<any[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<any>([]);
  // const [deliveryTerms, setDeliveryTerms] = useState<any[]>([]);
  const [deliveryMethods, setDeliveryMethods] = useState<any[]>([]);
  const [division, setDivision] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [tabsData,setTabsData] = useState<any>()
  const pchService = new ProfitControlHeadService();
  const styleService = new StyleService();
  const brandService = new MasterBrandsService();
  const currencyService = new CurrencyService();
  const licenceTypeService = new LiscenceTypeService();
  const employeeService = new EmployeeDetailsService();
  const locationService = new LocationsService();
  const countryService = new CountryService();
  const buyerService = new BuyersService();
  const packageTermsService = new PackageTermsService();
  const paymentMethodSerivce = new PaymentMethodService();
  const paymentTermsService = new PaymentTermsService();
  const deliveryTermsService = new DeliveryTermsService();
  const deliveryMethodsService = new DeliveryMethodService();
  const divisionService = new DivisionService();
  const service = new SettingsService();
  const sampleService = new SampleDevelopmentService()
  const sampleTypeService = new SampleTypesService()
  const subTypeService = new SampleSubTypesService()


  useEffect(() => {
    getPCHData();
    getBuyers();
    getStyles();
    getBrands();
    getTechnicians();
    getCurrency();
    getLicenceType();
    getPackageTerms();
    getPaymentMethods();
    getPaymentTerms();
    getDeliveryMethods();
    // getDeliveryTerms();
    getDivision();
    getLocations();
    getItemResponsible();
    getTrimResponsible();
    getFabricResponsible();
    getEmployees();
    getCountries();
    getSampleTypes();
    getSampleSubTypes();
    getDMM()
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

  // Function to handle image change
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const getLocations = () => {
    locationService.getAll().then((res) => {
      if (res.status) {
        setLocations(res.data);
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

  const getLicenceType = () => {
    licenceTypeService.getAllActiveLiscenceTypes().then((res) => {
      if (res.status) {
        setCurrency(res.data);
      }
    });
  };

  const getPackageTerms = () => {
    packageTermsService.getAllActivePackageTerms().then((res) => {
      if (res.status) {
        setPackageTerms(res.data);
      }
    });
  };

  const getPaymentTerms = () => {
    paymentTermsService.getAllActivePaymentTerms().then((res) => {
      if (res.status) {
        setPaymentTerms(res.data);
      }
    });
  };

  const getPaymentMethods = () => {
    paymentMethodSerivce.getAllActiveMethod().then((res) => {
      if (res.status) {
        setPaymentMethod(res.data);
      }
    });
  };

  const getDeliveryMethods = () => {
    deliveryMethodsService.getAllActiveDeliveryMethods().then((res) => {
      if (res.status) {
        setDeliveryMethods(res.data);
      }
    });
  };

  const getDivision = () => {
    divisionService.getAllActiveDivision().then((res) => {
      if (res.status) {
        setDivision(res.data);
      }
    });
  };

  const getFabricResponsible = () => {
    const req = new DepartmentReq("Fabric");
    employeeService.getAllActiveEmploeesByDepartment(req).then((res) => {
      if (res.status) {
        setFabricResponsible(res.data);
      }
    });
  };

  const getItemResponsible = () => {
    const req = new DepartmentReq("Item");
    employeeService.getAllActiveEmploeesByDepartment(req).then((res) => {
      if (res.status) {
        setItemResponsible(res.data);
      }
    });
  };

  const getTrimResponsible = () => {
    const req = new DepartmentReq("Trim");
    employeeService.getAllActiveEmploeesByDepartment(req).then((res) => {
      if (res.status) {
        setTrimResponsible(res.data);
      }
    });
  };

  const getEmployees = () => {
    employeeService.getAllActiveEmploee().then((res) => {
      if (res.status) {
        setEmployee(res.data);
      }
    });
  };

  const onReset = () => {
    form.resetFields();
  };


  const onFinish = (val) =>{
    console.log(tabsData)
    const req = new SampleDevelopmentRequest(val.locationId,val.styleId,val.pchId,val.buyerId,val.sampleSubTypeId,val.sampleSubTypeId,val.brandId,
      val.costRef,val.m3Style,val.contact,val.extension,val.samValue,val.dmmId,val.technicianId,val.product,val.type,val.conversion,val.madeIn,tabsData.sizeData)
      sampleService.createSampleDev(req).then((res)=>{
        if(res.status){
          message.success(res.internalMessage,2)
        }else{
          message.success(res.internalMessage,2)
        }
      })
      console.log(req)
  }

  const handleSubmit = (data) => {
    setTabsData(data)
    console.log(data,'llllllllll')
  }

  return (
    <Card>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="sampleRequestId" style={{ display: "none" }}>
          <Input hidden />
        </Form.Item>
        <Row gutter={16}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
                {locations.map((e) => {
                  return (
                    <Option key={e.locationId} value={e.locationId}>
                      {e.locationCode}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item
              name="requestNo"
              label="Request No"
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: `Only numbers are accepted`,
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item
              name="sampleTypeId"
              label="Type"
              rules={[{ required: true, message: "Type is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Type"
              >
                {sampleTypes.map((e) => {
                  return (
                    <Option key={e.sampleTypeId} value={e.sampleTypeId}>
                      {e.sampleType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
            style={{ margin: 0 }}
          >
            <Form.Item
              name="sampleSubTypeId"
              label="Sub Type"
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
                {subTypes.map((e) => {
                  return (
                    <Option key={e.sampleSubTypeId} value={e.sampleSubTypeId}>
                      {e.sampleSubType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          {/* <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item name="image" label="Attach File">
              <Upload
                action="" // Use your upload URL
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
          </Col> */}
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item
              name="m3Style"
              label="M3 Style No"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="M3 Style No" />
              {/* <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Licence Type"
                >
                  {licenceType.map((e) => {
                    return (
                      <Option key={e.licencetypeId} value={e.licencetypeId}>
                        {e.licenceType}
                      </Option>
                    );
                  })}
                </Select> */}
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item
              name="contact"
              label="Contact No"
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: `Only numbers are accepted`,
                },
              ]}
            >
              <Input placeholder="Enter discount" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item
              name="typeId"
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item
              name="conversion"
              label="Conversion"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="Enter Conversion" />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item
              name="countryId"
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
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 4 }}
          >
            <Form.Item
              name="remarks"
              label="Remarks"
            >
            <TextArea rows={1} placeholder="Enter Remarks"/>
            </Form.Item>
          </Col>
        </Row>
        <SampleDevTabs handleSubmit={handleSubmit}/>
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
