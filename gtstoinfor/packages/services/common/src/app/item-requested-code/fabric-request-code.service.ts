import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricRequestCodeEntity } from './entities/fabric-request-code-entity';
import { FabricRequestCodeDto } from './dtos/fabric-request-code.dto';
import { CommonResponseModel, MaterialFabricEnum } from '@project-management-system/shared-models';

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
    async getAllFabrics(): Promise<CommonResponseModel> {  
       try{
        let query =`SELECT frc.fabric_type_id AS fabricTypeId,fabric_type_name AS fabricType,
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
        LEFT JOIN content c ON c.content_id = frc.content_id`

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
}
