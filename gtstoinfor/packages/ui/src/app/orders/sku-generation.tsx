import { Button, Card, Col, Descriptions, Form, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { ColourService, DestinationService, ItemsService, SKUGenerationService, SizeService } from '@project-management-system/shared-services';
import { ItemSKusReq,  SkuStatusEnum } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';

const { Option } = Select;

export const SKUGeneration = () => {
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


    useEffect(() => {
        getAllColors()
        getAllSizes()
        getAllDestinations()
        getAllItemCodes()
    },[])

    const generateSKU = () => {
      // const req = new SKUGenerationReq(form.getFieldValue('itemCode'),selectedColors,selectedSizes,selectedDestinations,'admin','')
      const req = new ItemSKusReq(itemId,form.getFieldValue('itemCode'),SkuStatusEnum.OPEN,selectedColors,selectedSizes,selectedDestinations,'admin')
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

    const getAllDestinations = () => {
        destinationService.getAllActiveDestination().then(res => {
            if(res.status){
                setDestination(res.data)
            }
        })
    }

    const getAllItemCodes = () => {
      itemService.getAllItems().then(res => {
          if(res.status){
              setItemcodes(res.data)
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
    // console.log(option)
    setitemId(option?.itemId)
  }

  const resetHandler = () => {
    form.resetFields()
    setSelectedColors([])
    setSelectedDestinations([])
    setSelectedSizes([])

  }



  return (
    <Card size="small" title="SKU mapping" extra={<p style={{color:'red',fontSize:'110%'}}><b>Note: To Map the Components drag and drop from Available to Selected</b></p>}>
      <Form layout="horizontal" form={form}>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 5 }}>
            <Form.Item label='Item' name='itemCode' rules={[{required:true,message:'Item is required'}]}>
                <Select showSearch allowClear placeholder='Select Item' onChange={onItemCodeChange}>
                    {/* <Option key='itemcode' value='itemcode' itemId='itemId'>Item Codes </Option> */}
                    {
                        itemcodes.map((e)=>{
                            return(
                                <Option key={e.itemCode} value={e.itemCode} itemId ={e.itemId}>{e.itemCode}-{e.itemName}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Col>
      </Row>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
            <Card title='Available Colors'
                onDragOver={handleDragOver}
                onDrop={handleAvailableDrop}>
                {color?.map((comment, index) => (
                    <Card
                        // key={comment.colourId}
                        size='small'
                        style={{ background: '#f7c78d', marginBottom: '10px'}}
                        draggable
                        onDragStart={(event) => handleColorDragStart(event, comment)}
                    >
                        <span style={{ wordWrap: 'break-word' }}>
                            <li style={{ color: 'black' }}>{comment.colour}</li>
                        </span>
                    </Card>
                ))}
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
          <Card title='Selected Colors'
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            {selectedColors?.map((comment, index) => (
                <Card
                    // key={comment}
                    size='small'
                    style={{ background: '#f7c78d', marginBottom: '10px' }}
                    draggable
                    onDragStart={(event) => handleAssignedColorDragStart(event, comment)}
                >
                    <span style={{ wordWrap: 'break-word' }}>
                        <li style={{ color: 'black' }}>{comment.colour}</li>
                    </span>
                </Card>
            ))}
        </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
            <Card title='Available Sizes' 
                onDragOver={handleDragOver}
                onDrop={handleAvailableDrop}>
                {size?.map((comment, index) => (
                    <Card
                    size='small'
                        // key={comment.colourId}
                        style={{ background: '#f7c78d', marginBottom: '10px' }}
                        draggable
                        onDragStart={(event) => handleSizeDragStart(event, comment)}
                    >
                        <span style={{ wordWrap: 'break-word' }}>
                            <li style={{ color: 'black' }}>{comment.size}</li>
                        </span>
                    </Card>
                ))}
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
          <Card title='Selected Sizes' 
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            {selectedSizes?.map((comment, index) => (
                <Card
                size='small'
                    // key={comment}
                    style={{ background: '#f7c78d', marginBottom: '10px' }}
                    draggable
                    onDragStart={(event) => handleAssignedSizesDragStart(event, comment)}
                >
                    <span style={{ wordWrap: 'break-word' }}>
                        <li style={{ color: 'black' }}>{comment.size}</li>
                    </span>
                </Card>
            ))}
        </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
            <Card title='Available Destinations' 
                onDragOver={handleDragOver}
                onDrop={handleAvailableDrop}>
                {destination?.map((comment, index) => (
                    <Card
                    size='small'
                        // key={comment.colourId}
                        style={{ background: '#f7c78d', marginBottom: '10px' }}
                        draggable
                        onDragStart={(event) => handleDestinationsDragStart(event, comment)}
                    >
                        <span style={{ wordWrap: 'break-word' }}>
                            <li style={{ color: 'black' }}>{comment.destination}</li>
                        </span>
                    </Card>
                ))}
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7 }} xl={{ span: 4 }}>
          <Card title='Selected Destinations'
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            {selectedDestinations?.map((comment, index) => (
                <Card
                size='small'
                    // key={comment}
                    style={{ background: '#f7c78d', marginBottom: '10px' }}
                    draggable
                    onDragStart={(event) => handleAssignedDestinationsDragStart(event, comment)}
                >
                    <span style={{ wordWrap: 'break-word' }}>
                        <li style={{ color: 'black' }}>{comment.destination}</li>
                    </span>
                </Card>
            ))}
        </Card>
          </Col>
        </Row>
        <Row justify={'end'}>
          <Form.Item>
            <Button type='primary' onClick={onSubmit} disabled={form.getFieldValue('itemCode') !== undefined && selectedColors.length > 0 && selectedSizes.length > 0 && selectedDestinations.length > 0 ? false : true}>Submit</Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default SKUGeneration;

