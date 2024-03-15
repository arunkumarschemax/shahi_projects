import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { BomProposalReq } from '@project-management-system/shared-models';
import { BomService } from '@project-management-system/shared-services';
import { Button, Card, Checkbox, Col, Modal, Row } from 'antd'
import { table } from 'console';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import WasCarelabel from '../../trims/trim-prints/wash-care-label';
import Button3Print from '../../trims/trim-prints/button';
import NecKType from '../../trims/trim-prints/neck-tape';
import Interlining from '../../trims/trim-prints/interlining';
import Drawcord from '../../trims/trim-prints/drawcord';
import Jocktag from '../../trims/trim-prints/jocktag';
import HeatTransefer from '../../trims/trim-prints/heat-transfer-trim';
import SwooshHtLable from '../../trims/trim-prints/swoosh-ht-label';
import Elastic from '../../trims/trim-prints/elastic';
import SizehtLabel from '../../trims/trim-prints/size-ht-label';
import { BackingPaper } from '../../trims/trim-prints';
import Mobilontape from '../../trims/trim-prints/mobilon-tape';
import SnapButton from '../../trims/trim-prints/snap-button';
import Twilltape from '../../trims/trim-prints/twill-tape';
import CountryStickerPrint from '../../trims/trim-prints/country-sticker';
import TissuePaper from '../../trims/trim-prints/tissue-paper';
import MainWovenLable from '../../trims/trim-prints/main-woven-lable';
import SizeStrip from '../../trims/trim-prints/size-strip';
import POIDLable from '../../trims/trim-prints/poid';
import { Grommets } from '../../trims/trim-prints/groomets';
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
  const [buttonData, setButtonData] = useState<any>([]);
  const [grommets, setGrommets] = useState<any>([]);

  const [sizestripData, setSizeStripData] = useState<any>([]);
  const [necktapeData,setNeckTapeData]= useState<any>([]);
  const [jocktageData, setJockTageData] = useState<any>([])
  const [interlining, setInterlining] = useState<any>([])
  const [drawcord, setDrawcord] = useState<any>([])
  const [twilltape, setTwilltape] = useState<any>([])

  const [mobilontape, setMobilontape] = useState<any>([])
  const [elasticData, setElasticData] = useState<any>([]);
  const [countrySticker,setCountrySticker]= useState<any>([])
  const [htLabel, setHtlabel] = useState<any>([])
  const [tissueData,setTissueData]= useState<any>([])
  const [poidData,setPoidData] = useState<any>([])

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
    // "Wash Care Label": <WasCarelabel bomInfo={proposalData} />,
    "BUTTON":<Button3Print bomInfo={buttonData}/>,
    // "Neck Tape":<NecKType bomInfo={proposalData} />,
    "Interlining":<Interlining bomInfo={interlining}/>,
    // "Drawcords":<Drawcord bomInfo={necktapeData}/>,
    "Neck Tape":<NecKType bomInfo={necktapeData} />,
    "Jocktage Label":<Jocktag bomInfo={jocktageData}/>,
    "Heat Transfer Lbl":<HeatTransefer bomInfo={buttonData}/>,
    "Swoosh HT label":<SwooshHtLable bomInfo={buttonData} />,
    "Elastic" : <Elastic bomInfo={elasticData}/>,
    "Backing Paper": <BackingPaper bomInfo={buttonData}/>,
    "Mobilon Tape":<Mobilontape bomInfo={mobilontape} />,
    "Twill Tape":<Twilltape bomInfo={twilltape}/>,
    // "Snap Button": <SnapButton bomInfo={buttonData}/>,
    "Country Sticker" : <CountryStickerPrint bomInfo={countrySticker}/>,
    "Snap Button": <SnapButton bomInfo={buttonData}/>,
    "Grommets": <Grommets bomInfo={buttonData}/>,
    "Size Ht label":<SizehtLabel bomInfo={htLabel}/>,
    "Tissue Paper":<TissuePaper bomInfo={tissueData}/>,
    "Main Woven labels":<MainWovenLable bomInfo={tissueData}/>,
    "Size Strip":<SizeStrip bomInfo={sizestripData}/>,
    "Poid Label":<POIDLable bomInfo={poidData}/>,
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

  function handleButtonTrim(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    console.log(bomProposalReq,"requesttttttttt");
    
    service.generateProposalForButton(bomProposalReq).then((v) => {
      if (v.status) {
        setButtonData(v.data)
      }
    })
  }
 
  function handleNeckTapeTrim(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    service.generateProposalForNeckTape(bomProposalReq).then((v) => {
      if (v.status) {
        setNeckTapeData(v.data)
      }
    })
  }

  function handleJockTage(item){
    // val.itemId
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [item.itemId]
    bomProposalReq.poLine = props.poLine
    bomProposalReq.trimName = item.item
    service.generateProposalForTrims(bomProposalReq).then((res) =>{
      if(res.status){
        setJockTageData(res.data)
      }
    })
  }
  function handleElasticTrim(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    service.generateProposalForElasticTrim(bomProposalReq).then((v) => {
      if (v.status) {
        setElasticData(v.data)
      }
    })
  }

  function handleInterlining(item){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [item.itemId]
    bomProposalReq.poLine = props.poLine
    // bomProposalReq.trimName = item.item
    service.generateProposalForTrims(bomProposalReq).then((res) =>{
      if(res.status){
        setInterlining(res.data)
      }
    })
  }
  

  function handleDrawcord(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    service.generateProposalForNeckTape(bomProposalReq).then((v) => {
      if (v.status) {
        setNeckTapeData(v.data)
      }
    })
  }
  function handleCountrySticker(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
   
    service.generateProposalForTrims(bomProposalReq).then((res) =>{
      if(res.status){
        setCountrySticker(res.data)
      }
    })
  }

  function handleSizeHtLabel(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    service.generatePropsalForHtLabel(bomProposalReq).then((v) =>{
      setHtlabel(v.data)
    })
  }
  function getSizeHtLabelData(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    service.getSizeHtLabelData(bomProposalReq).then((v) =>{
      setHtlabel(v.data)
    })
  }


  function handleMobilontape(item){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [item.itemId]
    bomProposalReq.poLine = props.poLine
    // bomProposalReq.trimName = item.item
    service.generateProposalForTrims(bomProposalReq).then((res) =>{
      if(res.status){
        setMobilontape(res.data)
      }
    })
  }


  function handleTwilltape(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    service.generateProposalForButton(bomProposalReq).then((v) => {
      if (v.status) {
      setTwilltape(v.data)
      }
    })
  }

  function handleTissuePaper(itemId){
    // val.itemId
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    // bomProposalReq.trimName = item
    service.generateProposalForTissuePaper(bomProposalReq).then((res) =>{
      if(res.status){
        setTissueData(res.data)
      }
     })
  }
  function handleMainWovenLable(itemId){
    // val.itemId
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    // bomProposalReq.trimName = item
    service.getMainWovenLableData(bomProposalReq).then((res) =>{
      if(res.status){
        setTissueData(res.data)
      }
    })
  }
  function handleSizeStrip(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    
    service.getSizeStrip(bomProposalReq).then((v) => {
      if (v.status) {
        
        setSizeStripData(v.data)
      }
    })
  }

  function handleBackingPaper(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    service.generateProposalForButton(bomProposalReq).then((v) => {
      if (v.status) {
        setButtonData(v.data)
      }
    })
  }

  function handlePoidLable(itemId){
    const bomProposalReq = new BomProposalReq()
    bomProposalReq.itemId = [itemId]
    bomProposalReq.poLine = props.poLine
    // bomProposalReq.trimName = item.item
    service.generateProposalForPOIDLabel(bomProposalReq).then((res) =>{
      if(res.status){
        setPoidData(res.data)
      }
    })
  }
  // function handleDrawcord(itemId){
  //   const bomProposalReq = new BomProposalReq()
  //   bomProposalReq.itemId = [itemId]
  //   bomProposalReq.poLine = props.poLine
  //   service.generateProposalForButton(bomProposalReq).then((v) => {
  //     if (v.status) {
  //       setButtonData(v.data)
  //     }
  //   })
  // }

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

    setTrimName(val.item)
    setModalOpen(true)
    if(val.item === 'Jocktage Label'){
        handleJockTage(val)
    }
    if(val.item === 'BUTTON'){
        handleButtonTrim(val.itemId)
      }
    if(val.item === 'Neck Tape')
    {
      handleNeckTapeTrim(val.itemId)
    }
    if(val.item === 'Wash Care Label'){
    handleDownloadIndividualTrim(val.itemId)
    }
    if(val.item === 'Heat Transfer Lbl'){
      handleButtonTrim(val.itemId)
    }
    if(val.item === 'Interlining'){
      handleInterlining(val)
    }
    if(val.item === 'Drawcords'){
      handleDrawcord(val.itemId)
    }
    
    if(val.item === 'Elastic'){
      handleElasticTrim(val.itemId)
    }
    if(val.item == 'Size Ht label'){
      // handleSizeHtLabel(val.itemId)
      getSizeHtLabelData(val.itemId)
    }
   
    if(val.item === 'Swoosh HT label'){
      handleButtonTrim(val.itemId)
    } 

    if(val.item === 'Mobilon Tape'){
      handleMobilontape(val)
    } 
    
     if(val.item === 'Snap Button'){
      handleButtonTrim(val.itemId)
    }

    if(val.item ===  "Grommets"){
      handleButtonTrim(val.itemId)
    }

    if(val.item === 'Country Sticker'){
      handleCountrySticker(val.itemId)
    } 
    if(val.item === 'Twill Tape'){
      handleTwilltape(val.itemId)
    } 
    if(val.item === 'Tissue Paper'){
      handleTissuePaper(val.itemId)
    } 
    if(val.item === 'Main Woven labels'){
      handleMainWovenLable(val.itemId)
    }
    if(val.item === 'Size Strip'){
      handleSizeStrip(val.itemId)
    } 
    if(val.item === 'Backing Paper'){
      handleBackingPaper(val.itemId)
    }
    
    if(val.item ===  "Poid Label"){
      handlePoidLable(val.itemId)
    }
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
