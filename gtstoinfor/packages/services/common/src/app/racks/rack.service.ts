import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { RacksAdapter } from "./rack.adaptor";
import { RacksEntity } from "./rack.entity";
import { RacksDTO } from "./rack.dto";
import { CommonResponseModel, RacActiveDeactive, RackCreateRequest } from "@project-management-system/shared-models";

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
      const internalMessage: string = !record.isActive ? "Deactivated Successfully" : "Activated Sucessfully"
      return new CommonResponseModel(true, 6876, internalMessage)
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

}




