import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { CommonResponseModel, QualityCreateRequest, RacActiveDeactive, RackCreateRequest } from "@project-management-system/shared-models";
import { QualityAdapter } from "./quality.adaptor";
import { QualityEntity } from "./quality.entity";
import { QualityDTO } from "./quality.dto";

@Injectable()
export class QualityService {

  constructor(
    private adapter: QualityAdapter,
    @InjectRepository(QualityEntity)
    private repository: Repository<QualityEntity>
  ) { }


  async createQuality(createDto: QualityDTO): Promise<CommonResponseModel> {
    try {
      const entity: QualityEntity = this.adapter.convertDtoToEntity(createDto);
      const count: QualityEntity = await this.repository.save(entity);
      const saveDto: QualityDTO = this.adapter.convertEntityToDto(count);

      return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getQuality(): Promise<CommonResponseModel> {
    const records = await this.repository.find();
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async activateOrDeactivateQuality(req: QualityCreateRequest): Promise<CommonResponseModel> {
    try {
      const record = await this.repository.findOne({ where: { qualityId: req.qualityId } });
      await this.repository.update({ qualityId: req.qualityId }, { isActive: !record.isActive });
      const internalMessage: string = !record.isActive ? "Activated Sucessfully" : "DeActivated Sucessfully"
      return new CommonResponseModel(true, 6876, internalMessage)
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

}