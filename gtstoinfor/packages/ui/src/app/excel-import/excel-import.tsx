import { useEffect, useState } from 'react';
import { Button, Card, Col, Descriptions, Divider, Form, message, Row, Select, UploadProps } from 'antd';
import { OrdersService } from '@project-management-system/shared-services';
import Papa from 'papaparse'
import AlertMessages from '../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FileExcelFilled, UndoOutlined } from '@ant-design/icons';
import { FileStatusReq, FileTypeDto, FileTypesEnum } from '@project-management-system/shared-models';
import * as XLSX from 'xlsx';
import { Excel } from 'antd-table-saveas-excel';
import { IExcelColumn } from 'antd-table-saveas-excel/app';

export default function ExcelImport() {
  const [loading, setLoading] = useState(false);
  const ordersService = new OrdersService();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filesData, setFilesData] = useState([])
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([])
  const [filelist, setFilelist] = useState([]);
  let navigate = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue({fileType:'Projection Order'})
    getUploadFilesData();
  }, [])

  const userData = JSON.parse(localStorage.getItem('currentUser'))
  const loginUser = userData.user.userName

  const getUploadFilesData = () => {
    const req= new FileTypeDto(form.getFieldValue('fileType'))
    ordersService.getUploadFilesData(req).then((res) => {
      if (res.status) {
        setFilesData(res.data)
        // message.success(res.internalMessage)
      } else{
        setFilesData([])
      }
    })
  }

  const handleFileChange = (e) => {
    if(form.getFieldsValue().fileType == FileTypesEnum.TRIM_ORDERS){
    const file = e.target.files[0];
    console.log(file.type)
    if (file && file.type === 'text/csv') {
      setSelectedFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target.result as string;
        
        // Split CSV data into lines
        const lines = csv.split('\n');

        // Extract the second row as headers
        const headers = Papa.parse(lines[1], {
          header: true,
        }).data[0];

        // Remove the first and second row from the lines array
        lines.shift(); // Remove the first row
        // lines.splice(1, 1); // Remove the second row

        // Join the remaining lines back into CSV format
        const modifiedCsv = lines.join('\n');
        console.log(modifiedCsv)

        // Now parse the modified CSV data using PapaParse with custom headers
        Papa.parse(modifiedCsv, {
          header: true, // Use custom headers
          dynamicTyping: true, // Optional: Convert numeric values to numbers
          complete: (result) => {
            const columnArray = [];
            const valueArray = [];
            console.log(result.data)

            result.data.map((d) => {
              columnArray.push(Object.keys(d))
              valueArray.push(Object.values(d))
            });
            setData(result.data)
            setColumns(columnArray[0])
            setValues(valueArray)
          },
          // error: (err) => {
          //   setError(err.message);
          // },
          skipEmptyLines: true,
        });
      };
      reader.readAsText(file);
    } else if(file && file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      console.log(file.type)
      setSelectedFile(e.target.files[0]);
      let csvData
      var reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = async data => {
        let csvData1: any = reader.result;
        csvData = importExcel(csvData1);
        // let headersRow = getHeaderArray(csvData[0][3]);
        console.log(csvData)
        csvData[0].shift()
        const filteredNestedData = csvData.filter(innerData => innerData.some(row => row.length > 0));

        const output = filteredNestedData.map(innerData => {
          const header = innerData[0];
          return innerData.slice(1).map(row => {
            if (row.every(value => value === '')) {
              return null; // Skip rows with all empty values
            }
            return row.reduce((acc, value, index) => {
              acc[header[index]] = value;
              return acc;
            }, {});
          }).filter(row => row !== null); // Remove rows with all empty values
        });  
        console.log(output,'------')
           setData(output[0]) 

      }
    }else{
      alert('Please select a valid .csv file.');
      setSelectedFile(null);
    }
  }
  if(form.getFieldsValue().fileType == FileTypesEnum.PROJECTION_ORDERS){
      const file = e.target.files[0];
      console.log(file.type)
    if (file && file.type === 'text/csv') {
        setSelectedFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
          const csv = event.target.result as string;
          
          // Split CSV data into lines
          const lines = csv.split('\n');
  
          // Extract the second row as headers
          const headers = Papa.parse(lines[1], {
            header: true,
          }).data[0];
  
          // Remove the first and second row from the lines array
          lines.shift(); // Remove the first row
          lines.shift(); // Remove the first row
          lines.shift(); // Remove the first row          
          // lines.splice(1, 1); // Remove the second row
  
          // Join the remaining lines back into CSV format
          const modifiedCsv = lines.join('\n');
  
      Papa.parse(modifiedCsv, {
        header: true,
        complete: function (result) {
          {
            const columnArray = [];
            const valueArray = [];
            result.data.map((d) => {
              columnArray.push(Object.keys(d))
              valueArray.push(Object.values(d))
            });
            setData(result.data)
            setColumns(columnArray[0])
            setValues(valueArray)
          }
        },
        skipEmptyLines: true,
      });
    }
    reader.readAsText(file);
    } else if(file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      setSelectedFile(e.target.files[0]);
      let csvData
      var reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = async data => {
        let csvData1: any = reader.result;
        csvData = importExcel(csvData1);
        // let headersRow = getHeaderArray(csvData[0][3]);
        csvData[0].shift()
        csvData[0].shift()
        csvData[0].shift()
        console.log(csvData)
        const filteredNestedData = csvData.filter(innerData => innerData.some(row => row.length > 0));

        const output = filteredNestedData.map(innerData => {
          const header = innerData[0];
          return innerData.slice(1).map(row => {
            if (row.every(value => value === '')) {
              return null; // Skip rows with all empty values
            }
            return row.reduce((acc, value, index) => {
              acc[header[index]] = value;
              return acc;
            }, {});
          }).filter(row => row !== null); // Remove rows with all empty values
        });  
           setData(output[0])   
      }
    }
    else {
      // Display an error message or take appropriate action for invalid file type
      alert('Please select a valid .csv file.');
      setSelectedFile(null);
    }
  };

  };

  const importExcel = (file: any[]) => {
    var data = new Uint8Array(file);
    var wb = XLSX.read(data, { type: 'array', cellDates: true });
    let sheet: any[] = [];
    for (const Sheet in wb.Sheets) {
      if(form.getFieldValue('fileType') === FileTypesEnum.PROJECTION_ORDERS){
        if(Sheet === 'Production Plan Rawdata Export' || Sheet === 'RawData' || Sheet === 'Rawdata'){
          if (wb.Sheets.hasOwnProperty(Sheet)) {
              sheet.push(XLSX.utils.sheet_to_json(wb.Sheets[Sheet], { raw: true, header: 1 }));
          }
        }
      } else{
        if(Sheet){
          if (wb.Sheets.hasOwnProperty(Sheet)) {
              sheet.push(XLSX.utils.sheet_to_json(wb.Sheets[Sheet], { raw: true, header: 1 }));
          }
        }
      }
    }
    return sheet;
}

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === 'text/csv') {
  //     setSelectedFile(event.target.files[0]);
  //     Papa.parse(event.target.files[0], {
  //       header: true,
  //       complete: function (result) {
  //         {
  //           const columnArray = [];
  //           const valueArray = [];

  //           result.data.map((d) => {
  //             columnArray.push(Object.keys(d))
  //             valueArray.push(Object.values(d))
  //           });
  //           setData(result.data)
  //           setColumns(columnArray[0])
  //           setValues(valueArray)
  //         }
  //       }
  //     });
  //   } else {
  //     // Display an error message or take appropriate action for invalid file type
  //     alert('Please select a valid .csv file.');
  //     setSelectedFile(null);
  //   }
  // };
  const handleUpload = async () => {
    try {
      form.validateFields().then(values => {
        if (selectedFile) {
          let integerPart
          //  console.log(selectedFile.name,'selectedFile') 
          const inputString = selectedFile.name
          console.log(inputString)
          // const match = inputString.match(/(\d+)\.\d+/);
          const match = inputString.match(/_(\d{2})/)
          console.log(match)
          if (match && match[1]) {
            integerPart = parseInt(match[1]);
            console.log(integerPart)
          } else {
            console.log("No integer part found in the input string.");
          }
          const formData = new FormData();
          formData.append('file', selectedFile);
          console.log(form.getFieldsValue().fileType)
          const d = new Date();
          // let month = d.getMonth();
          let month = 9;
          if(form.getFieldsValue().fileType == FileTypesEnum.PROJECTION_ORDERS){

            if (month) {
              ordersService.fileUpload(formData, integerPart,form.getFieldsValue().fileType,'Manual').then((fileRes) => {
                if (fileRes.status) {
                  ordersService.saveOrder(data, fileRes?.data?.id, integerPart).then((res) => {
                    setLoading(true)
                    if (res.status) {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Success';
                      req.userName = loginUser ? loginUser : null;
                      ordersService.updateFileStatus(req)
                      navigate("/excel-import/grid-view");
                      message.success(res.internalMessage)
                    } else {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Failed';
                      req.userName = loginUser ? loginUser : null;
                      ordersService.updateFileStatus(req)
                      // message.error('File upload failed')
                      message.error(res.internalMessage)
                    }
                  }).finally(() => {
                    setLoading(false);
                  })
                } else {
                  message.error(fileRes.internalMessage)
                }
              });
            } else {
              message.info('month not avilable')
            }
          }else{
              ordersService.fileUpload(formData,month,form.getFieldsValue().fileType,'Manual').then((fileRes) => {
                if (fileRes.status) {
                  ordersService.saveTrimOrder(data, fileRes?.data?.id, month).then((res) => {
                    setLoading(true)
                    if (res.status) {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Success';
                      req.userName = loginUser ? loginUser : null;
                      ordersService.updateFileStatus(req)
                      navigate("/excel-import/trim-order");
                      message.success(res.internalMessage)
                    } else {
                      const req = new FileStatusReq()
                      req.fileId = fileRes?.data?.id;
                      req.status = 'Failed';
                      req.userName = loginUser ? loginUser : null;
                      ordersService.updateFileStatus(req)
                      message.error(res.internalMessage)
                    }
                  }).finally(() => {
                    setLoading(false);
                  })
                } else {
                  message.error(fileRes.internalMessage)
                }
              });
          }
  
        }
      })
      

    } catch (error) {
      message.error(error.message)
    }
  }

  const uploadFieldProps: UploadProps = {
    multiple: false,
    onRemove: file => {
      setFilelist([]);
      // uploadFileList([]);
    },
    beforeUpload: (file: any) => {
      if (!file.name.match(/\.(csv)$/)) {
        AlertMessages.getErrorMessage("Only excel & csv files are allowed!");
        return true;
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = data => {
        if (filelist.length === 1) {
          AlertMessages.getErrorMessage("You Cannot Upload More Than One File At A Time");
          return true;
        } else {
          setFilelist([...filelist, file]);
          // uploadFileList([...filelist, file]);
          return false;
        }
      };

      // Add a default return value for cases where none of the conditions are met
      return false;
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: filelist
  };

  const onFileTypeChange = () => {
    getUploadFilesData()
  }

  let projectiontemplate: IExcelColumn[] = []
  projectiontemplate = [
        { title : 'year' , dataIndex:''},
        { title : 'planningSsnCd' , dataIndex:''},
        { title : 'planningSsn' , dataIndex:''},
        { title : 'tgtSsnCd' , dataIndex:''},
        { title : 'tgtSsn' , dataIndex:''},
        { title : 'bizCd' , dataIndex:''},
        { title : 'biz' , dataIndex:''},
        { title : 'planningRegionCode' , dataIndex:''},
        { title : 'planningRegionName' , dataIndex:''},
        { title : 'channelCode' , dataIndex:''},
        { title : 'channelName' , dataIndex:''},
        { title : 'department' , dataIndex:''},
        { title : 'deptCd' , dataIndex:''},
        { title : 'Cls1_cd' , dataIndex:''},
        { title : 'Cls2_cd' , dataIndex:''},
        { title : 'gDept' , dataIndex:''},
        { title : 'subCategory1' , dataIndex:''},
        { title : 'coreCategory' , dataIndex:''},
        { title : 'subCategory2' , dataIndex:''},
        { title : 'subCategory3' , dataIndex:''},
        { title : 'productionCategoryFabric' , dataIndex:''},
        { title : 'productionCategoryFabricProcessing' , dataIndex:''},
        { title : 'productionCategorySewing' , dataIndex:''},
        { title : 'productionCategorySewingProcessing' , dataIndex:''},
        { title : 'planningSumCode' , dataIndex:''},
        { title : 'planningSum' , dataIndex:''},
        { title : 'localNameGhq' , dataIndex:''},
        { title : 'itemCd' , dataIndex:''},
        { title : 'item' , dataIndex:''},
        { title : 'origPrice' , dataIndex:''},
        { title : 'mainSampleCode' , dataIndex:''},
        { title : 'frFabricCode' , dataIndex:''},
        { title : 'frFabric' , dataIndex:''},
        { title : 'supplierRawMaterialCode' , dataIndex:''},
        { title : 'supplierRawMaterial' , dataIndex:''},
        { title : 'rawMaterialSupplierCode' , dataIndex:''},
        { title : 'rawMaterialSupplier' , dataIndex:''},
        { title : 'vendorCoode' , dataIndex:''},
        { title : 'vendor' , dataIndex:''},
        { title : 'sewingFactoryCode' , dataIndex:''},
        { title : 'sewingFactory' , dataIndex:''},
        { title : 'branchFactoryCode' , dataIndex:''},
        { title : 'branchFactory' , dataIndex:''},
        { title : 'coeff' , dataIndex:''},
        { title : 'month' , dataIndex:''},
        { title : 'itemBranchNumber',dataIndex:''},
        { title : 'officialPlanStdQty',dataIndex:''},
        { title : 'OfficialPlanFabPrpPlnQty',dataIndex:''},
        { title : 'OfficialPlanPoPrSlsQty' , dataIndex:''},
        { title : 'officalPlanCoQty' , dataIndex:''},
        { title : 'officalPlanStockQty' , dataIndex:''},
        { title : 'slsStartDy' , dataIndex:''},
        { title : 'publishFlagForFactory' , dataIndex:''},
        { title : 'publishDate' , dataIndex:''},
        { title : 'allcEndDy' , dataIndex:''},
        { title : 'slsEndDy' , dataIndex:''},
        { title : 'GWH' , dataIndex:''},
        { title : 'orderPlanNumber' , dataIndex:''},
        { title : 'orderTiming' , dataIndex:''},
        { title : 'swngPrdMonth' , dataIndex:''},
        { title : 'swngPrdWeek' , dataIndex:''},
        { title : 'orderPlanQty' , dataIndex:''},
        { title : 'orderPlanQtyCoeff' , dataIndex:''},
        { title : 'trnspMthd' , dataIndex:''},
        { title : 'prodPlanType' , dataIndex:''},
        { title : 'ph1St' , dataIndex:''},
        { title : 'wh' , dataIndex:''},
        { title : 'whAct' , dataIndex:''},
        { title : 'whAuto' , dataIndex:''},
        { title : 'yarnDlRequested' , dataIndex:''},
        { title : 'yarnDlAnswered' , dataIndex:''},
        { title : 'yarnDlAuto' , dataIndex:''},
        { title : 'yarnProductionDueDateAuto' , dataIndex:''},
        { title : 'yarnAutoReflectionDate' , dataIndex:''},
        { title : 'yarnActDy' , dataIndex:''},
        { title : 'yarnActQty' , dataIndex:''},
        { title : 'yarnOrderNumber' , dataIndex:''},
        { title : 'yarnOrderStatus' , dataIndex:''},
        { title : 'yarnDeliveryDate' , dataIndex:''},
        { title : 'fbrcDlRequested' , dataIndex:''},
        { title : 'fbrcDlAnswered' , dataIndex:''},
        { title : 'fbrcDlAuto' , dataIndex:''},
        { title : 'fbrcProductionDueDateAuto' , dataIndex:''},
        { title : 'fbrcAutoReflectionDate' , dataIndex:''},
        { title : 'fbrcActDy' , dataIndex:''},
        { title : 'fbrcActQty' , dataIndex:''},
        { title : 'fbrcOrderNumber' , dataIndex:''},
        { title : 'fbrcOrderStatus' , dataIndex:''},
        { title : 'fbrcDeliveryDate' , dataIndex:''},
        { title : 'colorDlRequested' , dataIndex:''},
        { title : 'colorDlAnswered' , dataIndex:''},
        { title : 'colorDlAuto' , dataIndex:''},
        { title : 'colorProductionDueDateAuto' , dataIndex:''},
        { title : 'colorAutoReflectionDate' , dataIndex:''},
        { title : 'colorActDy' , dataIndex:''},
        { title : 'colorActQty' , dataIndex:''},
        { title : 'colorOrderNumber' , dataIndex:''},
        { title : 'colorOrderStatus' , dataIndex:''},
        { title : 'colorDeliveryDate' , dataIndex:''},
        { title : 'trimDlRequested' , dataIndex:''},
        { title : 'trimDlAnswered' , dataIndex:''},
        { title : 'trimDlAuto' , dataIndex:''},
        { title : 'trimProductionDueDateAuto' , dataIndex:''},
        { title : 'trimAutoReflectionDate' , dataIndex:''},
        { title : 'trimActDy' , dataIndex:''},
        { title : 'trimActQty' , dataIndex:''},
        { title : 'trimOrderNumber' , dataIndex:''},
        { title : 'trimOrderStatus' , dataIndex:''},
        { title : 'trimDeliveryDate' , dataIndex:''},
        { title : 'poDlRequested' , dataIndex:''},
        { title : 'poDlAnswered' , dataIndex:''},
        { title : 'poDlAuto' , dataIndex:''},
        { title : 'poProductionDueDateAuto' , dataIndex:''},
        { title : 'poAutoReflectionDate' , dataIndex:''},
        { title : 'poActDy' , dataIndex:''},
        { title : 'poActQty' , dataIndex:''},
        { title : 'poOrderNumber' , dataIndex:''},
        { title : 'poOrderStatus' , dataIndex:''},
        { title : 'assort1' , dataIndex:''},
        { title : 'assort2' , dataIndex:''},
        { title : 'nxAssort' , dataIndex:''},
        { title : 'solid' , dataIndex:''},
        { title : 'orderPlanQtyStop' , dataIndex:''},
        { title : 'fixFlag' , dataIndex:''},
        { title : 'alternativeFlag' , dataIndex:''},
        { title : 'expressLineFlag', dataIndex:''},
        { title : 'factoryComment' , dataIndex:''},
        { title : 'plannedEXF' , dataIndex:''},
        { title : 'exfEtd' , dataIndex:''},
        { title : 'exfWh' , dataIndex:''},
        { title : 'sweingCountryRegion' , dataIndex:''},
        { title : 'rewMaterialOriginal' , dataIndex:''},
        { title : 'itemDrop' , dataIndex:''},
        { title : 'createDate',dataIndex:''},
        { title : 'createUserId ' , dataIndex:''},
        { title : 'createUserName' , dataIndex:''},
        { title : 'createFunction ' , dataIndex:''},
        { title : 'updateDate',dataIndex:''},
        { title : 'updateUserId ' , dataIndex:''},
        { title : 'updateUserName' , dataIndex:''},
        { title : 'updateFunction ' , dataIndex:''},
        { title : 'countY' , dataIndex:''},
        { title : 'sample' , dataIndex:''},
        { title : 'exf' , dataIndex:''},
        { title : 'bddl' , dataIndex:''},
        { title : 'bddlPast' , dataIndex:''},
        { title : 'ltBdExf' , dataIndex:''},
        { title : 'newBddl' , dataIndex:''},
        { title : 'newLtBdExf' , dataIndex:''},
        { title : 'ltPoExf' , dataIndex:''},
        { title : 'qtyLtBdExf' , dataIndex:''},
        { title : 'qtyLtPoExf' , dataIndex:''},
        { title : 'country2Y' , dataIndex:''},
        { title : 'phase' , dataIndex:''},
  ]

  let trimTemplate: IExcelColumn[] = []
  trimTemplate = [
        {title: 'orderNo' , dataIndex:''},
        {title: 'year' , dataIndex:''},
        {title: 'revisionNo' , dataIndex:''},
        {title: 'planningSsn' , dataIndex:''},
        {title: 'globalBusinessUnit' , dataIndex:''},
        {title: 'businessUnit' , dataIndex:''},
        {title: 'itemBrand' , dataIndex:''},
        {title: 'Department' , dataIndex:''},
        {title: 'revisedDate' , dataIndex:''},
        {title: 'DocumentStatus' , dataIndex:''},
        {title: 'answeredStatus' , dataIndex:''},
        {title: 'vendorPersoninCharge' , dataIndex:''},
        {title: 'decisionDate' , dataIndex:''},
        {title: 'paymentTerms' , dataIndex:''},
        {title: 'contractedETD' , dataIndex:''},
        {title: 'ETAWH' , dataIndex:''},
        {title: 'approver' , dataIndex:''},
        {title: 'approvalDate' , dataIndex:''},
        {title: 'orderConditions' , dataIndex:''},
        {title: 'remark' , dataIndex:''},
        {title: 'rawMaterialCode' , dataIndex:''},
        {title: 'supplierRawMaterialCode' , dataIndex:''},
        {title: 'supplierRawMaterial' , dataIndex:''},
        {title: 'vendorCode' , dataIndex:''},
        {title: 'vendor' , dataIndex:''},
        {title: 'managementFactoryCode' , dataIndex:''},
        {title: 'managementFactory' , dataIndex:''},
        {title: 'branchFactoryCode' , dataIndex:''},
        {title: 'branchFactory' , dataIndex:''},
        {title: 'orderPlanNumber' , dataIndex:''},
        {title: 'itemCode' , dataIndex:''},
        {title: 'item' , dataIndex:''},
        {title: 'representativeSampleCode' , dataIndex:''},
        {title: 'sampleCode' , dataIndex:''},
        {title: 'colorCode' , dataIndex:''},
        {title: 'color' , dataIndex:''},
        {title: 'patternDimensionCode' , dataIndex:''},
        {title: 'sizeCode' , dataIndex:''},
        {title: 'size' , dataIndex:''},
        {title: 'orderQtyPc' , dataIndex:''},
        {title: 'arrangementBy' , dataIndex:''},
        {title: 'trimDescription' , dataIndex:''},
        {title: 'trimItemNo' , dataIndex:''},
        {title: 'trimSupplier' , dataIndex:''},
  ]
  

  const exportExcel = () => {
    if(form.getFieldValue('fileType') === FileTypesEnum.PROJECTION_ORDERS){
      const excel = new Excel();
      excel.addSheet('Projection Order')
        excel.addRow()
        excel.addRow()
        excel.addRow()
        excel.addColumns(projectiontemplate)
        excel.addDataSource([])
        // .addDataSource([], { str2num: true });
        excel.saveAs('Projection Order Template.xlsx');
    } else{
      const excel = new Excel();
      excel
      .addSheet('Trim Order')
      .addColumns(trimTemplate)
      .addDataSource([])
      .saveAs('Trim Order Template.xlsx');
    }
    
  }


  return (
    <>
      <Card title="Add Order" extra={<span> <Button className='panel_button' icon={<FileExcelFilled />} style={{ color: 'green' }} onClick={() => exportExcel()}>Sample Excel Format</Button></span>}>
      <b>Last Uploaded File Details</b>
      <br/>
      <br/>
        <span>
          <Descriptions style={{ alignItems: 'right' }}>
            {/* <Descriptions.Item>{<b>Last Uploaded File Details</b>}</Descriptions.Item> */}
            <Descriptions.Item label={<b>File Type</b>}>
              {form.getFieldValue('fileType') === FileTypesEnum.PROJECTION_ORDERS ?  'Projection Order' : 'Trim Order'}
            </Descriptions.Item>
            <Descriptions.Item label={<b>File Name</b>}>
              {filesData[0]?.fileName}
            </Descriptions.Item>
            <Descriptions.Item label={<b>No of Records</b>}>
              {form.getFieldValue('fileType') === FileTypesEnum.PROJECTION_ORDERS ?  `${filesData[0]?.projectionRecords ? (filesData[0]?.projectionRecords).toLocaleString('en-IN') : 0}` : `${filesData[0]?.trimRecords ? (filesData[0]?.trimRecords).toLocaleString('en-IN') : 0}`}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Total Order Quantity</b>}>
              {form.getFieldValue('fileType') === FileTypesEnum.PROJECTION_ORDERS ?  `${filesData[0]?.proorderqty ? (filesData[0]?.proorderqty).toLocaleString('en-IN') : 0}` : `${filesData[0]?.trimorderqty ? (filesData[0]?.trimorderqty).toLocaleString('en-IN') : 0}`}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Uploaded Date</b>}>
              {filesData[0]?.uploadedDate ? moment(filesData[0]?.uploadedDate).format('YYYY-MM-DD HH:mm:ss a') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Uploaded User</b>}>
              {filesData[0]?.createdUser}
            </Descriptions.Item>
            
            
          </Descriptions>
        </span>
        <Divider></Divider>
        <>
        <Form form = {form}>
        <Row gutter = {24}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                <Form.Item name="fileType" label="File Type" >
                    <Select
                        showSearch
                        placeholder="Select File Type"
                        optionFilterProp="children"
                        allowClear
                        onChange={onFileTypeChange}
                        >
                        <Option key='projectionorder' value="Projection Order">Projection Order</Option>
                        <Option key='trimorder' value="Trim Order">Trim Order</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item label = "">
              <input type="file" accept=".csv, application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} />
              <label style={{color:'blue'}} >Only excel & csv files are allowed</label>
            </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            onClick={handleUpload}
            loading={loading}
            disabled={!selectedFile}
          >
            Upload
          </Button>
          </Form>
        </>
      </Card>
    </>
  );
}
