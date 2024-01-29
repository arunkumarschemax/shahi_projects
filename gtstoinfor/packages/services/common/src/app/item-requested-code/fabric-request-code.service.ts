import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricRequestCodeEntity } from './entities/fabric-request-code-entity';
import { FabricRequestCodeDto } from './dtos/fabric-request-code.dto';
import { CommonResponseModel, FabricCodeReq, MaterialFabricEnum,FabricRequestResponseModel,M3FabricsDTO } from '@project-management-system/shared-models';

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
        let query =`SELECT frc.fabric_request_code_id AS fabricRequestCodeId,frc.fabric_type_id AS fabricTypeId,ft.fabric_type_name AS fabricType,
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
        if (req?.buyerId) {
          query = query + ` AND frc.buyer_id=${req.buyerId}`
        }
        if (req?.hsnCode) {
          query = query + ` AND frc.hsn_code=${req.hsnCode}`
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
          query = query + ` AND frc.content='${req.contentId}'`
        }
        if (req?.status) {
          query = query + ` AND frc.status='${req.status}'`
        }
        const data = await this.dataSource.query(query)
        let response:M3FabricsDTO[] = [];
        for(const res of data){
          console.log("**********");
          console.log(res);
          console.log("************")
          let rec = new M3FabricsDTO(0,res.buyer_id,"",res.fabricTypeId,res.weaveId,res.weight,res.weightUnitId,res.epi,res.ppi,res.yarnType,res.width,res.widthUnit,res.finish_id,res.shrinkage,"",res.buyerName,"",res.hsnCode,[],[{"content":res.content_id,"percentage":"100"}],true,"","",0,"",res.fabricType);
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

    async getAllFabricBuyers():Promise<CommonResponseModel>{
      try{
        let query = `SELECT frc.buyer_id, b.buyer_name AS buyerName 
        FROM fabric_request_code frc
        LEFT JOIN buyers b ON b.buyer_id = frc.buyer_id
        GROUP BY frc.buyer_id
        ORDER BY b.buyer_name`
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
        let query = `SELECT hsn_code FROM fabric_request_code GROUP BY hsn_code ORDER BY hsn_code`
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

    async updateFabStatus(req:number):Promise<CommonResponseModel>{
      try{
        let query = `update fabric_request_code set status='completed' where fabric_request_code_id = ${req}`;
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

    async updateTrimStatus(req:number):Promise<CommonResponseModel>{
      try{
        console.log("req**********");
        console.log(req);
        let query = `update trim_request_code set status='completed' where trim_request_code_id = ${req}`;
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
