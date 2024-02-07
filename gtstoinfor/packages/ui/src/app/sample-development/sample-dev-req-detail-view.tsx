import {  SearchOutlined } from "@ant-design/icons"
import { Button, Card, Descriptions,  Input, Modal, Tooltip } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item"
import Table from "antd/lib/table"
import { SampleDevelopmentService } from "packages/libs/shared-services/src/common"
import React, { useEffect, useRef } from "react"
import { useState } from "react"
import Highlighter from "react-highlight-words"
import { useLocation, useNavigate } from "react-router-dom"
import AlertMessages from "../common/common-functions/alert-messages"
import { CategoryEnumDisplay, ItemTypeEnumDisplay, LifeCycleStatusDisplay, sampleReqIdReq } from "@project-management-system/shared-models"
import moment from "moment"

export const SampleReqDetailView = () =>{
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const service = new SampleDevelopmentService();
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [filterData, setFilterData] = useState<any[]>([]);
    const [trimData, setTrimData] = useState<any[]>([]);
    const [fabData, setFabData] = useState<any[]>([]);
    const [sizeData, setSizeData] = useState<any[]>([]);
    const [colourData, setColourData] = useState<any[]>([]);
    const location = useLocation()
    const [remarkModal,setRemarkModal] = useState<boolean>(false)
  const [remarks,setRemarks] = useState<string>('')
    useEffect(() => {
        getData()
      }, []);

    const getData =()=>{
        const req = new sampleReqIdReq(location.state,undefined)
        service.getAllSampleRequestsInfo(req).then((res) => {
            if (res.status) {
              setData(res.data);
              // console.log(res.data.filter((e)=>e.trimInfo));
              
              res.data.map((e)=>setFabData(e.fabInfo))
              res.data.map((e)=>setTrimData(e.trimInfo))

              setFilterData(res.data);
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
          }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
            setData([]);
          })
          service.getAllSampleRequestSizesInfo(req).then((res)=>{
            if(res.status) {
              setColourData(res.data)
            }
          })

    }
    
    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              size="small"
              style={{ width: 90 }}
              onClick={() => {
                handleReset(clearFilters);
                setSearchedColumn(dataIndex);
                confirm({ closeDropdown: true });
              }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            type="search"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            : false,
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current.select());
          }
        },
        render: (text) =>
          text ? (
            searchedColumn === dataIndex ? (
              <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            ) : (
              text
            )
          ) : null,
      });
    
      /**
       *
       * @param selectedKeys
       * @param confirm
       * @param dataIndex
       */
      function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      }
    
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText("");
      }

      const fabricColumns: any = [
        {
                  title: <div style={{ textAlign: 'center' }}>S No</div>,
          key: "sno",
          width: "70px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
                  title: <div style={{ textAlign: 'center' }}>Fabric Code</div>,
          dataIndex: "fabricCode",
          align:'center',

         }, 
        {
                  title: <div style={{ textAlign: 'center' }}>Total Requirment</div>,
          dataIndex: "total",
          align:'right',
          sorter: (a, b) => a.total.localeCompare(b.total),
          sortDirections: ["descend", "ascend"],
          render: (text, record) => {
            return (
              <>
               {record.total ? `${record.total}(${record.uom})` : "Not Available"}
              </>
            );
          },
        },
        {
                  title: <div style={{ textAlign: 'center' }}>Consumption</div>,
          dataIndex: "consumption",
          align:'right',
          sorter: (a, b) => a.consumption.localeCompare(b.consumption),
          sortDirections: ["descend", "ascend"],
          render: (text, record) => {
            
              return (
                <>
                 {record.consumption ? `${record.consumption}(${record.uom})` : "Not Available"}
                </>
              );
            },
        },
        {
                  title: <div style={{ textAlign: 'center' }}>Wastage</div>,
          dataIndex: "wastage",
          align:'right',
          sorter: (a, b) => a.wastage.localeCompare(b.wastage),
          sortDirections: ["descend", "ascend"],
          render: (text, record) => {
            return (
              <>
               {record.wastage ? `${record.wastage}%` : "Not Available"}
              </>
            );
          },
        },
        {
                  title: <div style={{ textAlign: 'center' }}>Remarks</div>,
          // fixed: 'left',
          dataIndex: 'remarks',
          render:(text,record) => {
            return(
                <>
                {record.remarks?.length > 30 ? (<><Tooltip title='Cilck to open full remarks'><p><span onClick={() => handleTextClick(record.remarks)} style={{ cursor: 'pointer' }}>
                            {record.remarks.length > 30 ? `${record.remarks?.substring(0, 30)}....` : record.remarks}
                        </span></p></Tooltip></>) : (<>{record.remarks?record.remarks:'-'}</>)}
                </>
            )
        }
        } 
      ];
      const handleTextClick = (remarks) => {
        setRemarks(remarks)
        setRemarkModal(true)
      }
      const onRemarksModalOk = () => {
      setRemarkModal(false)
      }
      const trimColumns: any = [
        {
                  title: <div style={{ textAlign: 'center' }}>S No</div>,
          key: "sno",
          width: "70px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
                  title: <div style={{ textAlign: 'center' }}>Trim Code</div>,
          dataIndex: "trimCode",
          align:'center',

        //   sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
        //   sortDirections: ["descend", "ascend"],
        //   ...getColumnSearchProps("requestNo"),
        }, 
        {
                  title: <div style={{ textAlign: 'center' }}>Trim Category</div>,
          dataIndex: "category",
          
        }, 

        {
                    title: <div style={{ textAlign: 'center' }}>Trim Type</div>,
            dataIndex: "type",
            render: (text) => {
              const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
              return EnumObj ? EnumObj.displayVal : text;
            },
          //   sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
          //   sortDirections: ["descend", "ascend"],
          //   ...getColumnSearchProps("requestNo"),
          }, 
          {
                    title: <div style={{ textAlign: 'center' }}>Total Requirment</div>,
            dataIndex: "total",
            sorter: (a, b) => a.total.localeCompare(b.total),
            align:'right',
            sortDirections: ["descend", "ascend"],
            render: (text, record) => {
              return (
                <>
                 {record.total ? `${record.total}(${record.uom})` : "Not Available"}
                </>
              );
            },
          },
          {
                    title: <div style={{ textAlign: 'center' }}>Consumption</div>,
            dataIndex: "consumption",
            sorter: (a, b) => a.consumption.localeCompare(b.consumption),
            sortDirections: ["descend", "ascend"],
            align:'right',
            render: (text, record) => {
              
                return (
                  <>
                   {record.consumption ? `${record.consumption}(${record.uom})` : "Not Available"}
                  </>
                );
              },
          },
          {
                    title: <div style={{ textAlign: 'center' }}>Wastage</div>,
            dataIndex: "wastage",           
             align:'right',
            sorter: (a, b) => a.wastage.localeCompare(b.wastage),
            sortDirections: ["descend", "ascend"],
            render: (text, record) => {
              return (
                <>
                 {record.wastage ? `${record.wastage}%` : "Not Available"}
                </>
              );
            },
          },
          {
                    title: <div style={{ textAlign: 'center' }}>Remarks</div>,
            // fixed: 'left',
            dataIndex: 'remarks',
            align:'center',
            render:(text,record) => {
              return(
                  <>
                  {record.remarks?.length > 30 ? (<><Tooltip title='Cilck to open full remarks'><p><span onClick={() => handleTextClick(record.remarks)} style={{ cursor: 'pointer' }}>
                              {record.remarks.length > 30 ? `${record.remarks?.substring(0, 30)}....` : record.remarks}
                          </span></p></Tooltip></>) : (<>{record.remarks?record.remarks:'-'}</>)}
                  </>
              )
          }
          } 
      ];

     
    const sizeColumns = colourData[0]?Object.keys(colourData[0]).map(param => ({
              title: <div style={{ textAlign: 'center' }}>{param}</div>,
              align:'center',
      dataIndex: param,
      key:param,
      render:(text,record) =>{
          
          // console.log(Object.keys(record).filter(item => item === param)[0])
          const test = Object.keys(record).filter(item => item === param)[0]
          // console.log(test)
          // console.log(record[test])
              return (<>{(param != 'colour' && param != 'style')?Number(record[test]):record[test]}</>)
          // console.log(record.keys.filter(item => item == param))
      }

  })):[]
    const columns:any[]  = [
      {
                  title: <div style={{ textAlign: 'center' }}>S No</div>,
          key: 'sno',
          width: '70px',
          responsive: ['sm'],
          render: (text, object, index) => (page-1) * 10 +(index+1)
      },
      {
                  title: <div style={{ textAlign: 'center' }}>Size Wise Quantity</div>,
          dataIndex: 'size',
          width:"10%",
          children :sizeColumns,
          key:'size'
        },
        
  ]
return(
    <Card headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
    title={
      <div style={{textAlign:"center"}}>
        <span style={{marginRight:"20px"}}>Sample Request: {data[0]?.sampleRequestNo}</span>
      </div>
    }
    // title={'Sample Request Detail view'}
    extra={
      <span>
        <Button onClick={() => navigate("/sample-development/sample-requests")}>Back</Button>
      </span>
    }>
        <Descriptions>
        <DescriptionsItem label='Location'>{data?.[0]?.location?data?.[0]?.location:'-'}</DescriptionsItem>
        <DescriptionsItem label='Buyer'>{data?.[0]?.buyer?data?.[0]?.buyer:'-'}</DescriptionsItem>
        <DescriptionsItem label='Style'>{data?.[0]?.style?data?.[0]?.style:'-'}</DescriptionsItem>
        <DescriptionsItem label='PCH'>{data?.[0]?.pch?data?.[0]?.pch:'-'}</DescriptionsItem>
        <DescriptionsItem label='User'>{data?.[0]?.user?data?.[0]?.user:'-'}</DescriptionsItem>
        <DescriptionsItem label='Brand'>{data?.[0]?.brand?data?.[0]?.brand:'-'}</DescriptionsItem>
        <DescriptionsItem label='Epected Delivery Date'>{data?.[0]?.ETD?moment(data?.[0]?.ETD).format('DD-MM-YYYY'):'-'}</DescriptionsItem>
        <DescriptionsItem label='Cost Ref'>{data?.[0]?.costRef?data?.[0]?.costRef:'-'}</DescriptionsItem>
        <Descriptions.Item label="Description" style={{ width: '33%' }}>
                                {/* {grnData.description} */}
                                {data?.[0]?.description?.length > 30 ? (<><Tooltip title='Cilck to open full description'><p><span onClick={() => handleTextClick(data?.[0]?.description)} style={{ cursor: 'pointer' }}>
                        {data?.[0]?.description.length > 30 ? `${data?.[0]?.description?.substring(0, 30)}....` : data?.[0]?.description}
                    </span></p></Tooltip></>) : (<>{data?.[0]?.description?data?.[0]?.description:'-'}</>)}
        </Descriptions.Item>
        <DescriptionsItem label='Contact No'>{data?.[0]?.contact?data?.[0]?.contact:'-'}</DescriptionsItem>
        <DescriptionsItem label='Extn'>{data?.[0]?.extn?data?.[0]?.extn:'-'}</DescriptionsItem>
        <DescriptionsItem label='Sam'>{data?.[0]?.sam?data?.[0]?.sam:'-'}</DescriptionsItem>
        <DescriptionsItem label='DMM'>{data?.[0]?.dmmFirst?`${data?.[0]?.dmmFirst}-${data?.[0]?.dmmLast}`:'-'}</DescriptionsItem>
        {/* <DescriptionsItem label='Technician'>{data?.[0]?.employee?data?.[0]?.employee:'-'}</DescriptionsItem> */}
        <DescriptionsItem label='Product'>{data?.[0]?.product?data?.[0]?.product:'-'}</DescriptionsItem>
        {/* <DescriptionsItem label='Type'>{data?.[0]?.type?data?.[0]?.type:'-'}</DescriptionsItem> */}
        {/* <DescriptionsItem label='Conversion'>{data?.[0]?.conversion?data?.[0]?.conversion:'-'}</DescriptionsItem>
        <DescriptionsItem label='Made In'>{data?.[0]?.madeIn?data?.[0]?.madeIn:'-'}</DescriptionsItem> */}
        <DescriptionsItem label='Life Cycle Status'>{data?.[0]?.lifeCycleStatus?LifeCycleStatusDisplay.find((e)=>e.name === data?.[0]?.lifeCycleStatus)?.displayVal:'-'}</DescriptionsItem>
                {/* <DescriptionsItem label='Status'>{data?.[0]?.status?data?.[0]?.status:'-'}</DescriptionsItem> */}
                <DescriptionsItem label='Sample Type'>{data?.[0]?.sampleType?data?.[0]?.sampleType:'-'}</DescriptionsItem>
                <DescriptionsItem label='Sample Sub Type'>{data?.[0]?.sampleSubType?data?.[0]?.sampleSubType:'-'}</DescriptionsItem>
                <DescriptionsItem label='Category'>{data?.[0]?.category?CategoryEnumDisplay.find((e)=>e.name === data?.[0]?.category)?.displayVal:'-'}</DescriptionsItem>
        <Descriptions.Item label="Remarks" style={{ width: '33%' }}>
                                {data?.[0]?.remarks?.length > 30 ? (<><Tooltip title='Cilck to open full remarks'><p><span onClick={() => handleTextClick(data?.[0]?.remarks)} style={{ cursor: 'pointer' }}>
                        {data?.[0]?.remarks.length > 30 ? `${data?.[0]?.remarks?.substring(0, 30)}....` : data?.[0]?.remarks}
                    </span></p></Tooltip></>) : (<>{data?.[0]?.remarks?data?.[0]?.remarks:'-'}</>)}
         </Descriptions.Item>                
             
        </Descriptions>
        {colourData.length > 0 && (
        <Table columns={columns} dataSource={colourData} size="small"rowKey={record => record.colour}/>)}
        {fabData.length > 0 && (
        <Table columns={fabricColumns} dataSource={fabData} size="small"/>)}
        {trimData.length > 0 && (
        <Table columns={trimColumns} dataSource={trimData} size="small"/>)}
        <Modal open={remarkModal} onOk={onRemarksModalOk} onCancel={onRemarksModalOk} footer={[<Button onClick={onRemarksModalOk} type='primary'>Ok</Button>]}>
                <Card>
                    <p>{remarks}</p>
                </Card>
            </Modal>
    </Card>
)
}
export default SampleReqDetailView;