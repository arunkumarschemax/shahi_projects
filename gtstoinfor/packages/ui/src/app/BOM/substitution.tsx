import { FgItemCodeReq, MappedInfo, SKUlistFilterRequest, SubstituionReq, mappedRmSKU } from "@project-management-system/shared-models";
import { DivisionService, ItemCreationService, SKUGenerationService, StyleService, ProductStructureService, SubstitutionService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Row, Select, Table, Tag } from "antd"
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";

const {Option} = Select;


export const Substitution = () => {

    const [fgItems,setFgItems] = useState<any[]>([])
    const fgItemService = new ItemCreationService()
    const [fgItemId,setFgItemId] = useState<number>()
    const fgSKuService = new SKUGenerationService()
    const [fgSkus,setFgSkus] = useState<any[]>([])
    const [style, setStyle] = useState([]);
    const [divsion, setDivsion] = useState([]);
    const styleService = new StyleService();
    const divisionService = new DivisionService();
    const [rmSkus,setRmSKus] = useState<any[]>([])
    const rmSkuService = new ProductStructureService()
    const [selectedRmSKus, setSelectedRmSKus] = useState<any[]>([]);
    // const [selectedFgSkuObject,setSelectedFgSkuObject] = useState<any[]>([])
    const [selectedFgSkus,setSelectedFgSkus] = useState<any[]>([])
    let selectedRmSKuObject:any[] = []
    const [form] = Form.useForm()
    const service = new SubstitutionService()
    

    useEffect(() => {
        getFgItems()
    },[])

    const getFgItems = () => {
        fgItemService.getFgItemsDropdown().then(res => {
            if(res.status){
                setFgItems(res.data)
            }
        })
    }

    const onFgItemChange = (val,option) => {
        setFgItemId(option?.key)
        const req = new SKUlistFilterRequest(option?.key,val)
        fgSKuService.getSkuList(req).then(res => {
            if(res.status){
                setFgSkus(res.data)
            }
        })
        styleService.getAllStyle().then(res=>{
            if(res.status){
              setStyle(res.data)
            }
          })
          divisionService.getAllDivision().then(res=>{
            if(res.status){
              setDivsion(res.data)
            }
          })
          const rmskureq = new FgItemCodeReq(val)
          rmSkuService.getAllInfoByItemCode(rmskureq).then(res => {
            if(res.status){
                setRmSKus(res.data)
            }
          })
        
    }

    const handleRmSkusDragStart = (event: React.DragEvent<HTMLDivElement>, rmsku: any) => {
        // selectedRmSKuObject.push(rmsku)
        selectedRmSKuObject.push(new mappedRmSKU(rmsku.rm_item_code,rmsku.rm_item_id,rmsku.rm_sku_id,rmsku.rm_sku_code,null,rmsku.item_type))
        // setSelectedFgSkuObject(rmsku)
        // setSelectedRmSKus([...selectedRmSKus,selectedRmSKuObject[0]])
    //   const index =  rmSkus.findIndex(e => {return e.rm_sku_code === rmsku.rm_sku_code})
    //   rmSkus.splice(index,1)
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFGDrop = (event: React.DragEvent<HTMLDivElement>,fgsku,fgskuid) => {
        if(selectedRmSKus.length > 0){
            const index = selectedRmSKus.findIndex(e => e.fgSkuCode === fgsku)
            if(index != -1){
                const rmskus = []
                if(selectedRmSKus[index].mappedRmSKuList.length == 1){

                    rmskus.push(selectedRmSKus[index].mappedRmSKuList[0])
                } else{
                    rmskus.push(selectedRmSKus[index].mappedRmSKuList)
                }
                rmskus.push(selectedRmSKuObject[0])
                selectedRmSKus[index].mappedRmSKuList = rmskus
                setSelectedRmSKus([...selectedRmSKus])
            selectedRmSKuObject =[]
            } else{
                const fgskus = new MappedInfo(fgsku,fgskuid,selectedRmSKuObject)
                setSelectedRmSKus([...selectedRmSKus,fgskus])
            selectedRmSKuObject =[]
            }
        } else{
            // selectedRmSKuObject[0].fgSkuCode = fgsku
            const fgskus = new MappedInfo(fgsku,fgskuid,selectedRmSKuObject)
            console.log(fgskus,'---')
            setSelectedRmSKus([...selectedRmSKus,fgskus])
            selectedRmSKuObject =[]
        }
        event.preventDefault();
    };

    const handleAvailableDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleRmDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    

    const handleAssignedRmSkusDragStart = (event: React.DragEvent<HTMLDivElement>, rmsku: any,skucode) => {
        console.log('ok')
        const selectedIndex = selectedRmSKus.findIndex(e => {return e.fgSkuCode === skucode})
        const rmskuslist = selectedRmSKus[selectedIndex].mappedRmSKuList
        // const rmskuindex = 
        // console.log(rmskuindex)
        // selectedRmSKus.splice(selectedIndex,1)    
    };


    const fgSkuColumns: any = [
        {
          title: "SKU Code",
          dataIndex: "sku_code",
          key: "sku_code",
          width: "300px",
        },
        {
          title: "Size",
          dataIndex: "size",
          key: "size",
          width: "300px",
        },
        {
          title: "Destination",
          dataIndex: "destination",
          key: "destination",
          width: "300px",
        },
        {
          title: "Colour",
          dataIndex: "color",
          key: "color",
          width: "300px",
        
        },
        {
          title: "Style",
          dataIndex: "style_id",
          key: "style_id",
          width: "300px",
          render:(data)=>{      
      const syle= style.find((style)=>style.styleId === data);    
      return syle ? syle.style:"N/A"
    }
        },
        {
          title: "Division",
          dataIndex: "division_id",
          width: "300px",
          render:(data)=>{
            const syle= divsion.find((div)=>div.divisionId === data);
            return syle ? syle.divisionName:"N/A"
          }
        },
      
    ];

    const rmSkuColumns: any = [
        {
            dataIndex:'rm_item_code',
            title:'Rm Item Code'
        },
        {
            dataIndex:'item_type',
            title:'Item Type'
        },
        {
            dataIndex:'rm_sku_code',
            title:'Rm Sku Code'
        },
        {
            dataIndex:'rm_item_code',
            title:'Rm Item Code'
        },
        {
            dataIndex:'feature_code',
            title:'Feature Code'
        },
        {
            dataIndex:'feature_name',
            title:'Feature Name'
        },
        {
            dataIndex:'option_group',
            title:'Option Group'
        },
        {
            dataIndex:'option_value',
            title:'Option Value'
        },
    ]

    const onSubmit = () => {
        const req = new SubstituionReq(fgItemId,form.getFieldValue('fgItemCode'),1,selectedRmSKus)
        service.createSubstitution(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                form.resetFields()
                setSelectedRmSKus([])
                setFgSkus([])
                setRmSKus([])
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const onReset = () => {
        form.resetFields()
        setSelectedRmSKus([])
        setFgSkus([])
        setRmSKus([])
    }

    return(
        <Card title='Substituion' size='small'>
            <Form form={form}>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 5 }}>
                <Form.Item name='fgItemCode' label='FG Item Code' rules={[{required:true,message:'FG Item Code is required'}]}>
                    <Select placeholder='Select FG Item Code' showSearch allowClear optionFilterProp="children" onChange={onFgItemChange}>
                        {
                            fgItems.map((e) => {
                                return(
                                    <Option key={e.fgitemId} value={e.itemCode}>{e.itemCode}-{e.itemCode}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                </Row>
            </Form>
            {
                fgSkus.length > 0 ? (<>
                    <b>FG SKUS</b>
                    <Table columns={fgSkuColumns} dataSource={fgSkus} size='small' pagination={false}/>
                </>) : (<></>)
            }
            {
                rmSkus.length > 0 ? (<>
                  <b>RM SKUS</b>
                <Table columns={rmSkuColumns} dataSource={rmSkus} size='small'/>
                </>) : (<></>)
            }
            {
                rmSkus.length > 0 ? (<>
                     <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 24 }}>
                <Card title='RM SKUS'
                onDragOver={handleDragOver}
                onDrop={handleAvailableDrop}
                >
                <Row gutter={8}>
                {rmSkus?.map((e,index) => (
                        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
                    <Card
                    size='small'
                    style={{ background: '#f7c78d', marginBottom: '10px',height:'35px'}}
                    draggable
                    onDragStart={(event) => handleRmSkusDragStart(event, e)}
                    onDragEnd={handleRmDragEnd}
                    onDrop={handleDrop}
                    >
                        <span style={{ wordWrap: 'break-word' }}>
                            <li style={{ color: 'black',textAlign:'center'}}>{e.rm_sku_code}</li>
                        </span>
                    </Card>
                        </Col>
                ))
                }
                    </Row>
                </Card>
            </Col>
            </Row>
                </>):(<></>)
            }
            <br></br>
       
            <Row gutter={8}>
                {
                    fgSkus.map(rec => {
                        return(
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 5 }}>
                                <Card title={`FG SKU:${rec.sku_code}`}
                                onDragOver={handleDragOver}
                                onDrop={(event) => handleFGDrop(event,rec.sku_code,rec.item_sku_id)}
                                >
                                    {
                                        selectedRmSKus?.map((rmskuList,index) => (
                                            rmskuList.fgSkuCode === rec.sku_code ? (<>
                                            {
                                                   rmskuList.mappedRmSKuList.map((rmsku) => (
                                                    <>
                                                    <Card
                                                    size='small'
                                                    style={{ background: '#f7c78d', marginBottom: '10px',height:'35px' }}
                                                    draggable
                                                    onDragStart={(event) => handleAssignedRmSkusDragStart(event, rmsku,rec.sku_code)}
                                                    >
                                                        <span style={{ wordWrap: 'break-word' }}>
                                                            <li style={{ color: 'black',textAlign:'center' }}>{rmsku.rmSKuCode}</li>
                                                        </span>
                                                    </Card>
                                                    </>
                                                    ))
                                            }
                                            </>) : (<></>)
                                         
                                        ))
                                    }
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            <Row justify={'end'}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 2 }}>
                <Button onClick={onSubmit} type="primary" disabled={selectedRmSKus.length > 0 ? false: true}>Submit</Button>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 2 }}>
                <Button onClick={onReset}>Reset</Button>
                </Col>
            </Row>
                        
        </Card>
    )

}

export default Substitution