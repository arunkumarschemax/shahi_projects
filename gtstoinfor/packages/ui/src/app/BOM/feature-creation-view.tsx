
import React, { useState, useEffect, useRef } from 'react';
import { Table, Card,  Input, Button,} from 'antd';
import Highlighter from 'react-highlight-words';
import {  SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   ColourService, DestinationService, FeatureService, SizeService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import { CSSProperties } from 'react';


const FeatureCreationView = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [lTData, setLTData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [color, setColor] = useState<any[]>([])
  const [des, setDes] = useState<any[]>([])
  const [size, setSize] = useState<any[]>([])
  const colorService = new ColourService()
  const sizeService = new SizeService()
  const desService = new DestinationService()
  const service = new FeatureService()

  useEffect(() => {
    getAllFeatureData();
    colorData();
    sizeData();
        desData();
  }, [])


    const getAllFeatureData= () => {
    service.getAllFeatures().then(res => {
      if (res.status) {
        setLTData(res.data);
      } else
       {
        setLTData([])
          AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setLTData([]);
    })
  }


  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
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
            <Button size="small" style={{ width: 90 }}
                onClick={() => {
                    handleReset(clearFilters)
                    setSearchedColumn(dataIndex);
                    confirm({ closeDropdown: true });
                }}>
                Reset
            </Button>
        </div>
    ),
    filterIcon: filtered => (
        <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            : false,
    onFilterDropdownVisibleChange: visible => {
        if (visible) { setTimeout(() => searchInput.current.select()); }
    },
    render: text =>
        text ? (
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : text
        )
            : null
})

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };


const sizeData = () =>{
    sizeService.getAllActiveSize().then((res)=>{
        if(res.status){
            setSize(res.data)
        }
    })
}


  const colorData = () => {
    colorService.getAllActiveColour().then((res)=>{
        if(res.status){
            setColor(res.data)
        }
    })
  }
  
  const desData = () => {
    desService.getAllActiveDestination().then((res)=>{
        if(res.status){
            setDes(res.data)
        }
    })
  }


const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Feature Code',
      dataIndex: 'feature_code',
      align: 'center',
      sorter: (a, b) => a.feature_code?.localeCompare(b.feature_code),
      ...getColumnSearchProps('feature_code'),
    },
    {
      title: 'Feature Name',
      dataIndex: 'feature_name',
      align: 'center',
      sorter: (a, b) => a.feature_name?.localeCompare(b.feature_name),
      ...getColumnSearchProps('feature_name'),
    },
    
    {
        title: 'Option',
        dataIndex: 'option_group',
        render: (optionGroup, record) => {
          const options = record[optionGroup];
      
          return (
            <div>
              {optionGroup === 'SIZE' && options
                ? options.map((option, index) => {
                    const sizeData = size.find((bran) => bran.sizeId === option.option_id);
                    const sizeText = sizeData ? sizeData.size : "-";
                    const element = (
                      <span key={option.option_id}>
                        {sizeText}
                        {index < options.length - 1 ? ', ' : ''}
                      </span>
                    );
      
                    index++;
                    return element;
                  })
                : null
              }
              {optionGroup === 'DESTINATION' && options
                ? options.map((option, index) => {
                    const DestinationData = des.find((bran) => bran.destinationId === option.option_id);
                    const destText = DestinationData ? DestinationData.destination : "-";
                    return (
                      <span key={option.option_id}>
                        {destText}
                        {index < options.length - 1 ? ', ' : ''}
                      </span>
                    );
                  })
                : null
              }
              {optionGroup === 'COLOR' && options
                ? options.map((option, index) => {
                    const colorData = color.find((bran) => bran.colourId === option.option_id);
              const colorText = colorData ? colorData.colour : "-";
              const isWhite = colorText.toLowerCase() === 'white';
              const colorStyle: CSSProperties = {
                display: 'inline-block',
                padding: '4px',
                backgroundColor: isWhite ? 'white' : colorText,
                color: isWhite ? 'black' : 'white',
                borderRadius: '4px',
                width: '10%',
                height: '30px',
                margin: '4px',
                border: `1px solid ${isWhite ? 'black' : 'transparent'}`,
                textAlign: 'center', 
               // lineHeight: '40px', 
              };
                    return (
                      <span key={option.option_id} style={colorStyle}>
                        {colorText}
                        {/* {index < options.length - 1 ? ', ' : ''} */}
                      </span>
                    );
                  })
                : null
              }
            </div>
          );
        },
      }

    ];
  

//   const onChange = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   }

  return (
      <>
      <Card title={<span >Feature Creation</span>}
    style={{textAlign:'left'}} headStyle={{ border: 0 }} 
    extra={<Link to='/materialCreation/feature-creation' >
      <span style={{color:'white'}} ><Button type={'primary'} >New</Button> </span>
      </Link>} >
      <Card >
      <Table
            size='middle'
            rowKey={(record) => record.feature_option_id}
            columns={columnsSkelton}
            className='custom-table-wrapper'
            dataSource={lTData}
            pagination={{
              onChange(current) {
                setPage(current);
              },
            }}
            scroll={{ x: true }}
            // onChange={onChange}
            bordered
          />
      </Card>
      </Card> </>
      
  );
}
export default FeatureCreationView


