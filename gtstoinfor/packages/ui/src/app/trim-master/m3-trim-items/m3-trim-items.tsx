import {BuyersService,CategoryService,ColourService,ContentService,FabricRequestCodeService,FabricStructuresService,FinishService,HoleService,LengthService,LineService,M3ItemsService,M3TrimsService,PartsService,PlyService,QualitysService,ShapeService,SizeService,SliderService,StructureService,ThicknessService,TrimBuyerService,TrimParamsMappingService,TrimService,TrimSizeService,TypeService,UomService,VarietyService} from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, Upload, UploadProps, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useEffect, useState } from "react";
import { ItemTypeEnum, ItemTypeEnumDisplay, LogoEnum, LogoEnumDisplay, M3ItemsDTO, M3trimsDTO, PartEnum, PartEnumDisplay, TrimIdRequestDto } from "@project-management-system/shared-models";
import FormItem from "antd/es/form/FormItem";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;


export function M3TrimItemsForm({props}) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const structureService = new StructureService();
  const categoryService = new CategoryService();
  const contentService = new ContentService();
  const typeService = new TypeService();
  const finishService = new FinishService();
  const holeService = new HoleService();
  const qtyService = new QualitysService();
  const thickService = new ThicknessService();
  const varietyService = new VarietyService();
  const trimService = new TrimService();
  const uomService = new UomService();
  const colorService = new ColourService();
  const buyerService = new BuyersService();
  const paramsService = new TrimParamsMappingService()
  const m3TrimService = new M3TrimsService()
  const trimReqCodeService = new FabricRequestCodeService()
  const trimBuyerService = new TrimBuyerService()
  const partsService = new PartsService()
  const plyService = new PlyService()
  const lengthService = new LengthService()
  const lineService = new LineService()
  const shapeService = new ShapeService()
  const sliderService = new SliderService()
  const trimSizeService = new TrimSizeService()

  const [imageUrl, setImageUrl] = useState('');
  const [filelist, setfilelist] = useState<any>([])
  const [structureData, setStructureData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [contentData, setContentData] = useState<any[]>([]);
  const [typeData, setTypeData] = useState<any[]>([]);
  const [finishData, setFinishData] = useState<any[]>([]);
  const [holeData, setHoleData] = useState<any[]>([]);
  const [qtyData, setQtyData] = useState<any[]>([]);
  const [thickData, setThickData] = useState<any[]>([]);
  const [varietyData, setVarietyData] = useState<any[]>([]);
  const [trimData, setTrimData] = useState<any[]>([]);
  const [uomData, setUomData] = useState<any[]>([]);
  const [colorData, setColorData] = useState<any[]>([]);
  const [buyerData, setBuyerData] = useState<any[]>([]);
  const [mapData, setMapData] = useState<any[]>([])
  const [mapDataId, setMapDataId] = useState<any[]>([])
  const [buyerCode, setBuyerCode] = useState<any[]>([])
  const [trimBuyerData, setTrimBuyerData] = useState<any[]>([])
  const [partsData, setPartsData] = useState<any[]>([]);
  const [plyData, setPlyData] = useState<any[]>([]);
  const [lengthData, setLengthData] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any[]>([])
  const [shapeData, setShapeData] = useState<any[]>([])
  const [sliderData, setSliderData] = useState<any[]>([])
  const [trimSizeData, setTrimSizeData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Style</div>
    </div>
  );
  const uploadFieldProps: UploadProps = {
    // alert();
    multiple: false,
    onRemove: file => {
      setfilelist([]);
      setImageUrl('');
    },
    beforeUpload: (file: any) => {
      if (!file.name.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
        AlertMessages.getErrorMessage("Only png,jpeg,jpg files are allowed!");
        // return true;
      }
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = data => {
        if (filelist.length == 1) {
          AlertMessages.getErrorMessage("You Cannot Upload More Than One File At A Time");
          return true;
        } else {
          setfilelist([file]);
          getBase64(file, imageUrl =>
            setImageUrl(imageUrl)
          );
          return false;
        }
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
    fileList: filelist,
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  useEffect(() => {
    if (mapData[0]?.structure === true) {
      getStructures();
    }
    if (mapData[0]?.category === true) {
      getCategories();
    }
    if (mapData[0]?.content === true) {
      getContents();
    }
    if (mapData[0]?.type === true) {
      getTypes();
    }
    if (mapData[0]?.finish === true) {
      getFinishes();
    }
    if (mapData[0]?.hole === true) {
      getHoles();
    }
    if (mapData[0]?.quality === true) {
      getQuality();
    }
    if (mapData[0]?.thickness === true) {
      getThicks();
    }
    if (mapData[0]?.variety === true) {
      getVarieties();
    }
    if (mapData[0]?.uom === true) {
      getUom();
    }
    if (mapData[0]?.color === true) {
      getColors();
    }
    if (mapData[0]?.buyer === true) {
      getAllTrimBuyers();
    }
    if (mapData[0]?.length === true) {
      getAllLength();
    }
    if (mapData[0]?.line === true) {
      getAllLine();
    }
    if (mapData[0]?.parts === true) {
      getAllParts();
    }
    if (mapData[0]?.ply === true) {
      getAllPly();
    }
    if (mapData[0]?.shape === true) {
      getAllShape();
    }
    if (mapData[0]?.slider === true) {
      getAllSlider();
    }
    if (mapData[0]?.size === true) {
      getAllTrimSize();
    }
    getTrims();
    getBuyers();
  }, [mapData]);

  const getStructures = () => {
    structureService.getAllStructureInfo().then((res) => {
      if (res.status) {
        setStructureData(res.data);
      }
    });
  };

  const getCategories = () => {
    categoryService.getAllCategory().then((res) => {
      if (res.status) {
        setCategoryData(res.data);
      }
    });
  };

  const getContents = () => {
    contentService.getAllContent().then((res) => {
      if (res.status) {
        setContentData(res.data);
      }
    });
  };

  const getTypes = () => {
    typeService.getAllTypeInfo().then((res) => {
      if (res.status) {
        setTypeData(res.data);
      }
    });
  };

  const getFinishes = () => {
    finishService.getAllFinish().then((res) => {
      if (res.status) {
        setFinishData(res.data);
      }
    });
  };

  const getHoles = () => {
    holeService.getAllHoles().then((res) => {
      if (res.status) {
        setHoleData(res.data);
      }
    });
  };

  const getQuality = () => {
    qtyService.getAllQualitys().then((res) => {
      if (res.status) {
        setQtyData(res.data);
      }
    });
  };

  const getThicks = () => {
    thickService.getAllThicknessInfo().then((res) => {
      if (res.status) {
        setThickData(res.data);
      }
    });
  };

  const getVarieties = () => {
    varietyService.getAllVariety().then((res) => {
      if (res.status) {
        setVarietyData(res.data);
      }
    });
  };

  const getTrims = () => {
    trimService.getAllTrim().then((res) => {
      if (res.status) {
        setTrimData(res.data);
      }
    });
  };

  const getUom = () => {
    uomService.getAllUoms().then((res) => {
      if (res.status) {
        setUomData(res.data);
      }
    });
  };

  const getColors = () => {
    colorService.getAllColour().then((res) => {
      if (res.status) {
        setColorData(res.data);
      }
    });
  };

  const getBuyers = () => {
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyerData(res.data);
      }
    });
  };

  const getAllTrimBuyers = ()=>{
    trimBuyerService.getAllActiveTrimBuyers().then((res)=>{
      setTrimBuyerData(res.data)
    })
  }

  const getAllLength = ()=>{
    lengthService.getAllActiveLengths().then((res)=>{
      setLengthData(res.data)
    })
  }

  const getAllLine = ()=>{
    lineService.getAllActiveLines().then((res)=>{
      setLineData(res.data)
    })
  }

  const getAllParts = ()=>{
    partsService.getAllActiveParts().then((res)=>{
      setPartsData(res.data)
    })
  }

  const getAllPly = ()=>{
    plyService.getAllActivePly().then((res)=>{
      setPlyData(res.data)
    })
  }

  const getAllShape = ()=>{
    shapeService.getAllActiveShape().then((res)=>{
      setShapeData(res.data)
    })
  }

  const getAllSlider = ()=>{
    sliderService.getAllSliders().then((res)=>{
      setSliderData(res.data)
    })
  }

  const getAllTrimSize = ()=>{
    trimSizeService.getAllActiveTrimSizes().then((res)=>{
      setTrimSizeData(res.data)
    })
  }

  const getMappedTrims = (value) => {
    const req = new TrimIdRequestDto(value)
    paramsService.getMappedParamsByTrim(req).then((res) => {
      if (res.status) {
        console.log(res.data[0])
        setMapData(res.data)
        form.setFieldsValue({trimMappingId:res.data[0].trimMappingId})
        setMapDataId(res.data[0]?.trimMappingId)
        // console.log(res.data[0]?.trimMappingId,'============')
      }
    });
  }

  const onFinish = (value) => {
    console.log(value,'...............')
    const req = new M3trimsDTO(0,value.buyerId,"",value.categoryId,value.colorId,value.contentId,value.finishId,value.holeId,value.logo,value.part,value.qualityId,value.structureId,value.thicknessId,value.typeId,value.uomId,value.varietyId,value.trimCategoryId,form.getFieldValue("trimMappingId"),form.getFieldValue("buyerCode"),value.trimType,value.description,"",'',value.m3Code,value.hsnCode,value.trimBuyerId,value.lengthId,value.lineId,value.partsId,value.plyId,value.shapeId,value.sliderId,value.trimSizeId)
    m3TrimService.createM3Trims(req).then((res) => {
      if (res.status) {
        console.log(props);
        console.log(filelist);
        if(filelist.length >0){
          // console.log(res)
          const formData = new FormData();
          filelist.forEach((file: any) => {
              formData.append('file', file);
          });

          formData.append('m3TrimId', `${res.data?.m3TrimId}`)
          m3TrimService.fileUpload(formData).then(fileres => {
            if(fileres.status){
              // AlertMessages.getSuccessMessage("File uploaded successfully. ");
            }
            else{
              AlertMessages.getErrorMessage("Upload failed. ");
            }
          })
        }
        if(props != undefined){
          trimReqCodeService.updateTrimStatus({id:props.trimRequestCodeId, m3ItemsId:res.data?.m3TrimId}).then((res) => {
            if(res.status){
              // AlertMessages.getSuccessMessage(res.internalMessage);
          //  setTimeout(() => {
             message.success(res.internalMessage,2)
             navigate('/trim-master/m3-trim-items/m3-trim-items-view')
          //  }, 500)
         }
         else {
           AlertMessages.getErrorMessage(res.internalMessage);
         }
       })
     }
     else{
      //  AlertMessages.getSuccessMessage(res.internalMessage);
      //  setTimeout(() => {
         message.success(res.internalMessage,2)
         navigate('/trim-master/m3-trim-items/m3-trim-items-view')
      //  }, 500)
     }
   }else{
     AlertMessages.getWarningMessage(res.internalMessage);
   }}).catch((err) => {
     AlertMessages.getErrorMessage(err.message);
   });
};


  const onReset = () => {
    form.resetFields();
  };

  const getVarCodeDefaultValue = (defaultCode: string) => {
    console.log(defaultCode);
    form.setFieldsValue({ description: defaultCode });
  }

  const generateItemCode = () => {
    console.log(form.getFieldsValue())
    let structureDal = ""
    let categoryDal = ""
    let contentDal = ""
    let typeDal = ""
    let finishDal = ""
    let holeDal = ""
    let qualityDal = ""
    let thickDal = ""
    let varietyDal = ""
    let uomDal = ""
    let colorDal = ""
    let logo = ""
    let part = ""
    let trimBuyer = ""
    let length = ""
    let line  = ""
    let parts = ""
    let ply = ""
    let shape = ""
    let slider = ""
    let trimSize = ""

    let buyerDetails = buyerData.find((e) => e.buyerId === form.getFieldValue("buyerId"))?.shortCode;
    const buyersData = buyerDetails != undefined? buyerDetails + '/' : "";
    form.setFieldsValue({buyerCode:buyerDetails != undefined ? buyerDetails : ""});
  
    const trimType = form.getFieldValue("trimType") != undefined ? form.getFieldValue("trimType")+'/' : "";
    
    let trimCategoryDetails = trimData.find((e) => e.trimId === form.getFieldValue("trimCategoryId"))?.trimCategory;
    const trimCategoryDal = trimCategoryDetails != undefined ? trimCategoryDetails + '/' : ""  ;
    console.log(trimCategoryDetails);

    if (mapData[0]?.structure === true) {
      let structureDetails = structureData.find((e) => e.structureId === form.getFieldValue("structureId"))?.structure;
    structureDal = structureDetails != undefined ? structureDetails + '/' : ""  ;
    }

    if (mapData[0]?.category === true) {
      let categoryDetails = categoryData.find((e) => e.categoryId === form.getFieldValue("categoryId"))?.category;
    categoryDal = categoryDetails != undefined ? categoryDetails + '/' : ""  ;
    }

    if (mapData[0]?.content === true) {
    let contentDetails = contentData.find((e) => e.contentId === form.getFieldValue("contentId"))?.content;
    contentDal = contentDetails != undefined ? contentDetails + '/' : ""  ;
    }

    if (mapData[0]?.type === true) {
    let typeDetails = typeData.find((e) => e.typeId === form.getFieldValue("typeId"))?.type;
    typeDal = typeDetails != undefined ? typeDetails + '/' : ""  ;
    }

    if (mapData[0]?.finish === true) {
    let finishDetails = finishData.find((e) => e.finishId === form.getFieldValue("finishId"))?.finish;
    finishDal = finishDetails != undefined ? finishDetails + '/' : ""  ;
    }

    if (mapData[0]?.hole === true) {
    let holeDetails = holeData.find((e) => e.holeId === form.getFieldValue("holeId"))?.hole;
    holeDal = holeDetails != undefined ? holeDetails + '/' : ""  ;
    }

    if (mapData[0]?.quality === true) {
      let qualityDetails = qtyData.find((e) => e.qualityId === form.getFieldValue("qualityId"))?.qualityName;
      qualityDal = qualityDetails !== undefined ? qualityDetails + '/' : "";
    }

    if (mapData[0]?.thickness === true) {
    let thicknessDetails = thickData.find((e) => e.thicknessId === form.getFieldValue("thicknessId"))?.thickness;
    thickDal = thicknessDetails != undefined ?  thicknessDetails + '/' : ""  ;
    }

    if (mapData[0]?.variety === true) {
    let varietyDetails = varietyData.find((e) => e.varietyId === form.getFieldValue("varietyId"))?.variety;
    varietyDal = varietyDetails != undefined ? varietyDetails + '/' : ""  ;
    }

    if (mapData[0]?.uom === true) {
    let uom = uomData.find((e) => e.uomId === form.getFieldValue("uomId"))?.uom;
    uomDal =  uom != undefined ? uom + '/' : "" ;
    }

    if (mapData[0]?.color === true) {
    let colorDetails = colorData.find((e) => e.colourId === form.getFieldValue("colorId"))?.colour;
    colorDal = colorDetails != undefined ? colorDetails + '/' : ""  ;
    }

    if(mapData[0]?.logo === true){
    logo = form.getFieldValue("logo") != undefined ? form.getFieldValue("logo") : "";
    }

    if(mapData[0]?.part === true){
    part = form.getFieldValue("part") != undefined ? form.getFieldValue("part") : "";
    }

    if (mapData[0]?.buyer === true) {
      let tBuyerDetails = trimBuyerData.find((e) => e.trimBuyerId === form.getFieldValue("trimBuyerId"))?.trimBuyer;
      trimBuyer = tBuyerDetails != undefined ? tBuyerDetails + '/' : ""  ;
    }

    if (mapData[0]?.length === true) {
      let lengthDetails = lengthData.find((e) => e.lengthId === form.getFieldValue("lengthId"))?.length;
      length = lengthDetails != undefined ? lengthDetails + '/' : ""  ;
    }

    if (mapData[0]?.line === true) {
      let lineDetails = lineData.find((e) => e.lineId === form.getFieldValue("lineId"))?.line;
      line = lineDetails != undefined ? lineDetails + '/' : ""  ;
    }

    if (mapData[0]?.parts === true) {
      let partsDetails = partsData.find((e) => e.partsId === form.getFieldValue("partsId"))?.parts;
      parts = partsDetails != undefined ? partsDetails + '/' : ""  ;
    }

    if (mapData[0]?.ply === true) {
      let plyDetails = plyData.find((e) => e.plyId === form.getFieldValue("plyId"))?.ply;
      ply = plyDetails != undefined ? plyDetails + '/' : ""  ;
    }

    if (mapData[0]?.shape === true) {
      let shapeDetails = shapeData.find((e) => e.shapeId === form.getFieldValue("shapeId"))?.shape;
      shape = shapeDetails != undefined ? shapeDetails + '/' : ""  ;
    }

    if (mapData[0]?.slider === true) {
      let sliderDetails = sliderData.find((e) => e.sliderId === form.getFieldValue("sliderId"))?.slider;
      slider = sliderDetails != undefined ? sliderDetails + '/' : ""  ;
    }

    if (mapData[0]?.size === true) {
      let trimSizeDetails = trimSizeData.find((e) => e.trimSizeId === form.getFieldValue("trimSizeId"))?.trimSize;
      trimSize = trimSizeDetails != undefined ? trimSizeDetails + '/' : ""  ;
    }

    let mainDal = `${buyersData}${trimType}${trimCategoryDal}${structureDal}${categoryDal}${contentDal}${typeDal}${finishDal}${holeDal}${qualityDal}${thickDal}${varietyDal}${uomDal}${colorDal}${logo}${part}${trimBuyer}${length}${line}${parts}${ply}${shape}${slider}${trimSize}`;

    mainDal = mainDal.replace(/\/$/, '');

    getVarCodeDefaultValue(mainDal);
  }

  const buyerOnChange = (val,Option) =>{
    generateItemCode()
    setBuyerCode(Option?.name)
    form.setFieldsValue({buyerCode : buyerData.find((e) => e.buyerId === val)?.shortCode})
  }
  const trimOnChange = (val) =>{
    generateItemCode()
    getMappedTrims(val)
  }

  const trimTypeOnChange = (val,Option) =>{
    generateItemCode()
    console.log(Option?.name)
  }

  useEffect(() => {
    if(props != undefined){
      console.log(props,'==========');
      console.log(props.trimBuyerId,'-----==-======-=-=-=-=--')
      if(props.trimCategoryId != null){
        trimOnChange(props.trimCategoryId)
      }
      form.setFieldsValue({buyerId:props.buyerId})
      form.setFieldsValue({buyerId:props.buyerId})
      form.setFieldsValue({buyerCode:props.buyerName})
      form.setFieldsValue({trimType:props.trimType})
      form.setFieldsValue({trimCategoryId:props.trimCategoryId})
      form.setFieldsValue({hsnCode:props.hsnCode})
      form.setFieldsValue({m3Code:props.m3Code})
      if (props.structureStatus === 1) {
        form.setFieldsValue({structureId:props.structureId})
      }
      if (props.categoryStatus === 1) {
        form.setFieldsValue({categoryId:props.categoryId})
      }
      if (props.contentStatus === 1) {
        form.setFieldsValue({contentId:props.contentId})
      }
      if (props.typeStatus === 1) {
        form.setFieldsValue({typeId:props.typeId})
      }
      if (props.finishStatus === 1) {
        form.setFieldsValue({finishId:props.finishId})
      }
      if (props.holeStatus === 1) {
        form.setFieldsValue({holeId:props.holeId})
      }
      if (props.qualityStatus === 1) {
        form.setFieldsValue({qualityId:props.qualityId})
      }
      if (props.thicknessStatus === 1) {
        form.setFieldsValue({thicknessId:props.thicknessId})
      }
      if (props.varietyStatus === 1) {
        form.setFieldsValue({varietyId:props.varietyId})
      }
      if (props.uomStatus === 1) {
        form.setFieldsValue({uomId:props.uomId})
      }
      if (props.colorStatus === 1) {
        form.setFieldsValue({colorId:props.colorId})
      }
      if (props.logoStatus === 1) {
        form.setFieldsValue({logo:props.logo})
      }
      if (props.partStatus === 1) {
        form.setFieldsValue({part:props.part})
      }
      if (props.trimBuyerStatus === 1) {
        form.setFieldsValue({trimBuyerId:props.trimBuyerId})
      }
      if (props.lengthStatus === 1) {
        form.setFieldsValue({lengthId:props.lengthId})
      }
      if (props.lineStatus === 1) {
        form.setFieldsValue({lineId:props.lineId})
      }
      if (props.partsStatus === 1) {
        form.setFieldsValue({partsId:props.partsId})
      }
      if (props.plyStatus === 1) {
        form.setFieldsValue({plyId:props.plyId})
      }
      if (props.shapeStatus === 1) {
        form.setFieldsValue({shapeId:props.shapeId})
      }
      if (props.sliderStatus === 1) {
        form.setFieldsValue({sliderId:props.sliderId})
      }
      if (props.trimSizeStatus === 1) {
        form.setFieldsValue({trimSizeId:props.trimSizeId})
      }
      generateItemCode()
    }
  }, [props]);

  return (
    <Card 
    title={<span>M3 Items</span>}
      style={{ textAlign: "left" }}
      headStyle={{ backgroundColor: "#69c0ff", border: 0 }}
      extra={<Link to='/trim-master/m3-trim-items/m3-trim-items-view' >
      <span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span>
      </Link>}
    >
      <Form form={form} layout={"vertical"} name="control-hooks" onFinish={onFinish}
      >
        <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="buyerId" label="Buyer" rules={[{ required: true, message: "Buyer is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Buyer"
                    onChange={buyerOnChange}
                    disabled={props?.buyerId != null?true:false}
                    >
                        {buyerData.map((e) => {
                            return (
                            <Option key={e.buyerId} value={e.buyerId} name={e.buyerCode}>
                                {e.buyerName}-{e.buyerCode}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimType" label="Trim Type" rules={[{ required: true, message: "Trim Type is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Trim Type"
                    onChange={trimTypeOnChange}
                    disabled={props?.trimType != null?true:false}
                    >
                        {Object.values(ItemTypeEnumDisplay).filter((val) => val.displayVal !== ItemTypeEnum.FABRIC).map((val) => (
                            <Option key={val.name} value={val.name}>
                                {val.displayVal}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimCategoryId" label="Trim Category" rules={[{ required: true, message: "Trim Category is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children"
                    placeholder="Select Trim Category"
                    onChange={trimOnChange}
                    disabled={props?.trimCategory != null?true:false}
                    >
                        {trimData.map((e) => {
                            return (
                            <Option key={e.trimId} value={e.trimId}>
                                {e.trimCategory}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="m3Code" label="M3 Code" >
                    <Input placeholder="Enter M3 Code" disabled={props?.m3Code!=null?true:false}/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="hsnCode" label="HSN Code" >
                    <Input placeholder="Enter HSN Code" disabled={props?.hsnCode!=null?true:false}/>
                </Form.Item>
            </Col>
            {mapData[0]?.structure === true ? (
              <>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                  <Form.Item
                    name="structureId"
                    label="Structure"
                    rules={[{ required: true, message: "Structure is required" }]} 
                  >
                    <Select
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      placeholder="Select Structure"
                      onChange={generateItemCode} disabled={props?.structure!=null?true:false}
                    >
                      {structureData.map((e) => (
                        <Option key={e.structureId} value={e.structureId}>
                          {e.structure}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            ) : (<></>)}
            {mapData[0]?.category == true ? (
            <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="categoryId" label="Category" rules={[{ required: true, message: "Category is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Category"
                    onChange={generateItemCode} disabled={props?.category!=null?true:false}
                    >
                        {categoryData.map((e) => {
                            return (
                            <Option key={e.categoryId} value={e.categoryId}>
                                {e.category}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.content === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="contentId" label="Content" rules={[{ required: true, message: "Content is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Content"
                    onChange={generateItemCode} disabled={props?.contentId!= null?true:false}
                    >
                        {contentData.map((e) => {
                            return (
                            <Option key={e.contentId} value={e.contentId}>
                                {e.content}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.type === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="typeId" label="Type" rules={[{ required: true, message: "Type is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Type"
                    onChange={generateItemCode} disabled={props?.typeId!=null?true:false}
                    >
                        {typeData.map((e) => {
                            return (
                            <Option key={e.typeId} value={e.typeId}>
                                {e.type}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
               
            </Col>
           
            </>
            ) : (<></>)}
             <Form.Item name="buyerCode" style={{display:'none'}} >
                  <Input hidden/>
                </Form.Item>

                <Form.Item name="trimMappingId" style={{display:'none'}} >
                  <Input hidden/>
                </Form.Item>
            {mapData[0]?.finish === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="finishId" label="Finish" rules={[{ required: true, message: "Finish is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Finish"
                    onChange={generateItemCode} disabled={props?.finishId != null?true:false}
                    >
                        {finishData.map((e) => {
                            return (
                            <Option key={e.finishId} value={e.finishId}>
                                {e.finish}-{e.finishCode}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.hole === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="holeId" label="Hole" rules={[{ required: true, message: "Hole is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Hole"
                    onChange={generateItemCode} disabled={props?.hole!=null?true:false}
                    >
                        {holeData.map((e) => {
                            return (
                            <Option key={e.holeId} value={e.holeId}>
                                {e.hole}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.quality === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="qualityId" label="Quality" rules={[{ required: true, message: "Quality is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Quality"
                    onChange={generateItemCode} disabled={props?.qualityId!=null?true:false}
                    >
                        {qtyData.map((e) => {
                            return (
                            <Option key={e.qualityId} value={e.qualityId}>
                                {e.qualityName}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.thickness === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="thicknessId" label="Thickness" rules={[{ required: true, message: "Thickness is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Thickness"
                    onChange={generateItemCode} disabled={props?.thicknessId!=null?true:false}
                    >
                        {thickData.map((e) => {
                            return (
                            <Option key={e.thicknessId} value={e.thicknessId}>
                                {e.thickness}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.variety === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="varietyId" label="Variety" rules={[{ required: true, message: "Variety is required" }]}>
                    <Select 
                    showSearch 
                    allowClear 
                    optionFilterProp="children" 
                    placeholder="Select Variety"
                    onChange={generateItemCode} disabled={props?.varietyId!=null?true:false}
                    >
                        {varietyData.map((e) => {
                            return (
                            <Option key={e.varietyId} value={e.varietyId}>
                                {e.variety}-{e.varietyCode}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.uom === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="uomId" label="UOM" rules={[{ required: true, message: "UOM is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select UOM"
                    onChange={generateItemCode} disabled={props?.uom!=null?true:false}
                    >
                        {uomData.map((e) => {
                            return (
                            <Option key={e.uomId} value={e.uomId}>
                                {e.uom}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.color === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="colorId" label="Color" rules={[{ required: true, message: "Color is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Color"
                    onChange={generateItemCode} disabled={props?.colour!=null?true:false}
                    >
                        {colorData.map((e) => {
                            return (
                            <Option key={e.colourId} value={e.colourId}>
                                {e.colour}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.logo === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="logo" label="Logo" rules={[{ required: true, message: "Logo is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Logo"
                    onChange={generateItemCode} disabled={props?.logo != null?true:false}
                    >
                        {Object.values(LogoEnum).map((val) => {
                            return <Option key={val} value={val}>{LogoEnumDisplay.find((e)=>e.name == val)?.displayVal}</Option>
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.part === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="part" label="Part" rules={[{ required: true, message: "Part is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Part"
                    onChange={generateItemCode} disabled={props?.part!=null?true:false}
                    >
                        {Object.values(PartEnum).map((val) => {
                            return <Option key={val} value={val}>{PartEnumDisplay.find((e)=>e.name == val)?.displayVal}</Option>
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.buyer === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimBuyerId" label="Buyer" rules={[{ required: true, message: "Buyer is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Buyer"
                    onChange={generateItemCode} 
                    disabled={props?.trimBuyer!=null?true:false}
                    >
                        {trimBuyerData.map((e) => {
                            return (
                            <Option key={e.trimBuyerId} value={e.trimBuyerId}>
                                {e.trimBuyer}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.length === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="lengthId" label="Length" rules={[{ required: true, message: "Length is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Length"
                    onChange={generateItemCode} 
                    disabled={props?.length!=null?true:false}
                    >
                        {lengthData.map((e) => {
                            return (
                            <Option key={e.lengthId} value={e.lengthId}>
                                {e.length}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.line === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="lineId" label="Line" rules={[{ required: true, message: "Line is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Line"
                    onChange={generateItemCode} 
                    disabled={props?.line!=null?true:false}
                    >
                        {lineData.map((e) => {
                            return (
                            <Option key={e.lineId} value={e.lineId}>
                                {e.line}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.parts === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="partsId" label="Parts" rules={[{ required: true, message: "Parts is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Parts"
                    onChange={generateItemCode} 
                    disabled={props?.parts!=null?true:false}
                    >
                        {partsData.map((e) => {
                            return (
                            <Option key={e.partsId} value={e.partsId}>
                                {e.parts}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.ply === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="plyId" label="Ply" rules={[{ required: true, message: "Ply is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Ply"
                    onChange={generateItemCode} 
                    disabled={props?.ply!=null?true:false}
                    >
                        {plyData.map((e) => {
                            return (
                            <Option key={e.plyId} value={e.plyId}>
                                {e.ply}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.shape === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="shapeId" label="Shape" rules={[{ required: true, message: "Shape is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Shape"
                    onChange={generateItemCode} 
                    disabled={props?.shape!=null?true:false}
                    >
                        {shapeData.map((e) => {
                            return (
                            <Option key={e.shapeId} value={e.shapeId}>
                                {e.shape}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.slider === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="sliderId" label="Slider" rules={[{ required: true, message: "Slider is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Slider"
                    onChange={generateItemCode} 
                    disabled={props?.slider!=null?true:false}
                    >
                        {sliderData.map((e) => {
                            return (
                            <Option key={e.sliderId} value={e.sliderId}>
                                {e.slider}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            {mapData[0]?.size === true ? (
              <>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="trimSizeId" label="Size" rules={[{ required: true, message: "Size is required" }]}>
                    <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    placeholder="Select Size"
                    onChange={generateItemCode} 
                    disabled={props?.trimSize!=null?true:false}
                    >
                        {trimSizeData.map((e) => {
                            return (
                            <Option key={e.trimSizeId} value={e.trimSizeId}>
                                {e.trimSize}
                            </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            </>
            ) : (<></>)}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: "Description is required" }]}>
                    <TextArea rows={3} disabled={true} />
                </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span:12 }}>
                <Form.Item name="fabricUpload" label='Fabric Upload'
                  rules={[
                      {required:false,message:'Upload Fabric'}
                  ]}  
                  // initialValue={props.isUpdate ? props.styleData.styleFileName:''}
                  >
                  <Upload  {...uploadFieldProps} style={{  width:'100%' }} listType="picture-card">
                  
                  {uploadButton}
                  </Upload>
                </Form.Item>
                </Col>
        </Row>
        <Row>
            <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button htmlType="button" style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
            </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default M3TrimItemsForm;
