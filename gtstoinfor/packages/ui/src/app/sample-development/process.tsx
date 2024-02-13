import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, Form, FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { OperationGroupsService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';
import InputNumber from 'rc-input-number';
const {Option}=Select

export interface ProcessFormProps {
  data: any;
  processDetails: any[]
  form:FormInstance<any>
  sizeDetails: any[]
}

const ProcessForm = (props:ProcessFormProps) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [operationData, setOperationsData] = useState<any[]>([]);
  const service = new OperationGroupsService();

  useEffect(() => {
    getOperationsData()
  }, [])

  const getOperationsData = () => {
    service.getAllActiveOperationGroups().then((res) => {
      if(res.status){
        setOperationsData(res.data);
        // AlertMessages.getSuccessMessage(res.internalMessage)
      }
      else{
        setOperationsData([]);
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      setOperationsData([]);
      AlertMessages.getWarningMessage(err)
    })
  }
  
  const handleAddRow = () => {
    if(props.sizeDetails.length > 0){
      const newRow = {
        key: count
      };
      setData([...data, newRow]);
      setCount(count + 1);
    }
  };

  const handleInputChange = (e, key, field) => {
    console.log(e);
    // console.log(e.target.value);
    console.log(data);
    console.log(key);
    console.log(field);

    if(field === "sequence"){
        let duplicateSequence =  data.find((f) => f.sequence === e.target.value);
        console.log(duplicateSequence)
        if(duplicateSequence != undefined){
          AlertMessages.getErrorMessage("Duplicate sequence not allowed. ")
          const updatedData = data.map((record) => {
            if (record.key === key) {
              return { ...record, [field]: undefined };
            }
            return record;
          });
          props.form.setFieldValue(`sequence${key}`,null)
          props.form.validateFields().then(process => {

          })
          .catch(err => {
            // AlertMessages.getErrorMessage("errr")
          })
          setData(updatedData);
          props.data(updatedData)
        }
        else{
          const updatedData = data.map((record) => {
            if (record.key === key) {
              return { ...record, [field]: e.target.value };
            }
            return record;
          });
          setData(updatedData);
          props.data(updatedData)
        }
    }
    else if(field === "operation"){
      let duplicateOperation =  data.find((f) => f.operation === e);
        console.log(duplicateOperation)
        if(duplicateOperation != undefined){
          AlertMessages.getErrorMessage("Duplicate operation not allowed. ")
          const updatedData = data.map((record) => {
            if (record.key === key) {
              return { ...record, [field]: undefined };
            }
            return record;
          });
          props.form.setFieldValue(`operation${key}`,undefined)
          props.form.validateFields().then(process => {
          }) .catch(err => {
            // AlertMessages.getErrorMessage("errr")
          })
          setData(updatedData);
          props.data(updatedData)
        }
        else{
          const updatedData = data.map((record) => {
            if (record.key === key) {
              return { ...record, [field]: e};
            }
            return record;
          });
          setData(updatedData);
          props.data(updatedData)
        }
    }
    else{
      const updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e };
        }
        return record;
      });
      setData(updatedData);
      props.data(updatedData)
    }
  };

  const handleDelete = (key) => {
    const updatedData = data.filter((record) => record.key !== key);
    setData(updatedData);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => (
        <Form.Item name={`operation${record.key}`}
        rules={[{ required: true, message: 'Missing Operation' }]}
        >
          <Select
            value={record.colourId}
            onChange={(e) => handleInputChange(e, record.key, 'operation')}
            style={{ width: "100%" }}
            allowClear
            showSearch
            optionFilterProp="children"
            placeholder="Select Operation"
          >
            {operationData.map((e) => {
              return (
                <Option name={`operation${record.key}`} key={e.operationGroupId} value={e.operationGroupId}>
                  {e.operationGroupName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Sequence',
      dataIndex: 'sequence',
      render: (_, record) => (
        <Form.Item name={`sequence${record.key}`}
        rules={[{ required: true, message: 'Missing sequence' }]}
        >
        <Input type='number' placeholder="Enter sequence" min={1}
        value={record.sequence}
        onChange={(e) => handleInputChange(e, record.key, 'sequence')}
        />
        </Form.Item>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.key)}><Tooltip title="Delete Row"><DeleteOutlined /></Tooltip></Button>
      ),
    },
  ];

  return (
    <div>
      <Form form={props.form}>
      <Button onClick={handleAddRow} style={{margin:"10px"}}>Add Row</Button>
      <Table 
      dataSource={data} 
      columns={columns}  
      bordered={true}
      />
      </Form>
    </div>
  );
};

export default ProcessForm;
