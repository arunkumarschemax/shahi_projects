import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Select, Table,Row, Button, Input } from 'antd';
import type { ColumnProps, ColumnsType } from 'antd/es/table';
import { ItemsService, OperationSequenceService, OperationsService, StyleService } from '@project-management-system/shared-services';
import { StyleRequest, OperationSequenceRequest } from '@project-management-system/shared-models';
import AlertMessages from '../common/common-functions/alert-messages';

const {Option} = Select;

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const RowProps = (props: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

export const OperationSequence = () => {
  const [page, setPage] = React.useState(1);
  const [dataSource,setDataSource] = useState<any[]>([])
  const [form] = Form.useForm()
  const operationSequenceService = new OperationSequenceService()
  const operationService = new OperationsService()
  const [showTable,setShowTable] = useState<boolean>(false)
  const [showSubmit,setShowSubmit] = useState<boolean>(true)
  const [itemCodes,setItemCodes] = useState<any[]>([])
  const itemService = new ItemsService()
  const styleService = new StyleService()
  const [style,setStyle] = useState<any[]>([])

  useEffect(() => {
      getOperations()
      // getAllItemCodes()
      getAllStyles()
  },[])


  const getOperations = () => {
      operationService.getAllActiveOperations().then(res => {
          if(res.status){
            setDataSource(res.data)
          }
      })
  }

  const getInfoByStyleCode = (val) => {
    const req = new StyleRequest(val)
    operationSequenceService.getInfoByStyleCode(req).then(res =>{
      if(res.status){
        setShowSubmit(false)
      } else{
        setShowSubmit(true)
      }
    })

  }

  // const getAllItemCodes = () => {
  //   itemService.getAllItems().then(res => {
  //     if(res.status){
  //       setItemCodes(res.data)
  //     }
  //   })
  // }

  const getAllStyles = () => {
    styleService.getAllActiveStyle().then(res => {
      if(res.status){
        setStyle(res.data)
      }
    })
  }

  // const [dataSource, setDataSource] = useState([
  //   {
  //     key: '1',
  //     operationGroupName: 'Cutting',
  //     operationName:'cutting',
  //   },
  //   {
  //     key: '2',
  //     operationGroupName: 'Sewing',
  //     operationName:'sewing hands',
  //   },
  //   {
  //     key: '3',
  //     operationGroupName: 'Sewing',
  //     operationName:'sewing collor',
  //   },
  // ]);

  const columns : ColumnProps<any>[] = [
    {
        title:<div style={{textAlign:'center'}}>S No</div>,
      key: 'sno',
      width: '70px',
      responsive:['sm'],
      align:'center',
      render: (text, object, index) => (page-1) * 10 +(index+1)
    },
    {
        title:<div style={{textAlign:'center'}}>Operation Group</div>,
        dataIndex:'operationGroupName'
    },
    {
        title:<div style={{textAlign:'center'}}>Opeartion</div>,
        dataIndex:'operationName'
    },
    {
        title:<div style={{textAlign:'center'}}>Sequence</div>,
        key: 'sequence',
        dataIndex:'sequence',
        align:'right',
        render: (text, object, index) =>{
          object.sequence = index+1
          return index+1
        } 
    },
  ]

  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onSubmit = () => {
    const req = new OperationSequenceRequest(form.getFieldValue('style'),form.getFieldValue('styleId'),dataSource,'admin')
    // const req = new OperationSequenceRequest('I0001',1,dataSource,'admin')
    operationSequenceService.createOperationSequence(req).then(res => {
      if(res.status){
        AlertMessages.getSuccessMessage(res.internalMessage)
        form.resetFields()
        getOperations()
        setShowSubmit(false)
      } else{
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    })
  }

  const onStyleChange = (val,option) => {
    form.setFieldsValue({styleId:option?.key})
    setShowTable(true)
    getInfoByStyleCode(val)
  }

  return (
    <Card title='Operation Sequence' className='card-header'>
      <Form layout="horizontal" form={form}>
          <Form.Item name='styleId' style={{display:'none'}}>
                <Input hidden/>
            </Form.Item>
            <Row gutter={24}>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
            <Form.Item label='Style' name='style' rules={[{required:true,message:'Style is required'}]}>
                <Select showSearch allowClear placeholder='Select Style' onChange={onStyleChange}>
                    {/* <Option key='itemid' value='itemcode'>Item Codes </Option> */}
                    {
                        style.map((e)=>{
                            return(
                                <Option key={e.styleId} value={e.style}>{e.style}-{e.description}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Col>
        </Row>
        {showTable && !showSubmit ? (<>
        <p style={{color:'blue',fontSize:'15px'}}>Operation Sequence is already allocated for this Style</p>
        </>) : (<></>)}
    {
      showTable ? (<>
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
        size='small'
          components={{
            body: {
              row: RowProps,
            },
          }}
          pagination={false}
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
      </>) : (<></>)
    }
    <br/>
    {
      showSubmit && showTable? (<>
      <Row justify={'end'}>
    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 5 }}>

    <Form.Item>
      <Button type='primary' onClick={onSubmit}>Submit</Button>
    </Form.Item>
    </Col>
    </Row>
    </>) : (<></>)
    }
   
    </Form>
    </Card>
    
  );
};

export default OperationSequence;