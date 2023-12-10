import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, DataSource } from "typeorm";
import { M3TrimsEntity } from "./m3-trims.entity";
import { M3TrimsAdapter } from "./m3-trims.adaptor";
import { M3TrimsRepo } from "./m3-trims.repository";
import { BuyerIdReq, BuyerRefNoRequest, CommonResponseModel, ItemTypeEnum, M3TrimTypeRequest, M3trimsDTO } from "@project-management-system/shared-models";
import { M3TrimsDTO } from "./m3-trims.dto";

@Injectable()
export class M3TrimsService {

  constructor(
    private adapter: M3TrimsAdapter,
    @InjectRepository(M3TrimsEntity)
    private repository: M3TrimsRepo,
    @InjectDataSource()
    private datasource: DataSource
  ) { }

  async createM3Trims(createDto: M3TrimsDTO): Promise<CommonResponseModel> {
    try {
      const existingItemCount = await this.repository.findAndCountBy({trimType : Not (ItemTypeEnum.FABRIC)});
        const nextItemCode: string = createDto.buyerCode + "/" + `TRIM${(existingItemCount.length + 1).toString().padStart(5, '0')}`;
        createDto.itemCode = nextItemCode;
      const entity: M3TrimsEntity = this.adapter.convertDtoToEntity(createDto);
      const count: M3TrimsEntity = await this.repository.save(entity);
      const saveDto: M3TrimsDTO = this.adapter.convertEntityToDto(count);

      return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getM3Trims(): Promise<CommonResponseModel> {
    let query = `SELECT m3.m3_trim_Id as m3TrimsId,m3.trim_code AS trimCode,m3.trim_type AS trimType from m3_trims m3 `
    const data = await this.datasource.query(query)
    if (data)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", data)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async getM3TrimsByBuyer(req: BuyerIdReq): Promise<CommonResponseModel> {
    try{
      console.log(req)
      const query = "Select m3.m3_trim_Id as m3TrimsId,m3.trim_code AS trimCode,m3.trim_type AS trimType from m3_trims m3 where buyer_id ="+req.buyerId+ " group by m3.trim_type";
      const data = await this.datasource.query(query)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }
    }catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getM3TrimsByTrimCode(req: M3TrimTypeRequest): Promise<CommonResponseModel> {
    try{
      const query = "Select m3.m3_trim_Id as m3TrimsId,m3.trim_code AS trimCode,m3.trim_type AS trimType from m3_trims m3 where trim_type = '"+req.trimType + "'";
      const data = await this.datasource.query(query)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }
    }catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getAllM3Data(req:M3trimsDTO):Promise<CommonResponseModel>{
    try{
      let query = 
      `select m3t.trim_code AS trimCode,m3t.item_code as itemCode,m3t.trim_type as trimType,m3t.logo,m3t.part,
      m3t.buyer_id as buyerId,concat(b.buyer_code,'-',b.buyer_name) as buyerName,
      m3t.category_id as categoryId,cg.category,
      m3t.color_id as colorId,c.colour,
      m3t.content_id as contentId,ct.content,
      m3t.finish_id as finishId,f.finish,
      m3t.hole_id as holeId,h.hole,
      m3t.quality_id as qualityId,q.quality_name as qualityName,
      m3t.structure_id as structureId,s.structure,
      m3t.thickness_id as thicknessId,t.thickness,
      m3t.type_id as typeId,ty.type,
      m3t.uom_id as uomId,u.uom,
      m3t.variety_id as varietyId,v.variety,
      m3t.trim_category_id as trimCategoryId,tr.trim_category as trimCategory,
      m3t.trim_mapping_id as trimMappingId,
      m3t.m3_code as m3Code
      from m3_trims m3t
      left join buyers b on b.buyer_id = m3t.buyer_id
      left join category cg on cg.category_id = m3t.category_id
      left join colour c on c.colour_id = m3t.color_id
      left join content ct on ct.content_id = m3t.content_id
      left join finish f on f.finish_id = m3t.finish_id
      left join hole h on h.hole_id = m3t.hole_id
      left join qualitys q on q.quality_id = m3t.quality_id
      left join structure s on s.structure_id = m3t.structure_id
      left join thickness t on t.thickness_id = m3t.thickness_id
      left join type ty on ty.type_id = m3t.type_id
      left join uom u on u.id = m3t.uom_id
      left join variety v on v.variety_id = m3t.variety_id
      left join trim tr on tr.trim_id = m3t.trim_category_id
      left join trim_params_mapping tpm on tpm.trim_mapping_id = m3t.trim_mapping_id
      WHERE 1=1`
      if (req?.buyerId) {
        query = query + ` AND m3t.buyer_id=${req.buyerId}`
      }
      if (req?.trimMappingId) {
        query = query + ` AND m3t.trim_mapping_id=${req.trimMappingId}`
      }
      if (req?.trimType) {
        query = query + ` AND m3t.trim_type="${req.trimType}"`
      }
      if (req?.structureId) {
        query = query + ` AND m3t.structure_id=${req.structureId}`
      }
      if (req?.categoryId) {
        query = query + ` AND m3t.category_id=${req.categoryId}`
      }
      if (req?.contentId) {
        query = query + ` AND m3t.content_id=${req.contentId}`
      }
      if (req?.typeId) {
        query = query + ` AND m3t.type_id=${req.typeId}`
      }
      if (req?.finishId) {
        query = query + ` AND m3t.finish_id=${req.finishId}`
      }
      if (req?.holeId) {
        query = query + ` AND m3t.hole_id=${req.holeId}`
      }
      if (req?.qualityId) {
        query = query + ` AND m3t.quality_id=${req.qualityId}`
      }
      if (req?.thicknessId) {
        query = query + ` AND m3t.thickness_id=${req.thicknessId}`
      }
      if (req?.varietyId) {
        query = query + ` AND m3t.variety_id=${req.varietyId}`
      }
      if (req?.uomId) {
        query = query + ` AND m3t.uom_id=${req.uomId}`
      }
      if (req?.colorId) {
        query = query + ` AND m3t.color_id=${req.colorId}`
      }
      if (req?.logo) {
        query = query + ` AND m3t.logo='${req.logo}'`
      }
      if (req?.part) {
        query = query + ` AND m3t.part='${req.part}'`
      }
      const data = await this.datasource.query(query)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }else {
        return new CommonResponseModel(false, 1, "No data found", [])
    }
    }catch(err){
      throw(err)
    }
  }

  async getAllTypes(req?:M3trimsDTO):Promise<CommonResponseModel>{
    try{
      let query = 
      `SELECT m3t.type_id AS typeId, t.type, m3t.trim_mapping_id
      FROM m3_trims m3t
      LEFT JOIN type t ON t.type_id = m3t.type_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.type_id ORDER BY t.type `
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN content c ON c.content_id = m3t.content_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.content_id ORDER BY c.content`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN finish f ON f.finish_id = m3t.finish_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.finish_id ORDER BY f.finish`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN hole h ON h.hole_id = m3t.hole_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.hole_id ORDER BY h.hole`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN structure s ON s.structure_id = m3t.structure_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.structure_id ORDER BY s.structure`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN category c ON c.category_id = m3t.category_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.category_id ORDER BY c.category`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN qualitys q ON q.quality_id = m3t.quality_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.quality_id ORDER BY q.quality_name`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN thickness t ON t.thickness_id = m3t.thickness_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.thickness_id ORDER BY t.thickness`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN variety v ON v.variety_id = m3t.variety_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.variety_id ORDER BY v.variety`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN uom u ON u.id = m3t.uom_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.uom_id ORDER BY u.uom`
      const data = await this.datasource.query(query)
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
      FROM m3_trims m3t
      LEFT JOIN colour c ON c.colour_id = m3t.color_id`
      if (req.trimMappingId) {
        query = query + ` WHERE m3t.trim_mapping_id=${req.trimMappingId}`
      }
      query = query + ` GROUP BY m3t.color_id ORDER BY c.colour`
      const data = await this.datasource.query(query)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }else {
        return new CommonResponseModel(false, 1, "No data found", [])
    }
    }catch(err){
      throw(err)
    }
  }

  async getAllTrimCategories():Promise<CommonResponseModel>{
    try{
      let query = 
      `SELECT m3t.trim_category_id AS trimCategoryId, t.trim_category AS trimCategory,m3t.trim_mapping_id AS trimMappingId
      FROM m3_trims AS m3t
      LEFT JOIN trim t ON t.trim_id = m3t.trim_category_id
      GROUP BY t.trim_id
      ORDER BY t.trim_category`
      const data = await this.datasource.query(query)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }else {
        return new CommonResponseModel(false, 1, "No data found", [])
    }
    }catch(err){
      throw(err)
    }
  }

  async getAllBuyers(req?:BuyerRefNoRequest):Promise<CommonResponseModel>{
    try{
      let query = 
      `SELECT m3t.buyer_id AS buyerId, b.buyer_name AS buyerName, b.buyer_code AS buyerCode
      FROM m3_trims m3t
      LEFT JOIN buyers b ON b.buyer_id = m3t.buyer_id`
      if (req.buyerRefNo) {
        query = query + ` WHERE b.external_ref_number = ${req.buyerRefNo}`
      }
      query = query + ` GROUP BY m3t.buyer_id ORDER BY b.buyer_name`
      const data = await this.datasource.query(query)
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