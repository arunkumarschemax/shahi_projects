import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FgRmMappingEntity } from "../fg-rm-mapping.entity";
import { RmMappingFilterRequest } from "@project-management-system/shared-models";

@Injectable()
export class FgRmMappingRepository extends Repository<FgRmMappingEntity> {

    constructor(@InjectRepository(FgRmMappingEntity) private Repo: Repository<FgRmMappingEntity>
    ) {
        super(Repo.target, Repo.manager, Repo.queryRunner);
    }

    async getAllFgRmMapped(req: RmMappingFilterRequest ): Promise<any[]> {
        const query = this.createQueryBuilder('fg')
        .select(`*`).where('1=1'); 
      
        if (req.fgItemCode !== undefined) {
          query.andWhere(`fg_item_code = :fgCode`, { fgCode: req.fgItemCode }); 
        }
        if (req.rmItemCode !== undefined) {
            query.andWhere(`rm_item_code = :RmCode`, { RmCode: req.rmItemCode }); 
          }
        let data:FgRmMappingEntity[] = await query.getRawMany();
        return data;
      }
}