import { FgItemCodeReq, SKUlistFilterRequest } from "@project-management-system/shared-models";
import { DivisionService, ItemCreationService, SKUGenerationService, StyleService, ProductStructureService } from "@project-management-system/shared-services";
import { Card, Col, Form, Row, Select, Table, Tag } from "antd"
import { useEffect, useState } from "react";

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
    const selectedRmSKuObject =[]
    const [selectedRmSKus, setSelectedRmSKus] = useState<any[]>([]);
    const selectedFgSkuObject = []
    const [selectedFgSkus,setSelectedFgSkus] = useState<any[]>([])

  


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
        selectedRmSKuObject.push(rmsku)
        setSelectedRmSKus([...selectedRmSKus,selectedRmSKuObject[0]])
      const index =  rmSkus.findIndex(e => {return e.rm_sku_code === rmsku.rm_sku_code})
    //   rmSkus.splice(index,1)
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleAvailableDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleAssignedRmSkusDragStart = (event: React.DragEvent<HTMLDivElement>, rmsku: any,skucode) => {
        // event.dataTransfer.setData('color', JSON.stringify(colour));
        const selectedIndex = selectedRmSKus.findIndex(e => {return e.rm_sku_code === rmsku.rm_sku_code})
        selectedRmSKus.splice(selectedIndex,1)
        event.preventDefault();
    
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

    return(
        <Card title='Substituion' size='small'>
            <Form>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 5 }}>
                <Form.Item name='fgItemCode' label='FG Item Code'>
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
            <Row>
                {
                    fgSkus.map(rec => {
                        return(
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 5 }}>
                                <Card title={rec.sku_code}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                >
                                    {
                                        selectedRmSKus?.map((rmsku,index) => (
                                            <Card
                                            size='small'
                                            style={{ background: '#f7c78d', marginBottom: '10px',height:'35px' }}
                                            draggable
                                            onDragStart={(event) => handleAssignedRmSkusDragStart(event, rmsku,rec.sku_code)}
                                            >
                                                <span style={{ wordWrap: 'break-word' }}>
                                                    <li style={{ color: 'black',textAlign:'center' }}>{rmsku.rm_sku_code}</li>
                                                </span>
                                            </Card>
                                        ))
                                    }
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            
        </Card>
    )

}

export default Substitution