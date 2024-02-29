import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { BomProposalReq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import { Button, Card, Checkbox, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

type Props = {
  poLine: string[]
}

export default function GenerateProposal(props: Props) {

  const service = new BomService();
  const [trims, setTrims] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    getAllTrims();
  }, [])

  const getAllTrims = () => {
    service.getAllTrimInfo().then(res => {
      if (res.status) {
        setTrims(res.data);
      }
    })
  }
  const handleCheckboxChange = (value, item) => {
    if (value.target.checked) {
      // Add the item to the selectedItems state if checked
      setSelectedItems(prevState => [...prevState, item]);
    } else {
      // Remove the item from the selectedItems state if unchecked
      setSelectedItems(prevState =>
        prevState.filter(selectedItem => selectedItem !== item)
      );
    }
  };

  function handleDownloadIndividualTrim(itemId) {
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    service.generateProposal(bomProposalReq).then((v) => {
      if (v.status) {
        exportToExcel(v.data)
      }
    })
  }
  const exportToExcel = (jsonData) => {
    const headerMapping = {
      geoCode: 'Destination',
      styleNumber: 'Style',
      imcode: 'IM Code',
      itemNo : 'Item',
      description : 'Description',
      bomQty : 'Total Qty'
      // Add more mappings as needed
    };

    // Extracting keys from the mapping object
    const keys = Object.keys(headerMapping);

    // Creating an array of arrays where the first array contains the header names
    const data = [keys.map(key => headerMapping[key]), ...jsonData.map(obj => keys.map(key => obj[key]))];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  }
  return (
    <Card >
      <Row gutter={[24, 4]}>
        {
          trims.length ? trims.map((v) => {
            return <Col span={6}>
              <Card hoverable title={false} actions={[
                <DownloadOutlined size={30} onClick={() => handleDownloadIndividualTrim(v.itemId)} key="download" />,
                <EyeOutlined key="view" />
              ]} >
                <Checkbox
                  onChange={value => handleCheckboxChange(value, v.itemId)}
                />
                <h1 style={{ textAlign: "center" }}>{v.item}</h1>
              </Card>
            </Col>
          }) : <></>
        }

      </Row>
      <Row gutter={[24, 4]}>
        <Col>
          <Button>Download proposal </Button>
        </Col>

      </Row>
    </Card>
  )
}
