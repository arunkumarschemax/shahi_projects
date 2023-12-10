import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { RackPositionEntity } from "./rack-position.entity";
import { CommonResponseModel, RackPositionDropDownDto, RackPositionDropDownResponse, RackPositionRequest, RackpositionForIds } from "@project-management-system/shared-models";
import { RackPositionAdapter } from "./rack-position.adaptor";
import { RackPositionDTO } from "./rack-position.dto";
import { RackIdRequest } from "./rack-id.request";
import { RacksEntity } from "../racks/rack.entity";
import { RacksRepo } from "../racks/rack.repository";

@Injectable()
export class RackPositionService {

  constructor(
    private adapter: RackPositionAdapter,
    @InjectRepository(RackPositionEntity)
    private repository: Repository<RackPositionEntity>,
    @InjectRepository(RacksEntity)
    private rackRepo: Repository<RacksEntity>,

  ) { }

  async createPosition(createDto: RackPositionDTO): Promise<CommonResponseModel> {
    try {
      const recordName = await this.repository.findOne({ where: { rackPositionName: createDto.rackPositionName } });
      if (recordName) {
        return new CommonResponseModel(false, 0, 'Record already exists with this rack position name');
      }
      const record = await this.repository.findOne({ where: { positionCode: createDto.positionCode } });
      if (record) {
        return new CommonResponseModel(false, 0, 'Record already exists with this rack position code');
      }
      const entity: RackPositionEntity = this.adapter.convertDtoToEntity(createDto);
      const count: RackPositionEntity = await this.repository.save(entity);
      const saveDto: RackPositionDTO = this.adapter.convertEntityToDto(count);

      return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getPosition(): Promise<CommonResponseModel> {
    const records = await this.repository.find();
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async activateOrDeactivatePosition(req: RackPositionRequest): Promise<CommonResponseModel> {
    try {
      const record = await this.repository.findOne({ where: { positionId: req.positionId } });
      await this.repository.update({ positionId: req.positionId }, { isActive: !record.isActive });
      const internalMessage: string = !record.isActive ? "Activated Sucessfully" : "Deactivated Successfully"
      return new CommonResponseModel(true, 6876, internalMessage)
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getIRackPositionForLevelDropDown(req: RackpositionForIds): Promise<RackPositionDropDownResponse> {
    try {
        const itemSubCategoryEntities: RackPositionDropDownDto[] = await this.repository
            .createQueryBuilder('rack_position')
            .select('position_Id as positionId, rack_position_name as rackPositionName')
            .where(`is_active=1 and level_Id='${req.levelId}'`)
            .orderBy('rack_position_name')
            .getRawMany();

        if (itemSubCategoryEntities && itemSubCategoryEntities.length > 0) {
            const response = new RackPositionDropDownResponse(true, 11108, "RackPosition retrieved successfully", itemSubCategoryEntities);
            return response;
        } else {
            throw new RackPositionDropDownResponse(false,99998, 'Data not found');
        }
    } catch (err) {
        return err;
    }
}

async getIRackPositionForColumnDropDown(req: RackpositionForIds): Promise<RackPositionDropDownResponse> {
  try {
      const itemSubCategoryEntities: RackPositionDropDownDto[] = await this.repository
          .createQueryBuilder('rack_position')
          .select('position_Id as positionId, rack_position_name as rackPositionName')
          .where(`is_active=1 and column_id='${req.column}'`)
          .orderBy('rack_position_name')
          .getRawMany();

      if (itemSubCategoryEntities && itemSubCategoryEntities.length > 0) {
          const response = new RackPositionDropDownResponse(true, 11108, "RackPosition retrieved successfully", itemSubCategoryEntities);
          return response;
      } else {
          throw new RackPositionDropDownResponse(false,99998, 'Data not found');
      }
  } catch (err) {
      return err;
  }
}

  async getRackPositionByRack(req:RackIdRequest): Promise<CommonResponseModel> {
    try{
      const rackDetails = await this.rackRepo.findOne({where:{rackId:req.rackId}});
      const rackPositions = await this.repository.find({where:{rackId:req.rackId}, order:{"barcodeId":"ASC"}});
      console.log("rackPositions");
      console.log(rackDetails);

      if(rackPositions.length > 0){
        return new CommonResponseModel(true,1,"Rack positions retrived successfully. ", {binData:rackPositions,rackBarcode:rackDetails.barcodeId,rackCode:rackDetails.rackCode,rackId:rackDetails.rackId,rackLevel:rackDetails.levels,rackName:rackDetails.rackName,rackcolumn:rackDetails.columns});
      }
      else{
        return new CommonResponseModel(false,0,"No data found. ",);
      }
    }catch (err) {
      console.log(err)
      return err;
    }
  }
}