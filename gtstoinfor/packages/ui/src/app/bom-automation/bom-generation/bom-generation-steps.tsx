import { Button, message, Row, Steps, theme } from 'antd'; import React, { useState } from 'react'
import BomGeneration from './bom-generation';
import { PageContainer } from '@ant-design/pro-layout';
import VerifyQuantities from './verify-quantities';
import TrimList from '../../trims/trims-cardview';
import ConsumptionUpdate from './consumption-update';
import { BomService } from '@project-management-system/shared-services';
import { BomGenerationReq, UpdatedConsumptions, UpdatedSizes } from '@project-management-system/shared-models';


export default function BomGenerationSteps() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [selectedPoLines,setSelectedPoLines] = useState<any>([])
    const [selectedData, setSelectedData] = useState<any>([])
    const [updatedData, setUpdatedData] = useState<UpdatedSizes[]>([])
    const [trimsConsumptions,setTrimsConsumptions] = useState<UpdatedConsumptions[]>([])
    const contentStyle: React.CSSProperties = {
        // lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
        padding: 20
    };
    const bomService  = new BomService()

    const generateBom = () => {
        const req = new BomGenerationReq()
        req.poLine = selectedPoLines
        req.updatedConsumptions = trimsConsumptions
        req.updatedSizes = updatedData
        bomService.generateBom(req)
    }

    const steps = [
        {
            title: 'Update Quantites',
            content: <BomGeneration sendSelectedKeys={setSelectedPoLines} sendSelectedData={setSelectedData} sendUpdatedData={setUpdatedData} />,
        },
        {
            title: 'Verfiy Quantities',
            content: <VerifyQuantities selectedData={selectedData} updatedData={updatedData} />,
        },
        {
            title: 'Update Consumption',
            content: <ConsumptionUpdate setTrims={setTrimsConsumptions}  />,
        },
        {
            title: 'Generate proposal',
            content: 'Last-content',
        },
    ];


    const next = () => {
        console.log(current)
        if(current == 2){
            generateBom()
        }else{
            setCurrent(current + 1);
        }

    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));



    return (
        <>
            <Steps size='small' type='navigation' current={current} items={items} />
            {/* <div style={contentStyle}>{steps[current].content}</div> */}
            <div style={contentStyle} >{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                       {steps[current +1].title + ">>"}
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    )
}
