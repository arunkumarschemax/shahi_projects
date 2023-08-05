import { BuyersGeneralAttributeInfoModel, BuyersGeneralAttributeModel, BuyersGeneralAttributeRequest } from "@project-management-system/shared-models";
import { Button, Card, Col, Form, Input, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table"
import { useState } from "react";
import { BuyersService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";

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
    const state = useLocation()
    const navigate = useNavigate()
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

    const data: DataType[] = [
        {
            key:1,
            attributeName:'GST',
            attributeValue:'',
            disable:true
        },
        {
            key:2,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:3,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:4,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:5,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:6,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:7,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:8,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:9,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:10,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:11,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:12,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:13,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:14,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:15,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:16,
            attributeName:'License',
            attributeValue:'',
            disable:true

        },
        {
            key:17,
            attributeName:'License',
            attributeValue:'',
            disable:true

        }
    ]

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
        const req = new BuyersGeneralAttributeRequest(0,state.state.id,attributeValue,'admin')
        service.createGeneralAttribute(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage('Created successfully')
                navigate('/masters/buyers/buyers-view')
            } else {
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const onReset= () => {
        setAttributeValue([])
    }

    const splitData = (data) => {
        const middleIndex = Math.ceil(data.length / 2);
        const firstHalf = data.slice(0, middleIndex);
        const secondHalf = data.slice(middleIndex);
        return [firstHalf, secondHalf];
    };

    const [firstHalfData, secondHalfData] = splitData(data);

    return(
        <Card title='Buyer General Attributes Addition'>
            {/* <Card>
            <Table columns={columns} dataSource={data} 
             rowSelection={rowSelection}
            />
            </Card> */}
            <Row gutter={24}>
            <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                <Card>
                    <Table columns={columns} dataSource={firstHalfData} pagination={false}/>
                </Card>
            </Col>
            <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                <Card>
                    <Table columns={columns} dataSource={secondHalfData} pagination={false}/>
                </Card>
            </Col>
            </Row>
            <Form>
                <Row justify='end'>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                    <Form.Item>
                        <Button onClick={onSubmit} type='primary' htmlType='submit'>Submit</Button>
                    </Form.Item>                   
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
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

