import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FgRmMappingEntity } from "../fg-rm-mapping.entity";

@Injectable()
export class FgRmMappingRepository extends Repository<FgRmMappingEntity> {

    constructor(@InjectRepository(FgRmMappingEntity) private Repo: Repository<FgRmMappingEntity>
    ) {
        super(Repo.target, Repo.manager, Repo.queryRunner);
    }

    async getAllFgRmMapped(req: any ): Promise<any[]> {
        const query = this.createQueryBuilder('fg_item')
        .select(`*`).where('1=1'); 
      
        if (req.style !== undefined) {
          query.andWhere(`style_no = :style`, { style: req.style }); 
        }
        let data:FgRmMappingEntity[] = await query.getRawMany();
        return data;
      }
}