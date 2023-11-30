import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, DataSource } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { M3ItemsAdapter } from "./m3-items.adaptor";
import { M3ItemsEntity } from "./m3-items.entity";
import { BuyerIdReq, CommonResponseModel, M3Itemsfilter } from "@project-management-system/shared-models";
import { M3ItemsDTO } from "./m3-items.dto";
import { M3ItemsRepo } from "./m3-items.repository";


@Injectable()
export class M3ItemsService {

  constructor(
    private adapter: M3ItemsAdapter,
    @InjectRepository(M3ItemsEntity)
    private repository: M3ItemsRepo,
    @InjectDataSource()
    private datasource: DataSource
  ) { }

  async createM3Items(createDto: M3ItemsDTO): Promise<CommonResponseModel> {
    try {
      let checkData = await this.checkDuplicate(createDto);
      if(checkData.status){
        return new CommonResponseModel(false, 0, "Item already exist. ")
      }
      else{
        const existingItemCount: number = await this.repository.count();
        console.log(existingItemCount)
        const nextItemCode: string = createDto.buyerCode + "/" + `FAB${(existingItemCount + 1).toString().padStart(5, '0')}`;
        const entity: M3ItemsEntity = this.adapter.convertDtoToEntity(createDto);
        entity.itemCode = nextItemCode;
        const count: M3ItemsEntity = await this.repository.save(entity);
        const saveDto: M3ItemsDTO = this.adapter.convertEntityToDto(count);
        return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getM3Items(req?:M3Itemsfilter): Promise<CommonResponseModel> {
    console.log(req,"req");
    
    let query = `SELECT m3.description,m3.m3_items_Id AS m3ItemsId,m3.item_code AS itemCode,m3.content,m3.fabric_type,m3.weave,m3.weight,m3.construction,
    m3.yarn_count,m3.finish,m3.shrinkage,ft.fabric_type_name,fw.fabric_weave_name, uom1.uom AS weightUnit,
     uom2.uom AS yarnUnit, b.buyer_name AS buyer, m3.width ,uom3.uom AS widthUnit,m3.buyer_id FROM m3_items m3
     
     LEFT JOIN fabric_type ft ON ft.fabric_type_id=m3.fabric_type 
     LEFT JOIN fabric_weave fw ON fw.fabric_weave_id=m3.weave 
     LEFT JOIN buyers b ON b.buyer_id = m3.buyer_id
      LEFT JOIN uom uom1 ON uom1.id=m3.weight_unit 
    LEFT JOIN uom uom2 ON uom2.id=m3.yarn_unit 
    LEFT JOIN uom uom3 ON uom3.id=m3.width_unit 
     WHERE 1 = 1 `
    let param :any={}
    if(req){
      if (req.buyerId!== undefined){
        query += ` AND m3.buyer_id = ${req.buyerId}`
      }
      if (req.content!== undefined){
        query += ` AND m3.content = '${req.content}'`
      }
      if (req.fabricType!== undefined){
        query += ` AND fabric_type = ${req.fabricType}`
      }
      if (req.weave!== undefined){
        query += ` AND m3.weave = ${req.weave}`
      }
      if (req.construction!== undefined){
        query += ` AND m3.construction = '${req.construction}'`
      }
      if (req.finish!== undefined){
        query += ` AND m3.finish = '${req.finish}'`
      }
      
      if (req.weight!== undefined){
        query += ` AND m3.weight = ${req.weight}`
      }
      if (req.width!== undefined){
        query += ` AND m3.width = ${req.width}`
      }

      if (req.yarnCount!== undefined){
        query += ` AND m3.yarn_count = ${req.yarnCount}`
      }
    }
   
   
    query+= ` ORDER BY b.buyer_name,m3.content,m3.fabric_type,m3.weave,m3.weight`
    
    const data = await this.datasource.query(query,param)
    if (data)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", data)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async getM3FabricsByBuyer(createDto: BuyerIdReq): Promise<CommonResponseModel> {
    try{
      console.log("**********************************")
      console.log(createDto)

      const query = "Select m3_items_Id AS m3ItemsId, item_code AS itemCode, description AS description from m3_items where buyer_id ="+createDto.buyerId;
      const data = await this.datasource.query(query);
      console.log(data)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }
    }catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }
  async checkDuplicate(createDto: M3ItemsDTO): Promise<CommonResponseModel> {
    let query = `Select * from m3_items m3 where content = "` + createDto.content + `" and fabric_type = ` + createDto.fabricType + ` and weave = ` + createDto.weave + ` and weight = "` + createDto.weight + `" and weight_unit = ` + createDto.weightUnit + ` and construction = "` + createDto.construction + `" and yarn_count = "` + createDto.yarnCount + `" and yarn_unit = ` + createDto.yarnUnit + ` and finish = "` + createDto.finish + `" and shrinkage = "` + createDto.shrinkage+`"`;
    const data = await this.datasource.query(query)
    if (data.length > 0){
      return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
    }
    else{
      return new CommonResponseModel(false, 1001, "", )
    }
  }


}
