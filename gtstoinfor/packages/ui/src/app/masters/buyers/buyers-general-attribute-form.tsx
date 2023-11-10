import { AttributeAgainstEnum, AttributeAgainstRequest, BuyerRequest, BuyersGeneralAttributeInfoModel, BuyersGeneralAttributeModel, BuyersGeneralAttributeRequest } from "@project-management-system/shared-models";
import { Button, Card, Col, Form, Input, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react";
import { AttributeService, BuyersService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";

interface DataType {
    key: React.Key;
    attributeName: string;
    attributeValue : string;
    disabled: boolean;
}

export const BuyersGeneralAttributeForm = () => {
    const [page, setPage] = useState<number>(1);
    const [attributeValue,setAttributeValue] = useState<BuyersGeneralAttributeInfoModel[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const service = new BuyersService()
    const state = useLocation()
    const navigate = useNavigate()
    const attributeService = new AttributeService()
    const [attributes,setAttributes] = useState<any[]>([])
    const [isUpdate,setIsUpdate] = useState<boolean>(false);


    useEffect(() => {
        if(state.state.id != undefined){
            getByBuyerId(state.state.id)
        }
    },[state.state.id])

    const getByBuyerId = (id) => {
        const req =new BuyerRequest(id,'')
        service.getByBuyerId(req).then(res => {
            if(res.status){
                setAttributes(res.data)
                setIsUpdate(true)
            } else{
                getAttributes()
            }
        })
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[],rowSelect) => {
        setSelectedRowKeys(newSelectedRowKeys);
        // rowSelect.foreach((e) => {
        //     e.disabled = false
        // })
    };

    const getAttributes = () => {
        const req = new AttributeAgainstRequest(AttributeAgainstEnum.GENERAL)
        attributeService.getAttributeByAttributeAgainst(req).then(res => {
            if(res.status){
                setAttributes(res.data)
            }
        })
    }

    const setAttributeInfo = (e,index,rowData) => {
        const req = new BuyersGeneralAttributeInfoModel(rowData.attributeId,rowData.attributeName,e.target.value,rowData.buyerGeneralAttributeId)
        setAttributeValue([...attributeValue,req])
    }


    const onInputChange = (e) => {
        console.log(e,'--------e')
    }

    const columns : ColumnsType<DataType> = [
        {
            title: 'S No',
            key: 'sno',
            width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Name',
            dataIndex: 'attributeName'
        },
        {
            title: 'Value',
            dataIndex:'attributeValue',
            render:(value,row,index) => {
                return(
                    <>
                    {row.attributeValue ? <Input key={index} placeholder="Enter value" defaultValue={row.attributeValue}
                        onBlur={e=> setAttributeInfo(e,index,row)}  onChange={onInputChange} disabled={row.disabled}/> : (
                        <Input key={index}placeholder="Enter value"
                        onBlur={e=> setAttributeInfo(e,index,row)} onChange={onInputChange} disabled={row.disabled}/>
                    )}
                    
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
        if(isUpdate){
            const req = new BuyersGeneralAttributeRequest(0,state.state.id,attributeValue,'admin')
            service.updateGeneralAttribute(req).then(res => {
                if(res.status){
                    AlertMessages.getSuccessMessage('Updated successfully')
                    navigate('/global/buyers/buyers-view')
                } else{
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            })
        } else {
            const req = new BuyersGeneralAttributeRequest(0,state.state.id,attributeValue,'admin')
            service.createGeneralAttribute(req).then(res => {
                if(res.status){
                    AlertMessages.getSuccessMessage('Created successfully')
                    navigate('/global/buyers/buyers-view')
                } else {
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            })
        }
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

    const [firstHalfData, secondHalfData] = splitData(attributes);

    return(
        <Card title='Buyer General Settings' extra={<span><Button onClick={() => navigate('/global/buyers/buyers-view')} type={'primary'}>View</Button></span>}>
            {
                attributes.length <= 10 ? (<>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 18 }}>
                <Card size='small'>
                <Table  size='small'  bordered columns={columns} dataSource={attributes} pagination={false} rowSelection={rowSelection}/>
                </Card>
                </Col>
                </>): (<></>)

            }
            {
                attributes.length > 10 ? (<> <Row gutter={24}>
                    <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                        <Card size='small'>
                            <Table  size='small'  bordered columns={columns} dataSource={firstHalfData} pagination={false}/>
                        </Card>
                    </Col>
                    <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                        <Card size='small'>
                            <Table  size='small'  bordered columns={columns} dataSource={secondHalfData} pagination={false}/>
                        </Card>
                    </Col>
                    </Row></>) : (<></>)
            }
           <br/>
            <Form size='small'>
                <Row justify='end'>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                    <Form.Item>
                        <Button onClick={onSubmit} type='primary' htmlType='submit' disabled={attributeValue.length > 0? false: true}>Submit</Button>
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