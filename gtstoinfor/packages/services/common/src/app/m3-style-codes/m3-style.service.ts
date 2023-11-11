import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { CommonResponseModel, M3StyleActiveDeactive, QualityCreateRequest, RacActiveDeactive, RackCreateRequest } from "@project-management-system/shared-models";
import { M3StyleAdapter } from "./m3-style.adaptor";
import { M3StyleEntity } from "./m3-style.entity";
import { M3StyleDTO } from "./m3-style.dto";


@Injectable()
export class M3StyleService {

  constructor(
    private adapter: M3StyleAdapter,
    @InjectRepository(M3StyleEntity)
    private repository: Repository<M3StyleEntity>
  ) { }

  async createM3Style(createDto: M3StyleDTO): Promise<CommonResponseModel> {
    try {
      const entity: M3StyleEntity = this.adapter.convertDtoToEntity(createDto);
      const count: M3StyleEntity = await this.repository.save(entity);
      const saveDto: M3StyleDTO = this.adapter.convertEntityToDto(count);

      return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getM3Style(): Promise<CommonResponseModel> {
    const records = await this.repository.find();
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }

  async activateOrDeactivateM3Style(req: M3StyleActiveDeactive): Promise<CommonResponseModel> {
    try {
      const record = await this.repository.findOne({ where: { m3StyleId: req.m3StyleId } });
      await this.repository.update({ m3StyleId: req.m3StyleId }, { isActive: !record.isActive });
      const internalMessage: string = !record.isActive ? "Activated Sucessfully" : "DeActivated Sucessfully"
      return new CommonResponseModel(true, 6876, internalMessage)
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

}
