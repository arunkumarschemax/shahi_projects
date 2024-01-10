import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, DataSource } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { M3ItemsAdapter } from "./m3-items.adaptor";
import { M3ItemsEntity } from "./m3-items.entity";
import { BuyerIdReq, CommonResponseModel, ItemTypeEnum, M3Itemsfilter, m3FabricFiltersReq } from "@project-management-system/shared-models";
import { M3ItemsDTO } from "./m3-items.dto";
import { M3ItemsRepo } from "./m3-items.repository";
import { M3TrimItemsDTO } from "./m3-trim-items.dto";
import { M3TrimsAdapter } from "./m3-trims.adaptor";
import { M3FabricsDTO } from "./m3-fabrics-dto";


@Injectable()
export class M3ItemsService {

  constructor(
    private adapter: M3ItemsAdapter,
    private trimAdapter:M3TrimsAdapter,
    @InjectRepository(M3ItemsEntity)
    private repository: M3ItemsRepo,
    @InjectDataSource()
    private datasource: DataSource
  ) { }

  async createM3Items(createDto: M3FabricsDTO): Promise<CommonResponseModel> {
    try {
      let checkData = await this.checkDuplicate(createDto);
      if(checkData.status){
        return new CommonResponseModel(false, 0, "Item already exist. ")
      }
      else{
        const existingItemCount: number = await this.repository.count();

        const nextItemCode: string = createDto.buyerCode + "/" + `FAB${(existingItemCount + 1).toString().padStart(5, '0')}`;
        const entity: M3ItemsEntity = this.adapter.convertDtoToEntity(createDto);
        entity.itemCode = nextItemCode;
        const count: M3ItemsEntity = await this.repository.save(entity);
        const saveDto: M3FabricsDTO = this.adapter.convertEntityToDto(count);
        return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getM3Items(req?:M3Itemsfilter): Promise<CommonResponseModel> {
    console.log(req,"req");
    
    let query = `SELECT m3i.m3_items_id AS m3ItemsId,m3i.item_code AS itemCode, m3i.description,m3i.weight AS weight,
    m3i.fabric_type AS fabricTypeId, ft.fabric_type_name AS fabricType,
    m3i.weave AS weaveId,fw.fabric_weave_name AS fabricWeave,
    m3i.weight_unit AS weightUnit,wu.uom AS weightUom,
    m3i.ppi_construction AS ppiConstruction, m3i.epi_construction AS epiConstruction,m3i.yarn_type AS yarnType,
    m3i.width, m3i.width_unit AS widthUnit,wi.uom AS widthUom,
    m3i.finish AS finishId,fft.fabric_finish_type AS fabricFinish,
    m3i.shrinkage,
    m3i.buyer_id AS buyerId,b.buyer_name AS buyerName,
    m3i.m3_code AS m3Code, m3i.hsn_code AS hsnCode
    FROM m3_items m3i
    LEFT JOIN fabric_type ft ON ft.fabric_type_id = m3i.fabric_type
    LEFT JOIN fabric_weave fw ON fw.fabric_weave_id = m3i.weave
    LEFT JOIN uom wu ON wu.id = m3i.weight_unit
    LEFT JOIN uom wi ON wi.id = m3i.width_unit
    LEFT JOIN fabric_finish_types fft ON fft.fabric_finish_type_id = m3i.finish
    LEFT JOIN buyers b ON b.buyer_id = m3i.buyer_id 
     WHERE 1 = 1 `
    let param :any={}
    if(req){
      if (req.buyerId!== undefined){
        query += ` AND m3i.buyer_id = ${req.buyerId}`
      }
      if (req.fabricType!== undefined){
        query += ` AND fabric_type = ${req.fabricType}`
      }
      if (req.weave!== undefined){
        query += ` AND m3i.weave = ${req.weave}`
      }
      if (req.finish!== undefined){
        query += ` AND m3i.finish = '${req.finish}'`
      }
      // if (req.width!== undefined){
      //   query += ` AND m3.width = ${req.width}`
      // }
      // if (req.yarnCount!== undefined){
      //   query += ` AND m3i.yarn_type = ${req.yarnCount}`
      // }
    }
   
   
    query+= ` ORDER BY b.buyer_name,m3i.fabric_type,m3i.weave`
    
    const data = await this.datasource.query(query,param)
    if (data)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", data)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async getM3FabricsByBuyer(req: m3FabricFiltersReq): Promise<CommonResponseModel> {
    try{
      console.log("*#################################")
      console.log(req)

      let query = "Select m3_items_Id AS m3ItemsId, item_code AS itemCode, description AS description from m3_items where m3_items_Id >0"
      if(req.buyerId != undefined){
        query=query+' and buyer_id='+req.buyerId+''
      }
      if(req.fabricTypeId != undefined){
        query=query+' and fabric_type='+req.fabricTypeId+''
      }if(req.weaveId != undefined){
        query=query+' and weave='+req.weaveId+''
      }if(req.epiConstruction != undefined){
        query=query+' and epi_construction="'+req.epiConstruction+'"'
      }if(req.ppiConstruction != undefined){
        query=query=' and ppi_construction='+req.ppiConstruction+''
      }if(req.yarnType != '' && req.yarnType != undefined){
        query=query+' and yarn_type="'+req.yarnType+'"'
      }if(req.finishId != undefined){
        query=query+' and finish='+req.finishId+''
      }if(req.shrinkage != undefined){
        query=query+' and shrinkage="'+req.shrinkage+'"'
      }if(req.m3Code != undefined){
        query=query+' and m3_code="'+req.m3Code+'"'
      }if(req.content != undefined){
        query=query+' and content_id='+req.content+''
      }if(req.hsnCode != undefined){
        query=query+' and hsn_code="'+req.hsnCode+'"'
      }

      const data = await this.datasource.query(query);
      // console.log(data)
      if(data.length > 0){
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
      }
    }catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }
  async checkDuplicate(createDto: M3FabricsDTO): Promise<CommonResponseModel> {
    let query = `Select * from m3_items m3 where fabric_type = ` + createDto.fabricTypeId + ` and weave = ` + createDto.weaveId + ` and weight = "` + createDto.weightId + `" and weight_unit = ` + createDto.weightUnit + ` and epi_construction = "` + createDto.epiConstruction + `" and yarn_type = "` + createDto.yarnType + `" and finish = "` + createDto.finishId + `" and shrinkage = "` + createDto.shrinkage+`"`;
    const data = await this.datasource.query(query)
    if (data.length > 0){
      return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data)
    }
    else{
      return new CommonResponseModel(false, 1001, "", )
    }
  }

  async createM3Trim(createDto: M3TrimItemsDTO): Promise<CommonResponseModel> {
    try {
      let checkData = await this.checkTrimDuplicate(createDto);
      if(checkData.status){
        return new CommonResponseModel(false, 0, "Item already exist. ")
      }
      else{
        const existingItemCount = await this.repository.findAndCountBy({itemType : Not (ItemTypeEnum.FABRIC)});
        const nextItemCode: string = createDto.buyerCode + "/" + `TRIM${(existingItemCount.length + 1).toString().padStart(5, '0')}`;
        const entity: M3ItemsEntity = this.trimAdapter.convertDtoToEntity(createDto);
        entity.itemCode = nextItemCode;
        const count: M3ItemsEntity = await this.repository.save(entity);
        const saveDto: M3TrimItemsDTO = this.trimAdapter.convertEntityToDto(count);
        return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async checkTrimDuplicate(req: M3TrimItemsDTO): Promise<CommonResponseModel> {
    const conditions = [];

    const columnName = {
        buyerId: 'buyer_id',
        trimType: 'item_type',
        trimCategoryId: 'trim_category_id',
        structureId: 'structure_id',
        categoryId: 'category_id',
        contentId: 'content_id',
        typeId: 'type_id',
        finishId: 'finish_id',
        holeId: 'hole_id',
        qualityId: 'quality_id',
        thicknessId: 'thickness_id',
        varietyId: 'variety_id',
        uomId: 'uom_id',
        colorId: 'color_id',
    };

    for (const [key, value] of Object.entries(req)) {
        if (value !== undefined && value !== null && columnName[key]) {
            const formattedValue = typeof value === 'string' ? `"${value}"` : value;
            
            if (!conditions.includes(`${columnName[key]} = ${formattedValue}`)) {
                conditions.push(`${columnName[key]} = ${formattedValue}`);
            }
        }
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM m3_items m3 ${whereClause}`;
    
    const data = await this.datasource.query(query);

    if (data.length > 0) {
        return new CommonResponseModel(true, 1001, "Data Retrieved Successfully", data);
    } else {
        return new CommonResponseModel(false, 1001, "");
    }
}

async getFabricTypes(): Promise<CommonResponseModel>{
  try{
    let query = `
    SELECT m3i.fabric_type AS fabricTypeId, ft.fabric_type_name AS fabricType
    FROM m3_items m3i
    LEFT JOIN fabric_type ft ON ft.fabric_type_id = m3i.fabric_type
    GROUP BY ft.fabric_type_id
    ORDER BY ft.fabric_type_name`
    const data = await this.datasource.query(query)
    if(data.length > 0){
      return new CommonResponseModel(true,1,'Data retrieved successfully',data)
    }else{
      return new CommonResponseModel(false,0,'No data found',[])
    }
  }catch(err){
    throw(err)
  }
}

async getFabricWeaves(): Promise<CommonResponseModel>{
  try{
    let query = `
    SELECT m3i.weave, fw.fabric_weave_name AS fabricWeave
    FROM m3_items m3i
    LEFT JOIN fabric_weave fw ON fw.fabric_weave_id = m3i.weave
    GROUP BY fw.fabric_weave_id
    ORDER BY fw.fabric_weave_name`
    const data = await this.datasource.query(query)
    if(data.length > 0){
      return new CommonResponseModel(true,1,'Data retrieved successfully',data)
    }else{
      return new CommonResponseModel(false,0,'No data found',[])
    }
  }catch(err){
    throw(err)
  }
}

async getFabricFinishes(): Promise<CommonResponseModel>{
  try{
    let query = `
    SELECT m3i.finish, fft.fabric_finish_type AS fabricFinish
    FROM m3_items m3i
    LEFT JOIN fabric_finish_types fft ON fft.fabric_finish_type_id = m3i.finish
    WHERE fft.fabric_finish_type IS NOT NULL
    GROUP BY m3i.finish
    ORDER BY fft.fabric_finish_type`
    const data = await this.datasource.query(query)
    if(data.length > 0){
      return new CommonResponseModel(true,1,'Data retrieved successfully',data)
    }else{
      return new CommonResponseModel(false,0,'No data found',[])
    }
  }catch(err){
    throw(err)
  }
}



}
