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
import { sampleReqIdReq } from "@project-management-system/shared-models"

export const SampleReqDetailView = () =>{
    const searchInput = useRef(null);
    const [page, setPage] = React.useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const service = new SampleDevelopmentService();
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [filterData, setFilterData] = useState<any[]>([]);

    useEffect(() => {
        getData()
      }, []);

    const getData =()=>{
        const req = new sampleReqIdReq(1,undefined)
        service.getAllSampleRequestsInfo(req).then((res) => {
            if (res.status) {
              setData(res.data);
              console.log(res.data,"rrrrr")
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
        <DescriptionsItem label='Location'>locationName</DescriptionsItem>
                <DescriptionsItem label='PCH'>profitControlHead</DescriptionsItem>
                <DescriptionsItem label='User'>companyName</DescriptionsItem>
                <DescriptionsItem label='Buyer'>buyerName</DescriptionsItem>
                <DescriptionsItem label='Sample Type'>sampleType</DescriptionsItem>
                <DescriptionsItem label='Sample Sub Type'>sampleSubType</DescriptionsItem>
                <DescriptionsItem label='Style'>style</DescriptionsItem>
                <DescriptionsItem label='Description'>salesPerson</DescriptionsItem>
                <DescriptionsItem label='Brand'>brandName</DescriptionsItem>
                <DescriptionsItem label='Cost Ref'>costRef</DescriptionsItem>
                <DescriptionsItem label='M3 Style No'>m3StyleNo</DescriptionsItem>
                <DescriptionsItem label='Contact No'>contact</DescriptionsItem>
                <DescriptionsItem label='Extn'>extension</DescriptionsItem>
                <DescriptionsItem label='SAM'>samValue</DescriptionsItem>
                <DescriptionsItem label='DMM'>dmmEmployee</DescriptionsItem>
                <DescriptionsItem label='Technician'>techEmployee</DescriptionsItem>
                <DescriptionsItem label='Product'>product</DescriptionsItem>
                <DescriptionsItem label='Type'>type</DescriptionsItem>
                <DescriptionsItem label='Conversion'>conversion</DescriptionsItem>
                <DescriptionsItem label='Made In'>madeIn</DescriptionsItem>
                <DescriptionsItem label='Remarks'>deliveryMethod</DescriptionsItem>
        </Descriptions>
        <Table columns={fabricColumns}/>
        <Table columns={trimColumns}/>
        <Table/>

    </Card>
)
}
export default SampleReqDetailView;