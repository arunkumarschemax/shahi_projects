import { BuyersGeneralAttributeInfoModel, BuyersGeneralAttributeModel, BuyersGeneralAttributeRequest } from "@project-management-system/shared-models";
import { Button, Card, Col, Form, Input, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table"
import { useState } from "react";
import { BuyersService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";

interface DataType {
    key: React.Key;
    attributeName: string;
    attributeValue : string;
    disable: boolean;
  }

export const BuyersGeneralAttributeForm = () => {
    const [attributeValue,setAttributeValue] = useState<BuyersGeneralAttributeInfoModel[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const service = new BuyersService()

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    //   const data: DataType[] = [];
    //   for (let i = 0; i < 46; i++) {
    //     data.push({
    //       key: i,
    //       attributeName: `Buyer ${i}`,
    //       attributeValue:'',
    //     //   enabled: false
    //     });
    //   }

    const data: DataType[] = [{
        key:1,
        attributeName:'GST',
        attributeValue:'',
        disable:true
    },{
        key:2,
        attributeName:'License',
        attributeValue:'',
        disable:true

    }]

    const setAttributeInfo = (e,index,rowData) => {
        const req = new BuyersGeneralAttributeInfoModel(1,rowData.attributeName,e.target.value)
        setAttributeValue([...attributeValue,req])
    }

    const columns : ColumnsType<DataType> = [
        {
            title:'Attribute Name',
            dataIndex: 'attributeName'
        },
        {
            title: 'Attribute Value',
            dataIndex:'attributeValue',
            render:(value,row,index) => {
                return(
                    <>
                    <Input key={index}placeholder="Enter value"
                        onBlur={e=> setAttributeInfo(e,index,row)}/>
                    </>
                )
            }
        }

    ]

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onSubmit = () => {
        console.log(attributeValue,'-------attributeValue')
        const req = new BuyersGeneralAttributeRequest(0,10,attributeValue,'admin')
        service.createGeneralAttribute(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage('Created successfully')
            } else {
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })

    }

    const onReset= () => {
        setAttributeValue([])
    }

    return(
        <Card>
            <Table columns={columns} dataSource={data} 
             rowSelection={rowSelection}
            />
            <Form>
                <Row>
                    <Col>
                    <Form.Item>
                        <Button onClick={onSubmit}>Submit</Button>
                    </Form.Item>                   
                    </Col>
                    <Col>
                    <Form.Item>
                        <Button onClick={onReset}>Reset</Button>
                    </Form.Item>                    
                    </Col>
                </Row>
            </Form>
        </Card>
    )

}

export default BuyersGeneralAttributeForm

