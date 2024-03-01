import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { BomProposalReq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import { Button, Card, Checkbox, Col, Modal, Row } from 'antd'
import { table } from 'console';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import WasCarelabel from '../../trims/trim-prints/wash-care-label';
type Props = {
  poLine: string[]
}

export default function GenerateProposal(props: Props) {

  const service = new BomService();
  const [trims, setTrims] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [proposalData, setProposalData] = useState<any>([])
  const [proposalInfo, setProposalInfo] = useState<any>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [trimName, setTrimName] = useState<string>('')

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
  const componentsMapping = {
    "Wash Care Label": <WasCarelabel bomInfo={proposalData} />,
  }

  const onCancel = () => {
    setModalOpen(false)
    setTrimName('')
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
        setProposalData(v.data)
        // exportToExcel(v.data)
      }
    })
  }


  const exportToExcel = (jsonData) => {
    // const mergedData = mergeCells(jsonData)
    // const headerMapping = {
    //   geoCode: 'Destination',
    //   styleNumber: 'Style',
    //   imCode: 'IM Code',
    //   itemNo: 'Item',
    //   description: 'Description',
    //   bomQty: 'Total Qty'
    //   // Add more mappings as needed
    // };

    // // // Extracting keys from the mapping object
    // const keys = Object.keys(headerMapping);

    // // Creating an array of arrays where the first array contains the header names
    // const data = [keys.map(key => headerMapping[key]), ...mergedData.map(obj => keys.map(key => obj[key]))];
    // const ws = XLSX.utils.json_to_sheet(data);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // XLSX.writeFile(wb, "data.xlsx");
    console.log(document.getElementById('excel-table'))
    const worksheet = XLSX.utils.table_to_sheet(document.getElementById('excel-table'));
    const workbook = XLSX.utils.book_new();
    worksheet['!cols'] = [

      { wch: 20 }, // Width for first column
      { wch: 20 },// Width for second column
      { wch: 30 }, // Width for third column
      { wch: 50 }, // Width for fourth column
      { wch: 30 }, // Width for fifth column
      { wch: 20 },  // Width for sixth column
    ];

    worksheet['!merges'] = [
      { s: { r: 1, c: 0 }, e: { r: proposalData.length, c: 0 } }, // Merge first two columns
      { s: { r: 1, c: 1 }, e: { r: proposalData.length, c: 1 } },  // Merge last two columns
      { s: { r: 1, c: 4 }, e: { r: proposalData.length, c: 4 } },
      { s: { r: 1, c: 5 }, e: { r: proposalData.length, c: 5 } }

    ];

    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        if (!cell) continue;

        // Add border style
        const borderStyle = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.s = { border: borderStyle, alignment: { horizontal: 'center', vertical: 'center' } };
      }
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, '-excelSheet1');
    XLSX.writeFile(workbook, 'table.xlsx');

  }


  function htmlTable(data) {

    return (
      <table style={{ display: 'none' }} id='excel-table'>


        <tr>
          <th>Item</th>
          <th>Style</th>
          <th>IM Code</th>
          <th>Description</th>
          <th>Destination</th>
          <th>Total Qty</th>
        </tr>

        {
          data.map((row, index) => {
            return <tr key={index}>
              <td >{row.itemNo !== null ? row.itemNo : ''}</td>
              <td >{row.styleNumber !== null ? row.styleNumber : ''}</td>
              <td >{row.imCode !== null ? row.imCode : ''}</td>
              <td >{row.description !== null ? row.description : ''}</td>
              <td >{row.geoCode !== null ? row.geoCode : ''}</td>
              <td>{row.bomQty !== null ? row.bomQty : ''}</td>
            </tr>
          })
        }
        {data[0]?.sizeWiseQty.length ? <>
          <tr></tr>
          <tr><td><b>FOR APA ORDER</b></td></tr>
          <tr>
            <th>REGION</th>
            {

              data[0].sizeWiseQty?.map((h) => {
                return <th>{h.size}</th>
              })
            }
          </tr>
          <tr>
            <td>APA</td>
            {

              data[0].sizeWiseQty.map((c) => {
                return <td>{c.qty}</td>
              })
            }
          </tr>
          <tr></tr>
          <tr></tr>
        </>

          : <></>
        }

        {data[0]?.chinaSizes.length ? <>
          <tr></tr>
          <tr></tr>
          <tr>
            <th>CHINA INSERT</th>
            {

              data[0].chinaSizes?.map((h) => {
                return <th>{h.size}</th>
              })
            }
          </tr>
          <tr>
            <td>110044</td>
            {

              data[0].chinaSizes.map((c) => {
                return <td>{c.qty}</td>
              })
            }
          </tr>
          <tr></tr>
          <tr></tr>
        </>

          : <></>
        }

        {data[0]?.indonesiaSize.length ? <>
          <tr></tr>
          <tr></tr>
          <tr>
            <th>IM#</th>
            {

              data[0].indonesiaSize?.map((h) => {
                return <th>{h.size}</th>
              })
            }
          </tr>
          <tr>
            <td>574080</td>
            {

              data[0].indonesiaSize.map((c) => {
                return <td>{c.qty}</td>
              })
            }
          </tr>
          <tr></tr>
          <tr></tr>
        </>

          : <></>
        }

      </table >
    )
  }
  const onView = (val) => {
    handleDownloadIndividualTrim(val.itemId)
    setModalOpen(true)
    setTrimName(val.item)
  }



  return (
    <Card >
      <Row gutter={[24, 4]}>
        {
          trims.length ? trims.map((v) => {
            return <Col span={6}>
              <Card hoverable title={false} actions={[
                <DownloadOutlined size={30} onClick={() => handleDownloadIndividualTrim(v.itemId
                )} key="download" />,
                <EyeOutlined key="view" onClick={() => { onView(v) }} />
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
      {
        htmlTable(proposalData)
      }
      <Modal open={modalOpen} onCancel={onCancel} onOk={() => setModalOpen(false)} footer={[]} width={'85%'}>
        {componentsMapping[trimName]}
      </Modal>
    </Card>
  )
}
