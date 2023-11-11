import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Raw, Repository } from 'typeorm';
import { SampleRequest } from './entities/sample-dev-request.entity';
import { AllSampleDevReqResponseModel, CommonResponseModel, ProductGroupReq, SampleDevelopmentRequest, SampleDevelopmentStatusEnum, SampleFilterRequest, UploadResponse } from '@project-management-system/shared-models';
import { SampleSizeRepo } from './repo/sample-dev-size-repo';
import { Location } from '../locations/location.entity';
import { Style } from '../style/dto/style-entity';
import { ProfitControlHead } from '../profit-control-head/profit-control-head-entity';
import { Buyers } from '../buyers/buyers.entity';
import { SampleFabricRepo } from './repo/sample-dev-fabric-repo';
import { SampleTrimRepo } from './repo/sample-dev-trim-repo';
import { SampleTypes } from '../sample Types/sample-types.entity';
import { SampleSubTypes } from '../sample-sub-types/sample-sub-types.entity';
import { Brands } from '../master-brands/master-brands.entity';
import { EmplyeeDetails } from '../employee-details/dto/employee-details-entity';
import { SampleReqSizeEntity } from './entities/sample-requset-size-info-entity';
import { SampleReqFabricinfoEntity } from './entities/sample-request-fabric-info-entity';
import { SampleRequestTriminfoEntity } from './entities/sample-request-trim-info-entity';
import { SampleRequestProcessInfoEntity } from './entities/sample-request-process-info-entity';
import { SampleRequestRepository } from './repo/sample-dev-req-repo';
import { SamplingbomEntity } from './entities/sampling-bom-entity';
import { SampleRequestDto } from './dto/samle-dev-req';
import { sample } from 'rxjs';




@Injectable()
export class SampleRequestService {
  
    constructor(
        private sampleRepo: SampleRequestRepository,
        private readonly dataSource: DataSource,
        // private sampleAdapter: SampleDevAdapter,
        private sizerepo:SampleSizeRepo,
        private fabricRepo:SampleFabricRepo,
        private sampletrimrepo:SampleTrimRepo,
        @InjectRepository(SamplingbomEntity)
        private bomRepo:Repository<SamplingbomEntity>

  ) { }


  async getAllSampleDevData(request?: SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    try {
      const details = await this.sampleRepo.getAllSampleDevData(request)
      if (details.length) {
        for (const rec of details) {
          rec.fabric = await this.sampleRepo.sampleFabric(rec.sample_request_id)
          rec.trimData = await this.sampleRepo.sampleTrimData(rec.sample_request_id)
        }
        return new AllSampleDevReqResponseModel(true, 32465, 'All Sample Requests retrieved successfully', details)
      } else {
        return new AllSampleDevReqResponseModel(false, 1002, 'No data found', [])
      }
    } catch (err) {
      throw err
    }
  }
  async getAllSampleData(): Promise<AllSampleDevReqResponseModel> {
    try {
      const details = await this.sampleRepo.find({
        relations: ['sampleReqFabricInfo', 'sampleTrimInfo']
      })
      if (details.length > 0) {
        return new AllSampleDevReqResponseModel(true, 0, 'All Sample Requests retrieved successfully', details)
      } else {
        return new AllSampleDevReqResponseModel(false, 1, 'No data found', [])
      }
    } catch (err) {
      throw err
    }
  }


  async getAllSampleReqNo(): Promise<CommonResponseModel> {
    const details = await this.sampleRepo.getAllSampleReqNo();
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', details)
    } else {
      return new CommonResponseModel(false, 0, 'data not found')
    }
  }

  async cancelSampleReqById(request: SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    try {
      const sampleReq = await this.sampleRepo.findOne({ where: { SampleRequestId: request.sampleId } })
      if (sampleReq) {
        const updateResult = await this.sampleRepo.update({ SampleRequestId: request.sampleId }, { status: SampleDevelopmentStatusEnum.CANCELLED })
        if (updateResult) {
          return new AllSampleDevReqResponseModel(true, 1, 'Sample Request cancelled successfully', undefined)
        }
      } else {
        return new AllSampleDevReqResponseModel(false, 0, 'No Sample Request found', [])
      }
    } catch (err) {
      throw err;
    }
  }

  async getAllPCH(): Promise<CommonResponseModel> {
    const details = await this.sampleRepo.getAllPCH();
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', details)
    } else {
      return new CommonResponseModel(false, 0, 'data not found')
    }
  }

  async createSampleDevelopmentRequest(req: SampleDevelopmentRequest): Promise<AllSampleDevReqResponseModel> {
    // console.log(req)
    // console.log(req.sizeData[0].sizeInfo,'#####')
    let save
    let saveBomDetails
    try{
      const sampleId=await this.sampleRepo.getsampleId()
      const maxId= sampleId.id
      const sampleReqEntity = new SampleRequest();
      // const locationEntity = new Location()
      // locationEntity.locationId = req.locationId
      sampleReqEntity.locationId = req.locationId
      sampleReqEntity.requestNo = 'SAM' + '-' + (Number(maxId) + 1)
      const profitHead = new ProfitControlHead()
      profitHead.profitControlHeadId = req.pchId
      sampleReqEntity.pch = profitHead
      sampleReqEntity.user = req.user
      const buyer = new Buyers()
      buyer.buyerId = req.buyerId
      sampleReqEntity.buyer = buyer
      const samType = new SampleTypes()
      samType.sampleTypeId = req.sampleTypeId
      sampleReqEntity.sampleType = samType
      const samSubType = new SampleSubTypes()
      samSubType.sampleSubTypeId = req.sampleSubTypeId
      sampleReqEntity.sampleSubType = samSubType
      const styleEntity = new Style()
      styleEntity.styleId = req.styleId
      sampleReqEntity.style = styleEntity
      sampleReqEntity.description = req.description
      const brand = new Brands()
      brand.brandId = req.brandId
      sampleReqEntity.brand = brand
      sampleReqEntity.costRef = req.costRef
      sampleReqEntity.m3StyleNo = req.m3Style
      sampleReqEntity.contact = req.contact
      sampleReqEntity.extension = req.extension
      sampleReqEntity.samValue = req.samValue
      const dmm = new EmplyeeDetails()
      dmm.employeeId = req.dmmId
      sampleReqEntity.dmm = dmm
      const employee = new EmplyeeDetails()
      employee.employeeId=req.technicianId
      sampleReqEntity.technician=employee
      sampleReqEntity.product=req.product
      sampleReqEntity.type=req.type
      sampleReqEntity.conversion=req.conversion
      sampleReqEntity.madeIn=req.madeIn
      sampleReqEntity.remarks=req.remarks
      sampleReqEntity.status=req.status
      let sampleSizeInfo =[]
      let sampleFabricInfo =[]
      let sampleTrimInfo =[]
      let sampleProcessInfo =[]
      for(const size of req.sizeData){
        for(const sizedetails of size.sizeInfo){
          const sizeEntity = new SampleReqSizeEntity()
          sizeEntity.colourId = size.colour
          sizeEntity.sizeId = sizedetails.sizeId
          sizeEntity.quantity = sizedetails.quantity
          sampleSizeInfo.push(sizeEntity)
        }
      }
      sampleReqEntity.sampleReqSizeInfo = sampleSizeInfo
      for (const fabricObj of req.fabricInfo) {
        const fabricEntity = new SampleReqFabricinfoEntity()
        fabricEntity.fabricCode=fabricObj.fabricCode
        fabricEntity.description=fabricObj.description
        fabricEntity.colourId=fabricObj.colourId
        fabricEntity.consumption=fabricObj.consumption
        fabricEntity.productGroupId=fabricObj.productGroupId
        fabricEntity.remarks=fabricObj.remarks
        sampleFabricInfo.push(fabricEntity)
      }
      sampleReqEntity.sampleReqFabricInfo = sampleFabricInfo
      for (const trimObj of req.trimInfo) {
        const trimEntity = new SampleRequestTriminfoEntity()
        trimEntity.trimCode = trimObj.trimCode
        trimEntity.productGroupId=trimObj.productGroupId
        trimEntity.consumption = trimObj.consumption
        trimEntity.description = trimObj.description
        trimEntity.remarks = trimObj.remarks
        sampleTrimInfo.push(trimEntity)
      }
      sampleReqEntity.sampleTrimInfo = sampleTrimInfo
      for (const processObj of req.processInfo) {
        const processEntity = new SampleRequestProcessInfoEntity()
        processEntity.process = processObj.process
        processEntity.description = processObj.description
        sampleProcessInfo.push(processEntity)
      }
      sampleReqEntity.sampleProcessInfo=sampleProcessInfo
      
       save = await this.sampleRepo.save(sampleReqEntity)
      if(save){
        for(const fabricData of req.fabricInfo){
        const quantityWithWastage = Number(fabricData.consumption)+Number((2/100)*fabricData.consumption)
        const bomEntity = new SamplingbomEntity()
        bomEntity.sampleRequestId=save.SampleRequestId
        bomEntity.colourId=fabricData.colourId
        bomEntity.fabricId=fabricData.fabricCode /// product_gropu_id
        bomEntity.rmItemId=1 //rm_item_id need to be added
        bomEntity.requiredQuantity=quantityWithWastage
        bomEntity.wastage='2'
         saveBomDetails = await this.bomRepo.save(bomEntity)
        }
      }
      if(save && saveBomDetails){
        return new AllSampleDevReqResponseModel(true,1,'SampleDevelopmentRequest created successfully',[save])
      }
      else {
        return new AllSampleDevReqResponseModel(false, 0, 'SampleDevelopmentRequest creation Failed', [])
      }
    }
    catch (err) {
      throw err
    }

  }
  async UpdateFilePath(filePath: string, filename: string, SampleRequestId: number): Promise<UploadResponse> {
    console.log('upload service id---------------', filePath)
    console.log('upload service id---------------', filename)
    console.log('upload service id---------------', SampleRequestId)
    try {
      let filePathUpdate;
      filePathUpdate = await this.sampleRepo.update({ SampleRequestId: SampleRequestId }, { fileName: filename, filepath: filePath })
      if (filePathUpdate.affected > 0) {
        return new UploadResponse(true, 11, 'uploaded successfully', filePath);
      }
      else {
        return new UploadResponse(false, 11, 'uploaded failed', filePath);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async getAllStyleNo(): Promise<CommonResponseModel> {
    const details = await this.sampleRepo.getAllStyleNo();
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', details)
    } else {
      return new CommonResponseModel(false, 0, 'data not found')
    }
  }
  
 


  async getFabricCodes(): Promise<CommonResponseModel> {
    const details = 'SELECT ri.product_group_id as productGroupId,rm_item_id AS fabricId,item_code AS fabricCode,ri.product_group_id FROM rm_items ri LEFT JOIN product_group pg ON pg.product_group_id=ri.product_group_id WHERE product_group="Fabric"'     
    const result= await this.sampleRepo.query(details)
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', result)
    } else {
      return new CommonResponseModel(false, 0, 'data not found', [])
    }
  }

  async getTrimCodes(): Promise<CommonResponseModel> {
    const details = 'SELECT rm_item_id AS trimId,item_code AS trimCode,ri.product_group_id FROM rm_items ri LEFT JOIN product_group pg ON pg.product_group_id=ri.product_group_id WHERE product_group="Packing Trims"'
    const result = await this.sampleRepo.query(details)
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', result)
    } else {
      return new CommonResponseModel(false, 0, 'data not found', [])
    }
  }

  async getTrimType():Promise<CommonResponseModel>{
    try{
      const query='SELECT product_group_id AS productGroupId,product_group AS productGroup FROM product_group      WHERE product_group NOT IN("Fabric") AND is_active=1'
      const result = await this.sampleRepo.query(query)
      if(result){
        return new CommonResponseModel(true,1,'data retivedsucessfully',result)
      }else{
        return new CommonResponseModel(false,0,'No Data Found',[])
      }
    }catch(err){
      throw err
    }
  }
  async getTrimCodeAgainstTrimType(req:ProductGroupReq):Promise<CommonResponseModel>{
    try{
      const query=  'SELECT product_group AS productGroup,rm_item_id AS trimId,item_code AS trimCode,ri.product_group_id FROM rm_items ri LEFT JOIN product_group pg ON pg.product_group_id=ri.product_group_id     WHERE product_group NOT IN("fabric") AND ri.product_group_id='+req.productGroupId+''
      const result = await this.sampleRepo.query(query)
      if(result){
        return new CommonResponseModel(true,1,'data retivedsucessfully',result)
      }else{
        return new CommonResponseModel(false,0,'No Data Found',[])
      }
    }catch(err){
      throw err
    }
  }


  async getSampleRequestReport(): Promise<CommonResponseModel> {
    const manager = this.dataSource;
    let rawData
     rawData = 'SELECT sr.sample_request_id, sr.request_no AS requestNo, sr.m3_style_no, sb.rm_item_id, ri.item_code, sb.required_quantity, sb.assigned_quantity,sb.colour_id,co.colour  FROM sample_request sr LEFT JOIN sampling_bom sb ON sb.sample_request_id = sr.sample_request_id LEFT JOIN rm_items ri ON ri.rm_item_id LEFT JOIN `colour` co ON co.colour_id = sb.colour_id = sb.rm_item_id';
     const rmData = await manager.query(rawData);
    if (rmData.length > 0) {
      const groupedData = rmData.reduce((result, item) => {
        console.log(item,"item")
        const samplerequestid = item.sample_request_id;
        const requestNo = item.requestNo;
        
        if (!result[requestNo]) {
          result[requestNo] = {
            request_no: requestNo,
            sample_request_id: samplerequestid,
            sm: [],
          };
        }
  
        result[requestNo].sm.push(
          {
            code: item.item_code,
            consumption: item.required_quantity,
            quantity: item.assigned_quantity,
            color: item.colour ,
          }
          
        );
  
        return result;
      }, {});
  
      return new CommonResponseModel(true, 1111, 'Data retrieved', Object.values(groupedData));
    }
  
    return new CommonResponseModel(false, 0, 'Data Not retrieved', []);
  }
  async getSampleInventory(): Promise<CommonResponseModel> {
    const inventoryData=this.dataSource
    let rawDatas
    rawDatas=`SELECT  b.buyer_name,
    s.style as style,
    c.colour AS color,
    sb.colour_id,
    sr.request_no as requestNumber,
    sr.location_id as location,
    pg.product_group as productGroup,
    sb.required_quantity AS orderQuantity,
    sb.received_quantity AS preparedQuantity,
    i.item_name AS item,
    CONCAT(
        a.state, 
        '-',
        IF(a.district IS NULL, '', a.district),
        IF(a.district IS NULL OR a.city IS NULL, '', '-'),
        IF(a.city IS NULL, '', a.city),
        IF(a.landmark IS NULL OR a.city IS NULL, '', '-'),
        IF(a.landmark IS NULL, '', a.landmark),
        IF(a.lane1 IS NULL OR a.landmark IS NULL, '', '-'),
        IF(a.lane1 IS NULL, '', a.lane1),
        IF(a.lane2 IS NULL OR a.lane1 IS NULL, '', '-'),
        IF(a.lane2 IS NULL, '', a.lane2),
        IF(a.pincode IS NULL OR a.lane2 IS NULL, '', '-'),
        IF(a.pincode IS NULL, '', a.pincode)
    ) AS billingAddress
FROM 
    sampling_bom sb
LEFT JOIN 
    sample_request sre ON sb.sample_request_id = sre.sample_request_id
LEFT JOIN 
    colour c ON c.colour_id = sb.colour_id
LEFT JOIN 
    sample_request sr ON sr.sample_request_id = sb.sample_request_id
LEFT JOIN 
    product_group pg ON pg.product_group_id = sb.product_group_id
LEFT JOIN 
    items i ON i.item_id = sb.rm_item_id
LEFT JOIN 
    style s ON s.style_id = sre.style_id
LEFT JOIN 
    address a ON a.buyer_id = sre.buyer_id
LEFT JOIN 
    buyers b ON b.buyer_id = sre.buyer_id`;


    const result = await inventoryData.query(rawDatas)
  if(result){
    return new CommonResponseModel(true,1,'data retrived sucessfully',result)
}else{
    return new CommonResponseModel(false,0,'no data found',[])
}
  }
  
}