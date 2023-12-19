import { Button, Card, Col, Form, Row } from "antd"
import { useState } from "react";
import * as XLSX from 'xlsx';
import Papa from 'papaparse'
import { Link, useNavigate } from "react-router-dom";
import { AddressService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";


export const AddressUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([]);
    const [values, setValues] = useState([])
    const service = new AddressService()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const importExcel = (file: any[]) => {
        var data = new Uint8Array(file);
        var wb = XLSX.read(data, { type: 'array', cellDates: true });
        let sheet: any[] = [];
        for (const Sheet in wb.Sheets) {
          if(Sheet){
            if (wb.Sheets.hasOwnProperty(Sheet)) {
                sheet.push(XLSX.utils.sheet_to_json(wb.Sheets[Sheet], { raw: true, header: 1 }));
            }
          }
        }
        return sheet;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
          setSelectedFile(event.target.files[0]);
          Papa.parse(event.target.files[0], {
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
                            console.log(result.data,"uu")
                setColumns(columnArray[0])
                setValues(valueArray)
              }
            },
            skipEmptyLines: true,
          });
        } else if(file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
          setSelectedFile(event.target.files[0]);
          let csvData
          var reader = new FileReader()
          reader.readAsArrayBuffer(file)
          reader.onload = async data => {
            let csvData1: any = reader.result;
            csvData = importExcel(csvData1);
            // let headersRow = getHeaderArray(csvData[0][3]);
            // csvData[0].shift()
            // csvData[0].shift()
            // csvData[0].shift()
            // console.log(csvData[0],'????????')
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
        }else {
          alert('Please select a valid .csv file.');
          setSelectedFile(null);
        }
      };
         
      const handleUpload = async() => {
        try{
            form.validateFields().then(async () => {
                const res = await service.saveAddressInfo(data).then(res => {
                    setLoading(true);
                    if(res.status){
                        AlertMessages.getSuccessMessage(res.internalMessage)
                        navigate('/ralph-lauren/masters/address/address-excel-upload')
                    } else{
                        AlertMessages.getErrorMessage(res.internalMessage)
                    }
                }).finally(() => {
                    setLoading(false);
                  })
            })
        } catch (error) {
            AlertMessages.getErrorMessage(error.message);
          }
      }
    return(
        <Card title='Address' extra={<Link to='/ralph-lauren/masters/address/address-view' >
        <span style={{color:'white'}} ><Button type={'primary'} >View</Button> </span>
        </Link>}>
            <Form>
            <Row gutter = {24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item label = "">
                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} />
                <label style={{color:'blue',whiteSpace: 'nowrap'}} >Only csv & excel files are allowed</label>
              </Form.Item>
                </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Button type="primary" 
            onClick={handleUpload} 
            loading={loading} disabled={!selectedFile}>Upload</Button>
          </Col>
            </Row>
            </Form>
        </Card>
    )

}

export default AddressUpload