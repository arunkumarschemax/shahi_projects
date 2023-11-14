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
  useNavigate,
} from "react-router-dom";
import { MasterBrandsDto } from "@project-management-system/shared-models";
import { MasterBrandsService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";

const { Option } = Select;
/* eslint-disable-next-line */
export interface MasterBrandsFormProps {
  masterBrandData: MasterBrandsDto;
  updateMasterBrand: (masterBrand: MasterBrandsDto, filelist: any) => void;
  isUpdate: boolean;
  closeForm: () => void;
}

export function MasterBrandsForm(props: MasterBrandsFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState("");
  const [disable, setDisable] = useState<boolean>(false);
  const service = new MasterBrandsService();
  const [isUpdateImg, setIsUpdateImg] = useState("");
  let navigate = useNavigate()
  let history = useLocation();

  const [filelist, setfilelist] = useState<any>(
    props.isUpdate
      ? [
          {
            name: props.masterBrandData.fileName,
            status: "done",
            url: props.masterBrandData.filePath,
          },
        ]
      : []
  );
  useEffect(() => {
    if (props.masterBrandData) {
      console.log(props.masterBrandData.fileName);
      const updateImage =
        "http://165.22.220.143/crm/gtstoinfor/dist/packages/services/common/upload-files/" +
        props.masterBrandData.fileName;
      // const updateImage ='http://165.22.220.143/crm/gtstoinfor/upload-files/'+props.styleData.styleFileName
      setIsUpdateImg(updateImage);
    }
  }, []);

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
    onRemove: (file) => {
      setfilelist([]);
      setImageUrl("");
    },
    beforeUpload: (file: any) => {
      if (!file.name.match(/\.(png|jpeg|PNG|jpg|JPG)$/)) {
        AlertMessages.getErrorMessage("Only png,jpeg,jpg files are allowed!");
        // return true;
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (data) => {
        if (filelist.length == 1) {
          AlertMessages.getErrorMessage(
            "You Cannot Upload More Than One File At A Time"
          );
          return true;
        } else {
          setfilelist([file]);
          getBase64(file, (imageUrl) => setImageUrl(imageUrl));
          return false;
        }
      };
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: filelist,
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const saveBrand = (brandData: MasterBrandsDto) => {
    setDisable(true);
    const req = new MasterBrandsDto(
      brandData.brandId,
      brandData.brandName,
      brandData.updatedUser,
      brandData.isActive,
      null,
      null,
      brandData.versionFlag
    );
    service
      .createBrand(req)
      .then((res) => {
        setDisable(false);
        if (res.status) {
          AlertMessages.getSuccessMessage("Brand Created Successfully");
          navigate('/masters/brands/brand-view')
          if (filelist.length > 0) {
            const formData = new FormData();
            filelist.forEach((file: any) => {
              formData.append("file", file);
            });

            formData.append("brandId", `${res.data[0].brandId}`);
            service.BrandLogoUpload(formData).then((fileRes) => {
              res.data[0].filePath = fileRes.data;
            });
          }
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

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");

    if (props.isUpdate) {
      props.updateMasterBrand(values, filelist);
    } else {
      setDisable(false);
      saveBrand(values);
    }
  };

  const onReset = () => {
    form.resetFields();
    setfilelist([]); 
  setImageUrl("");
  };

  return (

    <Card
      title='Brand'
      extra={
        props.isUpdate == true ? (
          ""
        ) : (
          <Link to="/masters/brands/brand-view">
            <span>
              <Button className="panel_button" type={"primary"}>
                View{" "}
              </Button>{" "}
            </span>
          </Link>
        )
      }
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={props.masterBrandData}
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
                // {
                //   pattern:
                //     /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                //   message: `Should contain only alphabets.`,
                // },
              ]}
            >
              <Input placeholder = "Enter Brand Name"/>
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
             
                    {!imageUrl ? (
                      <Upload
                        {...uploadFieldProps}
                        style={{ width: "100%" }}
                        listType="picture-card"
                      >
                        {uploadButton}
                      </Upload>
                    ) : (
                      ""
                    )}
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
        <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 5 }}
            lg={{ span: 6 }}
            xl={{ span: 10 }}
          >
            {/* <Card style={{ height: "331px" }}> */}
              <Form.Item>
                <img
                  src={props.isUpdate ? isUpdateImg : imageUrl}
                  alt="Preview"
                  height={"300px"}
                  width={"500px"}
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    marginRight: "100px",
                  }}
                />
              </Form.Item>
            {/* </Card> */}
          </Col>
      </Form>
    </Card>
  );
}

export default MasterBrandsForm;
