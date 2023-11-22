import { Alert, Button, Card, Col, Descriptions, Form, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { BuyerDestinationService, BuyersService, ColourService, DestinationService, DivisionService, ItemCreationService, ItemsService, SKUGenerationService, SizeService, StyleService } from '@project-management-system/shared-services';
import { BuyerExtrnalRefIdReq, BuyerIdReq, ItemCodeReq, ItemSKusReq, MenusAndScopesEnum, SKUGenerationReq, SkuStatusEnum } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';
import { Link } from 'react-router-dom';

const { Option } = Select;

export interface FormProps{
  data:any;
  isUpdate:boolean;
  closeForm: () => void;

}
export function SKUGeneration  (props:FormProps){
    const [form] = Form.useForm()
    const skuService = new SKUGenerationService()
    const colorService = new ColourService()
    const [color,setColor] = useState<any[]>([])
    const sizeService = new SizeService()
    const [size,setSize] = useState<any[]>([])
    const destinationService = new DestinationService()
    const [destination,setDestination] = useState<any[]>([])
    const itemService = new ItemsService()
    const [itemcodes,setItemcodes] = useState<any[]>([])
    const [selectedColors, setSelectedColors] = useState<any[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<any[]>([]);
    const [selectedDestinations, setSelectedDestinations] = useState<any[]>([]);
    const selectedColorObject =[]
    const selectedSizeObject =[]
    const selectedDestinationObject =[]
    const [itemId,setitemId] = useState<number>(0)
    const [styles,setStyles] = useState<any[]>([])
    const styleService = new StyleService()
    const [itemData,setItemData] = useState<any[]>([])
    const fgItemService = new ItemCreationService()
    const [division,setDivision] = useState<any[]>([])
    const divisionService = new DivisionService()
    const buyerMappingService = new BuyerDestinationService()
    const externalRefNo = JSON.parse(localStorage.getItem("currentUser")).user.externalRefNo;
    const role = JSON.parse(localStorage.getItem("currentUser")).user.roles;
    const buyerService = new BuyersService()

    useEffect(() => {
        // getAllColors()
        // getAllSizes()
        // getAllDestinations()
        getAllItemCodes()
        getAllStyles()
        getDivisions()
        mappingInfo()
    },[])

    useEffect(() => {
      if(itemData.length > 0){
        console.log(itemData)
        form.setFieldsValue({'style':itemData[0].style})
        form.setFieldsValue({'divisionId':itemData[0].divisionId})
        setSelectedColors(itemData[0]?.colorInfo)
        setSelectedSizes(itemData[0].sizeInfo)
        setSelectedDestinations(itemData[0].destinationInfo)
        const colors = color.filter(e => {
          return !itemData[0]?.colorInfo.some(rec => {
          return e.colour === rec.colour
        })} )
        setColor(colors)
        const sizes = size.filter(e => {
          return !itemData[0]?.sizeInfo.some(rec => {
          return e.size === rec.size
        })} )
        setSize(sizes)
        const destinations = destination.filter(e => {
          return !itemData[0]?.destinationInfo.some(rec => {
          return e.destination === rec.destination
        })} )
        setDestination(destinations)
      }
    },[itemData])

    const mappingInfo = () => {
      const req = new BuyerExtrnalRefIdReq(externalRefNo);
      // if (role === MenusAndScopesEnum.roles.crmBuyer) {
      //   req.extrnalRefId = externalRefNo;
      // }
      buyerService.getBuyerByRefId(req).then((res) => {
        if(res.status) {
          const req = new BuyerIdReq(res.data.buyerId)
          buyerMappingService.getColorsByBuyerId(req).then(res => {
            if(res.status){
              setColor(res.data)
            }
          })
          buyerMappingService.getDestinationsByBuyerId(req).then(res => {
            if(res.status){
              setDestination(res.data)
            }
          })
          buyerMappingService.getSizesByBuyerId(req).then(res=> {
            if(res.status){
              setSize(res.data)
            }
          })
                
        }
      });
    }

    const generateSKU = () => {
      // const req = new SKUGenerationReq(form.getFieldValue('itemCode'),selectedColors,selectedSizes,selectedDestinations,'admin','')
      const req = new ItemSKusReq(itemId,form.getFieldValue('itemCode'),SkuStatusEnum.OPEN,selectedColors,selectedSizes,selectedDestinations,'admin',form.getFieldValue('style'),null,null,form.getFieldValue('divisionId'))
      skuService.skuGeneration(req).then(res => {
        if(res.status){
          resetHandler()
          AlertMessages.getSuccessMessage(res.internalMessage)
        } else {
          AlertMessages.getErrorMessage(res.internalMessage)
        }
      })
    }


    const getAllColors = () => {
        colorService.getAllActiveColour().then(res => {
            if(res.status){
                setColor(res.data)
            }
        })
    }

    const getAllSizes = () => {
        sizeService.getAllActiveSize().then(res => {
            if(res.status){
                setSize(res.data)
            }
        })
    }

    // const getAllDestinations = () => {
    //     destinationService.getAllActiveDestination().then(res => {
    //         if(res.status){
    //             setDestination(res.data)
    //         }
    //     })
    // }

    const getAllItemCodes = () => {
      fgItemService.getFgItemsDropdown().then(res => {
          if(res.status){
              setItemcodes(res.data)
          }
      })
    }

    const getAllStyles = () => {
      styleService.getAllActiveStyle().then(res => {
          if(res.status){
              setStyles(res.data)
          }
      })
    }

    const getDivisions = () => {
      divisionService.getAllActiveDivision().then(res => {
        if(res.status){
          setDivision(res.data)
        }
      })
    }

    const getDataByItem = (itemCode) => {
      const req = new ItemCodeReq(itemCode)
      skuService.getDataByItem(req).then(res => {
        if(res.data){
          setItemData(res.data)
        }
      })
    }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
  };
  const handleAvailableDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // const role = JSON.parse(event.dataTransfer.getData('color'));
  };

  const handleColorDragStart = (event: React.DragEvent<HTMLDivElement>, colour: any) => {
    // event.dataTransfer.setData('color', JSON.stringify(colour) );
      selectedColorObject.push(colour)
    setSelectedColors([...selectedColors,selectedColorObject[0]])
  const index =  color.findIndex(item => {return item.colour === colour.colour})
    color.splice(index,1)
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // const colour = JSON.parse(event.dataTransfer.getData('color'))
  };

  const handleAssignedColorDragStart = (event: React.DragEvent<HTMLDivElement>, colour: any) => {
    // event.dataTransfer.setData('color', JSON.stringify(colour));
    setColor([...color,colour])
    const selectedColourIndex = selectedColors.findIndex(item => {return item.colour === colour.colour})
    selectedColors.splice(selectedColourIndex,1)
    event.preventDefault();

  };

  const handleAssignedSizesDragStart = (event: React.DragEvent<HTMLDivElement>, selectedSize: any) => {
    // event.dataTransfer.setData('color', JSON.stringify(colour));
    setSize([...size,selectedSize])
    const selectedSizeIndex = selectedSizes.findIndex(item => {return item.size === selectedSize.size})
    selectedSizes.splice(selectedSizeIndex,1)
    event.preventDefault();

  };


  const handleSizeDragStart = (event: React.DragEvent<HTMLDivElement>, availableSize: any) => {
    // event.dataTransfer.setData('color', JSON.stringify(colour) );
      selectedSizeObject.push(availableSize)
    setSelectedSizes([...selectedSizes,selectedSizeObject[0]])
  const index =  size.findIndex(item => {return item.size === availableSize.size})
    size.splice(index,1)
  };

  const handleAssignedDestinationsDragStart = (event: React.DragEvent<HTMLDivElement>, selectedDestination: any) => {
    // event.dataTransfer.setData('color', JSON.stringify(colour));
    setDestination([...destination,selectedDestination])
    const selectedDestinationIndex = selectedDestinations.findIndex(item => {return item.destination === selectedDestination.destination})
    selectedDestinations.splice(selectedDestinationIndex,1)
    event.preventDefault();

  };


  const handleDestinationsDragStart = (event: React.DragEvent<HTMLDivElement>, availableDestinations: any) => {
    // event.dataTransfer.setData('color', JSON.stringify(colour) );
      selectedDestinationObject.push(availableDestinations)
    setSelectedDestinations([...selectedDestinations,selectedDestinationObject[0]])
  const index =  destination.findIndex(item => {return item.destination === availableDestinations.destination})
    destination.splice(index,1)
  };

  const onSubmit = () => {
    generateSKU()
    
  }

  const onItemCodeChange = (key,option) => {
    setitemId(option?.itemId)
    getDataByItem(key)
  }

  const resetHandler = () => {
    form.resetFields()
    setSelectedColors([])
    setSelectedDestinations([])
    setSelectedSizes([])
    mappingInfo()

  }

  return (
    <Card  title={<><span>FG SKU Mapping</span></>} extra={<Link to='/materialCreation/sku-list'><Button type='primary'>View</Button></Link>}>
      {/* <span style={{color:'red',fontSize:'110%',marginLeft:'45%'}}><b>Note: To Map the Components drag and drop from Available to Selected</b></span> */}
      <Row gutter={24}>
      <Col span={5}></Col>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 14}}>
      <Alert type='success' message={'Note: To Map the Components drag and drop from Available to Selected'} style={{fontSize:'15px',textAlign:'center',color:'red'}} />
      </Col>
      <Col span={5}></Col>
      </Row>
      <br/>
      <Form layout="horizontal" form={form}>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
            <Form.Item label='FG Item' name='itemCode' rules={[{required:true,message:'Item is required'}]}>
                <Select showSearch allowClear placeholder='Select FG Item' onChange={onItemCodeChange} optionFilterProp='children'>
                    {/* <Option key='itemcode' value='itemcode' itemId='itemId'>Item Codes </Option> */}
                    {
                        itemcodes.map((e)=>{
                            return(
                                <Option key={e.itemCode} value={e.itemCode} itemId ={e.fgitemId}>{e.itemCode}-{e.itemName}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
            <Form.Item label='Style' name='style' rules={[{required:true,message:'Style is required'}]}>
                <Select showSearch allowClear placeholder='Select Style'>
                    {/* <Option key='itemcode' value='itemcode' itemId='itemId'>Item Codes </Option> */}
                    {
                        styles.map((e)=>{
                            return(
                                <Option key={e.styleId} value={e.styleId}>{e.style}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
            <Form.Item label='Division' name='divisionId' rules={[{required:true,message:'Divison is required'}]}>
                <Select showSearch allowClear placeholder='Select Division'>
                    {/* <Option key='itemcode' value='itemcode' itemId='itemId'>Item Codes </Option> */}
                    {
                        division.map((e)=>{
                            return(
                                <Option key={e.divisionId} value={e.divisionId}>{e.divisionName}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Col>
      </Row>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
            <Card title='Available Colors' size='small'
              headStyle={{backgroundColor:'#70a9a1',color:'black'}}
                onDragOver={handleDragOver}
                onDrop={handleAvailableDrop}>
                {color?.map((comment, index) => (
                    <Card
                        // key={comment.colourId}
                        size='small'
                        style={{backgroundColor:'#e4f0d0', marginBottom: '10px',height:'35px'}}
                        draggable
                        onDragStart={(event) => handleColorDragStart(event, comment)}
                    >
                        <span style={{ wordWrap: 'break-word' }}>
                            <li style={{ color: 'black',textAlign:'center'}}><b>{comment.colour}</b></li>
                        </span>
                    </Card>
                ))}
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
          <Card title='Selected Colors' size='small'
            headStyle={{backgroundColor:'#9ec1a3',color:'black'}}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            {selectedColors?.map((comment, index) => (
                <Card
                    // key={comment}
                    size='small'
                    style={{backgroundColor:'#e4f0d0', marginBottom: '10px',height:'35px' }}
                    draggable
                    onDragStart={(event) => handleAssignedColorDragStart(event, comment)}
                >
                    <span style={{ wordWrap: 'break-word' }}>
                        <li style={{ color: 'black',textAlign:'center' }}><b>{comment.colour}</b></li>
                    </span>
                </Card>
            ))}
        </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
            <Card title='Available Sizes'  size='small'
                headStyle={{backgroundColor:'#70a9a1',color:'black'}}
                onDragOver={handleDragOver}
                onDrop={handleAvailableDrop}>
                {size?.map((comment, index) => (
                    <Card
                    size='small'
                    bordered

                        // key={comment.colourId}
                        style={{backgroundColor:'#e4f0d0', marginBottom: '10px',height:'35px'}}
                        draggable
                        onDragStart={(event) => handleSizeDragStart(event, comment)}
                    >
                        <span style={{ wordWrap: 'break-word' }}>
                            <li style={{ color: 'black',textAlign:'center' }}><b>{comment.size}</b></li>
                        </span>
                    </Card>
                ))}
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
          <Card title='Selected Sizes' size='small'
            headStyle={{backgroundColor:'#9ec1a3',color:'black'}}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            {selectedSizes?.map((comment, index) => (
                <Card
                size='small'
                    // key={comment}
                    style={{backgroundColor:'#e4f0d0', marginBottom: '10px',height:'35px' }}
                    draggable
                    onDragStart={(event) => handleAssignedSizesDragStart(event, comment)}
                >
                    <span style={{ wordWrap: 'break-word' }}>
                        <li style={{ color: 'black',textAlign:'center' }}><b>{comment.size}</b></li>
                    </span>
                </Card>
            ))}
        </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
            <Card title='Available Destinations' size='small'
               headStyle={{backgroundColor:'#70a9a1',color:'black'}}
                onDragOver={handleDragOver}
                onDrop={handleAvailableDrop}>
                {destination?.map((comment, index) => (
                    <Card
                    size='small'
                        // key={comment.colourId}
                        style={{backgroundColor:'#e4f0d0', marginBottom: '10px',height:'35px' }}
                        draggable
                        onDragStart={(event) => handleDestinationsDragStart(event, comment)}
                    >
                        <span style={{ wordWrap: 'break-word' }}>
                            <li style={{ color: 'black',textAlign:'center' }}><b>{comment.destination}</b></li>
                        </span>
                    </Card>
                ))}
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
          <Card title='Selected Destinations'
            size='small'
            headStyle={{backgroundColor:'#9ec1a3',color:'black'}}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            {selectedDestinations?.map((comment, index) => (
                <Card
                size='small'
                    // key={comment}
                    style={{ backgroundColor:'#e4f0d0',marginBottom: '10px',height:'35px' }}
                    draggable
                    onDragStart={(event) => handleAssignedDestinationsDragStart(event, comment)}
                >
                    <span style={{ wordWrap: 'break-word' }}>
                        <li style={{ color: 'black',textAlign:'center' }}><b>{comment.destination}</b></li>
                    </span>
                </Card>
            ))}
        </Card>
          </Col>
        </Row>
        <Row justify={'end'}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
          <Form.Item>
            <Button type='primary' onClick={onSubmit} disabled={form.getFieldValue('itemCode') !== undefined && form.getFieldValue('divisionId') !== undefined && selectedColors.length > 0 && selectedSizes.length > 0 && selectedDestinations.length > 0 ? false : true}>Submit</Button>
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
        <Form.Item>
            <Button onClick={resetHandler}>Reset</Button>
        </Form.Item>
        </Col>

        </Row>
      </Form>
    </Card>
  );
};

export default SKUGeneration;

