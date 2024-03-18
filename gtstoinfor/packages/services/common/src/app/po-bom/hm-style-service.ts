import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { HMStyleDto } from "./dto/hm-style-dto";
import { HMStyleEntity } from "./entittes/hm-style-entity";
import { HMStyleAdapter } from "./adapter/hm-style-adapter";


@Injectable()
export class HMStyleService {

  constructor(
    private adapter: HMStyleAdapter,
    @InjectRepository(HMStyleEntity)
    private repository: Repository<HMStyleEntity>
  ) { }


  async createHMStyle(createDto: HMStyleDto): Promise<CommonResponseModel> {
    try {
      const entity: HMStyleEntity = this.adapter.convertDtoToEntity(createDto);
      const count: HMStyleEntity = await this.repository.save(entity);
      const saveDto: HMStyleDto = this.adapter.convertEntityToDto(count);

      return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getHMStyle(): Promise<CommonResponseModel> {
    const records = await this.repository.find();
    if (records.length)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }


  async getAllStyles(): Promise<CommonResponseModel> {
    const records = await this.repository;
    const query = `SELECT s.id ,s.style as styleNumber
    FROM styles s`
    const result = await this.repository.query(query)
    if (result) {
        return new CommonResponseModel(true, 1, 'Data Retrived', result)
    } else {
        return new CommonResponseModel(false, 0, 'No Data', [])

    }
}
    
  async updateHMStyle(hmStyleDto: HMStyleDto): Promise<CommonResponseModel> {
    try {
      const hmStyles = await this.gethmStyleById(hmStyleDto.hmId);

      if (hmStyles) {

        await this.repository.update({ hmId: hmStyles.hmId }, {
          ...hmStyleDto,
        });

        const updatedDto: HMStyleDto = this.adapter.convertEntityToDto({
          ...hmStyles,
          ...hmStyleDto,
        });

        return new CommonResponseModel(true, 10115, 'Pensioner record is updated successfully', updatedDto);
      } else {
        throw new ErrorResponse(99998, 'No Records Found');
      }
    } catch (err) {
      return err;
    }
  }

  async gethmStyleById(hmId: number): Promise<HMStyleEntity> {
    const Response = await this.repository.findOne({
      where: { hmId: hmId }
    });
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

}