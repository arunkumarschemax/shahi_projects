import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, DataSource } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { M3ItemsAdapter } from "./m3-items.adaptor";
import { M3ItemsEntity } from "./m3-items.entity";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { M3ItemsDTO } from "./m3-items.dto";
import { M3ItemsRepo } from "./m3-items.repository";


@Injectable()
export class M3ItemsService {

  constructor(
    private adapter: M3ItemsAdapter,
    @InjectRepository(M3ItemsEntity)
    private repository: M3ItemsRepo,
    @InjectDataSource()
    private datasource: DataSource
  ) { }

  async createM3Items(createDto: M3ItemsDTO): Promise<CommonResponseModel> {
    try {
      const existingItemCount: number = await this.repository.count();
      const nextItemCode: string = `FAB${(existingItemCount + 1).toString().padStart(3, '0')}`;
      const entity: M3ItemsEntity = this.adapter.convertDtoToEntity(createDto);
      entity.itemCode = nextItemCode;
      const count: M3ItemsEntity = await this.repository.save(entity);
      const saveDto: M3ItemsDTO = this.adapter.convertEntityToDto(count);

      return new CommonResponseModel(true, 1, 'Data saved successfully', saveDto);
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getM3Items(): Promise<CommonResponseModel> {
    let query = `SELECT m3.m3_items_Id,m3.item_code AS itemCode,m3.content,m3.fabric_type,m3.weave,m3.weight,m3.construction,m3.yarn_count,m3.finish,m3.shrinkage,ft.fabric_type_name,fw.fabric_weave_name  FROM m3_items m3 LEFT JOIN fabric_type ft ON ft.fabric_type_id=m3.fabric_type LEFT JOIN fabric_weave fw ON fw.fabric_weave_id=m3.weave`
    const data = await this.datasource.query(query)
    if (data)
      return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", data)
    else
      return new CommonResponseModel(false, 0, 'No data found')
  }
}