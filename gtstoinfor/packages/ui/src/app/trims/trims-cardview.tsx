import { Button, Card, Checkbox, Col, DatePicker, Descriptions, Divider, Form, Input, InputNumber, Modal, Popconfirm, Row, Segmented, Select, Space, Table, Tabs, Tag, Tooltip, message } from "antd";
import { CloseOutlined, CreditCardOutlined, EditOutlined, EyeOutlined, HomeOutlined, PlusCircleOutlined, SearchOutlined, UndoOutlined, } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { BomService, trimService } from "@project-management-system/shared-services";
import { useLocale } from "antd/es/locale";
import { useLocation, useNavigate } from "react-router-dom";
import { BomPrintFilterReq, StyleNumberReq } from "@project-management-system/shared-models";
import AlertMessages from "../common/common-functions/alert-messages";
import JokerTagPrint from "./trim-prints/joker-tag";
import { stat } from "fs";
import HangTag from "./trim-prints/hang-tag";
import WasCarelabel from "./trim-prints/wash-care-label";
import { PageContainer } from "@ant-design/pro-layout";



export const TrimList = ({ }) => {
    const service = new BomService();
    const [trim, setTrim] = useState<any>([]);
    const state = useLocation()
    const [bomInfo, setBomInfo] = useState<any>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [trimName, setTrimName] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(null);
    const [page, setPage] = React.useState(1);

    const componentsMapping = {
        "Joker Tag": <JokerTagPrint info={bomInfo} />,
        "Hangtag": <HangTag info={bomInfo} />,
        "Wash Care Label": <WasCarelabel itemId={null} poLines={[]} />,
        // "Country Sticker": <CountryStickerPrint info={state?.state?.info} />

    }

    useEffect(() => {
        // setBomInfo(state.state.info)

        getAllTrims();
    }, [])

    const getBomInfoAgainstStyle = (styleNumber, trim) => {
        const req = new StyleNumberReq(styleNumber.styleNumber, trim)
        service.getBomInfoAgainstStyle(req).then(res => {

            if (res.status) {
                res.data.styleNumber = styleNumber.styleNumber;
                res.data.poNumber = styleNumber.purchaseOrderNumber;
                // res.data.destinationCountry = styleNumber.destinationCountry;
                res.data.destinationCountryCode = styleNumber.destinationCountryCode;
                res.data.genderAgeDesc = styleNumber.genderAgeDesc;
                // res.data.geoCode = styleNumber.geoCode;
                res.data.sizeWiseData = styleNumber.sizeWiseData;
                res.data.item = styleNumber.item
                // setBomInfo(res.data)
            }
        })
    }

    // const getBomInfoAgainstItemStyle = (trim) => {
    //     const req = new BomPrintFilterReq(state.state.items,state.state.styleNumbers,trim)
    //     service.getBomPrintInfo(req).then(res => {
    //         if(res.status){
    //             setBomInfo(res.data)
    //         }
    //     })
    // }

    const getBomInfoAgainstItemStyle = (trim) => {
        const req = new BomPrintFilterReq(state.state.items, state.state.styleNumbers, trim)
        service.getBomPrintInfo(req).then(res => {
            if (res.status) {
                setBomInfo(res.data)
                setModalOpen(true)

            }
        })
    }
    
    const getAllTrims = () => {
        service.getAllTrimInfo().then(res => {
            if (res.status) {
                setTrim(res.data);
            }
        })
    }
    // const getAllTrims = () => {
    //     service.getAllTrimInfo().then(res => {
    //         if (Array.isArray(res)) { // Check if response is an array
    //             setTrim(res);
    //         }
    //         // Handle non-array responses if needed
    //     }).catch(error => {
    //         console.error("Error fetching trims:", error);
    //         // Handle error appropriately
    //     }); 
    // }

    const cardOnclick = (val) => {
        setBomInfo([])
        setTrimName(val.item)

        if (state.state) {
            // getBomInfoAgainstStyle(state.state.info,val.item)
            getBomInfoAgainstItemStyle(val.item)
        }
    }

    const onCancel = () => {
        setModalOpen(false)
        setTrimName('')
    }
    const isValidCountry = (country) => {
        const allowedCountries = ["Malaysia", "Philippines", "Indonesia"];
        return allowedCountries.includes(country);
    };

    const columns:any = [
        {
            title: "S.No",
            width: 120,
            render: (_text: any, record: any, index: number) => {
                const continuousIndex = (page - 1) * pageSize + index + 1;
                return <span>{continuousIndex}</span>;
            },
        },
        {
            title: 'Trim',
            dataIndex: 'item'
        },
        {
            title: 'Consumption',
            render: (v, r) => <InputNumber disabled={!r.consumptionRequired} key={r.id} />
        },
        {
            title: 'Action',
            align:'center',
            render: (v, r) => <Button type="dashed" onClick={() => onGenerateBom(r)}>Generate BOM </Button>
        }
    ]

    function onGenerateBom(value) {

    }

    return (
        <>
            <PageContainer title="Trims">
                {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {trim.length > 0 && trim.map((e, index) => (
                        <Card key={index} hoverable style={{
                            width: "20%",
                            height: "100%",
                            backgroundColor: "#8ab0ab",
                            marginRight: "20px",
                            marginBottom: "20px",
                        }}
                            onClick={() => cardOnclick(e)}
                        >
                            <div>
                                <Descriptions
                                    key={index}
                                    style={{ fontSize: '10px !important', textAlign: "center" }}
                                    title={<span style={{ fontSize: '20px', textAlign: "center", fontFamily: 'revert-layer' }}>{e.item}</span>}
                                >
                                </Descriptions>
                            </div>
                        </Card>
                    ))}
                </div> */}
                <Table className="custom-table-wrapper"
                    size='small'
                    //  pagination={false}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 450 }}
                    bordered
                    columns={columns}
                     dataSource={trim} />
            </PageContainer>
            <Modal open={modalOpen} onCancel={onCancel} onOk={() => setModalOpen(false)} footer={[]} width={'85%'}>
                {componentsMapping[trimName]}
                {/* {trimName === "Country Sticker" && isValidCountry(bomInfo.destinationCountry) ?
                    <CountryStickerPrint info={bomInfo} /> :
                    <div>{isValidCountry(bomInfo.destinationCountry) ? "Invalid Trim" : "Invalid destination country"}</div>
                } */}
            </Modal>
        </>
    )

}
export default TrimList;