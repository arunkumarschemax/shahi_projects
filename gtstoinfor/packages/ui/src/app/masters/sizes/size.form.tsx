import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { BuyersDestinationDto, SizeDto } from '@project-management-system/shared-models';
import AlertMessages from '../../common/common-functions/alert-messages';
import { BuyerDestinationService, BuyersService, SizeService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import FormItem from 'antd/es/form/FormItem';
import { MappedData } from 'packages/libs/shared-models/src/common/Buyers Destination/mapped-data-model';
import { MappedDetails } from 'packages/libs/shared-models/src/common/Buyers Destination/mapped-details-model';

export interface SizeFormProps{
    sizeData: SizeDto;
    updateItem:(sizeData:SizeDto)=>void
        isUpdate:boolean;
        closeForm:()=>void;
        closeModal:(val)=>void;
        mapBuyerDest:boolean
    }
    

    export const SizeForm =(props:SizeFormProps)=>{
        const [form] = Form.useForm();
        const [disable, setDisable] = useState<boolean>(false)
       
        const service = new SizeService();
        let history =useLocation();
        const buyerService = new BuyersService();
        const buyerDest = new BuyerDestinationService();
        let createdUser="";
        if(!props.isUpdate){
          createdUser= 'admin';
        }

        const savePayment = (sizeData:SizeDto ) => {
          const userData = JSON.parse(localStorage.getItem('currentUser'))
          const externalRefNo = userData?.user?.externalRefNo;
          buyerService.getBuyerByExternalRefNo({buyerExternalRefNo:externalRefNo}).then((rees)=>{
            if(rees.status){
              sizeData.buyerId= rees.data.buyerId;
            }
            // setDisable(true)
            sizeData.sizeId= 0;
            service.createsize(sizeData).then((res) => {
              setDisable(false)
                if (res.status) {
                  if(props.mapBuyerDest){
                    let buyer
                    buyerService.getBuyerByExternalRefNo({buyerExternalRefNo:externalRefNo}).then((rees)=>{
                      if(res.status){
                        console.log(rees.data);
                        buyer = rees.data.buyerId;
                        const map = new MappedData(res.data[0].sizeId,res.data[0].size)
                        const mapData = new MappedDetails("Size",[map])
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
                    AlertMessages.getWarningMessage('Size Created Successfully buyer mapping not done');
                      onReset();
                  }
                } else {
                    if(res.errorCode === 11104){
                      let buyer
                      buyerService.getBuyerByExternalRefNo({buyerExternalRefNo:externalRefNo}).then((rees)=>{
                        if(rees.status){
                          console.log(rees.data);
                          buyer = rees.data.buyerId;
                          const map = new MappedData(res.data[0].sizeId,res.data[0].size)
                          const mapData = new MappedDetails("Size",[map])
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
                      AlertMessages.getErrorMessage(res.internalMessage);
                    }
                }
              })
              .catch((err) => {
                setDisable(false)
                AlertMessages.getErrorMessage(err.message);
              });
            }).catch((err) => {
                setDisable(false)
                AlertMessages.getErrorMessage(err.message);
              });
          };

          const saveData =(values:SizeDto)=>{
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
            <Card title={<span >Size </span>}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
            extra={props.isUpdate==true?"":<Link to='/masters/size/size-view' ><span style={{color:'white'}}><Button className='panel_button' type={'primary'} >View </Button> </span></Link>}
>
    <Form 
    layout={'vertical'}
    form={form}
    initialValues={props.sizeData}
    name="control-hooks"
    onFinish={saveData}>

<FormItem name="sizeId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row><Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:8}}> <Form.Item
          name="size"
          label="Size"
          rules={[
            {
              required: true,
              message:' Size Is Required'
            },
            {
              pattern: /^[a-zA-Z0-9\s]*$/,
              message: `Size Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder='Enter Size' />
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
 export default SizeForm;