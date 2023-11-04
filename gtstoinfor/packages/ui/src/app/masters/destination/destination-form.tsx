import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DestinationDto, DivisionDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { DestinationService, DivisionService } from '@project-management-system/shared-services';
export interface DestinationFormProps {
  Data: DestinationDto;
  updateItem: (Data: DestinationDto) => void;
  isUpdate: boolean;
  //   saveItem:(varirantData:VariantDto) => void;
  closeForm: () => void;
}

export const DestinationForm = (props: DestinationFormProps) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)
  const { Option } = Select;
  const [division, setdivision] = useState<number>(null);
  const [DivsionData, setDivsionData] = useState<DivisionDto[]>([]);
  const service = new DestinationService();
  const services= new DivisionService()
  let navigate = useNavigate()

  let history = useLocation();

  let createdUser = "";
  if (!props.isUpdate) {
    // createdUser= localStorage.getItem("createdUser");
    createdUser = 'admin';
  }
  useEffect(()=>{
    getAllDivison();

  },[])
  const getAllDivison=()=>{
    services.getAllActiveDivision().then(res=>{
      if(res.status){
        setDivsionData(res.data);
    
      }else{
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err=>{
      AlertMessages.getErrorMessage(err.message);
    
    })
      }
      const handleItemCategory = (value, item) => {
        setdivision(value);
      }
  const save = (Data: DestinationDto) => {
    setDisable(true)
    Data.destinationId = 0;
    service.createDestination(Data).then((res) => {
      setDisable(false)
      if (res.status) {
        AlertMessages.getSuccessMessage('Destination Created Successfully');
        //   location.push("/Currencies-view");
        onReset();
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    })
      .catch((err) => {
        setDisable(false)
        AlertMessages.getErrorMessage(err.message);
      });
  };
  /**
   *
   * @param values //Dto values
   */
  const saveData = (values: DestinationDto) => {
    setDisable(false)
    // console.log(values);

    // if(values.currencyName.startsWith(" "))
    //   AlertMessages.getErrorMessage("Invalid Input");

    if (props.isUpdate) {
      props.updateItem(values);
    } else {
      setDisable(false)
      save(values);
    }



  };

  /**
   * To reset form fields
   */
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Card
    title={props.isUpdate?
    'Destination':'Destination'}
    extra={( props.isUpdate == true) && <span> <Button onClick={()=>navigate('/global/destination/destination-grid')} type={'primary'}>View</Button></span>}>



      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.Data}
        name="control-hooks"
        onFinish={saveData}
      >
        <Form.Item name="destinationId" style={{ display: 'none' }}>
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
        <Row gutter={24}>
        <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item name="divisionId" label="Division Name"
           rules={[
            {
              required: true,
              message: 'Division Name is required'
            },
          ]} >

            <Select placeholder="select Divison Name"
            onSelect={handleItemCategory}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
               {DivsionData?.map(Drop=>{
            return<Option key={Drop.divisionId} value={Drop.divisionId}>{Drop.divisionName}</Option>
           })

           }
            </Select>
            
          </Form.Item>

          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}> <Form.Item
            name="destinationCode"
            label="Destination Code"
            
            rules={[
              {
                required: true,
                message: 'Destination Code Is Required'
              }
            ]}
          >
            <Input placeholder="select Destination Code" />
          </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6}}> <Form.Item
            name="destination"
            label="Destination"
            rules={[
              {
                required: true,
                message: 'Destination Is Required'
              }
            ]}
          >
            <Input placeholder="select Destination " />
          </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="optionGroup"
              label="Option Group"
              rules={[
                {
                  required: true,
                  message: " Option Group Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Option Group Should contain only alphabets.`,
                },
              ]}
            >
                <Input placeholder='Enter Option Group'/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: " Description Is Required",
                },
                // {
                //   pattern:
                //     /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                //   message: `Description Should contain only alphabets.`,
                // },
              ]}
            >
                <Input placeholder='Enter Description'/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" disabled={disable} htmlType="submit">
              Submit
            </Button>
            {/* {(props.isUpdate===false) && */}
            <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
              Reset
            </Button>
            {/* } */}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default DestinationForm;
