import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Row,
  Col,
  UploadProps,
  Upload,
  Switch,
  FormInstance,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  BrowserRouter as Router1,
  HashRouter as Router,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { MasterBrandsDto } from "@project-management-system/shared-models";
import { MasterBrandsService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";

const { Option } = Select;
/* eslint-disable-next-line */
export interface MasterBrandsFormProps {
  masterBrandData: MasterBrandsDto;
  updateMasterBrand: (masterBrand: MasterBrandsDto) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function MasterBrandsForm(props: MasterBrandsFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState("");
  const [disable, setDisable] = useState<boolean>(false);
  const service = new MasterBrandsService();
  let history = useLocation();

  const [filelist, setfilelist] = useState<any>(props.isUpdate?[{
    name: props.masterBrandData.fileName,
    status: 'done',
    // url: appSettings.brand_file_path+props.masterBrandData.filePath,
  }]:[]);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Brand Log</div>
    </div>
  );
  let createdUser = "";

  if (!props.isUpdate) {
    // createdUser= localStorage.getItem("createdUser");
    createdUser = "admin";
  }


  const uploadFieldProps: UploadProps = {
    // alert();
    multiple: false,
    onRemove: file => {
      setfilelist([]);
      setImageUrl('');
    },
    beforeUpload: (file: any) => {
      if (!file.name.match(/\.(png|jpeg|PNG|jpg|JPG)$/)) {
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
  const saveBrand = (brandData: MasterBrandsDto) => {
    setDisable(true);
    brandData.brandId = 0;
    service
      .createBrand(brandData)
      .then((res) => {
        setDisable(false);
        if (res.status) {
          AlertMessages.getSuccessMessage("Brand Created Successfully");
          //   location.push("/Currencies-view");
          onReset();
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setDisable(false);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  /**
   *
   * @param values //Dto values
   */
  const saveData = (values: MasterBrandsDto) => {
    setDisable(false);
    console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");

    if (props.isUpdate) {
      props.updateMasterBrand(values);
    } else {
      setDisable(false);
      saveBrand(values);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card title={<span style={{color:'white'}}>Currencies</span>}
    style={{textAlign:'center'}} 
     extra={props.isUpdate==true?"":<Link to='/masters/brands/brand-view' ><span ><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
      >
      <Form
        layout="vertical"
        form={form}
        initialValues={props.masterBrandData}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="brandId" style={{ display: "none" }}>
          <Input hidden />
        </Form.Item>
        <Form.Item
          style={{ display: "none" }}
          name="createdUser"
          initialValue={createdUser}
        >
          <Input hidden />
        </Form.Item>
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
          >
            <Form.Item
              name="brandName"
              label="Brand Name"
              rules={[
                {
                  required: true,
                  message: "Brand Name Required",
                },
                {
                    pattern:
                      /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                    message: `Should contain only alphabets.`,
                  },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
       
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 10 }}
            lg={{ span: 10 }}
            xl={{ span: 10 }}
          >
            <Form.Item
              name="file"
              // rules={[
              //   { required: !props.isUpdate, message: "Please Upload File" },
              // ]}
            >
              <Upload
                {...uploadFieldProps}
                style={{ width: "100%" }}
                listType="picture-card"
              >
                {imageUrl ? (
                  <img src={imageUrl} style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>



        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" disabled={disable} htmlType="submit">
            Submit
          </Button>
          {/* {props.isUpdate === false && ( */}
            <Button
              htmlType="button"
              style={{ margin: "0 14px" }}
              onClick={onReset}
            >
              Reset
            </Button>
          {/* )} */}
        </Col>
      </Form>
    </Card>
  );
}

export default MasterBrandsForm;
