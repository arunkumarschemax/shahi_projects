import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricRequestCodeEntity } from './entities/fabric-request-code-entity';
import { FabricRequestCodeDto } from './dtos/fabric-request-code.dto';
import { CommonResponseModel, MaterialFabricEnum } from '@project-management-system/shared-models';

@Injectable()
export class FabricReqCodeService {
    constructor(
        @InjectRepository(FabricRequestCodeEntity) 
        private fabricReqRepo: Repository<FabricRequestCodeEntity>
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
        const data = await this.fabricReqRepo.find({order:{createdAt:'ASC'}})
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
