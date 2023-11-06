import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { RackPositionEntity } from "./rack-position.entity";
import { CommonResponseModel, RackPositionRequest } from "@project-management-system/shared-models";
import { RackPositionAdapter } from "./rack-position.adaptor";
import { RackPositionDTO } from "./rack-position.dto";

@Injectable()
export class RackPositionService {

  constructor(
    private adapter: RackPositionAdapter,
    @InjectRepository(RackPositionEntity)
    private repository: Repository<RackPositionEntity>
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

}