import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricRequestCodeDto } from './dtos/fabric-request-code.dto';
import { BuyerRefNoRequest, CommonResponseModel, M3TrimType, M3trimsDTO, MaterialFabricEnum, TrimCodeReq } from '@project-management-system/shared-models';
import { TrimRequestCodeEntity } from './entities/trim-request-code.entity';
import { TrimRequestCodeDto } from './dtos/trim-request-code.dto';

@Injectable()
export class TrimReqCodeService {
    constructor(
        @InjectRepository(TrimRequestCodeEntity) 
        private trimReqRepo: Repository<TrimRequestCodeEntity>,
        private readonly dataSource: DataSource,
      ) { }

      async createTrimRequestedCode(dto: TrimRequestCodeDto): Promise<CommonResponseModel> {
        try {
            const entity = new TrimRequestCodeEntity();
            entity.buyerId = dto.buyerId
            entity.trimType = dto.trimType
            // entity.part = dto.part;
            entity.categoryId = dto.categoryId;
            // entity.colorId = dto.colorId;
            entity.contentId = dto.contentId;
            entity.finishId = dto.finishId;
            entity.holeId = dto.holeId;
            // entity.logo = dto.logo;
            // entity.part = dto.part;
            // entity.qualityId = dto.qualityId;
            // entity.structureId = dto.structureId;
            // entity.varietyId = dto.varietyId;
            // entity.uomId = dto.uomId;
            entity.typeId = dto.typeId;
            entity.trimCategoryId = dto.trimCategoryId;
            // entity.thicknessId = dto.thicknessId;
            entity.m3Code = dto.m3Code;
            entity.hsnCode= dto.hsnCode;
            entity.status = MaterialFabricEnum.OPEN
        
            const saveTrimReq = await this.trimReqRepo.save(entity)
       
         if (saveTrimReq) {
          const response = new CommonResponseModel(true,1, 'Requested Trim Code created successfully' ,saveTrimReq);
          return response;
        } else {
          throw new ErrorResponse(11106,'Requested Trim Code creation failed');
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
    async getAllTrims(req?: TrimCodeReq): Promise<CommonResponseModel> {  
       try{
        let query = ''
        if(req.status ==='OPEN'){
        query = `SELECT m3t.trim_type AS trimType,m3t.logo,m3t.part,
        m3t.buyer_id AS buyerId,CONCAT(b.buyer_code,'-',b.buyer_name) AS buyerName,
        m3t.category_id AS categoryId,cg.category,
        m3t.color_id AS colorId,c.colour,
        m3t.content_id AS contentId,ct.content,
        m3t.finish_id AS finishId,f.finish,
        m3t.hole_id AS holeId,h.hole,
        m3t.quality_id AS qualityId,q.quality_name AS qualityName,
        m3t.structure_id AS structureId,s.structure,
        m3t.thickness_id AS thicknessId,t.thickness,
        m3t.type_id AS typeId,ty.type,
        m3t.uom_id AS uomId,u.uom,
        m3t.variety_id AS varietyId,v.variety,
        m3t.trim_category_id AS trimCategoryId,tr.trim_category AS trimCategory,
        m3t.m3_code AS m3Code,
        m3t.hsn_code AS hsnCode,m3t.status,
        tpm.structure AS structureStatus,
        tpm.category AS categoryStatus,
        tpm.content AS contentStatus,
        tpm.type AS typeStatus,
        tpm.finish AS finishStatus,
        tpm.hole AS holeStatus,
        tpm.quality AS qualityStatus,
        tpm.thickness AS thicknessStatus,
        tpm.variety AS varietyStatus,
        tpm.uom AS uomStatus,
        tpm.color AS colorStatus,
        tpm.logo AS logoStatus,
        tpm.part AS partStatus, m3t.trim_request_code_id AS trimRequestCodeId
        FROM trim_request_code m3t
        LEFT JOIN trim_params_mapping tpm ON tpm.trim_id = m3t.trim_category_id
        LEFT JOIN buyers b ON b.buyer_id = m3t.buyer_id
        LEFT JOIN category cg ON cg.category_id = m3t.category_id
        LEFT JOIN colour c ON c.colour_id = m3t.color_id
        LEFT JOIN content ct ON ct.content_id = m3t.content_id
        LEFT JOIN finish f ON f.finish_id = m3t.finish_id
        LEFT JOIN hole h ON h.hole_id = m3t.hole_id
        LEFT JOIN qualitys q ON q.quality_id = m3t.quality_id
        LEFT JOIN structure s ON s.structure_id = m3t.structure_id
        LEFT JOIN thickness t ON t.thickness_id = m3t.thickness_id
        LEFT JOIN type ty ON ty.type_id = m3t.type_id
        LEFT JOIN uom u ON u.id = m3t.uom_id
        LEFT JOIN variety v ON v.variety_id = m3t.variety_id
        LEFT JOIN trim tr ON tr.trim_id = m3t.trim_category_id
        WHERE 1=1`
        if (req.ExternalRefNo && req.ExternalRefNo!=null){
          query += ` AND b.external_ref_number = '${req.ExternalRefNo}'`
        }
        if (req?.buyerId) {
          query = query + ` AND m3t.buyer_id=${req.buyerId}`
        }
        if (req?.trimType) {
          query = query + ` AND m3t.trim_type='${req.trimType}'`
        }
        if (req?.status) {
          query = query + ` AND m3t.status='${req.status}'`
        }
        query = query + ` ORDER BY m3t.created_at`
      }

      if(req.status ==='COMPLETED'){
        query = `SELECT trc.trim_request_code_id AS id, trc.trim_type trimType, trc.m3_trim_id AS m3TrimId,m3t.m3_code AS m3Code,m3t.hsn_code hsnCode,
        trc.trim_category_id AS trimCategoryId,tr.trim_category AS trimCategory,
        m3t.category_id AS categoryId,cg.category,
        m3t.content_id AS contentId,c.content,
        m3t.type_id AS typeId, t.type,
        m3t.finish_id AS finishId,f.finish,
        m3t.hole_id AS holeId, h.hole,
        trc.buyer_id AS buyerId,CONCAT(b.buyer_code,'-',b.buyer_name) AS buyerName
        FROM trim_request_code trc
        LEFT JOIN m3_trims m3t ON m3t.m3_trim_id = trc.m3_trim_id
        LEFT JOIN category cg ON cg.category_id = m3t.category_id
        LEFT JOIN content c ON c.content_id = m3t.content_id
        LEFT JOIN type t ON t.type_id = m3t.type_id
        LEFT JOIN finish f ON f.finish_id = m3t.finish_id
        LEFT JOIN hole h ON h.hole_id = m3t.hole_id
        LEFT JOIN buyers b ON b.buyer_id = trc.buyer_id
        LEFT JOIN trim tr ON tr.trim_id = trc.trim_category_id 
        WHERE 1=1`
        if (req.ExternalRefNo && req.ExternalRefNo!=null){
          query += ` AND b.external_ref_number = '${req.ExternalRefNo}'`
        }
        if (req?.buyerId) {
          query = query + ` AND trc.buyer_id=${req.buyerId}`
        }
        if (req?.trimType) {
          query = query + ` AND trc.trim_type='${req.trimType}'`
        }
        if (req?.status) {
          query = query + ` AND trc.status='${req.status}'`
        }
        query = query + ` ORDER BY trc.updated_at`

      }
        const data = await this.dataSource.query(query)
        if(data.length >0){
            return new CommonResponseModel(true,1,'Data retrieved successfully',data)
        }else{
            return new CommonResponseModel(false,0,'No data found',[])

        }
       }catch(err){
        throw(err)
       }
    }

    async getAllTypes(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.type_id AS typeId, t.type, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN type t ON t.type_id = m3t.type_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.type_id ORDER BY t.type `
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
  
    async getAllContents(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.content_id AS contentId, c.content, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN content c ON c.content_id = m3t.content_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.content_id ORDER BY c.content`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
  
    async getAllFinishes(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.finish_id AS finishId, f.finish,f.finish_code as finishCode, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN finish f ON f.finish_id = m3t.finish_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.finish_id ORDER BY f.finish`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
  
    async getAllHoles(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.hole_id AS holeId, h.hole, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN hole h ON h.hole_id = m3t.hole_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.hole_id ORDER BY h.hole`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
  
    async getAllStructures(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.structure_id AS structureId, s.structure, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN structure s ON s.structure_id = m3t.structure_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.structure_id ORDER BY s.structure`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
    
    async getAllCategories(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.category_id AS categoryId, c.category, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN category c ON c.category_id = m3t.category_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.category_id ORDER BY c.category`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
    
    async getAllQuality(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.quality_id AS qualityId, q.quality_name as qualityName, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN qualitys q ON q.quality_id = m3t.quality_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.quality_id ORDER BY q.quality_name`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
    
    async getAllThickness(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.thickness_id AS thicknessId, t.thickness, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN thickness t ON t.thickness_id = m3t.thickness_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.thickness_id ORDER BY t.thickness`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
    
    async getAllVariety(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.variety_id AS varietyId, v.variety, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN variety v ON v.variety_id = m3t.variety_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.variety_id ORDER BY v.variety`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
    
    async getAllUom(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.uom_id AS uomId, u.uom, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN uom u ON u.id = m3t.uom_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.uom_id ORDER BY u.uom`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
    
    async getAllColors(req?:M3trimsDTO):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.color_id AS uomId, c.colour as color, m3t.trim_mapping_id
        FROM trim_request_code m3t
        LEFT JOIN colour c ON c.colour_id = m3t.color_id`
        if (req.trimMappingId) {
          query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
        }
        query = query + ` GROUP BY m3t.color_id ORDER BY c.colour`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
  
    async getAllTrimCategories(req?:M3TrimType):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.trim_category_id AS trimCategoryId, t.trim_category AS trimCategory,m3t.trim_mapping_id AS trimMappingId
        FROM trim_request_code AS m3t
        LEFT JOIN trim t ON t.trim_id = m3t.trim_category_id`
        if (req.trimType) {
          query = query + ` WHERE m3t.trim_type='${req.trimType}'`
        }
        if (req.buyerId) {
          query = query + ` and m3t.buyer_id=${req.buyerId}`
        }
        query = query + ` GROUP BY t.trim_id
        ORDER BY t.trim_category`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
  
    async getAllBuyers(req?:any):Promise<CommonResponseModel>{
      try{
        let query = 
        `SELECT m3t.buyer_id AS buyerId, b.buyer_name AS buyerName, b.buyer_code AS buyerCode
        FROM trim_request_code m3t
        LEFT JOIN buyers b ON b.buyer_id = m3t.buyer_id`
        if (req.buyerRefNo) {
          query = query + ` WHERE b.external_ref_number = '${req.buyerRefNo}'`
        }
        query = query + ` GROUP BY m3t.buyer_id ORDER BY b.buyer_name`
        const data = await this.dataSource.query(query)
        if(data.length > 0){
          return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
        }else {
          return new CommonResponseModel(false, 1, "No data found", [])
      }
      }catch(err){
        throw(err)
      }
    }
  
}
