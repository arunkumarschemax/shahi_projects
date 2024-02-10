import { CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, CloseOutlined, EditOutlined, RightSquareOutlined } from "@ant-design/icons";
import { ColourDto, ItemTypeEnumDisplay, TrimIdRequestDto, TrimParamsMappingRequestDto } from "@project-management-system/shared-models";
import { Button, Card, Checkbox, Divider, Drawer, Popconfirm, Switch, Table, Tag } from "antd"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { ColourForm } from "../../masters/colours/colour-form";
import React from "react";
import { TrimParamsMappingService } from "@project-management-system/shared-services";
import form from "antd/es/form";
import TrimParamsMapping from "./trims-mapping-form";

export const TrimsParamsMappingView = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(undefined);
  const [page, setPage] = React.useState(1);
  const services = new TrimParamsMappingService()
  const [trimUpdateData, setTrimUpdateData] = useState<any[]>([]);
  const [formData, setFormData] = useState<TrimParamsMappingRequestDto | null>(null);


  useEffect(() => { getAll(); }, [])

  const openFormWithData = (viewData) => {
    setDrawerVisible(true);
    setSelectedVariant(viewData);
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }


  const getAll = () => {
    services.getAllMappedTrimParams().then(res => {
      if (res.status) {
        setData(res.data)
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setData([]);
    })
  }
  const closeDrawer = () => {
    setDrawerVisible(false);
  }
  const updateDetails = (val) => {
    const updatedUser = JSON.parse(localStorage.getItem('username'))
    const req = new TrimParamsMappingRequestDto(undefined, val.category, val.trimCategoryId, val.color, val.content, val.finish, val.hole, val.logo, val.part, val.quality, val.structure, val.thickness, val.type, val.uom, val.variety, undefined, undefined, updatedUser, val.ply, val.parts, val.shape, val.length, val.line, val.slider, val.buyer, undefined, val.trimType,val.size)
    services.updateMapping(req).then((res) => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.internalMessage)
        setDrawerVisible(false);
        getAll()
      } else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }
    )
  }
  const columnsSkelton: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      align: "center",
      responsive: ['sm'],
      fixed: 'left',
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },
    {
      title: 'Trim Type',
      dataIndex: 'trimType',
      fixed: 'left',
      width: '150px',
      sorter: (a, b) => a.trimType.localeCompare(b.trimType),
      sortDirections: ['descend', 'ascend'],
      render: (text) => {
        const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
        return EnumObj ? EnumObj.displayVal : text;
      },
    },
    {
      title: 'Trim Category',
      dataIndex: 'trimCategory',
      fixed: 'left',
      sorter: (a, b) => a.trimCategory.localeCompare(b.trimCategory),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'center',
      width: '100px',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
    }, {
      title: 'Structure',
      dataIndex: 'structure',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Variety',
      dataIndex: 'variety',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Ply',
      dataIndex: 'ply',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Shape',
      dataIndex: 'shape',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Slider',
      dataIndex: 'slider',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Finish',
      dataIndex: 'finish',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Thickness',
      dataIndex: 'thickness',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Parts',
      dataIndex: 'parts',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    }, {
      title: 'Part',
      dataIndex: 'part',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    }, {
      title: 'Line',
      dataIndex: 'line',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    }, {
      title: 'Length',
      dataIndex: 'length',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    }, {
      title: 'Content',
      dataIndex: 'content',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    }, {
      title: 'Hole',
      dataIndex: 'hole',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    }, {
      title: 'Logo',
      dataIndex: 'logo',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },
    {
      title: 'Quality',
      dataIndex: 'quality',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    }, {
      title: 'UOM',
      dataIndex: 'uom',
      render: (isActive, rowData) => (
        <>
          {isActive ? <Tag color="#87d068"><CheckOutlined /></Tag> : <Tag color="#f50"><CloseOutlined /></Tag>}
        </>
      ),
      align: 'center',
      width: '100px',
    },

    {
      title: `Action`,
      dataIndex: 'action',
      align: "center",
      fixed: 'right',
      width: '100px',
      render: (text, rowData) => (
        <span>
          <EditOutlined className={'editSamplTypeIcon'} type="edit"
            onClick={(e) => {
              console.log(rowData);

              if (rowData.isActive) {
                openFormWithData(rowData);
              } else {
                AlertMessages.getErrorMessage('You Cannot Edit Deactivated Payment mode');
              }
            }}
            style={{ color: '#1890ff', fontSize: '14px' }}
          />

        </span>
      )
    }
  ];
  return (
    <>
      <Card title={<span>Trim Param Mapping</span>}
        headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<Link to="/trim-master/trim-params-mapping"  ><span><Button type={'primary'} >New </Button> </span></Link>}>
        <Table
          size='small'
          columns={columnsSkelton}
          dataSource={data}
          scroll={{ x: 'max-content', y: 500 }}
          pagination={{
            pageSize: 50,
            onChange(current) {
              setPage(current);
            }
          }}
          onChange={onChange}
          bordered />

      </Card>
      <Drawer bodyStyle={{ paddingBottom: 80 }} title='Update' width={window.innerWidth > 768 ? '50%' : '85%'}
        onClose={closeDrawer} visible={drawerVisible} closable={true}>
        <Card headStyle={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }} size='small'>
          <TrimParamsMapping mappingData={selectedVariant}
            updateDetails={updateDetails}
            isUpdate={true}
            closeForm={closeDrawer} />
        </Card>
      </Drawer>
    </>
  )
}
export default TrimsParamsMappingView