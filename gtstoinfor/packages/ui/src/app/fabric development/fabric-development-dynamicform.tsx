import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Popconfirm,
  Row,
  Select,
  Table,
  Tooltip,
  Upload,
  UploadProps,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import M3Items from "./m3-model";
import {
  DeleteOutlined,
  EditOutlined,
  UndoOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  ColourService,
  UomService,
} from "@project-management-system/shared-services";
import AlertMessages from "../common/common-functions/alert-messages";
import {
  FabricItemInfoRequest,
  FabricQuantitiesInfo,
} from "@project-management-system/shared-models";

export interface FabricDevelopmentDynamicFormProps {
  form: FormInstance<any>;
  itemsData: (itemsInfo: any[]) => void;
  dynamicformData: (dynamicInfo: any[]) => void;
  form1:FormInstance<any>;
  filesList:(file: any) => void;
  
}
  


export const FabricDevelopmentDynamicForm = (
  props: FabricDevelopmentDynamicFormProps
) => {

 

  // const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [BtnDisable, setBtnDisable] = useState<boolean>(false);
  const [BtnDis, setBtnDis] = useState<boolean>(true);

  const [colorData, setColorData] = useState<any>([]);
  const [uomData, setUomData] = useState([]);
  const [itemsData, setItemsData] = useState<any>([]);
  const [garmentQuantity, setGarmentQuantity] = useState<any>();
  const [consumptionData, setConsumptionData] = useState<any>();
  const [wastageData, setWastageData] = useState<any>();
  const [qualitiesFilelist, setQualitiesFilelist] = useState<any[]>([]);
  const [itemsFilelist, setItemsFilelist] = useState<any[]>([]);

   

  const fileuploadFieldProps: UploadProps = {
    multiple: false,
    onRemove: (file: any) => {
      setQualitiesFilelist([]);
     
    },
    beforeUpload: (file: any) => {
      if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
        message.error("Only pdf and image files are allowed!");
        return true;
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (data) => {
        if (qualitiesFilelist.length === 1) {
          message.error("You Cannot Upload More Than One File At A Time");
          return true;
        } else {
          setQualitiesFilelist([...qualitiesFilelist, file]);
         

          return false;
        }
      };

      // Add a default return value for cases where none of the conditions are met
      return false;
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: qualitiesFilelist,
  };
  console.log(qualitiesFilelist, "FILEUPLOAD");

  


  const colorservice = new ColourService();
  const uomservice = new UomService();



  const onChangeGarment = (e) => {
    e.target.value;
    setGarmentQuantity(e.target.value);
  };

  const onChangeConsumption = (e) => {
    setConsumptionData(e.target.value);
  };

  const onChangeWastage = (e) => {
    setWastageData(e.target.value);
  };

  //  useEffect(()=> {
  //   if(wastageData){
  //     const cal = ((garmentQuantity*consumptionData)+( (garmentQuantity*consumptionData/100)))
  //     props.form.setFieldsValue({FabricQuantity:cal})

  //   }
  //  },[onChangeWastage])

  useEffect(() => {
    if (garmentQuantity && consumptionData && wastageData) {
      const cal: any =
        garmentQuantity * consumptionData +
        (garmentQuantity * consumptionData) / 100;
      props.form.setFieldsValue({ fabricQuantity: cal });
    }
  }, [garmentQuantity, consumptionData, wastageData]);



  useEffect(() => {
    getAllActiveColour();
    getAllUoms();
  }, []);

  const itemList = (data) => {
    // console.log(data,"itemdata")
    setItemsData(data);
    props.itemsData(data);
  };

  const getAllActiveColour = () => {
    colorservice
      .getAllActiveColour()
      .then((res) => {
        if (res.status) {
          setColorData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setColorData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const getAllUoms = () => {
    uomservice
      .getAllUoms()
      .then((res) => {
        if (res.status) {
          setUomData(res.data);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
      .catch((err) => {
        setUomData([]);
        AlertMessages.getErrorMessage(err.message);
      });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onReset = () => {
    props.form.resetFields();
    props.form1.resetFields();
    setFormData([])
    setShowTable(false)
    
  };

  //  const addData = () => {
  //   props.form.validateFields().then((values) => {
  //     // console.log(values, '555');

  //     if (editingIndex !== 1) {
  //       const updatedFormData = [...formData];
  //       updatedFormData[editingIndex] = values;
  //       setFormData(updatedFormData);
  //       setEditingIndex(1);
  //     } else {
  //       setFormData([...formData, values]);
  //       props.dynamicformData([...formData, values])

  //     }
  //     props.form.resetFields();
  //     setShowTable(true); // Set showTable to true when data is added
  //     setBtnDisable(false)

  //   });
  // };

  const addData = () => {
    props.form.validateFields().then((values) => {
      if (editingIndex !== -1) {
        // Editing an existing record
        const updatedFormData = [...formData];
        updatedFormData[editingIndex] = values;
        setFormData(updatedFormData);
        setEditingIndex(-1); // Reset editingIndex to -1 to indicate no active editing
      } else {
        // Adding a new record

        const items = [];

        itemsData.forEach((itemInfo: any) => {
          const data = new FabricItemInfoRequest(
            itemInfo.itemsCode,
            itemInfo.description
          );
          items.push(data);
        });
        const record = {
          ...values,
          itemsinfo: items,
          uid: qualitiesFilelist[0]?.uid,
          file:{...qualitiesFilelist}
        };

        // Push the new record into formData
        setFormData([...formData, record]);
        setItemsFilelist([...itemsFilelist,qualitiesFilelist])
        setQualitiesFilelist([])
        props.dynamicformData([...formData, record]);
        props.filesList(qualitiesFilelist);
      }
      props.form.resetFields();
      setShowTable(true); // Set showTable to true when data is added
      setBtnDisable(false);
      setBtnDis(false);
    });
  };

  console.log(formData, "dynamicformdata");
  console.log(itemsFilelist,"itemFile")

  const setEditForm = (rowData: any, index: number) => {
    setEditingIndex(index); // Set the index of the row being edited
    props.form.setFieldsValue(rowData); // Populate the form fields with the row data
    setBtnDisable(true);
  };

  const deleteData = (index) => {
    const updatedFormData = formData.filter((item, i) => i !== index);
    setFormData(updatedFormData);
  };

  const handlerColor = (val) => {
    if (val) {
      setBtnDis(false);
    } else {
      setBtnDis(true);
    }
  };

  const col: any = [
    // { title: 'Style No', dataIndex: 'styleId', key: 'StyleNo' },
    // { title: 'Color', dataIndex: 'colorId', key: 'color', },

    {
      title: "Color",
      dataIndex: "colorId",
      key: "color",
      render: (rec) => {
        const data = colorData.find((item) => item.colourId === rec);
        return data ? data.colour : "-";
      },
    },
    {
      title: "Garment Quantity",
      dataIndex: "garmentQuantity",
      key: "garmentQuantity",
    },
    { title: "Consumption", dataIndex: "consumption", key: "consumption" },
    { title: "Wastage", dataIndex: "wastage", key: "wastage" },
    {
      title: "Fabric Quantity",
      dataIndex: "fabricQuantity",
      key: "FabricQuantity",
    },
    {
      title: "UOM",
      dataIndex: "uomId",
      key: "uom",
      render: (rec) => {
        const data = uomData.find((item) => item.uomId === rec);
        return data ? data.uom : "-";
      },
    },
    { title: "Remarks", dataIndex: "remarks", key: "remarks" },
    { title: "File", dataIndex: "file", key: "file" },
    {
      title: "Action",
      dataIndex: "action",
      // width: '20%',
      render: (text, rowData: any, index) => (
        <span>
          <Tooltip placement="top" title="edit">
            <EditOutlined
              className={"editSamplTypeIcon"}
              type="edit"
              onClick={() => {
                // console.log(rowData,"rowdata")
                // console.log(index,"index")

                if (rowData) {
                  setEditForm(rowData, index);
                }
              }}
              style={{ color: "#1890ff", fontSize: "14px" }}
            />
          </Tooltip>

          <Divider type="vertical" />
          <Tooltip placement="top" title="delete">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={(e) => {
                deleteData(index);
              }}
            >
              <DeleteOutlined style={{ color: "#1890ff", fontSize: "14px" }} />
            </Popconfirm>
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <Form form={props.form}>
      <Row gutter={12}>
        {/* <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 4 }}
              lg={{ span: 4}}
              xl={{ span: 4 }}
            >
              <Form.Item
                label="Style No"
                name ="styleId"
                rules={[{ required: true, message: "Style No" }]}
              >
                <Input placeholder="Style No" allowClear/>
              </Form.Item>
            </Col> */}

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item label="Color" name="colorId" 
              rules={[{ required: true, message: "Color" }]}
           
          >
            <Select placeholder="Color" allowClear onChange={handlerColor}>
              {colorData.map((rec) => (
                <option key={rec.colourId} value={rec.colourId}>
                  {rec.colour}
                </option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item label="Garment Quantity" name="garmentQuantity"
              rules={[{ required: true, message: "Garment Quantity" }]}
           
           >
            <Input
              placeholder="Garment Quantity"
              onChange={onChangeGarment}
              allowClear
            />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item label="Consumption(YY)" name="consumption"
              rules={[{ required: true, message: "Consumption" }]}

          >
            <Input
              placeholder="Consumption"
              onChange={onChangeConsumption}
              allowClear
            />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item label="Wastage(X%)" name="wastage"
              rules={[{ required: true, message: "Wastage" }]}
          
          >
            <Input
              placeholder="wastage"
              onChange={onChangeWastage}
              allowClear
            />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <Form.Item label="Fabric Quantity" name="fabricQuantity"
              rules={[{ required: true, message: "Fabric Quantity" }]}
          
          >
            <Input placeholder="Fabric Quantity" allowClear />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 6 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
          // style={{marginTop:30}}
        >
          <Form.Item label="UOM" name="uomId"
            rules={[{ required: true, message: "UOM" }]}
          
          >
            <Select placeholder="UOM" allowClear>
              {uomData.map((rec) => (
                <option key={rec.uomId} value={rec.uomId}>
                  {rec.uom}
                </option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 6 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
          style={{ marginTop: 30 }}
        >
          <Form.Item label="Remarks" name="remarks">
            <Input placeholder="remarks" />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
          style={{ marginTop: 30 }}
        >
          <Form.Item label="File" name="file">
            <Upload {...fileuploadFieldProps} accept=".jpeg,.png,.jpg">
              <Button icon={<UploadOutlined />}>Choose File</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Row>
          <Form.Item>
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginTop: 100 }}
            >
              {" "}
              Map items
            </Button>
            <M3Items
              visible={modalVisible}
              onClose={closeModal}
              itemList={itemList}
            />
          </Form.Item>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
          >
            <Form.Item style={{ marginTop: 50, marginLeft: 10 }}>
              <Button type="primary" onClick={addData} disabled={BtnDis}>
                {BtnDisable ? "UPDATE" : "ADD"}
              </Button>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
          >
            <Form.Item>
              {/* <Button onClick={onReset} style={{marginTop:100,marginLeft:30}}  >
              Reset
            </Button> */}
              <Button
                type="default"
                danger
                icon={<UndoOutlined />}
                onClick={onReset}
                style={{ marginTop: 100, marginLeft: 40 }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>

          {/* <Form.Item> 
           <Button type="primary" onClick={showModal} style={{marginTop:100,marginLeft:60}} > Map items</Button> 
           <M3Items visible={modalVisible} onClose={closeModal} itemList = {itemList}/> 
           </Form.Item> */}
        </Row>
      </Row>
      <br></br>
      <br></br>
      {showTable && ( // Only show the table if showTable is true
        <div>
          <Table columns={col} dataSource={formData} pagination={false} />
        </div>
      )}
    </Form>
  );
};

export default FabricDevelopmentDynamicForm;
