import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricRequestCodeEntity } from './entities/fabric-request-code-entity';
import { FabricRequestCodeDto } from './dtos/fabric-request-code.dto';
import { CommonResponseModel, FabricCodeReq, MaterialFabricEnum,FabricRequestResponseModel,M3FabricsDTO, UpdateIdReq } from '@project-management-system/shared-models';

@Injectable()
export class FabricReqCodeService {
    constructor(
        @InjectRepository(FabricRequestCodeEntity) 
        private fabricReqRepo: Repository<FabricRequestCodeEntity>,
        private readonly dataSource: DataSource,
      ) { }

      async createFabricRequestedCode(dto: FabricRequestCodeDto): Promise<CommonResponseModel> {
        try {
            const reqEntity = new FabricRequestCodeEntity()
            reqEntity.buyerId = dto.buyerId
            reqEntity.contentId = dto.contentId
            reqEntity.epiConstruction = dto.epiConstruction
            reqEntity.fabricTypeId = dto.fabricTypeId
            reqEntity.finishId = dto.finishId
            reqEntity.hsnCode = dto.hsnCode
            reqEntity.m3Code = dto.m3Code
            reqEntity.ppiConstruction = dto.ppiConstruction
            reqEntity.shrinkage = dto.shrinkage
            reqEntity.status = MaterialFabricEnum.OPEN
            reqEntity.weaveId = dto.weaveId
            reqEntity.weight = dto.weight
            reqEntity.weightUnit = dto.weightUnit
            reqEntity.width = dto.width
            reqEntity.widthUnit = dto.widthUnit
            reqEntity.yarnType = dto.yarnType
        
            const saveFabricReq = await this.fabricReqRepo.save(reqEntity)
       
         if (saveFabricReq) {
          const response = new CommonResponseModel(true,1, 'Requested Fabric Code created successfully' ,saveFabricReq);
          return response;
        } else {
          throw new ErrorResponse(11106,'Requested Fabric Code creation failed');
        }
      }
      catch (error) {
        return error;
      }
    }

    /**
     * gets all   Item categories details  
     * @returns all the  Item category details .
     */
    // @LogActions({ isAsync: true })
    async getAllFabrics(req?:FabricCodeReq): Promise<FabricRequestResponseModel> {  
       try{
        console.log(req.status,',,,,,,,,,,,,,,')
        let query =''
        if(req.status ==='OPEN'){
        query =`SELECT frc.fabric_request_code_id AS fabricRequestCodeId,frc.fabric_type_id AS fabricTypeId,ft.fabric_type_name AS fabricType,
        frc.weave_id AS weaveId,fw.fabric_weave_name AS fabricWeave,
        frc.weight,frc.weight_unit AS weightUnitId,uwt.uom AS weightUom,
        frc.epi_construction as epi,frc.ppi_construction as ppi,frc.yarn_type as yarnType,
        frc.width,frc.width_unit AS widthUnit,uwd.uom AS widthUom,
        frc.finish_id,fft.fabric_finish_type AS finishType,
        frc.shrinkage,frc.buyer_id,b.buyer_name AS buyerName,
        frc.content_id,c.content,
        frc.hsn_code as hsnCode,frc.m3_code as m3Code,frc.status
        FROM fabric_request_code frc
        LEFT JOIN fabric_type ft ON ft.fabric_type_id = frc.fabric_type_id
        LEFT JOIN fabric_weave fw ON fw.fabric_weave_id = frc.weave_id
        LEFT JOIN uom uwt ON uwt.id = frc.weight_unit
        LEFT JOIN uom uwd ON uwd.id = frc.width_unit
        LEFT JOIN fabric_finish_types fft ON fft.fabric_finish_type_id = frc.finish_id
        LEFT JOIN buyers b ON b.buyer_id = frc.buyer_id
        LEFT JOIN content c ON c.content_id = frc.content_id
        WHERE 1=1`
        if (req.ExternalRefNo && req.ExternalRefNo!=null){
          query += ` AND b.external_ref_number = '${req.ExternalRefNo}'`
        }
        if (req?.buyerId) {
          query = query + ` AND frc.buyer_id=${req.buyerId}`
        }
        if (req?.hsnCode) {
          query = query + ` AND frc.hsn_code='${req.hsnCode}'`
        }
        if (req?.fabricTypeId) {
          query = query + ` AND frc.fabric_type_id='${req.fabricTypeId}'`
        }
        if (req?.weaveId) {
          query = query + ` AND frc.weave_id=${req.weaveId}`
        }
        if (req?.finishType) {
          query = query + ` AND frc.finish_id=${req.finishType}`
        }
        if (req?.contentId) {
          query = query + ` AND frc.content_id='${req.contentId}'`
        }
        if (req?.status) {
          query = query + ` AND frc.status='${req.status}'`
        }
      }

      if(req.status === 'COMPLETED'){
        query = `SELECT frc.fabric_request_code_id,frc.status,frc.fabric_type_id AS fabricTypeId,
        ft.fabric_type_name AS fabricType,
        frc.buyer_id,b.buyer_name AS buyerName,
        m3i.weave AS weaveId, fw.fabric_weave_name AS fabricWeave,
        m3i.weight,m3i.weight_unit AS weightUnitId,u.uom AS weightUom,
        m3i.epi_construction AS epi,m3i.ppi_construction AS ppi,
        m3i.yarn_type AS yarnType,
        m3i.finish_id,fft.fabric_finish_type AS finishType,
        m3fc.content AS content_id, c.content,
        m3i.width, m3i.width_unit AS widthUnit,uom.uom AS widthUom, m3i.shrinkage,
        m3i.hsn_code AS hsnCode,m3i.m3_code AS m3Code
        FROM fabric_request_code frc
        LEFT JOIN m3_items m3i ON m3i.m3_items_id = frc.m3_item_id
        LEFT JOIN fabric_type ft ON ft.fabric_type_id = frc.fabric_type_id
        LEFT JOIN buyers b ON b.buyer_id = frc.buyer_id
        LEFT JOIN fabric_weave fw ON fw.fabric_weave_id = m3i.weave
        LEFT JOIN fabric_finish_types fft ON fft.fabric_finish_type_id = m3i.finish_id
        LEFT JOIN m3_fabric_content m3fc ON m3fc.m3_items_id = m3i.m3_items_id
        LEFT JOIN content c ON c.content_id = m3fc.content
        LEFT JOIN uom u ON u.id = m3i.weight_unit
        LEFT JOIN uom uom ON uom.id = m3i.weight_unit
        WHERE frc.status = 'completed'`
        if (req?.buyerId) {
          query = query + ` AND frc.buyer_id=${req.buyerId}`
        }
        if (req?.hsnCode) {
          query = query + ` AND m3i.hsn_code='${req.hsnCode}'`
        }
        if (req?.fabricTypeId) {
          query = query + ` AND frc.fabric_type_id='${req.fabricTypeId}'`
        }
        if (req?.weaveId) {
          query = query + ` AND m3i.weave=${req.weaveId}`
        }
        if (req?.finishType) {
          query = query + ` AND m3i.finish_id=${req.finishType}`
        }
        if (req?.contentId) {
          query = query + ` AND m3fc.content='${req.contentId}'`
        }
        if (req?.status) {
          query = query + ` AND frc.status='${req.status}'`
        }
      }
        const data = await this.dataSource.query(query)
        let response:M3FabricsDTO[] = [];
        for(const res of data){
          // console.log("**********");
          // console.log(res);
          // console.log("************")
          let rec = new M3FabricsDTO(res.fabricRequestCodeId,res.buyer_id,"",res.fabricTypeId,res.weaveId,res.weight,res.weightUnitId,res.epi,res.ppi,res.yarnType,res.width,res.widthUnit,res.finish_id,res.shrinkage,"",res.buyerName,res.m3Code,res.hsnCode,[],[{"content":res.content_id,"percentage":"100"}],true,"","",0,"",res.fabricType,res.status,res.fabricWeave,res.weightUom,res.widthUom,res.finishType,res.content);
          response.push(rec);
        }
        if(response.length >0){
            return new FabricRequestResponseModel(true,1,'Data retrieved successfully',response)
        }else{
            return new FabricRequestResponseModel(false,0,'No data found',[])

        }
       }catch(err){
        throw(err)
       }
    }

    async getAllFabricBuyers(req?:any):Promise<CommonResponseModel>{
      try{
        let query = `SELECT frc.buyer_id, b.buyer_name AS buyerName 
        FROM fabric_request_code frc
        LEFT JOIN buyers b ON b.buyer_id = frc.buyer_id
        WHERE b.buyer_name is not null
       `
        if(req.buyerRefNo){
            query = query + ` AND b.external_ref_number='${req.buyerRefNo}'`
 
          // data.where(`b.external_ref_number = '${refNo}'`)
         }
         query+= ` GROUP BY frc.buyer_id ORDER BY b.buyer_name`

        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true,1,'Data retrieved successfully',data)
      }else{
          return new CommonResponseModel(false,0,'No data found',[])
      }
      }catch(err){
        throw(err)
      }
    }

    async getAllFabricTypes():Promise<CommonResponseModel>{
      try{
        let query = `SELECT frc.fabric_type_id,ft.fabric_type_name AS fabricType
        FROM fabric_request_code frc
        LEFT JOIN fabric_type ft ON ft.fabric_type_id = frc.fabric_type_id
        WHERE ft.fabric_type_name is not null
        GROUP BY frc.fabric_type_id
        ORDER BY ft.fabric_type_name`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true,1,'Data retrieved successfully',data)
      }else{
          return new CommonResponseModel(false,0,'No data found',[])
      }
      }catch(err){
        throw(err)
      }
    }

    async getAllWeaves():Promise<CommonResponseModel>{
      try{
        let query = `SELECT frc.weave_id AS weaveId,fw.fabric_weave_name AS fabricWeave
        FROM fabric_request_code frc
        LEFT JOIN fabric_weave fw ON fw.fabric_weave_id = frc.weave_id
        WHERE fw.fabric_weave_name is not null
        GROUP BY frc.weave_id
        ORDER BY fw.fabric_weave_name`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true,1,'Data retrieved successfully',data)
      }else{
          return new CommonResponseModel(false,0,'No data found',[])
      }
      }catch(err){
        throw(err)
      }
    }

    async getAllFinish():Promise<CommonResponseModel>{
      try{
        let query = `SELECT frc.finish_id,fft.fabric_finish_type AS finishType
        FROM fabric_request_code frc
        LEFT JOIN fabric_finish_types fft ON fft.fabric_finish_type_id = frc.finish_id
        WHERE fft.fabric_finish_type is not null
        GROUP BY frc.finish_id
        ORDER BY fft.fabric_finish_type`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true,1,'Data retrieved successfully',data)
      }else{
          return new CommonResponseModel(false,0,'No data found',[])
      }
      }catch(err){
        throw(err)
      }
    }

    async getContents():Promise<CommonResponseModel>{
      try{
        let query = `SELECT frc.content_id,c.content
        FROM fabric_request_code frc
        LEFT JOIN content c ON c.content_id = frc.content_id
        WHERE c.content IS NOT NULL
        GROUP BY frc.content_id
        ORDER BY c.content`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true,1,'Data retrieved successfully',data)
      }else{
          return new CommonResponseModel(false,0,'No data found',[])
      }
      }catch(err){
        throw(err)
      }
    }

    async getAllHSNCodes():Promise<CommonResponseModel>{
      try{
        let query = `SELECT hsn_code as hsnCode FROM fabric_request_code WHERE hsn_code is not null GROUP BY hsn_code ORDER BY hsn_code`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true,1,'Data retrieved successfully',data)
      }else{
          return new CommonResponseModel(false,0,'No data found',[])
      }
      }catch(err){
        throw(err)
      }
    }

    async updateFabStatus(req?:UpdateIdReq):Promise<CommonResponseModel>{
      try{
        console.log(req,'---------')
        let query = `update fabric_request_code set status='completed', m3_item_id = ${req.m3ItemsId} where fabric_request_code_id = ${req.id}`;
        const data = await this.dataSource.query(query)
        if(data.affectedRows > 0){
          return new CommonResponseModel(true,1,'Status Updated successfully',data)
      }else{
          return new CommonResponseModel(false,0,'No data found',[])
      }
      }catch(err){
        throw(err)
      }
    }

    async updateTrimStatus(req?:UpdateIdReq):Promise<CommonResponseModel>{
      try{
        console.log("req**********");
        console.log(req);
        let query = `update trim_request_code set status='completed',m3_trim_id = ${req.m3ItemsId} where trim_request_code_id = ${req.id}`;
        const data = await this.dataSource.query(query)
        console.log(data);
        if(data.affectedRows > 0){
          return new CommonResponseModel(true,1,'Status Updated successfully',data)
      }else{
          return new CommonResponseModel(false,0,'No data found',[])
      }
      }catch(err){
        throw(err)
      }
    }
    
}
