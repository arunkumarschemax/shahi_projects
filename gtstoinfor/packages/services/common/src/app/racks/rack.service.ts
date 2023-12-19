import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { RacksAdapter } from "./rack.adaptor";
import { RacksEntity } from "./rack.entity";
import { RacksDTO } from "./rack.dto";
import { CommonResponseModel, RacActiveDeactive, RackCreateRequest, RackIdReq } from "@project-management-system/shared-models";
import { RackPositionEntity } from "../rm_locations/rack-position.entity";

@Injectable()
export class RacksService {

  constructor(
    private adapter: RacksAdapter,
    @InjectRepository(RacksEntity)
    private repository: Repository<RacksEntity>
  ) { }

  async createRacks(createDto: RacksDTO): Promise<CommonResponseModel> {
    try {
      const recordName = await this.repository.findOne({ where: { rackName: createDto.rackName } });
      if (recordName) {
        return new CommonResponseModel(false, 0, 'Record already exists with this rack position name');
      }
      const record = await this.repository.findOne({ where: { rackCode: createDto.rackCode } });
      if (record) {
        return new CommonResponseModel(false, 0, 'Record already exists with this rack position code');
      }
      const entity: RacksEntity = this.adapter.convertDtoToEntity(createDto);
      const count: RacksEntity = await this.repository.save(entity);
      const saveDto: RacksDTO = this.adapter.convertEntityToDto(count);

      return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getRacks(): Promise<CommonResponseModel> {
    const records = await this.repository.find();
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async activateOrDeactivateRacks(req: RackCreateRequest): Promise<CommonResponseModel> {
    try {
      const record = await this.repository.findOne({ where: { rackId: req.rackId } });
      await this.repository.update({ rackId: req.rackId }, { isActive: !record.isActive });
      const internalMessage: string = !record.isActive ? "Activated Sucessfully" : "DeActivated Sucessfully"
      return new CommonResponseModel(true, 6876, internalMessage)
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }
  async getRackPositionQrs(req:RackIdReq): Promise<CommonResponseModel> {
    try {
        const data: RacksDTO[] = await this.repository
            .createQueryBuilder('r')
            .select(' r.rack_id,r.rack_name,r.rack_code,position_code')
            .leftJoin(RackPositionEntity,'rp',` rp.rack_id = r.rack_id`)
            .where(`r.rack_id = '${req.rackId}'`)
            .getRawMany();
  
        if (data && data.length > 0) {
            const response = new CommonResponseModel(true, 11108, "RackPositions retrieved successfully", data);
            return response;
        } else {
            throw new CommonResponseModel(false,99998, 'Data not found');
        }
    } catch (err) {
        return err;
    }
  }
}




