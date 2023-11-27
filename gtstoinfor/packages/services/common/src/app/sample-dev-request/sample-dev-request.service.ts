import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Raw, Repository } from 'typeorm';
import { SampleRequest } from './entities/sample-dev-request.entity';
import { AllSampleDevReqResponseModel, CommonResponseModel, FabricInfoReq, MaterialIssueDto, MaterialStatusEnum, ProductGroupReq, SampleDevelopmentRequest, SampleDevelopmentStatusEnum, SampleFilterRequest, SampleRequestFilter, SamplerawmaterialStausReq, SourcingRequisitionReq, TrimInfoReq, UploadResponse, buyerReq, buyerandM3ItemIdReq, statusReq } from '@project-management-system/shared-models';
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

    
  ) { }


  async getAllSampleDevData(request?: SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    try {
      const details = await this.sampleRepo.getAllSampleDevData(request)
      console.log(details)
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^66')
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

  async getAllSampleReqDropDown(): Promise<CommonResponseModel> {
    const details = await this.sampleRepo.getAllSampleReqDropDown();
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
    try {
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
      for (const fabricObj of req.fabricInfo) {
        console.log(fabricObj, '##############################################')
        const fabricEntity = new SampleReqFabricinfoEntity()
        fabricEntity.fabricCode = fabricObj.fabricCode
        fabricEntity.colourId = fabricObj.colourId
        fabricEntity.consumption = fabricObj.consumption
        fabricEntity.uomId = fabricObj.uomId
        fabricEntity.remarks = fabricObj.remarks
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
        sampleTrimInfo.push(trimEntity)
        const trimInfoReq = new TrimInfoReq(trimObj.trimType,trimObj.trimCode,trimObj.consumption,trimObj.uomId,trimObj.remarks)
        indentTrimInfo.push(trimInfoReq);
        
      }
      sampleReqEntity.sampleTrimInfo = sampleTrimInfo
      for (const processObj of req.processInfo) {
        const processEntity = new SampleRequestProcessInfoEntity()
        processEntity.process = processObj.process
        processEntity.description = processObj.description
        sampleProcessInfo.push(processEntity)
      }
      sampleReqEntity.sampleProcessInfo = sampleProcessInfo

      save = await this.sampleRepo.save(sampleReqEntity)
      if (save) {
        if (req.fabricInfo) {
          for (const fabricData of req.fabricInfo) {
            const quantityWithWastage = Number(fabricData.consumption) + Number((2 / 100) * fabricData.consumption)
            const bomEntity = new SamplingbomEntity()
            bomEntity.sampleRequestId = save.SampleRequestId
            bomEntity.colourId = fabricData.colourId
            bomEntity.m3ItemId=fabricData.fabricCode
            bomEntity.itemType='Fabric'
            bomEntity.requiredQuantity = quantityWithWastage ? quantityWithWastage : 0
            saveBomDetails = await this.bomRepo.save(bomEntity)
          }
        }
        if (req.trimInfo) {
          for (const trimData of req.trimInfo) {
            const bomEntity = new SamplingbomEntity()
            bomEntity.sampleRequestId = save.SampleRequestId
            bomEntity.itemType=trimData.trimType
            bomEntity.m3ItemId=trimData.trimCode
            bomEntity.colourId = trimData.colourId
            saveBomDetails = await this.bomRepo.save(bomEntity)
          }
        }

      }
      if (save && saveBomDetails) {
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
    let rawData = `SELECT sb.rm_item_id as rmItemId,sb.colour_id as colourId,sr.m3_style_no as m3StleNo,sr.style_id as styleId,sb.sampling_bom_id,sr.sample_request_id, sr.request_no AS requestNo, sr.m3_style_no, sb.rm_item_id, ri.item_code, sb.required_quantity as requiredQuantity,sb.created_at, sb.assigned_quantity,sb.colour_id,co.colour,st.style,bu.buyer_name,pg.product_group,ss.quantity,fa.name   FROM sampling_bom sb LEFT JOIN sample_request sr ON sb.sample_request_id = sr.sample_request_id LEFT JOIN rm_items ri ON ri.rm_item_id LEFT JOIN colour co ON co.colour_id = sb.colour_id  LEFT JOIN style st ON st.style_id = sr.style_id LEFT JOIN buyers bu ON bu.buyer_id = sr.buyer_id LEFT JOIN product_group pg ON pg.product_group_id = sb.product_group_id LEFT JOIN stocks ss ON ss.item_type_id = sb.rm_item_id LEFT JOIN factory fa ON fa.id=sr.facility_id WHERE sr.sample_request_id IS NOT NULL `;
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


  async getSampleRequestReport(req?: SamplerawmaterialStausReq):Promise<CommonResponseModel>{
    try{
      console.log(req.buyerId)
      console.log(req.sampleReqNo)
      console.log(req.styleId)

      console.log('&&&&&&&&&&&&&&&&&&&&&&&77')
      const manager = this.dataSource;
      // const query='SELECT ss.quantity AS availabeQuantity,st.style AS styleName,b.buyer_name AS buyerName,"Fabric" AS fabricType,s.request_no AS sampleReqNo,mi.item_code AS itemCode, i.request_no AS indentCode,i.indent_id AS indentId,i.status,ifc.quantity FROM indent i LEFT JOIN indent_fabric ifc ON i.indent_id=ifc.indent_id LEFT JOIN m3_items mi ON mi.m3_items_Id=ifc.m3_fabric_code  LEFT JOIN sample_request s ON s.sample_request_id=i.sample_request_id  LEFT JOIN buyers b ON b.buyer_id=s.buyer_id LEFT JOIN style st ON st.style_id=s.style_id  LEFT JOIN stocks ss ON ss.m3_item = ifc.m3_fabric_code AND ss.item_type IN ("fabric") AND ss.buyer_id=s.buyer_id WHERE ss.quantity IS NULL UNION ALL  SELECT ss.quantity AS availabeQuantity,st.style AS stylename,b.buyer_name AS buyername,mt.trim_type AS fabricType,s.request_no AS sampleReqNo, mt.trim_code AS itemCode,i.request_no AS indentCode,i.indent_id AS indentId,i.status,it.quantity  FROM indent i  LEFT JOIN indent_trims it ON it.indent_id =i.indent_id LEFT JOIN sample_request s ON s.sample_request_id=i.sample_request_id  LEFT JOIN m3_trims mt ON it.trim_code =mt.m3_trim_Id      LEFT JOIN buyers b ON b.buyer_id=s.buyer_id  LEFT JOIN style st ON st.style_id=s.style_id  LEFT JOIN stocks ss ON ss.m3_item=it.trim_code AND ss.item_type NOT IN("fabric") AND ss.buyer_id=s.buyer_id    WHERE ss.quantity IS NULL '
      let query3
      let query1='SELECT rp.rack_position_name as locationName,brand_name as brandName, s.style AS styleName,sr.life_cycle_status AS lifeCycleStatus,b.buyer_name AS buyername,sr.request_no AS sampleReqNo,c.colour AS colourName, mi.item_code AS itemCode,sb.sample_request_id AS sampleRequestid,sb.item_type AS itemType,sb.m3_item_id AS m3ItemId,sb.required_quantity AS requiredQuantity, sb.received_quantity AS receivedQuantity,sb.colour_id AS colorId,st.quantity AS avilableQuantity FROM sampling_bom sb      LEFT JOIN  sample_request_fabric_info srf ON srf.fabric_code=sb.m3_item_id LEFT JOIN sample_request sr ON sr.sample_request_id=sb.sample_request_id   LEFT JOIN stocks st ON st.m3_item =sb.m3_item_id AND sr.buyer_id=st.buyer_id AND st.item_type IN("fabric")  LEFT JOIN m3_items mi ON mi.m3_items_Id=sb.m3_item_id  LEFT JOIN colour c ON c.colour_id=sb.colour_id LEFT JOIN buyers b ON b.buyer_id=sr.buyer_id LEFT JOIN style s ON s.style_id=sr.style_id left join brands bs on bs.brand_id=sr.brand_id left join rack_position rp on rp.position_Id =sr.location_id WHERE sb.item_type IN("Fabric")  AND st.quantity IS NULL '
      let query2='select rp.rack_position_name as locationName,brand_name as brandName, s.style as styleName,sr.life_cycle_status AS lifeCycleStatus,b.buyer_name AS buyername,sr.request_no AS sampleReqNo,c.colour AS colourName,mi.trim_code AS itemCode,sb.sample_request_id AS sampleRequestid,sb.item_type AS itemType,sb.m3_item_id AS m3ItemId,sb.required_quantity AS requiredQuantity,sb.received_quantity AS receivedQuantity,sb.colour_id AS colorId,st.quantity AS avilableQuantity FROM sampling_bom sb LEFT JOIN sample_request_trim_info srt ON srt.trim_code=sb.m3_item_id LEFT JOIN sample_request sr ON sr.sample_request_id=sb.sample_request_id LEFT JOIN stocks st ON st.m3_item =sb.m3_item_id AND sr.buyer_id=st.buyer_id AND st.item_type IN("fabric") LEFT JOIN m3_trims mi ON mi.m3_trim_Id=sb.m3_item_id  LEFT JOIN colour c ON c.colour_id=sb.colour_id   LEFT JOIN buyers b ON b.buyer_id=sr.buyer_id LEFT JOIN style s ON s.style_id=sr.style_id left join brands bs on bs.brand_id=sr.brand_id left join rack_position rp on rp.position_Id =sr.location_id WHERE sb.item_type NOT IN ("Fabric")  AND st.quantity IS NULL'
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
          if (!result[sampleReqNo]) {
            result[sampleReqNo] = {
              sampleReqNo: sampleReqNo,
              buyerName: buyername,
              status: status,
              stylename:styleName,
              locationName:locationName,
              brandName:brandName,
              sm: [],
            };
          }
  
          result[sampleReqNo].sm.push(
            {
              sampleRequestid:item.sampleRequestid,
              colourName:item.colourName,
              itemCode:item.itemCode,
              fabricType: item.itemType,
              quantity: item.requiredQuantity,
              assignedQuantity:item.assigned_quantity
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
        const query ='SELECT st.item_type AS itemType,g.grn_number AS grnNumber,r.rack_position_name,st.id AS stockId,st.m3_item AS m3ItemId,st.buyer_id AS buyerId,st.item_type AS itemType, st.location_id AS locationId,st.quantity,st.grn_item_id AS grnItemId,stock_bar_code AS stockBarCode FROM stocks st   LEFT JOIN rack_position r ON r.position_Id=st.location_id LEFT JOIN grn_items gi ON gi.grn_item_id=st.grn_item_id LEFT JOIN grn g ON g.grn_id=gi.grn_id  WHERE st.buyer_id='+req.buyerId+' AND st.m3_item= '+req.m3ItemId+''
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

  

    async creatematerialAlloction(req:MaterialAllocationDTO[], isUpdate: boolean):Promise<CommonResponseModel>{
      try{
        let save
        for(const data of req){
          console.log(req)
          console.log('%%%%%%%%%%%%%%%%%%%%%%')
          const entity = new MaterialAllocationEntity()
          // entity.LocationId=data.LocationId
          entity.itemType=data.itemType
          entity.sampleOrderId=data.sampleOrderId
          entity.sampleItemId=data.sampleItemId
          entity.m3ItemId=data.m3ItemId
          entity.m3ItemId=data.m3ItemId
          // entity.quantity=data.quantity
          // entity.quantity=data.quantity
          // entity.stockId=data.stockId
          entity.status = MaterialStatusEnum.APPROVAL_PENDING
          // entity.allocateQuantity=data.allocateQuantity
           save = await this.matAllRepo.save(entity)
        }
        if(save){
          return new CommonResponseModel(true,1,'Material Allocation Request Raise')
        }else{
          return new CommonResponseModel(false,1,'Something Went Wrong',[])

        }
      }
      catch(err){
        throw err
      }
    }


    async updateStatus(req?:statusReq): Promise<CommonResponseModel> {
      try {
        const update = await this.matAllRepo.update(
          { materialAllocationId: req.materialAllocationId },
          { status: MaterialStatusEnum.APPROVED }
        );
    
        if (update.affected && update.affected > 0) {
          return new CommonResponseModel(true, 1, 'Approved Sucessfully');
        } else {
          return new CommonResponseModel(false, 1, 'some went wrong');
        }
      } catch (err) {
        throw err;
      }
    }
    
    
    


}