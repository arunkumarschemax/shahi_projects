import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, QueryRunner, Raw, Repository } from 'typeorm';
import { SampleRequest } from './entities/sample-dev-request.entity';
import { AllSampleDevReqResponseModel, AllocateMaterial, AllocateMaterialResponseModel, CommonResponseModel, FabricInfoReq, MaterialAllocationitemsIdreq, MaterialIssueDto, MaterialStatusEnum, ProductGroupReq, SampleDevelopmentRequest, SampleDevelopmentStatusEnum, SampleFilterRequest, SampleRequestFilter, SamplerawmaterialStausReq, SourcingRequisitionReq, TrimInfoReq, UploadResponse, allocateMaterialItems, buyerReq, buyerandM3ItemIdReq, sampleReqIdReq, statusReq ,SampleIdRequest, LifeCycleStatusEnum, RequestNoReq, BomStatusEnum, lifeCycleStatusReq, BuyerRefNoRequest, MaterailViewDto, requestNoReq, RackPositionStatusEnum,ItemTypeEnum} from '@project-management-system/shared-models';
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
import { SampleInventoryLog } from './dto/sample-inventory-log-dto';
import { SampleInventoryLoqRepo } from './repo/sample-inventory-loe-repo';
import { SampleInventoryLogEntity } from './entities/sample-inventory-log-entity';
import { Size } from '../sizes/sizes-entity';
import { OperationInventory } from '../operation-tracking/entity/operation-inventory-entity';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { IndentService } from '@project-management-system/shared-services';
import { MaterialAllocationRepo } from './repo/material-allocation-repo';
import { MaterialAllocationEntity } from './entities/material-allocation.entity';
import { MaterialAllocationDTO } from './dto/material-allocation-dto';
import { MaterialAllocationItemsRepo } from './repo/material-allocation-items-repo';
import { MaterialallitemsReq } from './dto/sample-req-size-req';
import { MaterialAllocationItemsEntity } from './entities/material-allocation-items';
import { StocksRepository } from '../stocks/repository/stocks.repository';
import { AllocationApprovalRequest } from './dto/allocation-approval-req';
import { AllocatedLocationRequest } from './dto/allocated-location-req';
import { StocksEntity } from '../stocks/stocks.entity';
import { MaterialIssueRequest } from './dto/material-issue.req';
import { SampleOrderIdRequest } from './dto/sample-req-id';
import { AllLocationRequest } from './dto/location-req';
import { RackPositionEntity } from '../rm_locations/rack-position.entity';




@Injectable()
export class SampleRequestService {

  constructor(
    private sampleRepo: SampleRequestRepository,
    private readonly dataSource: DataSource,
    // private sampleAdapter: SampleDevAdapter,
    private sizerepo: SampleSizeRepo,
    private fabricRepo: SampleFabricRepo,
    private sampletrimrepo: SampleTrimRepo,
    @InjectRepository(SamplingbomEntity)
    private bomRepo: Repository<SamplingbomEntity>,
    private logRepo: SampleInventoryLoqRepo,
    private indentService: IndentService,
    private matAllRepo:MaterialAllocationRepo,
    private matAllitemRepo:MaterialAllocationItemsRepo,
    private stockrepo:StocksRepository


    
  ) { }


  async getAllSampleDevData(request?: SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    try {
      const details = await this.sampleRepo.getAllSampleDevData(request)
      // console.log(details)
      // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^66')
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
    try{
    const details = await this.sampleRepo.find({select:['requestNo'],order:{requestNo:'ASC'}});
    if (details.length > 0) {
    let request=[];
    for ( const code of details){
      request.push(new RequestNoReq ())
    }
      return new CommonResponseModel(true, 1, 'data retrieved', details)
    } else {
      return new CommonResponseModel(false, 0, 'data not found')
    }
   } catch (err) {
      throw err
    }
  }

 

 
  

  async getAllSampleReqDropDown(): Promise<CommonResponseModel> {
    const details = await this.sampleRepo.getAllSampleReqDropDown();
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', details)
    } else {
      return new CommonResponseModel(false, 0, 'data not found')
    }
  }

  async getIssuedSampleRequests(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
    let buyerId = null
    if(req?.buyerRefNo){
      const buyerdata = `select buyer_id from buyers where external_ref_number = '${req.buyerRefNo}'`;
      const res = await this.dataSource.query(buyerdata)
      buyerId = res[0].buyer_id
    }
    const details = await this.sampleRepo.getIssuedSampleRequests(buyerId);
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
    const manager = new GenericTransactionManager(this.dataSource)
    // console.log(req)
    // console.log(req.sizeData[0].sizeInfo,'#####')
    let save
    let saveBomDetails
    try {
      await manager.startTransaction();
      const sampleId = await this.sampleRepo.getsampleId()
      const maxId = sampleId.id
      const sampleReqEntity = new SampleRequest();
      // const locationEntity = new Location()
      // locationEntity.locationId = req.locationId
      sampleReqEntity.locationId = req.locationId
      sampleReqEntity.expectedDeliveryDate = req.expectedDeliveryDate
      sampleReqEntity.requestNo = "SAM" + "/" + "23-24" + "/" + "00000" + Number(Number(maxId) + 1);
      const profitHead = new ProfitControlHead()
      profitHead.profitControlHeadId = req.pchId
      sampleReqEntity.pch = profitHead
      sampleReqEntity.user = req.user
      const buyer = new Buyers()
      buyer.buyerId = req.buyerId
      sampleReqEntity.buyer = buyer
      const samType = new SampleTypes()
      samType.sampleTypeId = req.sampleTypeId
      // sampleReqEntity.sampleType = samType
      const samSubType = new SampleSubTypes()
      samSubType.sampleSubTypeId = req.sampleSubTypeId
      // sampleReqEntity.sampleSubType = samSubType
      const styleEntity = new Style()
      styleEntity.styleId = req.styleId
      sampleReqEntity.style = styleEntity
      sampleReqEntity.description = req.description
      const brand = new Brands()
      brand.brandId = req.brandId
      sampleReqEntity.brand = brand
      sampleReqEntity.costRef = req.costRef
      // sampleReqEntity.m3StyleNo = req.m3Style
      sampleReqEntity.contact = req.contact
      sampleReqEntity.extension = req.extension
      sampleReqEntity.samValue = req.samValue
      const dmm = new EmplyeeDetails()
      dmm.employeeId = req.dmmId
      sampleReqEntity.dmm = dmm
      const employee = new EmplyeeDetails()
      employee.employeeId = req.technicianId
      sampleReqEntity.technician = employee
      sampleReqEntity.product = req.product
      sampleReqEntity.type = req.type
      sampleReqEntity.conversion = req.conversion
      sampleReqEntity.madeIn = req.madeIn
      sampleReqEntity.remarks = req.remarks
      sampleReqEntity.status = req.status
      let sampleSizeInfo = []
      let sampleFabricInfo = []
      let sampleTrimInfo = []
      let sampleProcessInfo = []
      for (const size of req.sizeData) {
        for (const sizedetails of size.sizeInfo) {
          const sizeEntity = new SampleReqSizeEntity()
          sizeEntity.colourId = size.colour
          sizeEntity.sizeId = sizedetails.sizeId
          sizeEntity.quantity = sizedetails.quantity
          sampleSizeInfo.push(sizeEntity)
        }
      }
      sampleReqEntity.sampleReqSizeInfo = sampleSizeInfo;
      let indentFabInfo : FabricInfoReq[] = [];
      for (let fabricObj of req.fabricInfo) {
        const fabricEntity = new SampleReqFabricinfoEntity()
        fabricEntity.fabricCode = fabricObj.fabricCode
        fabricEntity.colourId = fabricObj.colourId
        fabricEntity.consumption = fabricObj.consumption
        fabricEntity.uomId = fabricObj.uomId
        fabricEntity.remarks = fabricObj.remarks
        fabricEntity.totalRequirement = fabricObj.totalRequirement
        fabricEntity.wastage = fabricObj.wastage
        sampleFabricInfo.push(fabricEntity)
        const fabricInfoReq = new FabricInfoReq(fabricObj.fabricCode,fabricObj.colourId,fabricObj.consumption,fabricObj.uomId,fabricObj.remarks)
        indentFabInfo.push(fabricInfoReq);
      }
      sampleReqEntity.sampleReqFabricInfo = sampleFabricInfo;
      let indentTrimInfo : TrimInfoReq[] = [];
      for (const trimObj of req.trimInfo) {
        const trimEntity = new SampleRequestTriminfoEntity()
        trimEntity.trimCode = trimObj.trimCode
        trimEntity.uomId = trimObj.uomId
        trimEntity.consumption = trimObj.consumption
        trimEntity.trimType = trimObj.trimType
        trimEntity.remarks = trimObj.remarks
        trimEntity.totalRequirement = trimObj.totalRequirement
        trimEntity.wastage = trimObj.wastage
        sampleTrimInfo.push(trimEntity)
        const trimInfoReq = new TrimInfoReq(trimObj.trimType,trimObj.trimCode,trimObj.consumption,trimObj.uomId,trimObj.remarks)
        indentTrimInfo.push(trimInfoReq);
        
      }
      sampleReqEntity.sampleTrimInfo = sampleTrimInfo
      // for (const processObj of req.processInfo) {
      //   const processEntity = new SampleRequestProcessInfoEntity()
      //   processEntity.process = processObj.process
      //   processEntity.description = processObj.description
      //   sampleProcessInfo.push(processEntity)
      // }
      // sampleReqEntity.sampleProcessInfo = sampleProcessInfo

      save = await manager.getRepository(SampleRequest).save(sampleReqEntity);
      console.log("$############################################################");
      console.log(save);

      // save = await this.sampleRepo.save(sampleReqEntity)
      if (save) 
      {
        let fabFlag = new Set<boolean>()
        if (req.fabricInfo) {
          let fabricAllocation;
          let allocationEntity =  new MaterialAllocationEntity()
          let allocationItemsdata:MaterialAllocationItemsEntity[] = []
          for (const fabricData of req.fabricInfo) {
            const quantityWithWastage = Number(fabricData.consumption) + Number((2 / 100) * fabricData.consumption)
            const bomEntity = new SamplingbomEntity()
            bomEntity.sampleRequestId = save.SampleRequestId
            bomEntity.colourId = fabricData.colourId
            bomEntity.m3ItemId=fabricData.fabricCode
            bomEntity.itemType='Fabric'
            bomEntity.requiredQuantity = fabricData.totalRequirement
            saveBomDetails = await manager.getRepository(SamplingbomEntity).save(bomEntity)
            // saveBomDetails = await this.bomRepo.save(bomEntity)
            let fabBomStatus= BomStatusEnum.OPEN
            let totalAllocated = 0
            for (const stock of fabricData?.allocatedStock) {
              let allocationItemsEntity =  new MaterialAllocationItemsEntity()
              if(stock.checkedStatus === 1 &&  stock.issuedQty > 0){
                totalAllocated = Number(totalAllocated) + Number(stock.issuedQty);
                allocationItemsEntity.allocateQuantity = stock.issuedQty;
                allocationItemsEntity.locationId = stock.locationId;
                allocationItemsEntity.stockId = stock.stockId;
                allocationItemsdata.push(allocationItemsEntity);
                let stockUpdate = await manager.getRepository(StocksEntity).update({id:stock.stockId},{allocateQuanty: () => `allocatd_quantity +  ${stock.issuedQty}`});
                if(stockUpdate.affected === 0){
                  await manager.releaseTransaction();
                }
              }
            }
            allocationEntity.buyerId = req.buyerId
            allocationEntity.itemType = ItemTypeEnum.FABRIC;
            allocationEntity.m3ItemId = fabricData.fabricCode;
            allocationEntity.totalIssueQty = totalAllocated;
            allocationEntity.sampleOrderId = save.SampleRequestId;
            allocationEntity.sampleItemId = save.sampleReqFabricInfo.find((e) => e.fabricCode === fabricData.fabricCode).fabricInfoId;
            fabricAllocation = await manager.getRepository(MaterialAllocationEntity).save(allocationEntity)
            if(!fabricAllocation){
              await manager.releaseTransaction();
              return new AllSampleDevReqResponseModel(false, 0, 'Material Allocation Failed', [])
            }
            else{
              console.log("&&&&&&&&&&")
              console.log(fabricData.totalRequirement)
              console.log(totalAllocated);
              if(Number(fabricData.totalRequirement) === Number(totalAllocated)){
                fabBomStatus = BomStatusEnum.ALLOCATED
                fabFlag.add(true)
              }
              else{
                fabFlag.add(false)
              }
              let updateSampleFabricInfo = await manager.getRepository(SamplingbomEntity).update({sampleRequestId:save.SampleRequestId, m3ItemId: fabricData.fabricCode },{status:fabBomStatus,receivedQuantity : () => `received_quantity + ${totalAllocated}`})
              if(updateSampleFabricInfo.affected === 0){
                await manager.releaseTransaction();
                return new AllSampleDevReqResponseModel(false, 0, 'Material Allocation Failed', [])
              }
            }
          }
        }
        let trimFlag = new Set<boolean>()
        if (req.trimInfo) {
          let trimAllocation;
          let allocationEntity =  new MaterialAllocationEntity()
          let allocationItemsdata:MaterialAllocationItemsEntity[] = []
          for (const trimData of req.trimInfo) {
            const bomEntity = new SamplingbomEntity()
            bomEntity.sampleRequestId = save.SampleRequestId
            bomEntity.itemType=trimData.trimType
            bomEntity.m3ItemId=trimData.trimCode
            bomEntity.colourId = trimData.colourId
            bomEntity.requiredQuantity = trimData.totalRequirement
            saveBomDetails = await manager.getRepository(SamplingbomEntity).save(bomEntity);
            // saveBomDetails = await this.bomRepo.save(bomEntity)
            let trimBomStatus= BomStatusEnum.OPEN
            let totalAllocated = 0
            for (const stock of trimData?.allocatedStock) {
              let allocationItemsEntity =  new MaterialAllocationItemsEntity()
              if(stock.checkedStatus === 1 &&  stock.issuedQty > 0){
                totalAllocated = Number(totalAllocated) + Number(stock.issuedQty);
                allocationItemsEntity.allocateQuantity = stock.issuedQty;
                allocationItemsEntity.locationId = stock.locationId;
                allocationItemsEntity.stockId = stock.stockId;
                allocationItemsdata.push(allocationItemsEntity);
                let stockUpdate = await manager.getRepository(StocksEntity).update({id:stock.stockId},{allocateQuanty: () => `allocatd_quantity +  ${stock.issuedQty}`});
                if(stockUpdate.affected === 0){
                  await manager.releaseTransaction();
                }
              }
            }
            allocationEntity.buyerId = req.buyerId
            allocationEntity.itemType = ItemTypeEnum.SEWING_TRIM;
            allocationEntity.m3ItemId = trimData.trimCode;
            allocationEntity.totalIssueQty = totalAllocated;
            allocationEntity.sampleOrderId = save.SampleRequestId;
            allocationEntity.sampleItemId = save.sampleTrimInfo.find((e) => e.trimCode === trimData.trimCode).trimInfoId;
            trimAllocation = await manager.getRepository(MaterialAllocationEntity).save(allocationEntity)
            if(!trimAllocation){
              await manager.releaseTransaction();
              return new AllSampleDevReqResponseModel(false, 0, 'Material Allocation Failed', [])
            }
            else{
              if(Number(trimData.totalRequirement) === Number(totalAllocated)){
                trimBomStatus = BomStatusEnum.ALLOCATED
                trimFlag.add(true);
              }
              else{
                trimFlag.add(false);
              }
              let updateSampleFabricInfo = await manager.getRepository(SamplingbomEntity).update({sampleRequestId:save.SampleRequestId, m3ItemId: trimData.trimCode },{status:trimBomStatus,receivedQuantity : () => `received_quantity + ${totalAllocated}`})
              if(updateSampleFabricInfo.affected === 0){
                await manager.releaseTransaction();
                return new AllSampleDevReqResponseModel(false, 0, 'Material Allocation Failed', [])
              }
            }
          }
        }

        if(!fabFlag.has(false) && !trimFlag.has(false)){
          let updateSampleRequestStatus = await manager.getRepository(SampleRequest).update({SampleRequestId:save.SampleRequestId},{lifeCycleStatus:LifeCycleStatusEnum.MATERIAL_ALLOCATED})
            if(updateSampleRequestStatus.affected === 0){
              await manager.releaseTransaction();
              return new AllSampleDevReqResponseModel(false, 0, 'Material Allocation Failed', [])
            }
        }
      }
      else{
        await manager.releaseTransaction();
        return new AllSampleDevReqResponseModel(false, 0, 'SampleDevelopmentRequest creation Failed', [])
      }
      if (save && saveBomDetails) {
        await manager.completeTransaction();
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(save);

        const req1 = new SourcingRequisitionReq(req.styleId,new Date(),"",new Date(),indentFabInfo,indentTrimInfo,save.SampleRequestId);
        // const raiseIndent = await this.indentService.createItems(req1);
        // if(raiseIndent.status){
          return new AllSampleDevReqResponseModel(true, 1, 'SampleDevelopmentRequest created successfully', [save])
        // }
        // else {
        //   return new AllSampleDevReqResponseModel(false, 0, 'SampleDevelopmentRequest creation Failed', [])
        // }
      }
      else {
        return new AllSampleDevReqResponseModel(false, 0, 'SampleDevelopmentRequest creation Failed', [])
      }
    }
    catch (err) {
      await manager.releaseTransaction();
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
    const result = await this.sampleRepo.query(details)
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', result)
    } else {
      return new CommonResponseModel(false, 0, 'data not found', [])
    }
  }

  async getTrimCodes(): Promise<CommonResponseModel> {
    const details = 'SELECT rm_item_id AS trimId,item_code AS trimCode,ri.product_group_id FROM rm_items ri LEFT JOIN product_group pg ON pg.product_group_id=ri.product_group_id WHERE product_group not in( "Fabric")'
    const result = await this.sampleRepo.query(details)
    if (details.length > 0) {
      return new CommonResponseModel(true, 1, 'data retrieved', result)
    } else {
      return new CommonResponseModel(false, 0, 'data not found', [])
    }
  }

  async getTrimType(): Promise<CommonResponseModel> {
    try {
      const query = 'SELECT product_group_id AS productGroupId,product_group AS productGroup FROM product_group      WHERE product_group NOT IN("Fabric") AND is_active=1'
      const result = await this.sampleRepo.query(query)
      if (result) {
        return new CommonResponseModel(true, 1, 'data retivedsucessfully', result)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }
  async getTrimCodeAgainstTrimType(req: ProductGroupReq): Promise<CommonResponseModel> {
    try {
      const query = 'SELECT product_group AS productGroup,rm_item_id AS trimId,item_code AS trimCode,ri.product_group_id FROM rm_items ri LEFT JOIN product_group pg ON pg.product_group_id=ri.product_group_id     WHERE product_group NOT IN("fabric") AND ri.product_group_id=' + req.productGroupId + ''
      const result = await this.sampleRepo.query(query)
      if (result) {
        return new CommonResponseModel(true, 1, 'data retivedsucessfully', result)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }


 

  async getM3StyleCode(): Promise<CommonResponseModel> {
    const manager = this.dataSource;
    let rawData
    rawData = ' SELECT m3_style_code AS m3StyleCode ,m3_style_id AS m3StyleId FROM `m3_style` WHERE is_active=1';
    const rmData = await manager.query(rawData);
    if (rmData) {
      return new CommonResponseModel(true, 1111, 'Data retrieved', Object.values(rmData));

    } else {
      return new CommonResponseModel(false, 0, 'Data Not retrieved', []);

    }

  }
  async getSampleInventory(): Promise<CommonResponseModel> {
    const inventoryData = this.dataSource
    let rawDatas
    rawDatas = `SELECT  m3.trim_code AS item_code,m3.trim_type AS item_type,s.request_no,sf.colour_id,m3i.shrinkage,m3i.weight,m3i.weave,s.status FROM sample_request s
    LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = s.sample_request_id
    LEFT JOIN sample_request_trim_info st ON st.sample_request_id = s.sample_request_id
    LEFT JOIN  m3_trims m3 ON m3.m3_trim_Id = st.trim_code
    LEFT JOIN  m3_items m3i ON m3i.m3_items_Id= sf.fabric_code
  UNION ALL
  SELECT  m3i.item_code AS item_code,m3i.fabric_type AS item_type ,s.request_no,sf.colour_id,m3i.shrinkage,m3i.weight,m3i.weave,s.status FROM sample_request s
    LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = s.sample_request_id
    LEFT JOIN sample_request_trim_info st ON st.sample_request_id = s.sample_request_id
    LEFT JOIN  m3_trims m3 ON m3.m3_trim_Id = st.trim_code
    LEFT JOIN  m3_items m3i ON m3i.m3_items_Id= sf.fabric_code`;


    const result = await inventoryData.query(rawDatas)
    if (result) {
      return new CommonResponseModel(true, 1, 'data retrived sucessfully', result)
    } else {
      return new CommonResponseModel(false, 0, 'no data found', [])
    }
  }

  async getAllRequestNo(): Promise<CommonResponseModel> {
    const records = await this.sampleRepo.find();
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async getAllBuyers(): Promise<CommonResponseModel> {
    const records = await this.sampleRepo.find();
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async getAllAllocatedRequestNo(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
    const buyerdata = `select buyer_id from buyers where external_ref_number = '${req.buyerRefNo}'`;
    const res = await this.dataSource.query(buyerdata)
    const buyerId = res[0].buyer_id
    console.log(buyerId,'buyerIdbuyerId')
    const records = await this.sampleRepo.find({where:{lifeCycleStatus:LifeCycleStatusEnum.MATERIAL_ALLOCATED,buyer:{buyerId:buyerId}}});
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async getAllApprovedRequestNo(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
    let buyerId
    if(req?.buyerRefNo){
      const buyerdata = `select buyer_id from buyers where external_ref_number = '${req.buyerRefNo}'`;
      const res = await this.dataSource.query(buyerdata)
      buyerId = res[0].buyer_id
    }
    let records
    if(req?.buyerRefNo){
      records = await this.sampleRepo.find({where:{lifeCycleStatus:LifeCycleStatusEnum.READY_FOR_PRODUCTION,buyer:{buyerId:buyerId}}});
      
    }else{
      records = await this.sampleRepo.find({where:{lifeCycleStatus:LifeCycleStatusEnum.READY_FOR_PRODUCTION}});
    }
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  

  async createSampling(req: SampleInventoryLog): Promise<CommonResponseModel> {
    // console.log(req, 'service')
    let save;
    try {
      const conversion = []
      for (const rec of req.addressInfo) {
        const entity = new SampleInventoryLogEntity();
        const size = new Size();
        size.sizeId = rec.size
        entity.size = size;
        entity.quantity = rec.quantity;
        const lo = new Location();
        lo.locationId = rec.location;
        entity.locationName = lo;
        const oInventory = new OperationInventory()
        oInventory.operationInventoryId = req.operation
        entity.operation = oInventory;
        oInventory.locationMapped = rec.quantity;
        conversion.push(entity);
      };
      save = await this.logRepo.save(conversion);
      if (save) {
        const qtyTotal = req.addressInfo.reduce((a, c) => a + Number(c.quantity), 0);
        const mappedQty = await this.dataSource.getRepository(OperationInventory).findOne({ select: ['locationMapped'], where: { operationInventoryId: req.operation } })
        const total = qtyTotal + Number(mappedQty.locationMapped);
        if (qtyTotal > Number(mappedQty.locationMapped)) {
          throw new ErrorResponse(65465, "Do Not Enter The Quantity To More Than Remaing Mapped Quantity")
        } else {
          await this.dataSource.getRepository(OperationInventory).update({ operationInventoryId: req.operation }, { locationMapped: total });
          return new CommonResponseModel(true, 1223, 'created sucesses', save);
        };
      };

    } catch (error) {
      return new CommonResponseModel(false, 321, 'Not created', error)
    }

  }

  async getAllSmaplingDevData(req?: any): Promise<CommonResponseModel> {
    const manager = this.dataSource;
    let rawData = `SELECT sb.rm_item_id as rmItemId,sb.colour_id as colourId,sr.m3_style_no as m3StleNo,sr.style_id as styleId,sb.sampling_bom_id,sr.sample_request_id, sr.request_no AS requestNo, sr.m3_style_no, sb.rm_item_id, ri.item_code, sb.required_quantity as requiredQuantity,sb.created_at, sb.assigned_quantity,sb.colour_id,co.colour,st.style,bu.buyer_name,pg.product_group,ss.quantity,fa.name   FROM sampling_bom sb LEFT JOIN sample_request sr ON sb.sample_request_id = sr.sample_request_id LEFT JOIN rm_items ri ON ri.rm_item_id LEFT JOIN colour co ON co.colour_id = sb.colour_id  LEFT JOIN style st ON st.style_id = sr.style_id LEFT JOIN buyers bu ON bu.buyer_id = sr.buyer_id LEFT JOIN product_group pg ON pg.product_group_id = sb.product_group_id LEFT JOIN stocks ss ON ss.item_type_id = sb.rm_item_id LEFT JOIN factory fa ON fa.id=sr.facility_id 
    WHERE sr.sample_request_id IS NOT NULL `;
    if (req.buyerName) {
      rawData = rawData + ' and bu.buyer_name = "' + req.buyerName + '"'
    }
    if (req.requestNo) {
      rawData = rawData + ' and sr.request_no = "' + req.requestNo + '"'
    }
    if (req.style) {
      rawData = rawData + ' and sr.style = "' + req.style + '"'
    }
    rawData = rawData + ' group by sb.sampling_bom_id '

    const rmData = await manager.query(rawData);
    console.log(rmData, "4444444444")
    console.log("**********************************************************************")

    if (rmData.length > 0) {
      const groupedData = rmData.reduce((result, item) => {
        console.log(item, "ittttteemmmm")
        const samplerequestid = item.sample_request_id;
        const requestNo = item.requestNo;
        const buyers = item.buyer_name;
        const date = item.created_at;
        const style = item.style;
        const unit = item.name;
        const styleId=item.styleId
        const requiredQuantity=item.requiredQuantity
        const m3StleNo=item.m3StleNo
        const  colourId=item.colourId
        const rmItemId=item.rmItemId
        if (!result[requestNo]) {
          result[requestNo] = {
            request_no: requestNo,
            sample_request_id: samplerequestid,
            buyer_name: buyers,
            created_at: date,
            style: style,
            name: unit,
            styleId:styleId,
            requiredQuantity:requiredQuantity,
            m3StleNo:m3StleNo,
            colourId:colourId,
            rmItemId:rmItemId,
            sm: [],
          };
        }

        result[requestNo].sm.push(
          {
            code: item.item_code,
            // buyers: item.buyer_name,
            fabricName: item.product_group,
            consumption: item.required_quantity,
            quantity: item.quantity,
            color: item.colour,
            styleId:item.styleId,
            requiredQuantity:item.requiredQuantity,
            m3StleNo:item.m3StleNo,
            colourId:item.colourId,
            rmItemId:item.rmItemId,
            // style:item.style,
            // date:item.created_at,
          }

        );

        return result;
      }, {});

      return new CommonResponseModel(true, 1111, 'Data retrieved', Object.values(groupedData));
    }

    return new CommonResponseModel(false, 0, 'Data Not retrieved', []);
  }
  async creatematerialAlloction(req:MaterialAllocationDTO[]):Promise<CommonResponseModel>{
    // console.log(req)
    const manager = new GenericTransactionManager(this.dataSource)
    const queryManager = this.dataSource;
    try{
      let save
      const filteredData = req.filter(item => item.checkedStatus === 1);
      const transformedData = filteredData.reduce((acc, item) => {
        // console.log(transformedData,'transformedData')
        const foundIndex = acc.findIndex(
          (el) =>
            el.sampleOrderId === item.sampleOrderId &&
            el.sampleItemId === item.sampleItemId &&
            el.m3ItemId === item.m3ItemId &&
            el.buyerId ===item.buyerId
        );
      
        if (foundIndex !== -1) {
          acc[foundIndex].itemData.push({
            quantity: item.quantity,
            stockId: item.stockId,
            LocationId: item.LocationId,
            checkedStatus: item.checkedStatus,
            issuedQty: item.issuedQty
          });
        } else {
          acc.push({
            itemType: item.itemType,
            sampleOrderId: item.sampleOrderId,
            sampleItemId: item.sampleItemId,
            m3ItemId: item.m3ItemId,
            buyerId:item.buyerId,
            itemData: [
              {
                quantity: item.quantity,
                stockId: item.stockId,
                LocationId: item.LocationId,
                checkedStatus: item.checkedStatus,
                issuedQty: item.issuedQty
              }
            ]
          });
        }
      
        return acc;
      }, []);
      // console.log(transformedData);
      let materialitemdata =[];
      for(const mainData of transformedData ){
         const entity = new MaterialAllocationEntity()
         entity.buyerId=mainData.buyerId
         entity.itemType=mainData.itemType
         entity.sampleOrderId=mainData.sampleOrderId
         entity.sampleItemId=mainData.sampleItemId
         entity.m3ItemId=mainData.m3ItemId
         entity.totalIssueQty=0
         entity.status=MaterialStatusEnum.MATERIAL_ALLOCATED
         for(const itemData of mainData.itemData){
          const itemEntity = new MaterialAllocationItemsEntity()
              itemEntity.locationId=itemData.LocationId
              itemEntity.stockId=itemData.stockId
              itemEntity.quantity=itemData.quantity
              itemEntity.allocateQuantity=itemData.issuedQty
              materialitemdata.push(itemEntity)
         }
         entity.materialAllocationinfo=materialitemdata
         console.log(entity)
        await manager.startTransaction();
        save = await manager.getRepository(MaterialAllocationEntity).save(entity)
      }
      console.log(save)
      console.log('***********************************8')
      console.log(materialitemdata);
      if(save){
        console.log("save done");
        let updateStockFlag =true;
        for(const itemData of materialitemdata){
          console.log(itemData);
          const update = await manager.getRepository(StocksEntity).update({id:itemData.stockId},{allocateQuanty:itemData.allocateQuantity})
          console.log(update);
          console.log("update Stock");
          if(!update.affected){
            updateStockFlag = false
            await manager.releaseTransaction();
            break
          }
        }
        let flag =true;
        for(const mainData of transformedData ){
          let updateBomStatus = await manager.getRepository(SamplingbomEntity).update({sampleRequestId:mainData.sampleOrderId,m3ItemId:mainData.m3ItemId},{status: `${BomStatusEnum.ALLOCATED}`});
          console.log("updateBomStatus");
          console.log(updateBomStatus);

          if(updateBomStatus.affected <1){
            flag = false;
            await manager.releaseTransaction();
          }
          else{

          }
        }
        let updateSampleOrderStatus
        let getBomStatusquery = "Select * from sampling_bom where status!= 'Allocated' and sample_request_id = "+transformedData[0].sampleOrderId;
        let getBomStatus = await queryManager.query(getBomStatusquery);
        // let getBomStatus = await manager.getRepository(SamplingbomEntity).find({where:{status: Not(BomStatusEnum.ALLOCATED),sampleRequestId: transformedData[0].sampleOrderId}});
        console.log("getBomStatus")
        console.log(getBomStatus)

        if(getBomStatus.length-1 < 1){
          updateSampleOrderStatus = await manager.getRepository(SampleRequest).update({SampleRequestId:req[0].sampleOrderId},{lifeCycleStatus:LifeCycleStatusEnum.MATERIAL_ALLOCATED});
          console.log(updateSampleOrderStatus);
          console.log(flag);
          console.log(updateStockFlag);

          if(!updateSampleOrderStatus || !flag || !updateStockFlag){
            await manager.releaseTransaction();
            return new CommonResponseModel(false,1,'Something Went Wrong',[])
          }
          else{
            await manager.completeTransaction();
            return new CommonResponseModel(true,1,'Material Allocation Request Raise')
          }
        }
        else{
          await manager.completeTransaction();
          return new CommonResponseModel(true,1,'Material Allocation Request Raise')
        }
       
      }else{
        await manager.releaseTransaction();
        return new CommonResponseModel(false,1,'Something Went Wrong',[])

      }
    }
    catch(err){
      console.log(err);
      await manager.releaseTransaction();
      throw err
    }
  }



  async getSampleRequestReport(req?: SamplerawmaterialStausReq):Promise<CommonResponseModel>{
    try{
      const manager = this.dataSource;
      let query3
      let query1=`SELECT required_quantity-IF(po_quantity IS NOT NULL,po_quantity,0) AS bomQuantity,srf.consumption-po_quantity AS sampleBalanceQuanty,srf.consumption AS sampleQuantity,poi.po_quantity AS poquantity, rp.rack_position_name as locationName,brand_name as brandName, s.style AS styleName,sr.life_cycle_status AS lifeCycleStatus,b.buyer_name AS buyername,sr.request_no AS sampleReqNo,c.colour AS colourName, mi.item_code AS itemCode,sb.sample_request_id AS sampleRequestid,sb.item_type AS itemType,sb.m3_item_id AS m3ItemId,sb.required_quantity AS requiredQuantity, sb.received_quantity AS receivedQuantity,sb.colour_id AS colorId,st.quantity AS avilableQuantity, sr.style_id AS styleId,sr.buyer_id AS buyerId FROM sampling_bom sb      LEFT JOIN  sample_request_fabric_info srf ON srf.sample_request_id=sb.sample_request_id AND srf.fabric_code=sb.m3_item_id  LEFT JOIN sample_request sr ON sr.sample_request_id=sb.sample_request_id   LEFT JOIN stocks st ON st.m3_item =sb.m3_item_id AND sr.buyer_id=st.buyer_id AND sb.item_type IN("fabric")  LEFT JOIN m3_items mi ON mi.m3_items_Id=sb.m3_item_id  LEFT JOIN colour c ON c.colour_id=sb.colour_id LEFT JOIN buyers b ON b.buyer_id=sr.buyer_id LEFT JOIN style s ON s.style_id=sr.style_id left join brands bs on bs.brand_id=sr.brand_id left join rack_position rp on rp.position_Id =sr.location_id   LEFT JOIN purchae_order_items poi ON poi.sample_item_id =srf.fabric_info_id   WHERE sb.item_type IN("Fabric")  AND st.quantity IS NULL AND (required_quantity-IF(po_quantity IS NOT NULL,po_quantity,0)) >0`
      if(req.extRefNo){
        query1 = query1+ ` and b.external_ref_number = '${req.extRefNo}'`
      }

      let query2=`select required_quantity-IF(po_quantity IS NOT NULL,po_quantity,0) AS bomQuantity,srt.consumption-po_quantity AS sampleBalanceQuanty,srt.consumption AS sampleQuantity,poi.po_quantity AS poquantity,rp.rack_position_name as locationName,brand_name as brandName, s.style as styleName,sr.life_cycle_status AS lifeCycleStatus,b.buyer_name AS buyername,sr.request_no AS sampleReqNo,c.colour AS colourName,mi.trim_code AS itemCode,sb.sample_request_id AS sampleRequestid,sb.item_type AS itemType,sb.m3_item_id AS m3ItemId,sb.required_quantity AS requiredQuantity,sb.received_quantity AS receivedQuantity,sb.colour_id AS colorId,st.quantity AS avilableQuantity , sr.style_id AS styleId,sr.buyer_id AS buyerId FROM sampling_bom sb LEFT JOIN sample_request_trim_info srt ON srt.sample_request_id=sb.sample_request_id AND srt.trim_code=sb.m3_item_id LEFT JOIN sample_request sr ON sr.sample_request_id=sb.sample_request_id LEFT JOIN stocks st ON st.m3_item =sb.m3_item_id AND sr.buyer_id=st.buyer_id AND st.item_type IN("fabric") LEFT JOIN m3_trims mi ON mi.m3_trim_Id=sb.m3_item_id  LEFT JOIN colour c ON c.colour_id=sb.colour_id   LEFT JOIN buyers b ON b.buyer_id=sr.buyer_id LEFT JOIN style s ON s.style_id=sr.style_id left join brands bs on bs.brand_id=sr.brand_id left join rack_position rp on rp.position_Id =sr.location_id    LEFT JOIN purchae_order_items poi ON poi.sample_item_id =srt.trim_info_id   
       WHERE sb.item_type NOT IN ("Fabric")  AND st.quantity IS NULL AND (required_quantity-IF(po_quantity IS NOT NULL,po_quantity,0)) >0`
       if(req.extRefNo){
        query2 = query2+ ` and b.external_ref_number = '${req.extRefNo}'`
      }
      if (req.buyerId == undefined && req.sampleReqNo == undefined && req.styleId == undefined){
        query3 = query1+'   UNION ALL'+' '+query2
      }
      // if(req.sampleReqNo != undefined){
      //   query1=query1+' and sr.sample_request_id='+req.sampleReqNo+''
      //   query2=query2+' and sr.sample_request_id='+req.sampleReqNo+''
      //   query3=query1+'   UNION ALL '+query2
      // }
      if (req.sampleReqNo != undefined) {
        query1 = query1 + ' AND sr.sample_request_id=' + req.sampleReqNo;
        query2 = query2 + ' AND sr.sample_request_id=' + req.sampleReqNo;
        query3 = query1 + ' UNION ALL ' + query2;
      }
      if (req.buyerId != undefined) {
        query1 = query1 + ' AND sr.buyer_id=' + req.buyerId;
        query2 = query2 + ' AND sr.buyer_id=' + req.buyerId;
        query3 = query1 + ' UNION ALL ' + query2;
      }
      if (req.styleId != undefined) {
        query1 = query1 + ' AND sr.style_id=' + req.styleId;
        query2 = query2 + ' AND sr.style_id=' + req.styleId;
        query3 = query1 + ' UNION ALL ' + query2;
      }
      

      const rmData = await manager.query(query3);

      if (rmData.length > 0) {
        const groupedData = rmData.reduce((result, item) => {
          const sampleReqNo = item.sampleReqNo;
          const buyername = item.buyername;
          const status = item.lifeCycleStatus;
          const styleName=item.styleName
          const locationName=item.locationName
          const brandName=item.brandName
          const style=item.styleId
          const buyerId=item.buyerId
          if (!result[sampleReqNo]) {
            result[sampleReqNo] = {
              sampleReqNo: sampleReqNo,
              buyerName: buyername,
              status: status,
              stylename:styleName,
              locationName:locationName,
              brandName:brandName,
              styleId:style,
              buyerId:buyerId,
              sm: [],
            };
          }
  
          result[sampleReqNo].sm.push(
            {
              samplingBomId:item.samplingBomId,
              sampleRequestid:item.sampleRequestid,
              m3ItemId:item.m3ItemId,
              colourName:item.colourName,
              itemCode:item.itemCode,
              fabricType: item.itemType,
              quantity: item.requiredQuantity,
              assignedQuantity:item.assigned_quantity,
              bomQuantity:item.bomQuantity,
              styleId:item.styleId,
              buyerId:buyerId,
            }
          );
          console.log(result)
          return result;
        }, {});
        console.log(Object.values(groupedData))
        return new CommonResponseModel(true, 1111, 'Data retrieved', Object.values(groupedData));

        }
      }
      catch(err){
        throw err
      }
    }

    async getAvailbelQuantityAginstBuyerAnditem(req:buyerandM3ItemIdReq):Promise<CommonResponseModel>{
      try{
        const manager = this.dataSource;
        //  const query='SELECT st.quantity-IF(st.issued_quantity IS NOT NULL,st.issued_quantity,0) AS totalAvailablequntity, mai.allocate_quantity AS materialAlloctedquantity,st.allocatd_quantity AS stockAllocatedQty,st.quantity AS stockQuantity,(st.quantity-st.allocatd_quantity) AS resultAvailableQuantity,st.item_type AS itemType,g.grn_number AS grnNumber,r.rack_position_name,st.id AS stockId,st.m3_item AS m3ItemId,st.buyer_id AS buyerId,st.item_type AS itemType, st.location_id AS locationId, st.quantity,st.grn_item_id AS grnItemId,stock_bar_code AS stockBarCode, FALSE AS checkedStatus,date(g.grn_date) as grnDate FROM stocks st LEFT JOIN rack_position r ON r.position_Id=st.location_id LEFT JOIN grn_items gi ON gi.grn_item_id=st.grn_item_id LEFT JOIN grn g ON g.grn_id=gi.grn_id LEFT JOIN material_allocation_items mai ON mai.stock_id=st.id WHERE st.buyer_id='+req.buyerId+' AND st.m3_item= '+req.m3ItemId+'  AND st.item_type="'+req.itemType+'" AND (st.quantity-IF(st.issued_quantity IS NOT NULL,st.issued_quantity,0)) >0 order by g.grn_date'

         const rawQuery = 'Select st.buyer_id AS buyerId,st.location_id AS locationId,st.m3_item AS m3ItemId,st.item_type AS itemType,st.grn_item_id AS grnItemId, st.id AS stockId,(quantity-allocatd_quantity-transfered_quantity) AS quantity, g.grn_number AS grnNumber, date(g.grn_date) as grnDate, rp.rack_position_name AS location, FALSE AS checkedStatus, stock_bar_code AS stockBarCode from stocks st left join grn_items gi on gi.grn_item_id = st.grn_item_id left join rack_position rp on rp.position_id = st.location_id left join grn g on g.grn_id = gi.grn_id where id>0 and g.grn_type = "INDENT" and st.buyer_id='+req.buyerId+' AND st.m3_item= '+req.m3ItemId+' AND st.item_type="'+req.itemType+'" and (quantity-allocatd_quantity-transfered_quantity) > 0';
        // const queryy ='SELECT mai.allocate_quantity AS materialAlloctedquantity,st.allocatd_quantity AS stockAllocatedQty,st.quantity AS stockQuantity,(st.quantity-st.allocatd_quantity) AS resultAvailableQuantity,st.item_type AS itemType,g.grn_number AS grnNumber,r.rack_position_name,st.id AS stockId,st.m3_item AS m3ItemId,st.buyer_id AS buyerId,st.item_type AS itemType, st.location_id AS locationId,st.quantity,st.grn_item_id AS grnItemId,stock_bar_code AS stockBarCode, false AS checkedStatus FROM stocks st LEFT JOIN rack_position r ON r.position_Id=st.location_id LEFT JOIN grn_items gi ON gi.grn_item_id=st.grn_item_id LEFT JOIN grn g ON g.grn_id=gi.grn_id  LEFT JOIN material_allocation_items mai ON mai.stock_id=st.id WHERE st.buyer_id='+req.buyerId+' AND st.m3_item= '+req.m3ItemId+' and st.item_type="'+req.itemType+'" AND (st.quantity-st.allocatd_quantity)>0'
        
        const rmData = await manager.query(rawQuery);
        // console.log(rmData)
        if(rmData){
          return new CommonResponseModel(true,1,'data',rmData)
        }else{
          return new CommonResponseModel(false,0,'no data',[])

        }

      }catch(err){
        throw err
      }
    }



    // async getAllMaterialAllocation(req?:buyerReq) : Promise<CommonResponseModel> {
    //   try{
    //     const data = await this.matAllRepo.getallMaterialAllocation(req)
    //     const map = new Map<number,AllocateMaterial >()
    //     if(data.length == 0){
    //       return new AllocateMaterialResponseModel(false,0,'No data found',[])
    //     } else {
    //       for(const rec of data){
    //         if(!map.has(rec.material_allocation_id)){
    //           map.set(rec.material_allocation_id,new AllocateMaterial(rec.material_allocation_id,rec.item_type,rec.sample_order_id,rec.sample_item_id,rec.m3_item_id,rec.buyer_id,rec.status,[],rec.buyer_name,"admin") )
    //         }

    //         map.get(rec.material_allocation_id).materialAllocateIteminfo.push(new allocateMaterialItems(rec.material_allocation_items_id,rec.quantity,rec.stock_id,rec.location_id,rec.allocate_quantity,rec.material_allocation_id,rec.location_name,"admin") )
    //     }
    //     const allocateMaterial: AllocateMaterial[] = [];
    //     map.forEach((e) => allocateMaterial.push(e))
    //           return new AllocateMaterialResponseModel(true,1,'Data retrieved',allocateMaterial)
    //   }

      
    //   } catch(err){
    //     throw err
    //   }
    // }

    async getAllMaterialAllocation(req?:buyerReq) : Promise<CommonResponseModel> {
      try{
        const data = await this.matAllRepo.getallMaterialAllocation(req)
       
        if(data){
          return new CommonResponseModel(true,0,'Data retrived Successfully',data)
        } else {
          return new CommonResponseModel(false,1,'No Data Found',[])
        }
      } catch(err){
        throw err
      }
    }

    async getallMaterialAllocationItemsById(req:MaterialallitemsReq) : Promise<CommonResponseModel> {
      try{
        const data = await this.matAllitemRepo.getallMaterialAllocationItemsById(req)
       
        if(data){
          return new CommonResponseModel(true,0,'Data retrived Successfully',data)
        } else {
          return new CommonResponseModel(false,1,'No Data Found',[])
        }
      } catch(err){
        throw err
      }
    }



   

    async updateStatus(req?:statusReq): Promise<CommonResponseModel> {
      try {
        const update = await this.matAllRepo.update(
          { materialAllocationId: req.materialAllocationId },
          { status: MaterialStatusEnum.MATERIAL_ISSUED }
        );
        if (update.affected && update.affected > 0) {
          return new CommonResponseModel(true, 1, 'Material Issued Sucessfully');
        } else {
          return new CommonResponseModel(false, 1, 'some went wrong');
        }
      } catch (err) {
        throw err;
      }
    }

    // async updatedispatch(req?:lifeCycleStatusReq):Promise<CommonResponseModel>{
    //   console.log(req,"service");
      
    //   try{
    //     const update=await this. sampleRepo.update(
         
    //         { SampleRequestId:req.sampleReqId},
    //        {lifeCycleStatus:req.status},
    //        {DispatchedDate:req.dipatchedDate}
    //     );
      
    //   if(update.affected && update.affected >0 ){
    //     return new CommonResponseModel(true, 1, 'Lifecyclestatus updated Sucessfully');

    //   }else{
    //     return new CommonResponseModel(false, 1, 'some went wrong');

    //   }
    //     } catch (err) {
    //       throw err;
    //     }
    // }
    async updatedispatch(req?: lifeCycleStatusReq): Promise<CommonResponseModel> {    
      try {
        const update = await this.sampleRepo.update(
          
          { SampleRequestId: req.sampleReqId},
            {lifeCycleStatus: req.status,
             DispatchedDate: req.dipatchedDate 
          },
       
        );
    
        if (update.affected && update.affected >0 ) {
          return new CommonResponseModel(true, 1, 'Lifecycle status updated successfully');
        } else {
          return new CommonResponseModel(false, 1, 'Something went wrong');
        }
      } catch (err) {
        throw err;
      }
    }
    


    async getSampleOrderDetails(req:SampleIdRequest):Promise<CommonResponseModel>{
      const sizeDta = `SELECT  GROUP_CONCAT(DISTINCT  CONCAT('sum(IF(s.size_id = ''',size_id,''', s.quantity, 0)) AS ',sizes)) AS size_name FROM size s WHERE sizes != '' 
      AND size_id IN(SELECT DISTINCT size_id FROM sample_request_size_info WHERE sample_request_id=${req.sampleRequestId}) ORDER BY  sizes`;
      const res = await this.dataSource.query(sizeDta)
      const sizesStr = res[0].size_name
      console.log(sizesStr,'kkkkk')

      console.log(req,'rehhhh')
      const sampleDataQry = `SELECT sty.style,cl.colour,${sizesStr} FROM sample_request_size_info s 
      left join sample_request sr on sr.sample_request_id = s.sample_request_id
      left join colour cl on cl.colour_id = s.colour_id
      left join style sty on sty.style_id = sr.style_id
      WHERE s.sample_request_id=${req.sampleRequestId} GROUP BY s.colour_id`
      const finalres = await this.dataSource.query(sampleDataQry)
      if(finalres.length > 0){
        return new CommonResponseModel(true,1,'data retrived',finalres)
      }else{
        return new CommonResponseModel(false,0,'No data')
      }
    }
    
    
    
    async getfabricDetailsOfSample(req:sampleReqIdReq):Promise<CommonResponseModel>{
      try{
        const manager = this.dataSource;
        const query ='  SELECT srf.fabric_code as m3FabricCode, srf.colour_id as colourId,c.colour as colorName,request_no AS sampleReqNo, item_code AS itemCode,fabric_info_id AS samplereFabId,consumption AS sampleQuantity,srf.sample_request_id AS sampleReqId,srf.uom_id,u.uom FROM sample_request_fabric_info srf LEFT JOIN sample_request sr ON sr.sample_request_id=srf.sample_request_id LEFT JOIN m3_items mi ON mi.m3_items_Id =srf.fabric_code left join colour c on c.colour_id=srf.colour_id left join uom u on u.id = srf.uom_id  where srf.sample_request_id in ('+req.sampleReqId+') and srf.fabric_code in('+req.sampleItemId+')'
        const rmData = await manager.query(query);
        if(rmData){
          return new CommonResponseModel(true,1,'data',rmData)
        }else{
          return new CommonResponseModel(false,0,'no data',[])

        }

      }catch(err){
        throw err
      }
    }

    async getTrimDetailsOfSample(req:sampleReqIdReq):Promise<CommonResponseModel>{
      try{
        const manager = this.dataSource;
        const query ='SELECT t.trim_code as m3TrimCode,mt.trim_code AS m3TrimCodeName,t.trim_type AS trimTupe,request_no AS sampleReqNo,trim_info_id AS sampleTrimInfoId,mt.uom_id AS uomId,u.uom as uomName,consumption AS sampleOrderQuantity,t.sample_request_id AS sampleReqId,tpm.structure, tpm.category, tpm.content, tpm.type, tpm.finish, tpm.hole, tpm.quality, tpm.thickness, tpm.variety, tpm.uom, tpm.color, tpm.logo, tpm.part,sr.style_id AS styleId FROM sample_request_trim_info t LEFT JOIN sample_request sr ON sr.sample_request_id=t.sample_request_id LEFT JOIN m3_trims mt ON mt.m3_trim_Id=t.trim_code left join uom u on u.id = mt.uom_id LEFT JOIN trim_params_mapping tpm ON tpm.trim_mapping_id = mt.trim_mapping_id where t.sample_request_id in ('+req.sampleReqId+') and t.trim_code in('+req.sampleItemId+')'
        const rmData = await manager.query(query);
        if (rmData.length > 0) {
          const modifiedRes = rmData.map(item => {
              const trueValues = Object.keys(item)
              .filter(key => ["structure", "category", "content", "type", "finish", "hole", "quality", "thickness", "variety", "uom", "color", "logo", "part"].includes(key) && item[key] === 1)
              .map(key => key.toUpperCase());

              const concatenatedValues = trueValues.join('/');
              const label = trueValues.length > 0 ? "BUYER/TRIM TYPE/TRIM CATEGORY/":""

              const trimParams = label + concatenatedValues
              return { ...item, trimParams };
          });

          return new CommonResponseModel(true, 1, "Stock retrieved successfully", modifiedRes);
  }else{
          return new CommonResponseModel(false,0,'no data',[])

        }

      }catch(err){
        throw err
      }
    }

    async getAllocatedBomInfo(req?:RequestNoReq):Promise<CommonResponseModel>{
      console.log(req)
      let checkStatus
      if(req.action == 'Issued'){
        checkStatus = LifeCycleStatusEnum.READY_FOR_PRODUCTION
      }
      if(req.action == 'Approval'){
        checkStatus = LifeCycleStatusEnum.MATERIAL_ALLOCATED
      }
      let fabricInfoQry = `SELECT sr.request_no as requestNo,sr.style_id as styleId,sr.brand_id as brandId,sr.buyer_id as buyerId,br.brand_name as brandName,b.buyer_name as buyerName,s.style,c.colour,mi.item_code as itemCode,sf.consumption
      ,sf.total_requirement as BOM ,sf.sample_request_id as sampleRequestFabricId , sf.fabric_info_id as sampleFabricId,'Fabric' as type
       FROM sample_request sr 
            LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = sr.sample_request_id
            LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
            LEFT JOIN style s ON s.style_id = sr.style_id
            LEFT JOIN brands br ON br.brand_id = sr.brand_id
            LEFT JOIN m3_items mi ON mi.m3_items_Id = sf.fabric_code
            LEFT JOIN colour c ON c.colour_id = sf.colour_id
            WHERE sr.life_cycle_status = '${checkStatus}'`;
            if(req.requestNo){
              fabricInfoQry += ' AND sr.sample_request_id = ' + req.requestNo ;
            }
            const fabricInfo = await this.dataSource.query(fabricInfoQry)
            console.log()
      // if(req.requestNo) {

      // }
      let trimInfoQry = `SELECT sr.request_no as requestNo,sr.style_id as styleId,sr.brand_id as brandId,sr.buyer_id as buyerId,br.brand_name as brandName,b.buyer_name as buyerName,s.style,mi.trim_code as itemCode,st.consumption ,st.total_requirement as BOM, st.trim_info_id as sampleTrimInfoId , st.sample_request_id as sampleReqTrimId ,'Trim' as type
      FROM sample_request sr 
LEFT JOIN sample_request_trim_info st ON st.sample_request_id = sr.sample_request_id
      LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
            LEFT JOIN style s ON s.style_id = sr.style_id
            LEFT JOIN brands br ON br.brand_id = sr.brand_id
            LEFT JOIN m3_trims mi ON mi.m3_trim_Id = st.trim_code
      WHERE sr.life_cycle_status = '${checkStatus}'`;
      if(req.requestNo > 0){
        trimInfoQry += ' AND sr.sample_request_id = ' + req.requestNo ;
      }
      const trimInfo = await this.dataSource.query(trimInfoQry)
      
      const combineData = [...fabricInfo, ...trimInfo]
      let allocatedSampleReqInfo = {
        fabricInfo:[],
        trimInfo:[]
      }
      if(fabricInfo.length > 0){
        allocatedSampleReqInfo.fabricInfo = fabricInfo
      }
      if(trimInfo.length > 0){
        allocatedSampleReqInfo.trimInfo = trimInfo
      }
      if(fabricInfo.length > 0){
        return new CommonResponseModel(true,1,'data retreived',combineData)
      }else{
        return new CommonResponseModel(false,0,'No data')
      }
    }

    async allocatedLocationInfo(req:AllocatedLocationRequest){
      let checkStatus
      if(req.action == 'Issued'){
        checkStatus = MaterialStatusEnum.READY_FOR_PRODUCTION
      }
      if(req.action == 'Approval'){
        checkStatus = MaterialStatusEnum.MATERIAL_ALLOCATED
      }
      const data = `SELECT ma.sample_item_id AS sampleItemId,rp.rack_position_name AS location,position_Id AS id,item_type AS itemType,mai.quantity
      ,mai.allocate_quantity AS allocatedQty,mai.material_allocation_items_id as materialAllocationId  FROM material_allocation ma
      LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
      LEFT JOIN rack_position rp ON rp.position_Id = mai.location_id
       WHERE sample_item_id = ${req.sampleRequestItemId} and ma.status = '${checkStatus}'`
       const res = await this.dataSource.query(data)
       if(res.length > 0){
         return new CommonResponseModel(true,1,'data',res)
       }else{
        return new CommonResponseModel(false,0,'No data Found')

       }
    } 

    async approveAllocatedStock(req:AllocationApprovalRequest):Promise<CommonResponseModel>{
      console.log(req)
      const manager = new GenericTransactionManager(this.dataSource)
      try{
        let sampleUpdateStatus
        let sampleMaterialStatus
        await manager.startTransaction()
        if(req.action == 'Issued'){
          sampleUpdateStatus = LifeCycleStatusEnum.MATERIAL_ISSUED
          sampleMaterialStatus = MaterialStatusEnum.MATERIAL_ISSUED
        }
        if(req.action == 'Approval'){
          sampleUpdateStatus = LifeCycleStatusEnum.READY_FOR_PRODUCTION
          sampleMaterialStatus = MaterialStatusEnum.READY_FOR_PRODUCTION
        }
        const updateSamleReq = await manager.getRepository(SampleRequest).update({SampleRequestId:req.sampleRequestId},{lifeCycleStatus:sampleUpdateStatus})
        if(updateSamleReq.affected){
        const updateAllocations = await manager.getRepository(MaterialAllocationEntity).update({sampleOrderId:req.sampleRequestId},{status:sampleMaterialStatus})
          if(updateAllocations.affected){
            console.log('yess')
            await manager.completeTransaction()
            return new CommonResponseModel(true,1,req.action == 'Issued'?'Succefully Issued':'Successfully Approved')
          }else{
            await manager.releaseTransaction()
            return new CommonResponseModel(false,0,'something went wrong')
          }
        }else{
          await manager.releaseTransaction()
          return new CommonResponseModel(false,0,'something went wrong')
        }

      }catch(err){
        await manager.releaseTransaction()
        return new CommonResponseModel(false,0,err)
      }


    }
   
    async issueMaterial(req:MaterialIssueRequest):Promise<CommonResponseModel>{
      const manager = new GenericTransactionManager(this.dataSource)
      try{
        const grnInfo = `select grn_id,grn_type,item_type from grn where grn_id in(select grn_id from grn_items where grn_item_no = '${req.GRNItemNumber}')`;
        const grnRes = await this.dataSource.query(grnInfo)
        console.log(grnRes)
        await manager.startTransaction()
        if(grnRes.length > 0){
          const grnItemInfo = `select sample_item_id as sampleItemId,indent_item_id as indentItemId,sample_req_id as sampleReqId,m3_item_code_id as m3ItemId from grn_items where grn_item_no = '${req.GRNItemNumber}'`;
          const grnItemRes = await this.dataSource.query(grnItemInfo);
          // let sampleItemId
          // if(grnItemRes[0].sampleItemId > 0){
          //   sampleItemId = grnItemRes[0].sampleItemId
          // }
          // if(grnItemRes[0].indentItemId > 0){
          //   sampleItemId = grnItemRes[0].indentItemId
          // }
          const updateAllocations = await manager.getRepository(MaterialAllocationEntity).update({sampleOrderId:req.sampleRequestId,m3ItemId:grnItemRes[0].m3ItemId},{status:MaterialStatusEnum.MATERIAL_ISSUED})
          if(updateAllocations.affected){
            const checkAllIssuedOrNot = await manager.getRepository(MaterialAllocationEntity).find({where:{sampleOrderId:req.sampleRequestId,status:Not(MaterialStatusEnum.MATERIAL_ISSUED)}})
            console.log('resddd',checkAllIssuedOrNot)
            if(checkAllIssuedOrNot.length == 0){
              const updateSamleReq = await manager.getRepository(SampleRequest).update({SampleRequestId:req.sampleRequestId},{lifeCycleStatus:LifeCycleStatusEnum.MATERIAL_ISSUED})
              if(updateSamleReq.affected){
                //location Status update
                const allocatedLocationsQry = `SELECT SUM(quantity) AS stock,st.location_id as location FROM stocks st WHERE location_id IN(
                  SELECT location_id FROM material_allocation_items WHERE material_allocation_id IN(SELECT material_allocation_id FROM material_allocation
                  WHERE sample_order_id = ${req.sampleRequestId})) GROUP BY st.location_id`;
                const locationsRes = await this.dataSource.query(allocatedLocationsQry)
                for(const rec of locationsRes){
                  if(rec.stock == 0){
                    const updateLocation = await manager.getRepository(RackPositionEntity).update({positionId:rec.location},{status:RackPositionStatusEnum.NOTOCCUPIED})
                    if(updateLocation.affected){
                      await manager.completeTransaction()
                      return new CommonResponseModel(true,1,'Material Issued successfully')
                    }else{
                      await manager.completeTransaction()
                      return new CommonResponseModel(true,1,'Something went wrong in location update')
                    }
                  }else{
                    await manager.completeTransaction()
                    return new CommonResponseModel(true,1,'Material Issued successfully')
                  }
                }
                
              }else{
                await manager.releaseTransaction()
                return new CommonResponseModel(false,0,'Something went wrong')
              }
            }else{
                await manager.completeTransaction()
                return new CommonResponseModel(true,1,'Material Issued successfully')
            }
          }else{
            await manager.releaseTransaction()
             return new CommonResponseModel(false,0,'Something went wrong')
          }
          // let concatstr
          // if(grnRes[0].grn_type == GRNTypeEnum.SAMPLE_ORDER){
          //     if(grnRes[0].item_type == ItemTypeEnum.FABRIC){
          //       concatstr = ` left join sample_request_fabric_info sf on si.fabric_info_id = gi.sample_item_id`
          //     }else{
          //       concatstr = ` left join sample_request_trim_info sf on si.trim_info_id = gi.sample_item_id`
          //     }
          // }else {
          //     if(grnRes[0].item_type == ItemTypeEnum.FABRIC){
          //       concatstr = ` left join indent_fabric ii on ii.ifabric_id = gi.sample_item_id`
          //     }
          // }
        }else{
          await manager.releaseTransaction()
          return new CommonResponseModel(false,0,'Invalid Roll Barcode')
        }
      }catch(err){
        await manager.releaseTransaction()
        return new CommonResponseModel(false,0,err)
      }
      // const grnItemData = `select * from grn_items gi where grn_item_no = ${req.GRNItemNumber} `
      
      return
    }

    async getGrnRollsForSampleOrder(req:SampleOrderIdRequest):Promise<CommonResponseModel>{
      const grnInfoQry = `SELECT gi.grn_item_no as rollBarcode FROM material_allocation_items mai 
          LEFT JOIN stocks st ON st.id = mai.stock_id
          LEFT JOIN grn_items gi ON gi.grn_item_id = st.grn_item_id
          WHERE material_allocation_id IN
          (SELECT material_allocation_id FROM material_allocation WHERE sample_order_id = ${req.sampleRequestId})`
          const res = await this.dataSource.query(grnInfoQry)
          if(grnInfoQry.length > 0){
            return new CommonResponseModel(true,1,'data retreived',res)
          }else{
            return new CommonResponseModel(false,0,'No data found')
          }
    }

    async getmaterialissue(req?: RequestNoReq): Promise<CommonResponseModel> {
      try {
        const fabricInfoQry = `
          SELECT 
            sr.request_no AS requestNo,
            sr.sample_request_id ,
            rp.rack_position_name AS location,position_Id AS id,
            sr.life_cycle_status AS STATUS,
            sr.remarks,
            sr.description,
            sr.cost_ref,
            sr.contact,
            sr.expected_delivery_date,
            sr.user,
            sr.conversion,
            s.style,
            sf.fabric_code,
            sf.total_requirement,
            br.brand_name AS brandName,
            b.buyer_name AS buyerName,
            c.colour,
            b.buyer_code,
            sf.consumption,
            ma.item_type As itemType,
            mai.allocate_quantity,
            pr.profit_control_head,
            l.location_name AS location,
            mi.item_code AS itemCode,
            sf.fabric_info_id as sampleFabricId
            FROM sample_request sr 
            LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
            LEFT JOIN style s ON s.style_id = sr.style_id
            LEFT JOIN profit_control_head pr ON pr.profit_control_head_id = sr.profit_control_head_id
            LEFT JOIN brands br ON br.brand_id = sr.brand_id
            LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = sr.sample_request_id
            LEFT JOIN material_allocation ma ON ma.sample_item_id = sf.fabric_info_id
            LEFT JOIN sample_request_trim_info st ON st.sample_request_id = sr.sample_request_id
            LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
            LEFT JOIN m3_items mi ON mi.m3_items_Id = sf.fabric_code
            LEFT JOIN colour c ON c.colour_id = sf.colour_id
            LEFT JOIN location l ON l.location_id = mai.location_id
            LEFT JOIN rack_position rp ON rp.position_Id = mai.location_id

          WHERE ma.item_type = 'fabric' AND sr.life_cycle_status = 'MATERIAL_ISSUED' 
          ${req?.requestNo ? `AND sr.request_no = ${req.requestNo}` : ''}
          GROUP BY sr.request_no, sr.sample_request_id`        
        const fabricInfo = await this.dataSource.query(fabricInfoQry);
        // const trimInfo = await this.dataSource.query(trimInfoQry);
    
        const combineData = [...fabricInfo];
    
        if (combineData.length > 0) {
          return new CommonResponseModel(true, 1, 'Data retrieved', combineData);
        } else {
          return new CommonResponseModel(false, 0, 'No data');
        }
      } catch (error) {
        console.error('Error in getmaterialissue:', error);
        return new CommonResponseModel(false, 0, 'Error fetching data');
      }
    }

    // async getmaterialissue(req?: RequestNoReq): Promise<CommonResponseModel> {
    //   try {
    //     const combinedInfoQry = `
    //       SELECT 
    //         sr.request_no AS requestNo,
    //         sr.sample_request_id ,
    //         rp.rack_position_name AS location,position_Id AS id,
    //         sr.life_cycle_status AS STATUS,
    //         sr.remarks,
    //         sr.description,
    //         sr.cost_ref,
    //         sr.contact,
    //         sr.expected_delivery_date,
    //         sr.user,
    //         sr.conversion,
    //         s.style,
    //         sf.fabric_code,
    //         sf.total_requirement,
    //         br.brand_name AS brandName,
    //         b.buyer_name AS buyerName,
    //         c.colour,
    //         b.buyer_code,
    //         sf.consumption,
    //         ma.item_type As itemType,
    //         mai.allocate_quantity,
    //         pr.profit_control_head,
    //         l.location_name AS location,
    //         mi.item_code AS itemCode,
    //         sf.fabric_info_id as sampleFabricId
    //       FROM sample_request sr 
    //         LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
    //         LEFT JOIN style s ON s.style_id = sr.style_id
    //         LEFT JOIN profit_control_head pr ON pr.profit_control_head_id = sr.profit_control_head_id
    //         LEFT JOIN brands br ON br.brand_id = sr.brand_id
    //         LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = sr.sample_request_id
    //         LEFT JOIN material_allocation ma ON ma.sample_item_id = sf.fabric_info_id
    //         LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
    //         LEFT JOIN m3_items mi ON mi.m3_items_Id = sf.fabric_code
    //         LEFT JOIN colour c ON c.colour_id = sf.colour_id
    //         LEFT JOIN location l ON l.location_id = mai.location_id
    //         LEFT JOIN rack_position rp ON rp.position_Id = mai.location_id
    //       WHERE ma.item_type = 'fabric' AND sr.life_cycle_status = 'MATERIAL_ISSUED' 
    //         ${req?.requestNo ? `AND sr.request_no = ${req.requestNo}` : ''}
    //       GROUP BY sr.request_no, sr.sample_request_id
    
    //       UNION
    
    //       SELECT 
    //         sr.request_no AS requestNo,
    //         sr.sample_request_id ,
    //         rp.rack_position_name AS location,position_Id AS id,
    //         sr.life_cycle_status AS STATUS,
    //         sr.remarks,
    //         sr.description,
    //         sr.cost_ref,
    //         sr.contact,
    //         sr.expected_delivery_date,
    //         sr.user,
    //         sr.conversion,
    //         s.style,
    //         st.trim_code,
    //         br.brand_name AS brandName, 
    //         b.buyer_name AS buyerName,
    //         c.colour,
    //         b.buyer_code,
    //         st.consumption,
    //         ma.item_type AS itemType,
    //         mai.allocate_quantity,
    //         pr.profit_control_head,
    //         l.location_name AS location,
    //         mi.trim_code as itemCode,
    //         st.trim_info_id as sampleTrimInfoId
    //       FROM sample_request sr 
    //         LEFT JOIN profit_control_head pr ON pr.profit_control_head_id = sr.profit_control_head_id
    //         LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
    //         LEFT JOIN style s ON s.style_id = sr.style_id
    //         LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = sr.sample_request_id
    //         LEFT JOIN brands br ON br.brand_id = sr.brand_id
    //         LEFT JOIN colour c ON c.colour_id = sf.colour_id
    //         LEFT JOIN sample_request_trim_info st ON st.sample_request_id = sr.sample_request_id
    //         LEFT JOIN material_allocation ma ON ma.sample_item_id = st.trim_info_id
    //         LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
    //         LEFT JOIN m3_trims mi ON mi.m3_trim_Id = st.trim_code
    //         LEFT JOIN location l ON l.location_id = mai.location_id
    //         LEFT JOIN rack_position rp ON rp.position_Id = mai.location_id
    //       WHERE ma.item_type != 'fabric' AND sr.life_cycle_status = 'MATERIAL_ISSUED'
    //         ${req?.requestNo ? `AND sr.request_no = ${req.requestNo}` : ''}
    //       GROUP BY l.location_name, sr.request_no, sr.sample_request_id`;
        
    //     const combinedInfo = await this.dataSource.query(combinedInfoQry);
        
    //     if (combinedInfo.length > 0) {
    //       return new CommonResponseModel(true, 1, 'Data retrieved', combinedInfo);
    //     } else {
    //       return new CommonResponseModel(false, 0, 'No data');
    //     }
    //   } catch (error) {
    //     console.error('Error in getmaterialissue:', error);
    //     return new CommonResponseModel(false, 0, 'Error fetching data');
    //   }
    // }
    
  
  async getRequestNo(req?:RequestNoReq): Promise<CommonResponseModel> {
   
    const records = await this.sampleRepo.find({where:{lifeCycleStatus:LifeCycleStatusEnum.MATERIAL_ISSUED}});
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async allocatedLocation(req:AllLocationRequest){
    // let checkStatus
    // if(req.action == 'Issued'){
    //   checkStatus = MaterialStatusEnum.READY_FOR_PRODUCTION
    // }
    // if(req.action == 'Approval'){
    //   checkStatus = MaterialStatusEnum.MATERIAL_ALLOCATED
    // }
    console.log('Sample Request Item ID:', req.sampleRequestItemId);

    const data = `SELECT ma.sample_item_id AS sampleItemId,rp.rack_position_name AS location,position_Id AS id,item_type AS itemType,mai.quantity
    ,mai.allocate_quantity AS allocatedQty,mai.material_allocation_items_id as materialAllocationId  FROM material_allocation ma
    LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
    LEFT JOIN rack_position rp ON rp.position_Id = mai.location_id
    `
     const res = await this.dataSource.query(data)
     if(res.length > 0){
       return new CommonResponseModel(true,1,'data',res)
     }else{
      return new CommonResponseModel(false,0,'No data Found')

     }
  } 
   async getbyID(req: RequestNoReq): Promise<CommonResponseModel> {
    console.log(req, "service.....");
 
    try {
      const fabricInfoQry = `
        SELECT 
          sr.request_no AS requestNo,
          sr.sample_request_id AS id,
          sr.life_cycle_status AS STATUS,
          sr.remarks,
          sr.description,
          sr.cost_ref,
          sr.contact,
          sr.expected_delivery_date,
          sr.user,
          sr.conversion,
          s.style,
          sf.fabric_code,
          sf.total_requirement,
          br.brand_name AS brandName,
          b.buyer_name AS buyerName,
          c.colour,
          b.buyer_code,
          sf.consumption,
          ma.item_type As itemType,
          mai.allocate_quantity,
          pr.profit_control_head,
          l.location_name AS location,
          mi.item_code AS itemCode
        FROM sample_request sr 
          LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
          LEFT JOIN style s ON s.style_id = sr.style_id
          LEFT JOIN profit_control_head pr ON pr.profit_control_head_id = sr.profit_control_head_id
          LEFT JOIN brands br ON br.brand_id = sr.brand_id
          LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = sr.sample_request_id
          LEFT JOIN material_allocation ma ON ma.sample_item_id = sf.fabric_info_id
          LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
          LEFT JOIN m3_items mi ON mi.m3_items_Id = sf.fabric_code
          LEFT JOIN colour c ON c.colour_id = sf.colour_id
          LEFT JOIN location l ON l.location_id = mai.location_id
        WHERE sr.sample_request_id = ${req.sampreqId} AND 
        ma.item_type = 'fabric' AND sr.life_cycle_status = 'MATERIAL_ISSUED'
        GROUP BY sr.request_no`;
  
      const trimInfoQry = `
        SELECT 
          sr.request_no AS requestNo,
          sr.sample_request_id AS id,
          sr.life_cycle_status AS STATUS,
          sr.remarks,
          sr.description,
          sr.cost_ref,
          sr.contact,
          sr.expected_delivery_date,
          sr.user,
          sr.conversion,
          s.style,
          st.trim_code,
          br.brand_name AS brandName, 
          b.buyer_name AS buyerName,
          c.colour,
          b.buyer_code,
          st.consumption,
          ma.item_type AS itemType,
          mai.allocate_quantity,
          pr.profit_control_head,
          l.location_name AS location,
          mi.trim_code AS itemCode
        FROM sample_request sr 
          LEFT JOIN profit_control_head pr ON pr.profit_control_head_id = sr.profit_control_head_id
          LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
          LEFT JOIN style s ON s.style_id = sr.style_id
          LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = sr.sample_request_id
          LEFT JOIN brands br ON br.brand_id = sr.brand_id
          LEFT JOIN colour c ON c.colour_id = sf.colour_id
          LEFT JOIN sample_request_trim_info st ON st.sample_request_id = sr.sample_request_id
          LEFT JOIN material_allocation ma ON ma.sample_item_id = st.trim_info_id
          LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
          LEFT JOIN m3_trims mi ON mi.m3_trim_Id = st.trim_code
          LEFT JOIN location l ON l.location_id = mai.location_id
        WHERE sr.sample_request_id = ${req.sampreqId} AND ma.item_type != 'fabric' AND sr.life_cycle_status = 'MATERIAL_ISSUED'
        GROUP BY l.location_name, sr.request_no`;
  
      console.log('Fabric Info Query:', fabricInfoQry);
      console.log('SQL Query:', trimInfoQry);
  
      const fabricInfo = await this.dataSource.query(fabricInfoQry);
      const trimInfo = await this.dataSource.query(trimInfoQry);
  
      const combineData = [...fabricInfo, ...trimInfo];
  
      if (combineData.length > 0) {
        return new CommonResponseModel(true, 1, 'Data retrieved', combineData);
      } else {
        return new CommonResponseModel(false, 0, 'No data');
      }
    } catch (error) {
      console.error('Error in getbyID:', error);
      return new CommonResponseModel(false, 0, 'Error fetching data');
    }
  }

  async getPickListInfo(req?:requestNoReq):Promise<CommonResponseModel>{
    let fabricInfoQry = `SELECT sr.request_no AS requestNo,br.brand_name AS brandName,b.buyer_name AS buyerName,s.style,c.colour,sf.total_requirement AS consumption,ma.item_type AS itemType,mai.allocate_quantity AS allocateQty,
    l.rack_position_name AS location,mi.item_code AS itemCode
    FROM sample_request sr 
     LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
     LEFT JOIN style s ON s.style_id = sr.style_id
     LEFT JOIN brands br ON br.brand_id = sr.brand_id
     LEFT JOIN sample_request_fabric_info sf ON sf.sample_request_id = sr.sample_request_id
     LEFT JOIN material_allocation ma ON ma.sample_item_id = sf.fabric_info_id
     LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
     LEFT JOIN m3_items mi ON mi.m3_items_Id = ma.m3_item_id
     LEFT JOIN colour c ON c.colour_id = sf.colour_id
     LEFT JOIN rack_position l ON l.position_Id = mai.location_id
    WHERE  sr.sample_request_id= '${req.requestNo}' AND ma.item_type = 'fabric'
    GROUP BY rack_position_name`;
      
      const fabricInfo = await this.dataSource.query(fabricInfoQry)
     
      let trimInfoQry = `SELECT sr.request_no AS requestNo,
br.brand_name AS brandName,
b.buyer_name AS buyerName,
s.style,
ma.item_type AS itemType,
st.total_requirement AS consumption,
mai.allocate_quantity AS allocateQty,
l.rack_position_name AS location,
mi.item_code AS itemCode
FROM sample_request sr 
 LEFT JOIN buyers b ON b.buyer_id = sr.buyer_id
 LEFT JOIN style s ON s.style_id = sr.style_id
 LEFT JOIN brands br ON br.brand_id = sr.brand_id
 LEFT JOIN sample_request_trim_info st ON st.sample_request_id = sr.sample_request_id
 LEFT JOIN material_allocation ma ON ma.sample_item_id = st.trim_info_id
 LEFT JOIN material_allocation_items mai ON mai.material_allocation_id = ma.material_allocation_id
 LEFT JOIN m3_items mi ON mi.m3_items_Id = ma.m3_item_id
 LEFT JOIN rack_position l ON l.position_Id = mai.location_id
WHERE  sr.sample_request_id= '${req.requestNo}' AND  ma.item_type != 'fabric'
GROUP BY rack_position_name`;

const trimInfo = await this.dataSource.query(trimInfoQry)

const combineData = [...fabricInfo, ...trimInfo]
return new CommonResponseModel(true,1,'data retreived',combineData)

// let allocatedSampleReqInfo = {
//   fabricInfo:[],
//   trimInfo:[]
// }
// if(fabricInfo.length > 0){
//   allocatedSampleReqInfo.fabricInfo = fabricInfo
// }
// if(trimInfo.length > 0){
//   allocatedSampleReqInfo.trimInfo = trimInfo
// }
// if(fabricInfo.length > 0){
//   return new CommonResponseModel(true,1,'data retreived',combineData)
// }else{
//   return new CommonResponseModel(false,0,'No data')
// }
}

//mobile APP API for operation reporting UI
async getSizeWiseOrders(req:SampleOrderIdRequest):Promise<CommonResponseModel>{
  const dataQry = `SELECT ss.quantity,sr.request_no as requestNo,c.colour,s.sizes FROM sample_request_size_info ss
  LEFT JOIN sample_request sr ON sr.sample_request_id = ss.sample_request_id
  LEFT JOIN colour c ON c.colour_id = ss.colour_id
  LEFT JOIN size s ON s.size_id = ss.size_id where ss.sample_request_id = ${req.sampleRequestId}`
  const data  = await this.dataSource.query(dataQry)
  if(dataQry.length > 0){
    return new CommonResponseModel(true,1,'data retreived',data)
  }else{
    return new CommonResponseModel(false,0,'No data')
  }
}


}