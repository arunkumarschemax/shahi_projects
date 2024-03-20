import { BomGenerationReq, UOMEnum } from '@project-management-system/shared-models'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, Tag, message } from 'antd'
import React, { Suspense, useState } from 'react'
import UOMConversion from './uom-convserion-form'
import { DownloadOutlined } from '@ant-design/icons'
import moment from 'moment'
import { BomService } from '@project-management-system/shared-services'
import { render } from 'react-dom'

type Props = {
    distinctValues: any,
    poLines: string[]
    itemDetails: any
    setTrimWiseConsumptions: (consumptions: any) => void
    generateBom: () => void
    updatedSizes: any[]
    selectedSize:any[]

}

export default function ConsumptionForms(props: Props) {

    const { distinctValues, setTrimWiseConsumptions, poLines, itemDetails, updatedSizes,selectedSize } = props
    const { itemId, printComponent, consumptionAgainst, uom, consumptionRequired,wastageAgainst } = itemDetails
    const { distinctStyles, distinctItems } = distinctValues
    const [consumptions, setConsumptions] = useState<any[]>([])


    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [DynamicComponent, setDynamiComponent] = useState<any>(null)
    const bomService = new BomService()


    const handleFieldChange = (value: any, styleOrItem: string, field: string ,type: string) => {
        const existingIndex = consumptions.findIndex(item => item[consumptionAgainst] === styleOrItem);
        const newConsumption = { [consumptionAgainst]: styleOrItem, consumptionAgainst, itemId, [field]: value, uom };
        console.log(newConsumption)
        if (existingIndex !== -1) {
            const updatedConsumptions = [...consumptions];
            updatedConsumptions[existingIndex][field] = value;
            setConsumptions(updatedConsumptions);
        } else {
            setConsumptions([...consumptions, newConsumption]);
        }
        setTrimWiseConsumptions(consumptions)
    };
    // console.log(consumptions)

    // function UOMDropdown(record) {
    //     console.log(record,"record")
    //     return <Select defaultValue={uom} key={record.id} disabled style={{ width: '100px' }} placeholder='Select UOM' >
    //         {
    //             Object.values(UOMEnum).map((v) => {
    //                 return <Select.Option key={v} value={v}>{v}</Select.Option>
    //             })
    //         }
    //     </Select>
    // }
    function UOMDropdown(record) {
        return (
            <Select defaultValue={uom} style={{ width: '100px' }} placeholder='Select UOM'>
                {Object.values(UOMEnum).map((v, index) => ( 
                    <Select.Option key={index} value={v}>{v}</Select.Option>
                ))}
            </Select>
        );
    }
    
    const columns = [
        {
            title: consumptionAgainst,
            dataIndex: 'value'
        },
         {
            title: 'Consumption',
            width:'300px',
            render: (v, r) => <InputNumber addonBefore={UOMDropdown(r)}
                onChange={(value: any) => handleFieldChange(Number(value), r.value, "consumption","Consumption")}
                key={r.id}
            />
        },
        {
            title:'Excess',
            width:'70px',
            children:[
                {
                    title: 'Direct',
                    key: 'Direct',
                    render: (v, r) => <InputNumber 
                    onChange={(value: any) => handleFieldChange(Number(value), r.value, "directExcess","directExcess")}
                    key={r.id}
                />
                  },
                  {
                    title: 'Distribution',
                    dataIndex: 'Distribution',
                    key: 'Distribution',
                    render: (v, r) => <InputNumber 
                    onChange={(value: any) => handleFieldChange(Number(value), r.value, "distributeExcess","distributeExcess")}
                    key={r.id}
                />
                  },
              ]      
        }
    ]
    
    const generateBom = () => {
        const req = new BomGenerationReq()
        req.poLine = poLines
        req.updatedConsumptions = consumptions
        req.updatedSizes = updatedSizes
        req.itemId = Number(itemId)
        bomService.generateBom(req).then((res) => {
            if (res.status) {
                onView()
                message.success('Bom generated sucessfully', 3)
                // setCurrent(current + 1);
            } else {
                message.info(res.internalMessage)
            }
        })
    }
    function onGenerateBom() {
        // Convert consumptions array to a Map for easier lookup
        generateBom()
    }

    function handleDynamicDataSource() {
        if (consumptionAgainst == 'item') {
            return distinctItems.map((v) => { return { value: v } })
        } else {
            return distinctStyles.map((v) => { return { value: v } })
        }
    }

    const onView = () => {
        setDynamiComponent(null)
        //  console.log(printComponent,"at 103")
        const Comp = React.lazy(() => import(`../../trims/trim-prints/${printComponent}`))
        // console.log(Comp," at 105")
        setDynamiComponent(Comp)
        setModalOpen(true)
    }

    function onCancel() {
        setModalOpen(false)
    }   

      const sizeColumns = props?.selectedSize?.map((header, index) => ({
        title: header,
        key: header,
        render: (v, r) => <InputNumber 
        onChange={(value: any) => handleFieldChange(Number(value), r.value, header,header)}
        key={r.id}
        />
      }));
    
    return (
        <Row gutter={[24, 24]} justify={'center'}>
            <Col span={24} >
                { consumptionRequired ?
                    <Table rowKey={(row) => row.style} bordered pagination={false} columns={columns} dataSource={handleDynamicDataSource()} /> 
                    : 
                    <Tag>Consumption not required,Download the O/P</Tag>
                }   
                { wastageAgainst?
                      <Table rowKey={(row) =>row.style} bordered pagination={false} columns={sizeColumns} dataSource={handleDynamicDataSource()}></Table>
                      :<></>
                }         </Col>
            {/* <Col span={4}>
                <Button icon={<DownloadOutlined />} onClick={props.generateBom} type='primary'>Download BOM </Button>
            </Col> */}
            <Col span={4}>
                <Button icon={<DownloadOutlined />} onClick={onGenerateBom} type='primary'>View BOM </Button>
            </Col>
            <Modal key={moment().format("dd-mm-yyy hh:mm:ss")} open={modalOpen} onCancel={onCancel} onOk={() => setModalOpen(false)} footer={[]} width={'85%'}>
                <div>
                    {DynamicComponent ? (
                        <Suspense fallback={<p>Loading..</p>}>
                            <DynamicComponent itemId={itemId} poLines={poLines} />
                        </Suspense>
                    ) : (
                        <p>Loading..</p>
                    )}
                </div>
            </Modal>

        </Row>
    )
}
