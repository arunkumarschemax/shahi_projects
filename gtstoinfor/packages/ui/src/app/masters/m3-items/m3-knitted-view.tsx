import { BuyersService, FabricTypeService, FabricWeaveService, M3ItemsService, StockService, UomService } from '@project-management-system/shared-services';
import { Button, Card, Col, Divider, Drawer, Form, Input, Modal, Popconfirm, Radio, Row, Select, Space, Switch, Table, Tag, Tooltip, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';
import { ColumnProps, ColumnType } from 'antd/es/table'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { M3ItemsDTO, M3Itemsfilter, UomCategoryEnum, m3ItemsContentEnum } from '@project-management-system/shared-models';
const M3KnittedView = () => {

    const navigate=useNavigate()
    const service = new M3ItemsService();
    const [itemGroup, setItemGroup] = useState([]);
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState(''); 
    const [searchedColumn, setSearchedColumn] = useState('');
  const [page, setPage] = useState<number>(1);
const [buyers, setBuyers] = useState<any[]>([]);
// const buyerService = new BuyersService();
const {Option}= Select;
const [form] = Form.useForm()
const stockService = new StockService();

  const [uom, setUom] = useState<any[]>([]);
  const [weightData, setWeightData] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any>(undefined);
  const [visibleModel, setVisibleModel] = useState<boolean>(false);
  const [yarnData, setYarnData] = useState<any[]>([]);
  const [widthData, setWidthData] = useState<any[]>([]);
  const [buyer, setBuyer] = useState<any[]>([]);
  const uomService = new UomService();
  const fabricService = new FabricTypeService();
  const weaveService = new FabricWeaveService();
  const [weave, setWeave] = useState<any[]>([]);
  const buyerService = new BuyersService();
  const [fabricType, setFabricType] = useState<any[]>([]);
  const [weightValue, setWeightValue] = useState<any>();
  const [weightUnitValue, setWeightUnitValue] = useState<any>();
  const [widthValue, setWidthValue] = useState<any>();
  const [widthUnitValue, setWidthUnitValue] = useState<any>();
  const [countValue, setCountValue] = useState<any>();
  const [countUnitValue, setCountUnitValue] = useState<any>();
  const [buttonEnable,setButtonEnable] = useState<boolean>(true)
  const [buyervalue,setBuyervalue] = useState<any>()
  const [finishData, setFinishData] = useState<any[]>([])





    useEffect(() => {
        getM3ItemsData();
       
    }, []);
   
    // const data = new M3ItemsDTO(null,'',form.getFieldValue("content"),form.getFieldValue("fabricType"),form.getFieldValue("weave"),weightValue,weightUnitValue,form.getFieldValue("construction"),countValue,countUnitValue,widthValue,widthUnitValue,form.getFieldValue("finish"),form.getFieldValue("shrinkage"),form.getFieldValue("buyerId"),"",form.getFieldValue("buyerCode"))

    // console.log(data,"req")
    
    const getM3ItemsData = () => {
      const req = new M3Itemsfilter()
      if(form.getFieldValue("buyerId")!== undefined){
        req.buyerId = form.getFieldValue("buyerId")
      }
      if(form.getFieldValue("content")!== undefined){
        req.content = form.getFieldValue("content")
      }

      if(form.getFieldValue("fabricType")!== undefined){
        req.fabricType = form.getFieldValue("fabricType")
      }

      
      if(form.getFieldValue("weave")!== undefined){
        req.weave = form.getFieldValue("weave")
      }
       
      if(form.getFieldValue("construction")!== undefined){
        req.construction = form.getFieldValue("construction")
      }
       
      if(form.getFieldValue("finish")!== undefined){
        req.finish = form.getFieldValue("finish")
      }
       
      if(form.getFieldValue("shrinkage")!== undefined){
        req.shrinkage = form.getFieldValue("shrinkage")
      }

      if(form.getFieldValue("weight")!== undefined){
        req.weight = form.getFieldValue("weight")
      }
      if(form.getFieldValue("width")!== undefined){
        req.width = form.getFieldValue("weight")
      }
      if(form.getFieldValue("yarnCount")!== undefined){
        req.yarnCount = form.getFieldValue("yarnCount")
      }

      // console.log(form.getFieldValue("weight"),"req")
      // console.log(weightUnitValue,"req")

        service.getKnittedFabric().then(res => {
            if (res.status) {
                setItemGroup(res.data);
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
        })
    }

    useEffect(() => {
      getUom();
      getFabricTypedata();
      getWeaveData();
      getBuyers();
      getFabricFinishes()
    }, []);
  
    const getBuyers = () => {
      buyerService.getAllActiveBuyers().then((res) => {
        if (res.status) {
          setBuyer(res.data);
        }
      });
    };
  
    const getFabricTypedata = () => {
      service.getFabricTypes().then((res) => {
          if (res.status) {
            setFabricType(res.data);
          } else {
            setFabricType([]);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    const getWeaveData = () => {
      service.getFabricWeaves().then((res) => {
          if (res.status) {
            setWeave(res.data);
          } else {
            setWeave([]);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  
    const getFabricFinishes = () => {
      service.getFabricFinishes().then((res) => {
          if (res.status) {
            setFinishData(res.data);
          } else {
            setFinishData([]);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const getUom = () => {
      uomService.getAllUoms().then((res) => {
        if (res.status) {
          const yarn = res.data.filter(
            (rec) => rec.uomCategory == UomCategoryEnum.LENGTH
          );
          const weight = res.data.filter(
            (rec) => rec.uomCategory == UomCategoryEnum.WEIGHT
          );
          const width = res.data.filter(
            (rec) => rec.uomCategory == UomCategoryEnum.AREA
          );
          setYarnData(yarn);
          setWeightData(weight);
          setWidthData(width);
          setUom(res.data);
        }
      });
    };
    const getColumnSearchProps = (dataIndex: any): ColumnType<string> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : any) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() =>{
                  handleReset(clearFilters)
                  setSearchedColumn(dataIndex)
                  confirm({closeDropdown:true})
                }
                   }
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
             
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex] ?record[dataIndex]     
             .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()):false,
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
      function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
      };
    const Columns: any = [
      {
        title: 'S No',
        key: 'sno',
        width: 50,
        align:"center",
        responsive: ['sm'],
        render: (text, object, index) => (page - 1) * 50 + (index + 1),
        fixed:'left'
      },
        {
            title: "Buyer",
            dataIndex: "buyerName",
            ...getColumnSearchProps('buyerName'),
            render : (text,record) => {
              return (
                  <span>
                      {record.buyerName}
                  </span>
              )
          },
            sorter: (a, b) => a.buyerName?.length - b.buyerName?.length,
           sortDirections: ['descend', 'ascend'],
           fixed:'left'
        },
        {
            title: "Item Code",
            dataIndex: "itemCode",
            ...getColumnSearchProps('itemCode'),
            sorter: (a, b) => a.itemCode?.length - b.itemCode?.length,
           sortDirections: ['descend', 'ascend'],
            fixed:'left'

        },
        {
          title: "M3 Code",
          dataIndex: "m3Code",
          ...getColumnSearchProps('m3Code'),
          sorter: (a, b) => a.m3Code?.length - b.m3Code?.length,
         sortDirections: ['descend', 'ascend'],
         render: (text) => text || "-",

      },
      {
        title: "HSN Code",
        dataIndex: "hsn",
        ...getColumnSearchProps('hsn'),
        sorter: (a, b) => a.hsn?.length - b.hsn?.length,
       sortDirections: ['descend', 'ascend'],
    },
        // {
        //     title: "Content",
        //     dataIndex: "content",
        //     ...getColumnSearchProps('content'),
        //     sorter: (a, b) => a.content.length - b.content.length,
        //    sortDirections: ['descend', 'ascend'],
        // },
        {
            title: "Fabric Type",
            dataIndex: "fabricType",
            ...getColumnSearchProps('fabricType'),
            sorter: (a, b) => a.fabricType?.length - b.fabricType?.length,
           sortDirections: ['descend', 'ascend'],
           ...getColumnSearchProps('fabricType')
        },
        {
            title: "Knit Type",
            dataIndex: "knitType",
            ...getColumnSearchProps('knitType'),
            sorter: (a, b) => a.knitType?.length - b.knitType?.length,
           sortDirections: ['descend', 'ascend'],
        },
  
        {
          title: "Weight",
          dataIndex: "weight",
          sorter: (a, b) => a.weight - b.weight,
          sortDirections: ['descend', 'ascend'],
      },

        {
          title: "YarnCount",
          dataIndex: "yarnCount",
          sorter: (a, b) => a.yarnCount - b.yarnCount,
          sortDirections: ['descend', 'ascend'],

      },
        {
            title: "Gauze",
            dataIndex: "gauze",
            sorter: (a, b) => a.gauze?.length - b.gauze?.length,
            sortDirections: ['descend', 'ascend'],     
        },
        {
            title: "Remarks",
            dataIndex: "remarks",
            ...getColumnSearchProps('remarks'),
            sorter: (a, b) => a.remarks?.length - b.remarks?.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: "Description",
            dataIndex: "description",
            sorter: (a, b) => a.description?.length - b.description?.length,
            sortDirections: ['descend', 'ascend'],
            // width:'250px',
            render: text => (
              <Tooltip title={text}>
                <span style={{ display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {text.length > 35 ? `${text.substring(0, 35)}...` : text}
                </span>
              </Tooltip>
            ),
        },
    ]

    const onReset = () => {
  
        form.resetFields()
        getM3ItemsData()
       
    }
    

  return (
    <div>
         <Card title={<span>M3 Items</span>}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={<Button
            onClick={() => navigate('/m3-items')}
            type="primary"
            // style={{ background: "white", color: "#3C085C" }}
        >Create</Button>
        }>
          
          <Form layout="vertical" form={form} onFinish={getM3ItemsData}>
       <Row gutter={24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
            <Form.Item
              name="buyerId"
              label="Buyer"
              rules={[{ required: false, message: "Buyer is required" }]}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Select Buyer"
              >
                {buyer.map((e) => {
                  return (
                    <option
                      key={e.buyerId}
                      value={e.buyerId}
                    >
                      {`${e.buyerCode} - ${e.buyerName}`}
                    </option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col style={{display:"none"}}>
          <Form.Item
              name="buyerCode"
              rules={[{ required: false, message: "BuyerCode is required" }]}
            >
                <Input />
            </Form.Item>
          </Col>
          {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: false, message: "Field is required" }]}
              >
                <Select
                  optionFilterProp="children"
                  placeholder=" Select Content"
                  allowClear
                  // onChange={onChange}
                >
                  {Object.keys(m3ItemsContentEnum)
                    .sort()
                    .map((content) => (
                      <Select.Option
                        key={m3ItemsContentEnum[content]}
                        value={m3ItemsContentEnum[content]}
                      >
                        {m3ItemsContentEnum[content]}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col> */}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>

              <Form.Item
                label=" Fabric Type"
                name="fabricType"
                rules={[{ required: false, message: "Field is required" }]}
              >
                <Select placeholder=" Select Fabric Type" allowClear>
                  {fabricType.map((option) => (
                    <option
                      key={option.fabricTypeId}
                      value={option.fabricTypeId}
                    >
                      {option.fabricType}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            
            {/* <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 4 }}
              lg={{ span: 8 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label=" Shrinkage"
                name="shrinkage"
                 rules={[
                  { required: false, message: 'Field is required' },
                ]}
              >
                <Input placeholder=" Enter  Shrinkage" allowClear />
              </Form.Item>
            </Col> */}
            <Row gutter={8}>
            <Col span={24} >
              <Button type="primary" htmlType="submit"
              style={{marginTop:20,marginLeft:40}}
              >
                Get Items
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                htmlType="button"
                onClick={onReset}
                
              >
                Reset
              </Button>
             
           
              </Col>
              </Row>
             
          </Row>
    </Form>
          {/* <Card> */}
          <Table columns={Columns}
          dataSource={itemGroup}
          scroll={{x:'max-content'}}
           pagination={{
            pageSize:50,
            onChange(current) {
              setPage(current);
            }
          }} bordered
          />
          {/* </Card> */}
    </Card>
    </div>
  )
}

export default M3KnittedView