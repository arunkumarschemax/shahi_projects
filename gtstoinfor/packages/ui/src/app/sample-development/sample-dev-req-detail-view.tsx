import { CloseOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Descriptions, Divider, Input, Tooltip } from "antd"
import style from "antd/es/alert/style"
import DescriptionsItem from "antd/es/descriptions/Item"
import Table from "antd/lib/table"
import { type } from "os"
import { SampleDevelopmentService } from "packages/libs/shared-services/src/common"
import React, { useEffect, useRef } from "react"
import { useState } from "react"
import Highlighter from "react-highlight-words"
import { useNavigate } from "react-router-dom"
import AlertMessages from "../common/common-functions/alert-messages"
import { LifeCycleStatusDisplay, sampleReqIdReq } from "@project-management-system/shared-models"

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
    useEffect(() => {
        getData()
      }, []);

    const getData =()=>{
        const req = new sampleReqIdReq(1,undefined)
        service.getAllSampleRequestsInfo(req).then((res) => {
            if (res.status) {
              setData(res.data);
              setFabData(res.data.filter((e)=>e.fabricInfo))
              setFilterData(res.data);
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
          }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
            setData([]);
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
          title: "S No",
          key: "sno",
          width: "70px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "Fabric Code",
          dataIndex: "fabCode",
        //   sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
        //   sortDirections: ["descend", "ascend"],
        //   ...getColumnSearchProps("requestNo"),
        },    
        
      ];
      const trimColumns: any = [
        {
          title: "S No",
          key: "sno",
          width: "70px",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "Trim Code",
          dataIndex: "trimCode",
        //   sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
        //   sortDirections: ["descend", "ascend"],
        //   ...getColumnSearchProps("requestNo"),
        },    
        {
            title: "Trim Type",
            dataIndex: "trimType",
          //   sorter: (a, b) => a.requestNo.localeCompare(b.requestNo),
          //   sortDirections: ["descend", "ascend"],
          //   ...getColumnSearchProps("requestNo"),
          },  
      ];
return(
    <Card>
        <Descriptions>
                <DescriptionsItem label='PCH'>{data?.[0]?.pch}</DescriptionsItem>
                <DescriptionsItem label='Buyer'>{data?.[0]?.buyer}</DescriptionsItem>
                <DescriptionsItem label='Style'>{data?.[0]?.style}</DescriptionsItem>
                <DescriptionsItem label='Employee'>{data?.[0]?.employee}</DescriptionsItem>
                <DescriptionsItem label='Brand'>{data?.[0]?.brand}</DescriptionsItem>
                <DescriptionsItem label='Sample Request No'>{data?.[0]?.sampleRequestNo}</DescriptionsItem>
                {/* <DescriptionsItem label='DMM'>{data?.[0]?.dmm}</DescriptionsItem> */}
                <DescriptionsItem label='Contact No'>{data?.[0]?.contact}</DescriptionsItem>
                <DescriptionsItem label='Epected Delivery Date'>{data?.[0]?.ETD}</DescriptionsItem>
                {/* <DescriptionsItem label='Conversion'>{data?.[0]?.conversion}</DescriptionsItem> */}
                <DescriptionsItem label='Life Cycle Status'>{data?.[0]?.lifeCycleStatus?LifeCycleStatusDisplay.find((e)=>e.name === data?.[0]?.lifeCycleStatus)?.displayVal:'-'}</DescriptionsItem>
                <DescriptionsItem label='Status'>{data?.[0]?.status}</DescriptionsItem>
        </Descriptions>
        {fabData.length < 0 ?(
        <Table columns={fabricColumns} dataSource={fabData}/>):(<></>)}
        {trimData.length < 0 ?(
        <Table columns={trimColumns} dataSource={trimData}/>):(<></>)}
        <Table/>

    </Card>
)
}
export default SampleReqDetailView;