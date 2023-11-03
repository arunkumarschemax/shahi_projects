import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { ItemCreFilterRequest, RMCreFilterRequest } from "@project-management-system/shared-models";
import { RmCreationEntity } from "./rm-items.entity";



@Injectable()
export class RmCreationRepository extends Repository<RmCreationEntity> {
    constructor(@InjectRepository(RmCreationEntity) private repo: Repository<RmCreationEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllRmCrted(req: RMCreFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('rm_item')
        .select(`*`).where('1=1'); 
      
        // if (req.buyer !== undefined) {
        //   query.andWhere(`style_no = :style`, { style: req.style }); 
        // }
        // if (req.itemName !== undefined) {
        //     query.andWhere(`item_name = :itemName`, { itemName: req.itemName }); 
        //   }
        //   if (req.brandId !== undefined) {
        //     query.andWhere(`brand_id = :brandId`, { brandId: req.brandId }); 
        //   }
        //   if (req.confirmStartDate !== undefined) {
        //     query.andWhere(`Date(order_confirmed_date) BETWEEN '${req.confirmStartDate}' AND '${req.confirmEndDate}'`)
        // }
      
        let data:RmCreationEntity[] = await query.getRawMany();
        return data;
      }


      
}
