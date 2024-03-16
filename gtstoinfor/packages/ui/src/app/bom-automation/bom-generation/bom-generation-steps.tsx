import { Button, message, Row, Steps, theme } from 'antd'; import React, { useState } from 'react'
import BomGeneration from './bom-generation';
import { PageContainer } from '@ant-design/pro-layout';
import VerifyQuantities from './verify-quantities';
import TrimList from '../../trims/trims-cardview';
import ConsumptionUpdate from './consumption-update';
import { BomService } from '@project-management-system/shared-services';
import { BomGenerationReq, UpdatedConsumptions, UpdatedSizes } from '@project-management-system/shared-models';
import GenerateProposal from './generate-proposal';


export default function BomGenerationSteps() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [selectedPoLines, setSelectedPoLines] = useState<any>([])
    const [selectedData, setSelectedData] = useState<any>([])
    const [updatedData, setUpdatedData] = useState<UpdatedSizes[]>([])
    const [trimsConsumptions, setTrimsConsumptions] = useState<UpdatedConsumptions[]>([])
    const [distinctValues,setDistinctValues] = useState<any>()
    const [itemId,setItemId] = useState<any>()
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
    const bomService = new BomService()

    const generateBom = () => {
        const req = new BomGenerationReq()
        req.poLine = selectedPoLines
        req.updatedConsumptions = trimsConsumptions
        req.updatedSizes = updatedData
        req.itemId = Number(itemId)
        bomService.generateBom(req).then((res) => {
            if (res.status) {
                message.success('Bom generated sucessfully', 3)
                // setCurrent(current + 1);
            }else{
                message.info(res.internalMessage)
            }
        })
    }
    const steps = [
        {
            title: 'Update Quantites',
            content: <BomGeneration sendSelectedKeys={setSelectedPoLines} sendSelectedData={setSelectedData} sendUpdatedData={setUpdatedData} />,
        },
        {
            title: 'Verfiy Quantities',
            content: <VerifyQuantities setDistinctValues={setDistinctValues} selectedData={selectedData} updatedData={updatedData} />,
        },
        {
            title: 'Update Consumption',
            content: <ConsumptionUpdate updatedSizes={updatedData} poLines={selectedPoLines} generateBom={generateBom} setItemId={setItemId} setTrimWiseConsumptions={setTrimsConsumptions} distinctValues={distinctValues} />,
        },
        // {
        //     title: 'Generate proposal',
        //     content: <GenerateProposal poLine={selectedPoLines} />,
        // },
    ];


    const next = () => {
        if (current == 2) {
            generateBom()
        }
        else {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const isNextButoonDisable = () => {
        if(current == 0){
            return selectedPoLines.length ? false : true
        }
        return false

    }

    return (
        <>
            <Steps size='small' type='navigation' current={current} items={items} />
            {/* <div style={contentStyle}>{steps[current].content}</div> */}
            <div style={contentStyle} >{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()} disabled={isNextButoonDisable()} >
                        {steps[current + 1].title + ">>"}
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
