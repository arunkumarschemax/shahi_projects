import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { BuyersDestinationDto, ColourDto } from '@project-management-system/shared-models';
import { BuyerDestinationService, BuyersService, ColourService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import AlertMessages from '../../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';
import { MappedDetails } from 'packages/libs/shared-models/src/common/Buyers Destination/mapped-details-model';
import { MappedData } from 'packages/libs/shared-models/src/common/Buyers Destination/mapped-data-model';

export interface ColourFromProps{
    colourData: ColourDto;
    updateItem: (colourData:ColourDto)=>void
        isUpdate:boolean;
        closeForm:()=>void;
        closeModal:(val) => void;
        mapBuyerDest: boolean;
}

export const ColourForm=(props:ColourFromProps)=>{
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)

    const service = new ColourService();
    const buyerService = new BuyersService();
    const buyerDest = new BuyerDestinationService();
    let history =useLocation();

    let createdUser="";
    if(!props.isUpdate){
        createdUser= 'admin';
    }

    const savePayment = (colourData:ColourDto ) => {
        // setDisable(true)
        colourData.colourId= 0;
        service.createColour(colourData).then((res) => {
          setDisable(false)
            if (res.status) {
              console.log(props.mapBuyerDest)
              if(props.mapBuyerDest){
                const userData = JSON.parse(localStorage.getItem('currentUser'))
                const externalRefNo = userData?.user?.externalRefNo;
                let buyer
                buyerService.getBuyerByExternalRefNo({buyerExternalRefNo:externalRefNo}).then((rees)=>{
                  if(res.status){
                    console.log(rees.data);
                    buyer = rees.data.buyerId;
                    const map = new MappedData(res.data[0].colourId,res.data[0].colour)
                    const mapData = new MappedDetails("Color",[map])
                    const destReq = new BuyersDestinationDto(0,buyer,true,"","",0,[mapData]);
                    console.log(destReq);
                    buyerDest.create(destReq).then((res)=>{
                      if(res.status){
                        onReset();
                        AlertMessages.getSuccessMessage("Buyer Mapping done.");
                        props.closeModal(false)
                      }
                      else{
                        AlertMessages.getErrorMessage("Something went wrong. ");
                      }
                    }).catch((err) => {
                      setDisable(false)
                      AlertMessages.getErrorMessage(err.message);
                    });
                  }
                  else{
                    AlertMessages.getErrorMessage("Buyer Details not retrived. ")
                  }
                }).catch((err) => {
                  setDisable(false)
                  AlertMessages.getErrorMessage(err.message);
                });
                
              }
              else{
                AlertMessages.getWarningMessage('Colour Created Successfully buyer mapping not done');
              //   location.push("/Currencies-view");
                onReset();
                props.closeModal(false)
              }
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
          })
          .catch((err) => {
            setDisable(false)
            AlertMessages.getErrorMessage(err.message);
          });
        }
          const saveData =(values:ColourDto)=>{
            setDisable(false)
            if (props.isUpdate) {
                props.updateItem(values);
              } else {
                setDisable(false)
                savePayment(values);
              }
          }
          const onReset = () => {
            form.resetFields();
          };

      

      return(
        <Card title={<span>Colour</span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
        extra={props.isUpdate==true?"":<Link to='/masters/colour/colour-view' ><span style={{color:'white'}}><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
       >
<Form
layout={'vertical'}
form={form}
initialValues={props.colourData}
name="control-hooks"
onFinish={saveData}>

<FormItem name="colourId" style={{display:'none'}} wrapperCol={{
          offset: 8,
          span: 16,
        }}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row>
<Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="colour"
          label="Colour"
          rules={[
            {
              required: true,
              message:' Color Is Required'
            },
            {
              pattern: /^[a-zA-Z0-9\s]*$/,
              message: `Color Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder='Enter Colour'/>
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
      )
}