import { BgColorsOutlined, EnvironmentOutlined, SearchOutlined, SkinOutlined, UndoOutlined } from "@ant-design/icons"
import { BuyerIdReq, BuyersDestinationRequest, MenusAndScopesEnum } from "@project-management-system/shared-models"
import { BuyerDestinationService, BuyersService, DestinationService, SizeService } from "@project-management-system/shared-services"
import { Button, Row, Col, Select, Table,Form, Modal, Divider } from "antd"
import Card from "antd/es/card/Card"
import form from "antd/es/form"
import { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const BuyersDestinationGrid =() =>{
    const [form] = Form.useForm()
    const {Option}= Select;
    const [data,setData] = useState<any[]>([]);
    const [sizes,setSizes] = useState<any[]>([]);
    const [destinations,setDestinations] = useState<any[]>([])
    const navigate = useNavigate()
const [page, setPage] = useState<number>(1);
const sizeService = new SizeService()
const desService = new DestinationService()
const service = new BuyerDestinationService()
const [sizeModalVisible, setSizeModalVisible] = useState(false);
const [destinationModalVisible, setDestinationModalVisible] = useState(false);
const [colorModalVisible, setColorModalVisible] = useState(false);
const [modalData, setModalData] = useState([]);
const [size,setSize] = useState([])
const [color,setColor] = useState([])
const [destination,setDestination] = useState([])
const [colors,setColors] = useState<any[]>([])
const [buyerId, setBuyerId] = useState<number>();
const [buyers, setBuyers] = useState<any[]>([]);
const buyerService = new BuyersService();
const [userId, setUserId] = useState([]); 
  const [loginBuyer,setLoginBuyer] = useState<number>(0)
  const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
  const role = JSON.parse(localStorage.getItem('currentUser')).user.roles
let userRef
    useEffect(()=>{
        getSizes();
        getDestinations();
        getData();
        getBuyers();
        Login()
    },[])
    
const Login = () =>{
  if(role === MenusAndScopesEnum.roles.Buyer){
    userRef = externalRefNo
  }
  buyerService.getBuyerByRefId(userRef).then(res=>{
    if(res.status){
      setUserId(res.data)
setLoginBuyer(res.data.buyerId)
    }
  })
}

    const getSizes = ()=>{
        sizeService.getAllActiveSize().then(res=>{
            if(res.status){
                setSizes(res.data)
            }
            else{
                setSizes([])
            }
        })
    }
    const getDestinations = ()=>{
        desService.getAllActiveDestination().then(res=>{
            if(res.status){
                setDestinations(res.data)
            }
            else{
                setDestinations([])
            }
        })
    }
    const getBuyers = () => {
          const loginId = new BuyerIdReq(loginBuyer)
        buyerService.getAllBuyer(loginId).then((res) => {
            if (res.status) {
                setBuyers(res.data);
            }
        });
    };
    const getData = ()=>{
        const request = new BuyersDestinationRequest(buyerId)
    
        if(form.getFieldValue('buyer') != undefined){
            request.buyerId = form.getFieldValue('buyer')
        }
        service.getAll(request).then(res=>{
            if(res.status){
                setData(res.data)
                
            }
            else{
                setData([])
            }
        })
    }
    const openSizeModal = (val) => {
        setSizeModalVisible(true);
        setModalData(sizes); // Set the sizes data here
        setSize(val.size)
        console.log(val,'[[[[[[[[[[')
      };
      
      const openDestinationModal = (val) => {
        setDestinationModalVisible(true);
        setModalData(destinations); // Set the destinations data here
        setDestination(val.destination)
      };
      
      const openColorModal = (val) => {
        setColorModalVisible(true);
        setModalData(colors)
        setColor(val.color)
      };
   
const columns: ColumnProps<any>[]  = [
    {
        title: 'S No',
        key: 'sno',
        width: '70px',
        responsive: ['sm'],
        render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
        title:'Buyers',
        dataIndex:'buyerName',
        // render:(text,val) =>{
        //     return (val.buyerInfo.buyerName)
        // }
    },
    //
    {
        title: 'Mapped',
        render: (text, val) => (
          <>
            <Row>
            <Button onClick={() => openSizeModal(val)}><SkinOutlined/>Sizes</Button>
            <Divider type="vertical"/>
            <Button onClick={() => openDestinationModal(val)}><EnvironmentOutlined/>Destination</Button>
            <Divider type="vertical"/>
            <Button onClick={() => openColorModal(val)}> <BgColorsOutlined/>Colours</Button>
            </Row>
          </>
        ),
      },
  
]
const onSearch = () => {
    getData()
}

const onReset = () => {
    form.resetFields()
    getData()
}


    return(
        <Card size='small' title='Buyers Destination' extra={<span><Button onClick={() => navigate('/global/buyers-destination/buyers-destination-form')} type="primary">New</Button></span>}>
            <Form form={form} onFinish={onSearch}>
                <Row gutter={24}>
                {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 5 }}>
                      <Form.Item label='Size' name='sizeId'>
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Size'
                        >
                            {
                                sizes.map((e) => {
                                    return(
                                        <Option key={e.sizeId} value={e.sizeId}>{e.sizes}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                      <Form.Item label='Destination' name='destinationId'>
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Destination'
                        >
                            {
                                destinations.map((e) => {
                                    return(
                                        <Option key={e.destinationId} value={e.destinationId}>{e.destination}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 5 }}>
                      <Form.Item label='Colour' name='colourId'>
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Colour'
                        >
                          
                        </Select>
                      </Form.Item>
                    </Col>  */}
<Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 5 }}
                    lg={{ span: 6 }}
                    xl={{ span: 12 }}
                >
                       <Form.Item
                                label="Buyers"
                                name="buyer"
                                rules={[{ required: true, message: "Buyer is required" }]}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                    placeholder="Select Buyer"
                                    onSelect={(val)=>setBuyerId(val)}
                                >
                                    {buyers.map((option) => (
                                        <Option value={option.buyerId} key={option.buyerName}>
                                            {option.buyerName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                      <Form.Item>
                        <Button icon={<SearchOutlined/>} htmlType="submit" type="primary">Search</Button>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }} >
                      <Form.Item>
                        <Button icon={<UndoOutlined/>} danger onClick={onReset}>Reset</Button>
                      </Form.Item>
                    </Col>
                </Row>

            </Form>
            <Table columns={columns} 
                    rowClassName={(record,index)=>index % 2 === 0? 'table-row-light':'table-row-dark'}
                    dataSource={data} size="small" bordered />
            <Modal
      visible={sizeModalVisible}
      title="Sizes"
      onCancel={() => setSizeModalVisible(false)}
      footer={null}
    >
        <ul>
    {size.map(item => (
      <li key={item.sizeId}>{item.size}</li>
    ))}
  </ul>
    </Modal>
    <Modal
      visible={destinationModalVisible}
      title="Destinations"
      onCancel={() => setDestinationModalVisible(false)}
      footer={null}
    >
        <ul>
    {destination.map(item => (
      <li key={item.destinationId}>{item.destination}</li>
    ))}
  </ul>
    </Modal>
    <Modal
      visible={colorModalVisible}
      title="Colours"
      onCancel={() => setColorModalVisible(false)}
      footer={null}
    >
        <ul>
    {color.map(item => (
      <li key={item.colourId}>{item.color}</li>
    ))}
  </ul>
    </Modal>
        </Card>
    )
}
export default BuyersDestinationGrid