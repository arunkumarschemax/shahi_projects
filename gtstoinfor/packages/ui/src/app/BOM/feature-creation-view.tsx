
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table, Popconfirm, Card, Tooltip, Switch, Input, Button, Tag, Row, Col, Drawer, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { CheckCircleOutlined, CloseCircleOutlined, RightSquareOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {   ColourService, CompositionService, DestinationService, FeatureService, ItemsService, LiscenceTypeService, RangeService, SizeService } from '@project-management-system/shared-services';
import { CompositionDto, LiscenceTypesdDto, RangeDto } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';


const FeatureCreationView = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [lTData, setLTData] = useState<any[]>([]);
  const searchInput = useRef(null);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [selectedRangeData, setSelectedRangeData] = useState<any>(undefined);
  const [color, setColor] = useState({})
  const [size, setSize] = useState({})
  const [des, setDes] = useState({})

  const colorService = new ColourService()
  const sizeService = new SizeService()
  const desService = new DestinationService()
  const service = new FeatureService()

   const [sizeOptions, setSizeOptions] = useState({});
const [colorOptions, setColorOptions] = useState({});
const [destinationOptions, setDestinationOptions] = useState({});

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

//   const sizeData = () => {
//     sizeService.getAllActiveSize().then((res) => {
//       if (res.status) {
//         const sizeMapping = mapOptionsToNames(res.data);
//         setSizeOptions(sizeMapping);
//       }
//     });
//   }
const sizeData = () => {
    sizeService.getAllActiveSize()
      .then((res) => {
        if (res.status) {
          const sizeData = res.data;
          setSize(mapOptionsToNames(sizeData));
          console.log(sizeData,"size data")

        }
      })
      .catch((err) => {
        console.error('Error fetching size data:', err);
        setSize({});
      });
  };


  const colorData = () => {
    colorService.getAllActiveColour().then((res) => {
      if (res.status) {
        const colorMapping = mapOptionsToNames(res.data);
        setColorOptions(colorMapping);
      }
    });
  }
  
  const desData = () => {
    desService.getAllActiveDestination().then((res) => {
      if (res.status) {
        const destinationMapping = mapOptionsToNames(res.data);
        setDestinationOptions(destinationMapping);
      }
    });
  }
const mapOptionsToNames = (options) => {
    const names = {};

    options.forEach((option) => {
      names[option.option_id] = option.name; 
    });

    return names;
  };

 
  const headings = {
    SIZE: 'Size Options',
    COLOR: 'Color Options',
    DESTINATION: 'Destination Options',
  };


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
    // {
    //     title: 'Options',
    //     dataIndex: 'option_group',
    //     render: (optionGroup, record) => {
    //       const headings = {
    //         SIZE: 'Size Options',
    //         DESTINATION: 'Destination Options',
    //         COLOR: 'Color Options',
    //       };
    
    //       if (optionGroup in headings) {
    //         return (
    //           <div>
    //            {headings[optionGroup]}
    //             <ul>
    //               {record[optionGroup].map((option) => (
    //                 <li key={option.option_id}>{option.option_id}</li>
    //               ))}
    //             </ul>
    //           </div>
    //         );
    //       } else {
    //         return null;
    //       }
    //     },
    //   }, test 1
    // {
    //     title: 'Options',
    //     dataIndex: 'option_group',
    //     render: (optionGroup, record) => {
    //       if (optionGroup === 'SIZE') {
    //         return (
    //           <div>
    //             <strong>Size Options</strong>
    //             <ul>
    //               {record.SIZE.map((sizeOption) => (
    //                 <li key={sizeOption.option_id}>
    //                   {console.log(sizeOptions[sizeOption.option_id])}
    //                   {sizeOptions[sizeOption.option_id] || 'N/A'}
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         );
    //       } else {
    //         return null;
    //       }
    //     },
    //   }
      //test 2
      
      
    {
        title: 'Options',
        dataIndex: 'option_group',
        render: (optionGroup, record) => {
          if (optionGroup === 'DESTINATION') {
            const destinationIds = record.DESTINATION.map((option) => option.option_id);
            const destinationValues = destinationIds.map((id) => destinationOptions[id] || 'N/A');
      
            return (
              <div>
                <strong>Destination Options</strong>
                <ul>
                  {destinationValues.map((value, index) => (
                    <li key={destinationIds[index]}>{value}</li>
                  ))}
                </ul>
              </div>
            );
          } else if (optionGroup === 'SIZE') {
            const sizeIds = record.SIZE.map((option) => option.option_id);
            const sizeValues = sizeIds.map((id) => sizeOptions[id] || 'N/A');
            return (
              <div>
                <strong>Size Options</strong>
                <ul>
                  {sizeValues.map((value, index) => (
                    <li key={sizeIds[index]}>{value}</li>
                  ))}
                </ul>
              </div>
            );
          } else if (optionGroup === 'COLOR') {
            const colorIds = record.COLOR.map((option) => option.option_id);
            const colorValues = colorIds.map((id) => colorOptions[id] || 'N/A');
      
            return (
              <div>
                <strong>Color Options</strong>
                <ul>
                  {colorValues.map((value, index) => (
                    <li key={colorIds[index]}>{value}</li>
                  ))}
                </ul>
              </div>
            );
          } else {
            return null;
          }
        },
      }
    //test 3
      
      
      
    ];
  

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
      <>
      <Card title={<span >Feature Creation View</span>}
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
            onChange={onChange}
            bordered
            //expandable={expandableConfig} 
          />
      </Card>

      </Card> </>
      
  );
}


export default FeatureCreationView
